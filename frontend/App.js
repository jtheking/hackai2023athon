import React, { useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import Recipe from './pages/Recipe';
import Home from './pages/Home';
import { useFonts, Fraunces_400Regular } from '@expo-google-fonts/fraunces';

  
export default function App() {

  const [food, setFood] = useState(["eggs", "mushrooms", "oranges"]);
  const [recipes, setRecipes] = useState([]);

  let [fontsLoaded] = useFonts({
     Fraunces_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee'}}>
      <Recipe food={food} setFood={setFood} recipes={recipes} setRecipes={setRecipes}/>
    </SafeAreaView>
  );
}
