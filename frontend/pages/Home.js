import React, { useEffect, useState } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView, FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import { Image } from 'react-native';


const styles = StyleSheet.create({

  titleText: {

    fontSize: 40,
    height: 60,
    color: '#191923', 
    fontFamily: 'Fraunces_700Bold',
    textAlign: 'center',

   
  },
  fridge: {
    width: '100%',
    height: '36%',
    resizeMode: 'cover',
    alignItems: 'center',
    borderRadius: 10,
    
  },
  image: {
    flex: 1,
    height: 80,
    width: 80,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
    
  },

  itemContainer: {
    flex: 1,
    overflow: 'visible',
    
  },


});

export default function Home(props){
    const [images, setImages] = useState([])
    const getFood = async () => {


        const response = await fetch('https://hackai2023athon-production.up.railway.app/get_ingredients')
        const data = await response.json()
        console.log(data)
        props.setFood(data)
        const imgs = []
        for (const item of data) {
            const img = await fetch(`https://hackai2023athon-production.up.railway.app/image?recipe_title=${item}`, {
                method: 'POST',
            })
            const imgData = await img.json()
            imgs.push(imgData)
        }
        console.log(imgs)
        setImages(imgs)
       
    }

    useEffect(() => {
        getFood()
    }, [])

    return(
    
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        
     
        <View style={{ backgroundColor:'#fff', paddingHorizontal: 10 }}>

        <View style={{ backgroundColor: '#fff', borderBottomEndRadius: 30, borderBottomStartRadius: 30, marginBottom: 6,}}>
            <Text style={styles.titleText}>
            Live View
            </Text>
        </View>

      
 
        <Image style={styles.fridge} source={require("../assets/food.png")}/>
        

      
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20, borderColor: '#fff' , borderWidth: 2}}>
      
        <Text style={styles.titleText}>
        Items
        </Text>
      
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={props.food.slice(0, props.food.length - 3)}
          renderItem={({ item, index }) => <GridItem item={item} img={images[index]} />}
          keyExtractor={(item, index) => "normal-"+index}
        />
        
        
        <Text style={styles.titleText}>
        Spoiled
        </Text>
        

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={props.food.slice(-3)}
          renderItem={({ item, index }) => <GridItem item={item} img={images[props.food.length-index-1]} />}
          keyExtractor={(item, index) => "spoiled-"+index}
        />  
        </ScrollView>
        </View>
        </SafeAreaView>
  
    )
}

const GridItem = ( {img} ) => {
    console.log({img})
  return (
    <View style={styles.itemContainer}>
        <Shadow>
        <Image source={{uri: img}} style={styles.image} />  
        </Shadow>
    </View>
  );
};

