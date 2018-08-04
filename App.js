// @flow
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/view/HomeScreen';
import MoodScreen from './src/view/MoodScreen';
import TimerScreen from './src/view/TimerScreen';
import StatsScreen from './src/view/StatsScreen';

const App = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Mood: {
    screen: MoodScreen,
  },
  Timer: {
    screen: TimerScreen,
  },
  Stats: {
    screen: StatsScreen,
  },
});

export default App;
