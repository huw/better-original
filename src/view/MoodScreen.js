// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, StatusBar, AsyncStorage } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { Container, Content } from 'native-base';
import _ from 'lodash';

import styles from '../constants/styles';
import feelings, { type Feeling } from '../constants/feelings';
import Card from '../components/Card';
import Button from '../components/Button';

const LEFT = 'left';
const RIGHT = 'right';

const CenterView = styled.View`
  flex: 1;
  background-color: ${styles.backgroundColor};
  justify-content: space-evenly;
  align-items: center;
`;

const HintText = styled.Text`
  position: absolute;
  top: 80;
  font-size: ${styles.fontSizeHint};
  font-weight: ${styles.fontWeightHint};
  color: ${styles.textColorHint};
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};

export default class MoodScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cards: _.shuffle(feelings),
      amFeeling: [],
      notFeeling: [],
    };
  }

  onYes = (card: Feeling) => {
    this.setState(prevState => ({
      amFeeling: [...prevState.amFeeling, card.value],
    }));
  }

  onNo = (card: Feeling) => {
    this.state.notFeeling.push(card.value);
  }

  noMoreCards = () => {
    const isPreSessionParam = this.props.navigation.getParam('isPreSession', true);
    const currentMeditationID = this.props.navigation.getParam('meditationID', null);

    AsyncStorage.getItem('mood', (err, result) => {
      if (err) throw err;
      let table = JSON.parse(result);
      const moodID = table ? table.length : 0;
      const newMood = {
        ID: moodID,
        date: new Date(),
        isPreSession: isPreSessionParam,
        moods: this.state.amFeeling,
        notMoods: this.state.notFeeling,
      };

      if (table) {
        table = [...table, newMood];
      } else {
        table = [newMood];
      }

      AsyncStorage.setItem('mood', JSON.stringify(table));
      console.log(table);

      AsyncStorage.getItem('meditation', (errM, resultM) => {
        if (errM) throw errM;
        const tableM = JSON.parse(resultM);
        console.log(currentMeditationID);
        if (isPreSessionParam) {
          tableM.find(obj => obj.ID === currentMeditationID).preSessionID = moodID;
        } else {
          tableM.find(obj => obj.ID === currentMeditationID).postSessionID = moodID;
        }
        AsyncStorage.setItem('meditation', JSON.stringify(tableM));
        console.log(tableM);
      });
    });

    return (
      <Button
        onPress={() => this.props.navigation.navigate(
          isPreSessionParam ? 'Timer' : 'Home',
          { meditationID: currentMeditationID },
        )}
        title="Done"
      />
    );
  }

  render() {
    return (
      <CenterView>
        <StatusBar barStyle="light-content"/>
        <HintText>
          swipe left for no, swipe right for yes
        </HintText>
        <SwipeCards
          cards={this.state.cards}
          renderCard={(cardProps: Feeling) => <Card {...cardProps} />}
          renderNoMoreCards={this.noMoreCards}

          showYup={false}
          showNope={false}
          handleYup={this.onYes}
          handleNope={this.onNo}

          dragY={false}
        />
      </CenterView>
    );
  }
}
