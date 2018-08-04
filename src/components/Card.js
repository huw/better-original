// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, Image } from 'react-native';

import images from './../images/images.js';

const PrettyCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 300;
  height: 300;
  border-radius: 15px;
  overflow: visible;
  background-color: ${props => props.backgroundColor};
  box-shadow: 5px 10px #888888;
`;

export type CardData = {
  value: string,
  backgroundColor: string,
};

export default class Card extends React.Component<CardData> {
  render() {
    let value = this.props.value;
    return (
      <PrettyCard
        backgroundColor={this.props.backgroundColor}
      >
        <Image
          source={images[value]}
        />
        <Text>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Text>
      </PrettyCard>
    );
  }
}