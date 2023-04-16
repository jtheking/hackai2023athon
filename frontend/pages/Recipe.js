import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import FilterButton from '../components/FilterButton';
import ItemList from '../components/ItemList';


 export default function Recipe(props){

    // const recipesData = [
    //     {
    //         id: 0,
    //         ingredients: [
    //           "eggs",
    //           "mushrooms"
    //         ],
    //         instructions: [
        
    //           "1. Crack 2 eggs into a bowl and whisk until the yolks and whites are fully combined.",
    //           "2. Thinly slice 4-5 mushrooms and set aside."
    //         ],
    //         title: "Mushroom and Egg Soup"
    //     },
    //     {
    //         id: 1,
    //         ingredients: [
    //           "eggs",
    //           "mushrooms",
    //           "oranges"
    //         ],
    //         instructions: [
        
    //           "1. Crack 2 eggs into a bowl and whisk until the yolks and whites are fully combined.",
    //           "2. Thinly slice 4-5 mushrooms and set aside."
    //         ],
    //         title: "Mushroom and Egg Soup and Orange"
    //     },
    //     {
    //         id: 2,
    //         ingredients: [
    //           "eggs",
    //           "mushrooms"
    //         ],
    //         instructions: [
        
    //           "1. Crack 2 eggs into a bowl and whisk until the yolks and whites are fully combined.",
    //           "2. Thinly slice 4-5 mushrooms and set aside."
    //         ],
    //         title: "Mushroom and Egg Soup"
    //     },
    //     {
    //         id: 3,
    //         ingredients: [
    //           "eggs",
    //           "mushrooms"
    //         ],
    //         instructions: [
        
    //           "1. Crack 2 eggs into a bowl and whisk until the yolks and whites are fully combined.",
    //           "2. Thinly slice 4-5 mushrooms and set aside."
    //         ],
    //         title: "Mushroom and Egg Soup"
    //     }
    // ]


    const filterRecipes = () => {
        
        props.setRecipes(props.filteredRecipes);
        setExplore(false);

      }
  
    const getRecipes = async () => {

        console.log('Getting recipes...')
        
        const recipesData = await fetch('https://hackai2023athon-production.up.railway.app/recipes_with_images', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: props.food,
            })
        })

        
        const receivedJSON = await recipesData.json()
        console.log(receivedJSON)
        props.setNonFilteredRecipes(receivedJSON.recipes_with_extra_ingredients);
        props.setFilteredRecipes(receivedJSON.recipes_with_limited_ingredients);

        props.setRecipes(receivedJSON.recipes_with_extra_ingredients);
        setExplore(true)

    }

    useEffect(() => {

        getRecipes()

    }, [])


    const [explore, setExplore] = useState(true)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
        <View style={{ backgroundColor: '#fff',  height: 120, width: '100%'}}>
            <View style={{  marginTop: 20}} >
                <Text style={{ fontSize: 32, fontFamily: 'Fraunces_700Bold', width: '100%', textAlign: 'center'}}>Recipes</Text>
            </View>
            <View style={{ marginTop: 10}}>
                <FilterButton explore={explore} setExplore={setExplore} getRecipes={getRecipes} filterRecipes={filterRecipes} />
            </View>
        </View>
        <View>
            <ItemList recipes={props.recipes}/>   
        </View>
        </SafeAreaView>)




}