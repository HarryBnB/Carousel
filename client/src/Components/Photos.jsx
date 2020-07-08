/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const PhotoFrame = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  margin: 0;
  padding: 0;

  .photoImg {
    width: 100%;
    height: 180px;
    border-radius: 5px;
  }
`;

const Arrows = styled.span`
  position: relative;
  bottom: 184px;
  display: inline-block;
  width: 100%;
  height: 180px;

  .fav {
    position: absolute;
    right: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: right;
  }

  .fav:hover {
    cursor: pointer;

    .favImg {
      display: inline-block;
    }
  }

  .favImg {
    width: 35px;
    height: 35px;
    margin: 10px 10px 0 0;
    opacity: 0.3;
    display: none;


    &:hover {
      animation-name: fadeIn;
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
    }

    @keyframes fadeIn {
      0% {opacity: 0.3}
      100% {opacity: 1.0}
    }
  }



  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 25px;
    height: 25px;
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #ffffff5e;
    color: #777;
  };
  .btn.nextPhoto {
    right: 0;
  };
  .btn:hover {
    cursor: pointer;
    background-color: #ffffff00;
    color: #000;
  };
`;

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: this.props.collections,
      photoIndex: 0,
      isFav: false,
    };
    this.getPrev = this.getPrev.bind(this);
    this.getNext = this.getNext.bind(this);
    this.favCheck = this.favCheck.bind(this);
  }

  getPrev(e) {
    let { photoIndex } = this.state;

    if (photoIndex <= 0) {
      e.preventDefault();
    } else {
      photoIndex -= 1;
    }

    this.setState({
      photoIndex,
    });
  }

  getNext(e) {
    const { urls } = this.state;
    let { photoIndex } = this.state;

    if (photoIndex >= urls.length - 1) {
      e.preventDefault();
    } else {
      photoIndex += 1;
    }

    $('.photoImage').fadeOut('slow');

    this.setState({
      photoIndex,
    });
  }

  favCheck() {
    this.props.showModal();
    const { isFav } = this.state;
    if (isFav) {
      this.setState({
        isFav: false,
      });
    } else {
      this.setState({
        isFav: true,
      });
    }
  }

  render() {
    let buttons;
    let fav;
    const { photoIndex, urls, isFav } = this.state;
    const src = urls[photoIndex];

    if (photoIndex === 0) {
      buttons = <span className="btn nextPhoto" onClick={this.getNext}> &gt; </span>;
    } else if (photoIndex === urls.length - 1) {
      buttons = <span className="btn prevPhoto" onClick={this.getPrev}> &lt; </span>;
    } else {
      buttons = (
        <div>
          <span className="btn prevPhoto" onClick={this.getPrev}> &lt; </span>
          <span className="btn nextPhoto" onClick={this.getNext}> &gt; </span>
        </div>
      );
    }

    if (isFav) {
      fav = <img className="favImg" style={{ display: 'inline-block' }} src="https://rooms.s3-us-west-1.amazonaws.com/webP/fav_over.webp" alt="favorite checked" onClick={this.favCheck} />;
    } else {
      fav = <img className="favImg" src="https://rooms.s3-us-west-1.amazonaws.com/webP/fav.webp" alt="favorite unchecked" onClick={this.favCheck} />;
    }

    return (
      <PhotoFrame>
        <img className="photoImg" src={src} alt="images of room" />
        <Arrows>
          <span className="fav">
            {fav}
          </span>
          {buttons}
        </Arrows>
      </PhotoFrame>
    );
  }
}

export default Photos;
