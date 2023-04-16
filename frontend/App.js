import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Recipe from './pages/Recipe';
import Home from './pages/Home';

export default function App() {

  const [loaded] = useFonts({

    Fraunces: require('./assets/fonts/fraunces/frauncessoftwonkopszwght.ttf'),
  })

  if(!loaded){

    return null;
  }

  return (
    <SafeAreaView>
      <Home/>
    </SafeAreaView>
  );
}
