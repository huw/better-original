// @flow
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/view/HomeScreen';
import MoodScreen from './src/view/MoodScreen';
import TimerScreen from './src/view/TimerScreen';


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
});

export default App;
