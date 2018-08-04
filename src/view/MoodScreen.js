// @flow
import React from 'react';
import styled from 'styled-components';
import { Button, Text, AsyncStorage } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card, { type CardData } from '../components/Card';

const LEFT = 'left';
const RIGHT = 'right';

const CenterView = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-evenly;
`;

const SwipeCardsContainer = styled.View`
  height: 400;
`;

const SwipeButtonContainer = styled.View`
  /* flex: 1; */
  height: 64;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};

export default class MoodScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { value: 'happy', backgroundColor: '#0ad14f' },
        { value: 'sad', backgroundColor: '#2357aa' },
        { value: 'relaxed', backgroundColor: '#9d63e8' },
        { value: 'tired', backgroundColor: '#4a4287' },
        // { value: 'anxious', backgroundColor: '#42f456' },
        // { value: 'annoyed', backgroundColor: '#ff0000' },
        // { value: 'romantic', backgroundColor: '#ff00ae' },
        // { value: 'calm', backgroundColor: '#0019ff' },
        // { value: 'caring', backgroundColor: '#bb00ff' },
        // { value: 'grateful', backgroundColor: '#54ff00' },
        // { value: 'inspired', backgroundColor: '#00b6ff' },
        // { value: 'motivated', backgroundColor: '#8cff00' },
        // { value: 'angry', backgroundColor: '#ff2600' },
        // { value: 'insecure', backgroundColor: '#d800ff' },
        // { value: 'empty', backgroundColor: '#6600ff' },
      ],
      amFeeling: [],
      notFeeling: [],
    };
  }

  onPressButton = (params) => {
    this.props.navigation.navigate('Home', params);
  }

  onYes = (card: CardData) => {
    this.setState((prevState => ({
      amFeeling: [...prevState.amFeeling, card.value],
    })));
  }

  onNo = (card: CardData) => {
    this.state.notFeeling.push(card.value);
  }

  noMoreCards = () => {
    const isPreSessionParam = this.props.navigation.getParam('isPreSession', true);
    const currentMeditationID = this.props.navigation.getParam('meditationID', null);
    const allFeelings = this.state.amFeeling.join('\n');
    AsyncStorage.getItem('mood', (err, result) => {
      if (err) throw err;
      let table = JSON.parse(result);
      const moodID = table ? table.length : 0;
      const newMood = {
        ID: moodID,
        date: new Date(),
        isPreSession: isPreSessionParam,
        moods: this.state.amFeeling,
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
        console.log(tableM);
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
        title="DONE"
        color="black"
      />
    );
  }

  forceSwipe = (direction: string) => {
    if (direction === LEFT) {
      // this.refSwipeCards.current._forceLeftSwipe(); // eslint-disable-line no-underscore-dangle
    } else if (direction === RIGHT) {
      // this.refSwipeCards.current._forceRightSwipe(); // eslint-disable-line no-underscore-dangle
    }
  }

  render() {
    return (
      <CenterView>
        <SwipeCardsContainer>
          <SwipeCards
            cards={this.state.cards}
            renderCard={(cardProps: CardData) => <Card {...cardProps} />}
            renderNoMoreCards={this.noMoreCards}

            showYup={false}
            showNope={false}
            handleYup={this.onYes}
            handleNope={this.onNo}

            dragY={false}
          />
        </SwipeCardsContainer>
        <SwipeButtonContainer>
          <Button
            onPress={() => { this.forceSwipe(LEFT); }}
            title="No"
            color="red"
          />
          <Button
            onPress={() => { this.forceSwipe(RIGHT); }}
            title="Yes"
            color="green"
          />
        </SwipeButtonContainer>
      </CenterView>
    );
  }
}
