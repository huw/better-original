// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card from './../components/Card.js';

const CenterView = styled.View`
  flex: 1;
  background-color: #a816af;
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
        { text: 'Happy', backgroundColor: '#0ad14f' },
        { text: 'Sad', backgroundColor: '#2357aa' },
      ],
    };
  }

  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Home');
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
        />
      </CenterView>
    );
  }
}
