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
  font-size: 20;
  color: ${styles.textColor};
  font-weight: bold;
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};


const goodEmotions = ['happy', 'relaxed', 'loved', 'calm', 'calming', 'grateful', 'inspired', 'motivated'];
const badEmotions = ['sad', 'tired', 'anxious', 'annoyed', 'angry', 'insecure', 'empty'];

let prePositiveHave, preNegativeHave, postPositiveHave, postNegativeHave;
let prePositiveNotHave, preNegativeNotHave, postPositiveNotHave, postNegativeNotHave;
let posGain, negLoss;

export default class HomeScreen extends React.Component<Props> {
  
  componentDidMount() {
    const currentMeditationID = this.props.navigation.getParam('meditationID', null);
    AsyncStorage.getItem('meditation', (err, result) => {
      if (err) throw err;
      const meditationTable = JSON.parse(result);
      const [currentMeditation] = meditationTable.filter(meditation => meditation.ID === currentMeditationID);
      const { preSessionID, postSessionID } = currentMeditation;
      
      AsyncStorage.getItem('mood', (err, result) => {
        if (err) throw err;

        const moodTable = JSON.parse(result);
        const [preSession] = moodTable.filter(mood => mood.ID === preSessionID);
        const [postSession] = moodTable.filter(mood => mood.ID === postSessionID);
        
        //console.log(preSession);
        //console.log(postSession);

        prePositiveHave = preSession.moods.filter(emotion => goodEmotions.includes(emotion));
        preNegativeHave = preSession.moods.filter(emotion => badEmotions.includes(emotion));

        prePositiveNotHave = preSession.notMoods.filter(emotion => goodEmotions.includes(emotion));
        preNegativeNotHave = preSession.notMoods.filter(emotion => badEmotions.includes(emotion));

        //console.log(`pre neg have ${preNegativeHave}`) 

        postPositiveHave = postSession.moods.filter(emotion => goodEmotions.includes(emotion));
        postNegativeHave = postSession.moods.filter(emotion => badEmotions.includes(emotion));

        postPositiveNotHave = postSession.notMoods.filter(emotion => goodEmotions.includes(emotion));
        postNegativeNotHave = postSession.notMoods.filter(emotion => badEmotions.includes(emotion));

        //console.log(`post neg have not ${postNegativeNotHave}`)        

        posGain = prePositiveNotHave.filter(emotion => postPositiveHave.includes(emotion));
        negLoss = preNegativeHave.filter(emotion => postNegativeNotHave.includes(emotion));

        //console.log(`positive gained ${posGain}`);
        //console.log(`negative Lost ${negLoss}`);
        posGain = posGain ? posGain.join(', ') : '';
        negLoss = negLoss ? negLoss.join(', ') : '';
        posGain = 'After this session you are more : ' + posGain;
        negLoss = 'You are also less : ' + negLoss;
        //console.log(`positive gained ${posGain}`);
        //console.log(`negative gained ${negLoss}`);

        this.setState({ gainsPos: posGain, gainsNeg: negLoss })
      })
    });
  }
   
  onPressButton = () => this.props.navigation.navigate('Home');

  

  render() {
    return (
      <CenterView>
        <PrettyMessage>
         {this.state && this.state.gainsPos}
        </PrettyMessage>
        <PrettyMessage>
         {this.state && this.state.gainsNeg}
        </PrettyMessage>
        <Button
          onPress={this.onPressButton}
          title="Home"
        />
      </CenterView>
    );
  }
}
