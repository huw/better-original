// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Image } from 'react-native';

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

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const path = `../images/${this.props.value}.png`;
    // console.log(path);
    return (
      <PrettyCard
        backgroundColor={this.props.backgroundColor}
      >
        <Image
          source={require('../images/happy.png')}
        />
        <Text>
          Are you {this.props.value}?
        </Text>
      </PrettyCard>
    );
  }
}
