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

const goodEmotions = ['happy', 'relaxed', 'loved', 'calm', 'caring', 'grateful', 'inspired', 'motivated'];

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};

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

  stats() {
    AsyncStorage.getItem('moods', (err, result) => {
      if (err) throw err;
      const table = JSON.parse(result);
      for (let i = 0; i < table.length; i++) {
        console.log("ID: " + table[i].ID);
        console.log("Good Emotions: " + table[i].moods.filter(emotion => goodEmotions.includes(emotion)).length);
      }
    })
  }

  render() {
    this.stats();

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