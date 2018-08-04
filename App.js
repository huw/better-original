// @flow
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/view/HomeScreen';
import MoodScreen from './src/view/MoodScreen';
import TimerScreen from './src/view/TimerScreen';
import StatsScreen from './src/view/StatsScreen';

const App = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Mood: {
    screen: MoodScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Timer: {
    screen: TimerScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Stats: {
    screen: StatsScreen,
  },
});

export default App;
