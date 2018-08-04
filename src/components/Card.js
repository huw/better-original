// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PrettyCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 300;
  height: 300;
  border-radius: 15px;
  overflow: visible;
  background-color: ${props => props.backgroundColor};
`;

const CardText = styled.Text`
  font-size: 100px;
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
        <CardText>
          {this.props.text}
        </CardText>
      </PrettyCard>
    );
  }
}
