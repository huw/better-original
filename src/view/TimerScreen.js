import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  mainTimer: {
    fontSize: 70,
    fontWeight: '100',
    alignSelf: 'center',
  },
});

type Props = {
  navigation: {
    navigate: (string) => mixed,
    push: (string) => mixed,
  },
};

export default class TimerScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment(),
    };

    setInterval(() => {
      this.setState(prevState => ({
        time: moment() - prevState.startTime,
      }));
    }, 100);
  }

  onPressButton = () => {
    this.props.navigation.push('Mood', {
      isPreSession: false,
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
