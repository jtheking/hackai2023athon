import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { Image } from 'react-native';
import { FlatList, SafeAreaView, scrollView } from 'react-native';

const data = [
  { id: '1', image: '../assets/preview16.jpg' },
  { id: '2', image: '../assets/preview16.jpg' },
  { id: '3', image: '../assets/preview16.jpg' },
  { id: '4', image: '../assets/preview16.jpg' },
  { id: '5', image: '../assets/preview16.jpg' },
  { id: '6', image: '../assets/preview16.jpg' },  
];


const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 66,
    height: 58,
  },
  titleText: {
    fontSize: 30,
    fontFamily: 'Fraunces',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    padding: 5,
    
  },
  screen:{
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    alignItems: 'center',
    paddingTop: 0,
    borderRadius: 10,
    
  },
  image: {
    flex: 1,
    margin: 1,
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  
  },

  itemContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },


});

export default function Home(){
    return(
    
        <View>
        
        <Text style={styles.titleText}>
        Live View
        </Text>
        <Image style={styles.screen}
        source={require('../assets/food.png')}>
        </Image>
        
        <Text style={styles.titleText}>
        Items
        </Text>
        
        <FlatList
          data={data}
          renderItem={({ item }) => <GridItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
        

        <Text style={styles.titleText}>
        Spoiled
        </Text>

        <FlatList
          data={data}
          renderItem={({ item }) => <GridItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />  
        </View>
  
    )
}

const GridItem = ( item ) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={require('../assets/preview16.jpg')} style={styles.image} />  
    </View>
  );
};

const getItems = () => {
  return fetch('http://localhost:3000/api/items')
  .then((response) => response.json())
  .then((json) => {
    return json;
  })
  .catch((error) => {
    console.error(error);
  });
}
