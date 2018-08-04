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
  background-color: #262626;
  justify-content: space-evenly;
`;

const SwipeCardsContainer = styled.View`
  height: 400;
`;

const SwipeButtonContainer = styled.View`
  /* flex: 1; */
  height: 10;
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
        {
          value: 'happy',
          description: 'you feel joyfull,\n people would notice an uplifting spirit',
          backgroundColor: '#0da500',
        },
        {
          value: 'sad',
          description: 'not too sure what to write',
          backgroundColor: '#2357aa',
        },
        {
          value: 'relaxed',
          description: 'you\'ve slept well,\n your muscles aren\'t tense,\n you don\'t have to be happy',
          backgroundColor: '#9d63e8',
        },
        {
          value: 'tired',
          description: 'your eyes may be heavy ,\n you want to be in bed,',
          backgroundColor: '#4a4287',
        },
        // {
        //   value: 'anxious',
        //   description: 'you are on edge ,\n worried about something that is undetermined',
        //   backgroundColor: '#42f456',
        // },
        // {
        //   value: 'annoyed',
        //   description: 'you feel frustrated at an event ,\n put something here',
        //   backgroundColor: '#ff0000',
        // },
        // {
        //   value: 'loved',
        //   description: 'you are content with your connection,\n you feel supported in life',
        //   backgroundColor: '#ff00ae',
        // },
        // {
        //   value: 'calm',
        //   description: 'you don\'t have worries,\n you are physcially relaxed',
        //   backgroundColor: '#0019ff',
        // },
        // {
        //   value: 'caring',
        //   description: 'you are feeling empathetic,\n I am not sure ',
        //   backgroundColor: '#bb00ff',
        // },
        // {
        //   value: 'grateful',
        //   description: 'Need to put this in',
        //   backgroundColor: '#54ff00',
        // },
        // {
        //   value: 'inspired',
        //   description: 'Need to put this in',
        //   backgroundColor: '#00b6ff',
        // },
        // {
        //   value: 'motivated',
        //   description: 'Need to put this in',
        //   backgroundColor: '#8cff00',
        // },
        // {
        //   value: 'angry',
        //   description: 'Need to put this in',
        //   backgroundColor: '#ff2600',
        // },
        // {
        //   value: 'insecure',
        //   description: 'Need to put this in',
        //   backgroundColor: '#d800ff',
        // },
        // {
        //   value: 'empty',
        //   description: 'you are lacking energy,\n you don\'t enjoy your normal hobbies',
        //   backgroundColor: '#6600ff',
        // },
      ],
      amFeeling: [],
      notFeeling: [],
    };
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
