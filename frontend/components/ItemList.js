
import { FlatList, Text, View, Image} from "react-native";
import { Divider } from "react-native-elements";

export default function ItemList(props) {

    const { recipes } = props;

  return (
    <View style={{ height: '90%'}}>
      <FlatList

        showsVerticalScrollIndicator={false}
        data={recipes}
        ItemSeparatorComponent={() => <Divider width={2} style={{ backgroundColor: 'white'}}/>}
        renderItem={({item}) => (
            <View style={{ backgroundColor: 'white'}}>
          <View style={{ width: '100%', height: 300, paddingHorizontal: 15, paddingTop: 10 }}>
            <Image style={{ width: '100%' , height: 150, borderRadius: 25, resizeMode: 'cover'}} source={{ uri: item.image_url}} />
            <View  style={{paddingHorizontal: 10, paddingTop: 6}}>
            <Text style={{ fontFamily: 'Fraunces_700Bold', fontSize: 24, marginTop: 5}}>{item.title}</Text>
            <Text style={{fontFamily: 'Fraunces_400Regular', fontSize: 20}}>Ingredients:</Text>
            <Text style={{ width: '100%', height: '100%', fontFamily: 'Fraunces_400Regular', fontSize: 16}}>{item.ingredients.join(', ')}</Text>
            </View>
          </View>
           </View>
           
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}