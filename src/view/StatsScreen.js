import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { VictoryBar, VictoryChart } from 'victory';

type Props = {
  navigation: {
    navigate: (string) => mixed,
    getParam: (string) => mixed,
  },
};

const medTimes = [
  {session: 10001, 76637, 89981, 99381, 17374, 12344, 99192];   // fake meditation times in msec

export default class StatsScreen extends React.Component<Props> {
  onPressButton = () => {
    const { navigation: { navigate } } = this.props;
    AsyncStorage.getItem('meditation', (err, result) => {
      if (err) throw err;
      const table = JSON.parse(result);
      console.log(table);
    });
  }

  render() {
    return (
      <CenterView>
        <Button
          onPress={this.onPressButton}
          title="Show Stats"
        />
      </CenterView>
    );
  }
}
