import React from 'react';
import { View, Text, Button } from 'react-native';

type Props = {
  navigation: {
    navigate: (string) => mixed,
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
    const { navigation: { navigate } } = this.props;
    navigate('Mood', {
      isPreSession: this.state.isPreSession,
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
