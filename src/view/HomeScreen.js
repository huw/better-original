// @flow
// import React, { Component } from 'react';
import styled from 'styled-components';
import { Text, AsyncStorage, StyleSheet, StatusBar, View } from 'react-native';
import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
import { Table, Rows, Row } from 'react-native-table-component';

import styles from '../constants/styles';
import Button from '../components/Button';
import { calcChiSquared, calcChanges } from '../components/stats';

import { moods, meditations } from '../../sampleData';

const CenterView = styled.View`
  flex: 1;
  background-color: ${styles.backgroundColor};
  align-items: center;
  justify-content: space-evenly;
`;

const TableStyle = styled.Text`
  font-size: 10;
  color: ${styles.textColor};
`;

const PrettyMessage = styled.Text`
  font-size: 30;
  color: ${styles.textColor};
  font-weight: bold;
`;

const Logo = styled.Image`
  width: 216;
  height: 55;
`;

const HeroTextContainer = styled.View`
  align-items: center;
  padding-left: 20;
  padding-right: 20;
`;

const HeadingText = styled.Text`
  font-size: ${styles.fontSizeSubtitle};
  font-weight: ${styles.fontWeightHeading};
  color: white;
  text-align: center;
`;

const HintTextContainer = styled.View`
  background-color: green;
  border-radius: 100;
  padding-left: 12;
  padding-right: 12;
  padding-top: 5;
  padding-bottom: 5;
  margin-top: 16;
`

const HintText = styled.Text`
  font-size: ${styles.fontSizeSubtitle};
  font-weight: ${styles.fontWeightSubtitle};
  color: white;
  text-align: center;
`;

const styles1 = StyleSheet.create({
  container: {bottom:80, width: 200, height: 50 },
  head: { width: 198, height: 50 },
  text: { color: '#ffffff', width: 200, height: 50, fontSize:20, textAlign: 'left' }
});

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
      tableHead: ['emotion', 'percentage'],
    }
    calcChiSquared(this);
    calcChanges(this);
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
    const state = this.state;
    return (
      <CenterView>
        <StatusBar barStyle="light-content"/>
        <Logo source={require('../images/logo.png')} />
        <HeroTextContainer>
          <HeadingText>
            {this.state.chiSquaredMsg}
          </HeadingText>
          <HintTextContainer>
            <HintText>
              {this.state.chiSquaredSignificance}
            </HintText>
          </HintTextContainer>
        </HeroTextContainer>
        <View style={styles1.container}>
        <Table borderStyle={{borderWidth: 0}}>
            <Row data={this.state.tableHead} style={styles1.head} textStyle={styles1.text}/>
            <Rows data={this.state.tableData} textStyle={styles1.text}/>
          </Table>
          </View>
        <Button
          onPress={this.onPressButton}
          title="Start Session"
        />
      </CenterView>
    );
  }
}
