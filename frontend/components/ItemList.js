
import { FlatList, Text, View } from "react-native";
import { Divider } from "react-native-elements";

export default function ItemList(props) {

    const { recipes } = props;

  return (
    <View>
      <FlatList
        
        showsVerticalScrollIndicator={false}
        data={recipes}
        ItemSeparatorComponent={() => <Divider width={2} style={{ backgroundColor: 'white'}}/>}
        renderItem={({item}) => (
            <View style={{ backgroundColor: 'white'}}>
          <View style={{ width: '100%', height: 300, paddingHorizontal: 15, paddingTop: 10 }}>
            <View style={{ width: '100%' , height: 150, borderRadius: 25, backgroundColor: '#D9D9D9'}}></View>
            <View  style={{paddingHorizontal: 10, paddingTop: 6}}>
            <Text style={{ fontFamily: 'Fraunces_400Regular', fontSize: 24, marginTop: 5}}>{item.title}</Text>
            <Text style={{fontFamily: 'Fraunces_400Regular', fontSize: 18}}>Ingredients:</Text>
            <Text style={{ width: '100%', height: '100%', fontFamily: 'Fraunces_400Regular', fontSize: 16}}>{item.ingredients}</Text>
            </View>
          </View>
           </View>
           
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}