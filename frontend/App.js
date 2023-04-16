import React, { useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import Recipe from './pages/Recipe';
import Home from './pages/Home';
import { useFonts, Fraunces_400Regular, Fraunces_700Bold } from '@expo-google-fonts/fraunces';

const Tab = createBottomTabNavigator();
  
export default function App() {

  const [food, setFood] = useState(["eggs", "mushrooms", "oranges"]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [nonFilteredRecipes, setNonFilteredRecipes] = useState([]);


  let [fontsLoaded] = useFonts({
     Fraunces_400Regular,
     Fraunces_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  
      <NavigationContainer>
       
        <BottomTabs food={food} setFood={setFood} recipes={recipes} setRecipes={setRecipes}
        filteredRecipes={filteredRecipes} setFilteredRecipes={setFilteredRecipes}
        nonFilteredRecipes={nonFilteredRecipes} setNonFilteredRecipes={setNonFilteredRecipes} />
   
      </NavigationContainer>
  );
}

function BottomTabs(props) {


  return (
    <Tab.Navigator 
    initialRouteName='Home'
      >
      <Tab.Screen  options={ { tabBarActiveTintColor: "#f5610a",
      tabBarInactiveTintColor: "#555",tabBarLabelStyle: {
        fontFamily: 'Fraunces_700Bold',
        fontSize: 11,
      }, headerShown: false, tabBarIcon: () => {
        return (<Ionicons name="home" size={30} color="black" />)
      }  }}name="Home" children={() => < Home food={props.food} setFood={props.setFood} /> } />
      <Tab.Screen  options={ {  tabBarLabelStyle: {
        fontFamily: 'Fraunces_700Bold',
        fontSize: 11,
      }, title: "Recipes", headerShown: false, tabBarIcon: () => {
        return (<FontAwesome name="list-alt" size={24} color="black" />)
      }  }} name="Recipe" children={ () => <Recipe food={props.food} setFood={props.setFood} 
      recipes={props.recipes} setRecipes={props.setRecipes} 
      filteredRecipes={props.filteredRecipes} setFilteredRecipes={props.setFilteredRecipes}
      nonFilteredRecipes={props.nonFilteredRecipes}
      setNonFilteredRecipes={props.setNonFilteredRecipes}/>
      } />
    </Tab.Navigator>
  );
}
