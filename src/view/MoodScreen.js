// @flow
import React from 'react';
import styled from 'styled-components';
import { Text, AsyncStorage } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { Container, Content, Button } from 'native-base';

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

const StyledText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 30;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 80;
  height: 50;
  justify-content: center;
  align-items: center;
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
      isPreSession: this.props.navigation.getParam('pre', true),
    };
    this.SwipeCards = React.createRef();
  }

  onPressButton = (params) => {
    this.props.navigation.navigate('Home', params);
  }

  onYes = (card: CardData) => {
    console.log(`I am ${card.value}`);
    this.setState((prevState => ({
      amFeeling: [...prevState.amFeeling, card.value],
    })));
  }

  onNo = (card: CardData) => {
    console.log(`I am not ${card.value}`);
    this.state.notFeeling.push(card.value);
  }

  noMoreCards = () => {
    const allFeelings = this.state.amFeeling.join('\n');
    const newMood = {
      date: new Date(),
      isPreSession: this.state.isPreSession,
      moods: this.state.amFeeling,
    };
    AsyncStorage.getItem('mood', (err, result) => {
      if (err) throw err;
      let table = JSON.parse(result);

      if (table) {
        table = [...table, newMood];
      } else {
        table = [newMood];
      }
      AsyncStorage.setItem('mood', JSON.stringify(table));
      console.log(table);
    });
    console.log('End of log: '.concat(this.state.isPreSession));
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Home', { isPreSession: !this.state.isPreSession })}
        title="DONE"
        color="black"
      />
    );
  }

  forceSwipe = (direction: string) => {
    if (direction === LEFT) {
      // this.SwipeCards._forceLeftSwipe(); // eslint-disable-line no-underscore-dangle
    } else if (direction === RIGHT) {
      // this.SwipeCards._forceRightSwipe(); // eslint-disable-line no-underscore-dangle
    }
  }

  render() {
    this.state.isPreSession = this.props.navigation.getParam('isPreSession', true);
    return (
      <CenterView>
        <SwipeCardsContainer>
          <SwipeCards
            ref={this.SwipeCards}
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
          <StyledButton danger>
            <StyledText>
              No
            </StyledText>
          </StyledButton>
          <StyledButton success>
            <StyledText>
              Yes
            </StyledText>
          </StyledButton>
        </SwipeButtonContainer>
      </CenterView>
    );
  }
}
