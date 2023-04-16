
import { FlatList, Text, View } from "react-native";
import { Divider } from "react-native-elements";

export default function ItemList(props) {

    const { recipes } = props;

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        renderItem={({item}) => (
            <View style={{ backgroundColor: 'white'}}>
          <View style={{ width: '100%', height: 300, paddingHorizontal: 6, paddingTop: 6 }}>
            <View style={{ width: '100%' , height: 150, backgroundColor: 'gray'}}></View>
            <View  style={{paddingHorizontal: 6, paddingTop: 6}}>
            <Text style={{ fontFamily: 'Fraunces', fontSize: 24, marginTop: 5}}>{item.title}</Text>
            <Text style={{fontFamily: 'Fraunces'}}>Ingredients:</Text>
            <Text style={{ width: '100%', height: '100%', fontFamily: 'Fraunces', fontSize: 16}}>{item.ingredients}</Text>
            </View>
          </View>
           <Divider width={1.8} style={{marginVertical: 20}}/>
           </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}