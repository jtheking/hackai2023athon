import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Recipe from './pages/Recipe';
import Home from './pages/Home';

export default function App() {

  const [food, setFood] = useState(["eggs", "mushrooms", "oranges"]);
  const [loaded] = useFonts({

    Fraunces: require('./assets/fonts/fraunces/frauncessoftwonkopszwght.ttf'),

  })

  if(!loaded){

    return null;
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee'}}>
      <Recipe food={food} setFood={setFood}/>
    </SafeAreaView>
  );
}
