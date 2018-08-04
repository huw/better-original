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
  justify-content: center;
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
        if(table[i].isPreSession) {
          
          // get the positive and negative moods before the session
          prePositiveHave = positiveWordsHave;
          preNegativeHave = negativeWordsHave;
          prePositiveNotHave = positiveWordsNotHave;
          preNegativeNotHave = negativeWordsNotHave;

          
        } else{
          
          // get the negative words
          postPositiveHave = positiveWordsHave;
          postNegativeHave = negativeWordsHave;
          postPositiveNotHave = positiveWordsNotHave;
          postNegativeNotHave = negativeWordsNotHave;

          // compute the before negative/after positive and the before positive -- after negative
          befPosAftNeg = befPosAftNeg + prePositiveHave.filter(emotion => postPositiveNotHave.includes(emotion)).length;
          befPosAftNeg = befPosAftNeg + preNegativeNotHave.filter(emotion => postNegativeHave.includes(emotion)).length;

          befNegAftPos = befNegAftPos + prePositiveNotHave.filter(emotion => postPositiveHave.includes(emotion)).length;
          befNegAftPos = befNegAftPos + preNegativeHave.filter(emotion => postNegativeNotHave.includes(emotion)).length;
          
        }

      }
      
      //console.log(`before positive after negavtive ${befPosAftNeg}`);
      //console.log(`before negative after positive ${befNegAftPos}`);

      let testStatistic = (befNegAftPos - befPosAftNeg)^2/(befNegAftPos + befPosAftNeg);
      console.log(`Test Statistic ${testStatistic}`);

    })

  }

 

  render() {
    AsyncStorage.setItem('moods', JSON.stringify(moods));
    AsyncStorage.setItem('meditations', JSON.stringify(meditations));

    this.stats();

    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title="Start Session"
        />
      </CenterView>
    );
  }
}
