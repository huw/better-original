// @flow
import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './src/view/HomeScreen';
import MoodScreen from './src/view/MoodScreen';


const App = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Mood: {
    screen: MoodScreen,
  },
});

export default App;
