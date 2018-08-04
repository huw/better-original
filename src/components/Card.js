// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, Image } from 'react-native';

import images from '../images/images';

const PrettyCard = styled.View`
  justify-content: space-evenly;
  align-items: center;
  width: 300;
  height: 425;
  border-radius: 15px;
  overflow: visible;
  background-color: ${props => props.backgroundColor};
  /* shadow-color: #000; */
  /* shadow-offset: {width: 0, height: 2}; */
  /* shadow-opacity: 0.8; */
  /* shadow-radius: 2; */
`;

const EmotionText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 55;
  font-weight: bold;
`;
const DescText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 23;
  text-align: center;
  /* font-weight: bold; */
`;
export type CardData = {
  value: string,
  backgroundColor: string,
  description: string,
};

export default class Card extends React.Component<CardData> {
  render() {
    const { value } = this.props;
    return (
      <PrettyCard
        backgroundColor={this.props.backgroundColor}
      >
        <Image
          source={images[value]}
        />
        <EmotionText>
          {value.charAt(0).toLowerCase() + value.slice(1)}
        </EmotionText>
        <DescText>
          {this.props.description}
        </DescText>
      </PrettyCard>
    );
  }
}
