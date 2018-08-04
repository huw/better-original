import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#00FF00',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  timerWrapper: {
    backgroundColor: '#FFFFFF',
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 2,
    backgroundColor: '#F0EFF5',
  },
  mainTimer: {
    fontSize: 60,
    fontWeight: '100',
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  /* LapTimer: {
    fontSize: 18,
    borderWidth: 0.5,
    alignSelf: 'center',
  }, */
});

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

  render() {
    return (
      <View>
        <Text style={styles.mainTimer}>{moment(this.state.time).format('mm:ss')}</Text>
        <Button
          onPress={this.onPressButton}
          title="Done"
          color="#000"
        />
      </View>
    );
  }
}
