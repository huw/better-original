// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, StatusBar, AsyncStorage } from 'react-native';

import styles from '../constants/styles';
import Button from '../components/Button';

import { moods, meditations } from '../../sampleData';

const CenterView = styled.View`
  flex: 1;
  background-color: ${styles.backgroundColor};
  align-items: center;
  justify-content: center;
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};

const medTimes = [
  {session: 1, time: 10001}, 76637, 89981, 99381, 17374, 12344, 99192];   // fake meditation times in msec

export default class HomeScreen extends React.Component<Props> {
  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    AsyncStorage.getItem('meditation', (err, result) => {
      if (err) throw err;
      let table = JSON.parse(result);

      const currentMeditationID = table ? table.length : 0;
      navigate('Mood', {
        isPreSession: true,
        meditationID: currentMeditationID,
      });
      const meditation = {
        ID: currentMeditationID,
      };
      if (table) {
        table = [...table, meditation];
      } else {
        table = [meditation];
      }
      AsyncStorage.setItem('meditation', JSON.stringify(table));
    });
  }

  render() {
    AsyncStorage.setItem('moods', JSON.stringify(moods));
    AsyncStorage.setItem('meditations', JSON.stringify(meditations));

    return (
      <CenterView>
        <StatusBar barStyle="light-content"/>
        <Button
          onPress={this.onPressButton}
          title="Start Session"
        />
      </CenterView>
    );
  }
}