// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-native';

const CenterView = styled.View`
  flex: 1;
  background-color: #686b70;
  align-items: center;
  justify-content: center;
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
  },
};

export default class HomeScreen extends React.Component<Props> {
  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Mood');
  }

  render() {
    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title="Mood"
          color="#000"
        />
      </CenterView>
    );
  }
}
