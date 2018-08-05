import React from 'react';
import { View, Text, StatusBar, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

import styles, { timerStyle } from '../constants/styles';
import Button from '../components/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${styles.backgroundColor};
  justify-content: center;
  align-items: center;
`;

const TimeText = styled.Text`
  font-size: ${timerStyle.fontSize};
  font-weight: ${timerStyle.fontWeight};
  color: ${timerStyle.textColor};
  align-self: center;
  margin-bottom: 30;
`;

const TimerContainer= styled.View`
/* flex: 1; */
justify-content: flex-end;
`;

const ButtonContainer = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 80;
`;

const TimerButton = styled(Button)`
  margin-right: 10px;
  margin-left: 10px;
`;

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
    push: (string) => mixed,
  },
};

export default class TimerScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // startDate: new Date(),
      startTime: moment(),
    };

    setInterval(() => {
      this.setState(prevState => ({
        // timeMin: ((new Date().getMinutes() - prevState.startDate.getMinutes()) >= 0 ? new Date().getMinutes() - prevState.startDate.getMinutes() : new Date().getMinutes() - prevState.startDate.getMinutes() + 60),
        // timeSec: ((new Date().getSeconds() - prevState.startDate.getSeconds()) >= 0 ? new Date().getSeconds() - prevState.startDate.getSeconds() : new Date().getSeconds() - prevState.startDate.getSeconds() + 60),
        time: moment() - prevState.startTime,
      }));
    }, 100);
  }

  onPressButton = () => {
    const currentMeditationID = this.props.navigation.getParam('meditationID', null);
    AsyncStorage.getItem('meditation', (err, result) => {
      if (err) throw err;
      const table = JSON.parse(result);
      table.find(obj => obj.ID === currentMeditationID).time = this.state.time;
      AsyncStorage.setItem('meditation', JSON.stringify(table));
      console.log(table);
    });
    this.props.navigation.push('Mood', {
      isPreSession: false,
      meditationID: currentMeditationID,
    });
  }

  cancelSession = () => {
    const currentMeditationID = this.props.navigation.getParam('meditationID', null);
    AsyncStorage.getItem('meditation', (err, result) => {
      if (err) throw err;
      const table = JSON.parse(result);
      const newTable = table.filter(meditation => meditation.ID != currentMeditationID);
      AsyncStorage.setItem('meditation', JSON.stringify(newTable));
    })
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Container>
        <TimerContainer>        
          <StatusBar barStyle="light-content"/>
          <TimeText>{moment(this.state.time).format('mm:ss')}</TimeText>
        </TimerContainer>
        <ButtonContainer>
          <TimerButton
            onPress={this.cancelSession}
            title="Cancel"
          />
          <TimerButton
            onPress={this.onPressButton}
            title="Done"
          />
        </ButtonContainer>
      </Container>
    );
  }
}
