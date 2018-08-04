// @flow
import React from 'react';
import styled from 'styled-components';
import { Button, AsyncStorage } from 'react-native';

const CenterView = styled.View`
  flex: 1;
  background-color: #686b70;
  align-items: center;
  justify-content: center;
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};

export default class HomeScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Mood', {
      isPreSession: true,
    });
  }

  render() {
    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title="Start Session"
          color="#000"
        />
      </CenterView>
    );
  }
}
