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
    this.state = {
      isPreSession: this.props.navigation.getParam('isPreSession', true),
    };
  }

  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    this.state.isPreSession = !this.state.isPreSession;
    navigate('Mood', {
      isPreSession: this.state.isPreSession,
    });
  }

  render() {
    console.log('HomeScreen: '.concat(this.state.isPreSession));
    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title={this.state.isPreSession ? 'Start Session' : 'End Session'}
          color="#000"
        />
      </CenterView>
    );
  }
}
