// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card from './../components/Card.js';

const CenterView = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

export default class MoodScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { text: '😀', value: 'happy', backgroundColor: '#0ad14f' },
        { text: '😔', value: 'sad', backgroundColor: '#2357aa' },
        { text: '😌', value: 'relaxed', backgroundColor: '#9d63e8'},
        { text: '😴', value: 'sleepy', backgroundColor: '#dda73b'},
      ],
    };
  }

  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Home');
  }

  onYes = (card) => {
    console.log(`I am ${card.value}`)
  }

  onNo = (card) => {
    console.log(`I am not ${card.value}`)
  }

  render() {
    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title="Home"
          color="#000"
          accessibilityLabel=""
        />
        <SwipeCards
          cards={this.state.cards}
          renderCard={cardProps => <Card {...cardProps} />}

          handleYup={this.onYes}
          handleNope={this.onNo}

          yupText="Yes"
          nopeText="No"

          dragY={false}
        />
      </CenterView>
    );
  }
}
