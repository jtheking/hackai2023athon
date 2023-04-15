import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import Recipe from './pages/Recipe';
import Home from './pages/Home';

export default function App() {
  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
  );
}
