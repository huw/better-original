// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card from './../components/Card.js';

const CenterView = styled.View`
  flex: 1;
  background-color: #686b70;
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
        { value: 'happy', backgroundColor: '#0ad14f' },
        { value: 'sad', backgroundColor: '#2357aa' },
        { value: 'relaxed', backgroundColor: '#9d63e8'},
        { value: 'sleepy', backgroundColor: '#dda73b'},
      ],
      feelings: [],
    };
    this.SwipeCards = React.createRef();
  }

  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Home');
  }

  onYes = (card) => {
    console.log(`I am ${card.value}`);
    this.state.feelings.push(card.value);
  }

  onNo = (card) => {
    console.log(`I am not ${card.value}`);
  }

  noMoreCards = () => {
    var allFeelings = this.state.feelings.join('\n');
    return (
      <Text style={{ fontSize: 20, color: 'white' }}>
        <Text style={{ fontWeight: 'bold' }}>You Are:{'\n'}</Text>
        {allFeelings}
      </Text>
    );
  }

  render() {
    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title="Home"
          color="#000"
        />
        <SwipeCards
          ref={this.SwipeCards}
          cards={this.state.cards}
          renderCard={cardProps => <Card {...cardProps} />}
          renderNoMoreCards={this.noMoreCards}

          showYup={false}
          showNope={false}
          handleYup={this.onYes}
          handleNope={this.onNo}

          yupText="Yes"
          nopeText="No"

          dragY={false}
        />
        <Button
          onPress={() => {this.SwipeCards._forceLeftSwipe()}}
          title="No"
          color="red"
        />
        <Button
          onPress={() => {this.SwipeCards._forceLeftSwipe()}}
          title="Yes"
          color="green"
        />
      </CenterView>
    );
  }
}
