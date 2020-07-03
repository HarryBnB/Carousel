/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import Photos from './Photos.jsx';

const CurrentRoomPhoto = styled.li`
  width: 265px;
  height: 260px;
  padding: 0;
  margin-right: 20px;

  @media (max-width: 1120px) {
    width: 300px;
    margin-right: 25px;
  }
`;

const Header = styled.div`
  display: grid;
  font-size: 12px;
  padding-top: 10px;

  .superHost {
    position: relative;
    bottom: 2px;
    width: 85px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 600;
    border: 1px solid black;
    border-radius: 4px;
    padding: 1px;
  }

  .description{
    color: rgb(113, 113, 113);
    text-overflow: ellipsis;
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
  }

  .rating {
    text-align: right;
  }

  .rating img {
    position: relative;
    top: 2px;
    width: 13px;
    padding: 0;
    margin: 0 2px 0 0;
  }

  .rating span {
    color: rgb(113, 113, 113);
  }
`;

const Title = styled.div`
  font-size: 16px;
  margin: 4px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Price = styled.div`
  font-size: 16px;
`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: this.props.info,
    };
  }

  render() {
    let label;
    let columns;

    const {
      photos, title, description, isSuperhost, cost, ratings,
    } = this.state.carousel;

    let sum = 0;
    for (let i = 0; i < ratings.length; i += 1) {
      sum += ratings[i];
    }
    const avgRatings = Math.ceil((sum / ratings.length) * 100) / 100;

    if (isSuperhost) {
      label = <span className="superHost"> superhost </span>;
      columns = 'auto auto auto';
    } else {
      label = '';
      columns = 'auto auto';
    }

    return (
      <CurrentRoomPhoto>
        <Photos collections={photos} showModal={this.props.showModal} />
        <Header className="header" style={{ gridTemplateColumns: columns }}>
          { label }
          {/* Todo: hiding some of the text at the end */}
          <span className="description">
            {' '}
            {description}
            {' '}
          </span>
          <span className="rating">
            <img src="https://rooms.s3-us-west-1.amazonaws.com/ratingStar.png" alt="rating" />
            {avgRatings}
            <span>
              {' '}
              (
              {ratings.length}
              )
              {' '}
            </span>
          </span>
        </Header>
        {/* Todo: hiding some of the text at the end */}
        <Title>
          {' '}
          {title}
          {' '}
        </Title>
        <Price>
          <b>
            {' '}
            $
            {cost}
          </b>
          &#47; night
        </Price>
      </CurrentRoomPhoto>
    );
  }
}

export default Carousel;
