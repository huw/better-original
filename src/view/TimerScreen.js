import React from 'react';
import {
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';

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
      startTime: Date.now(),
    };

    setInterval(() => {
      this.setState(prevState => ({
        time: Date.now() - prevState.startTime,
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
    });
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.time}
        </Text>
        <Button
          onPress={this.onPressButton}
          title="Done"
          color="#000"
        />
      </View>
    );
  }
}
