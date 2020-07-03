/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Carousel from './Carousel.jsx';

const DipslayBox = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 1120px) {
    max-width: 950px;
  }
`;

const Frame = styled.div`
  padding: 0;
  height: 260px;

  ul {
    position: relative;
    display: inline-flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const Header = styled.div`
  padding: 0 0 24px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-weight: 600;
  float: left;
`;

const Pagination = styled.span`
  float: right;
  position: relative;
  top: 23px;
  font-size: 14px;
`;

const Pages = styled.span`
  margin: 0 16px 0 0;
`;

const Arrows = styled.span`
  .btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 0 16px 0 0;
    font-size: 26px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 50%;
    box-shadow: 0px 3px 7px 0px #bbb;
    background-color: white;
  };
  .btn.next {
    margin: 0 8px 0 0;
  };
  .btn:hover {
    cursor: pointer;
    box-shadow: 0 3px 7px 3px #bbb;
  };
`;

class CarouselList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      right: 0,
      maxPageNum: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.getNext = this.getNext.bind(this);
  }

  componentDidMount() {
    if ($(window).width() >= 1120) {
      this.setState({
        maxPageNum: 5,
      });
    } else {
      this.setState({
        maxPageNum: 7,
      });
    }
  }

  getPrev(e) {
    let subtractedNum;
    let { pageNum, right } = this.state;

    if ($(window).width() >= 1120) {
      subtractedNum = 1140;
    } else {
      subtractedNum = 975;
    }

    if (pageNum <= 1) {
      e.preventDefault();
    } else {
      pageNum -= 1;
      right -= subtractedNum;
    }
    this.setState({
      pageNum,
      right,
    });
  }

  getNext() {
    let addedNum;
    let maxPageNum;
    let { pageNum, right } = this.state;
    const { carousels } = this.props;

    if ($(window).width() >= 1120) {
      addedNum = 1140;
      maxPageNum = Math.ceil(carousels.length / 4);
    } else {
      maxPageNum = Math.ceil(carousels.length / 3);
      addedNum = 975;
    }

    if (pageNum >= maxPageNum) {
      pageNum = 1;
      right = 0;
    } else {
      pageNum += 1;
      right += addedNum;
    }

    this.setState({
      pageNum,
      right,
      maxPageNum,
    });
  }

  render() {
    const { pageNum, right, maxPageNum } = this.state;
    const { carousels, showModal } = this.props;

    $('ul').animate({ right }, 900);

    return (
      <DipslayBox>
        <Header>
          <Title> More places to stay </Title>
          <Pagination>
            <Pages>
              {pageNum}
              {' '}
              /
              {' '}
              {maxPageNum}
            </Pages>
            <Arrows>
              <span className="btn prev" onClick={this.getPrev}> &lt; </span>
              <span className="btn next" onClick={this.getNext}> &gt; </span>
            </Arrows>
          </Pagination>
        </Header>
        <Frame>
          <ul style={{ right }}>
            {
              carousels.map((carousel) => (
                <Carousel key={carousel._id} info={carousel} showModal={showModal} />
              ))
            }
          </ul>
        </Frame>
      </DipslayBox>
    );
  }
}

export default CarouselList;
