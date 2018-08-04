// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const CenterView = styled.View`
  flex: 1;
  background-color: #a816af;
  align-items: center;
  justify-content: center;
`;

const Card = styled.View`
  justify-content: 'center';
  align-items: 'center';
  width: 300;
  height: 300;
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
        {text: 'Happy'},
        {text: 'Sad'}
      ],
    };
  }

  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Home');
  }

  renderCard() {
    return (
      <Card>
        <Text>
          Card Text
        </Text>
      </Card>
    );
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
          />
      </CenterView>
    );
  }
}
