// @flow
import React from 'react';
import styled from 'styled-components';
import { View, Text, Image } from 'react-native';

import styles, { cardStyle } from '../constants/styles';
import { type Feeling } from '../constants/feelings';
import images from '../images/images';

const PrettyCard = styled.View`
  justify-content: space-evenly;
  align-items: center;
  width: ${cardStyle.width};
  height: ${cardStyle.height};
  border-radius: ${cardStyle.borderRadius};
  overflow: visible;
  background-color: ${props => props.backgroundColor};
`;

const EmojiImage = styled.Image`
  width: 96;
  height: 96;
`;

const EmotionText = styled.Text`
  color: ${styles.textColor};
  font-size: ${styles.fontSizeHeading};
  font-weight: ${styles.fontWeightHeading};
  text-align: center;
  margin-bottom: 10;
`;

const DescText = styled.Text`
  color: ${styles.textColor};
  font-size: ${styles.fontSize};
  font-weight: ${styles.fontWeight};
  text-align: center;
`;

export default class Card extends React.Component<Feeling> {
  render() {
    const { value } = this.props;
    return (
      <PrettyCard backgroundColor={this.props.backgroundColor}>
        <EmojiImage source={images[value]} />
        <View>
          <EmotionText>{value.charAt(0).toLowerCase() + value.slice(1)}</EmotionText>
          <DescText>{this.props.description}</DescText>
        </View>
      </PrettyCard>
    );
  }
}
