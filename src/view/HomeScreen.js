// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, AsyncStorage } from 'react-native';

import styles from '../constants/styles';
import Button from '../components/Button';

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

const goodEmotions = ['happy', 'relaxed', 'loved', 'calm', 'calming', 'grateful', 'inspired', 'motivated'];
const badEmotions = ['sad', 'tired', 'anxious', 'annoyed', 'angry', 'insecure', 'empty'];
//let numGoodMoods = [];

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
    this.state = {};
    this.stats();
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


  stats() {
    AsyncStorage.getItem('mood', (err, result) => {
      if (err) throw err;
      const table = JSON.parse(result);

      // first getting the number of good moods
      let prePositiveHave, preNegativeHave, postPositiveHave, postNegativeHave;
      let prePositiveNotHave, preNegativeNotHave, postPositiveNotHave, postNegativeNotHave;
      let befPosAftNeg = 0, befNegAftPos = 0;
      for (let i = 0; i < table.length; i++) {
        
        // check the positive and negavtive emotions that the user has
        let positiveWordsHave = table[i].moods.filter(emotion => goodEmotions.includes(emotion));
        let negativeWordsHave = table[i].moods.filter(emotion => badEmotions.includes(emotion));
        // check the positive and negative emotions that te user does not have 
        let positiveWordsNotHave = table[i].notMoods.filter(emotion => goodEmotions.includes(emotion));
        let negativeWordsNotHave = table[i].notMoods.filter(emotion => badEmotions.includes(emotion));

        // check if the data is pre or post session
        if (table[i].isPreSession) {
          
          // get the positive and negative moods before the session
          prePositiveHave = positiveWordsHave;
          preNegativeHave = negativeWordsHave;
          prePositiveNotHave = positiveWordsNotHave;
          preNegativeNotHave = negativeWordsNotHave;

        } else {
          
          // get the negative words
          postPositiveHave = positiveWordsHave;
          postNegativeHave = negativeWordsHave;
          postPositiveNotHave = positiveWordsNotHave;
          postNegativeNotHave = negativeWordsNotHave;

          // compute the before negative/after positive and the before positive -- after negative
          befPosAftNeg += prePositiveHave.filter(emotion => postPositiveNotHave.includes(emotion)).length;
          befPosAftNeg += preNegativeNotHave.filter(emotion => postNegativeHave.includes(emotion)).length;

          befNegAftPos += prePositiveNotHave.filter(emotion => postPositiveHave.includes(emotion)).length;
          befNegAftPos += preNegativeHave.filter(emotion => postNegativeNotHave.includes(emotion)).length;
          
        }

      }
      
      //console.log(`before positive after negavtive ${befPosAftNeg}`);
      //console.log(`before negative after positive ${befNegAftPos}`);

      let testStatistic = ((befNegAftPos - befPosAftNeg)^2) / (befNegAftPos + befPosAftNeg);
      console.log(`Test Statistic ${testStatistic}`);
      let msg;
      if (testStatistic < 0.001) {
        msg = "No Observed Effects";
      } else if (testStatistic < 0.05 && befNegAftPos > befPosAftNeg) {
        msg = "Slight Positive Effects";
      } else if (testStatistic < 0.05) {
        msg = "Slight Negative Effects";
      } else if (befNegAftPos > befPosAftNeg) {
        msg = "Great Positive Effects";
      } else {
        msg = "No Improvements"
      }
      this.setState({
        chiSquaredMsg: "Status: " + msg,
      });

    })

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
