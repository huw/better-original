// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text, View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const PrettyCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 300;
  height: 300;
  background-color: ${props => props.backgroundColor};
`;

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PrettyCard
        backgroundColor={this.props.backgroundColor}
      >
        <Text>
          {this.props.text}
        </Text>
      </PrettyCard>
    );
  }
}
