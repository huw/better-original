// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, AsyncStorage } from 'react-native';

import styles from '../constants/styles';
import Button from '../components/Button';
import calcChiSquared from '../components/stats';

import { moods, meditations } from '../../sampleData';

const CenterView = styled.View`
  flex: 1;
  background-color: ${styles.backgroundColor};
  align-items: center;
  justify-content: space-evenly;
`;

const PrettyMessage= styled.Text`
  font-size: 30;
  color: ${styles.textColor};
  font-weight: bold;
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
    AsyncStorage.setItem('mood', JSON.stringify(moods));
    AsyncStorage.setItem('meditation', JSON.stringify(meditations));
    calcChiSquared(this);
  }

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
    return (
      <CenterView>
        <PrettyMessage>
          {this.state && this.state.chiSquaredMsg}
        </PrettyMessage>
        <Button
          onPress={this.onPressButton}
          title="Start Session"
        />
      </CenterView>
    );
  }
}
