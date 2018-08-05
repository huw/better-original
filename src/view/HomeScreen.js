// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, AsyncStorage } from 'react-native';
import { Table, TableWrapper, Rows, Row } from 'react-native-table-component';

import styles from '../constants/styles';
import Button from '../components/Button';
import { calcChiSquared } from '../components/stats';

import { moods, meditations } from '../../sampleData';

const CenterView = styled.View`
  flex: 1;
  background-color: ${styles.backgroundColor};
  align-items: center;
  justify-content: space-evenly;
`;

const PrettyMessage= styled.Text`
  font-size: ${styles.fontSizeHeading};
  color: ${styles.textColor};
  font-weight: ${styles.fontWeightHeading};
  text-align: center;
`;

const TableView = styled.View`
  /* flex: 1; */
  height: 200;
  width: 100;
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
    this.state = {
      data: [
        ['happy', '36'],
        ['sad', '40'],
        ['tired', '-10'],
        ['relaxed', '69'],                
      ],      
    }
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
        <TableView>
          <Table>
            <Row data={['Emotion', 'Change']} style={{ height: 20 }}/>
            <Rows data={this.state.data} style={{ height: 20 }}/>
          </Table>
        </TableView>
        <Button
          onPress={this.onPressButton}
          title="Start Session"
        />
      </CenterView>
    );
  }
}
