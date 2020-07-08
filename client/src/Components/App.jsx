/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import CarouselList from './CarouselList.jsx';

const Container = styled.div`
  padding: 48px 0;
  background-color: #f7f7f7;
  font-family: 'Montserrat', sans-serif;
  color: rgb(34, 34, 34);

  @media (max-width: 950px) {
    display: none;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousels: [],
    };
    this.getCarousels = this.getCarousels.bind(this);
    this.getSpecificCarousel = this.getSpecificCarousel.bind(this);
    this.showFavModal = this.showFavModal.bind(this);
  }

  componentDidMount() {
    this.getCarousels();
    // this.getSpecificCarousel(roomId);
  }

  // get all the room for carousel
  getCarousels() {
    $.ajax({
      method: 'GET',
      url: '/carousel/carousels',
      success: (carousels) => {
        this.setState({
          carousels,
        });
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  // get a specific room
  getSpecificCarousel(roomId) {
    $.ajax({
      method: 'GET',
      url: `/carousel/${roomId}/carousels`,
      success: (carousels) => {
        this.setState({
          carousels,
        });
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  showFavModal() {
    $('body').css('overflow', 'hidden').append(`
      <div class="cover" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #00000096;"></div>
      <div class="favModal">
        <img class="closeFavModal" src="https://rooms.s3-us-west-1.amazonaws.com/webP/close.webp" height="16" width="16" style="cursor: pointer;" alt="close the modal of favorite"/>
        <h3 style="font-size: 24px">Save to a list</h3>
        <span class="createFav" style="display: inline-block; width: 100%; margin: 14px 0; color: #008489; cursor: pointer"> Create to new list </span>
        <span class="favFormBox" style="width: 100%; margin: 14px 0 30px; display: none;"></span>
        <ul class="faveCollection" style="list-style: none; padding: 0; width: 100%"></ul>
      </div>
    `).find('.favModal')
      .css({
        'background-color': 'white',
        width: '500px',
        'min-height': '300px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '32px 32px 100px',
        'box-sizing': 'border-box',
      });

    $('.closeFavModal').on('click', () => {
      $('body').css('overflow', 'scroll');
      $('.cover').remove();
      $('.favModal').remove();
    });

    $('.createFav').on('click', () => {
      $('.favFormBox').css('display', 'inline-block').html(`
        <form class="favForm">
          <label for="favName" style="margin-bottom: 10px; display: inline-block">Name:</label><br>
          <input id="favName" type="text" onChange="" style="width: 100%; padding: 10px 3px;
          border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;"><br>
          <span style="position: relative; top: 20px; left: 235px;">
            <span class="cancelButton" style="background-color: #fff; padding: 9px 19px; border: 1px solid #008489; margin-right: 15px; border-radius: 5px; cursor: pointer;">cancel</span>
            <span class="createButton" style="background-color: rgba(0, 132, 137); color: white; padding: 10px 20px; border-radius: 5px; cursor: pointer;">create</span>
          </span>
        </form>
      `);
      $('.createFav').hide();

      $('.cancelButton').hover(() => {
        $('.cancelButton').css('background-color', '#eee');
      }, () => {
        $('.cancelButton').css('background-color', '#fff');
      }).on('click', () => {
        $('.favFormBox').hide().find('form').hide();
        $('.createFav').show();
      });

      $('.createButton').hover(() => {
        $('.createButton').css('background-color', 'rgb(0, 184, 137)');
      }, () => {
        $('.createButton').css('background-color', 'rgb(0, 132, 137)');
      }).on('click', () => {
        const favName = $('#favName').val();

        $('#favName').val('');

        if (favName === '') {
          $('#favName').focus();
          return;
        }

        $('.faveCollection').append(`
          <li style="overflow: hidden; padding: 26px 0; border-top: 1px solid #eee;"><span style="float: left; position: relative; top: 5px;">${favName}</span><img class="favButton" style="float: right; cursor: pointer" src="https://rooms.s3-us-west-1.amazonaws.com/webP/fav.webp" height="30" width="30"  alt="button for favorite"/></li>
        `);

        $('.favButton').on('click', () => {
          if ($('.favButton').attr('src') === 'https://rooms.s3-us-west-1.amazonaws.com/webP/fav.webp') {
            $('.favButton').attr('src', 'https://rooms.s3-us-west-1.amazonaws.com/webP/fav_over.webp');
          } else {
            $('.favButton').attr('src', 'https://rooms.s3-us-west-1.amazonaws.com/webP/fav.webp');
          }
        });
      });
    });
  }

  render() {
    const { carousels } = this.state;

    return (
      <div>
        <Container>
          <CarouselList carousels={carousels} showModal={this.showFavModal} />
        </Container>
      </div>
    );
  }
}

export default App;
