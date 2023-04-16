
import { View, Text, TouchableOpacity} from 'react-native';

export default function FilterButton(props){


    return (
    <View style={{ justifyContent: 'center', flexDirection: 'row', height: 40}}>
        <TouchableOpacity onPress={() => {
    
            props.getRecipes()

        }} 
        style={{ width: 100, height: 30, backgroundColor: props.explore ? 'black' : 'white', borderRadius: 50, }}>
        <Text style={{ color: props.explore ? 'white' : 'black', alignSelf: 'center', paddingVertical: 6, fontFamily: 'Fraunces'}}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {


            props.filterRecipes()
            
            }}
        style={{ width: 100, height: 30, backgroundColor: props.explore ? 'white' : 'black', borderRadius: 50}}>
        <Text style={{ color: props.explore ? 'black' : 'white', alignSelf: 'center', paddingVertical: 6, fontFamily: 'Fraunces'}}>In Fridge</Text>
        </TouchableOpacity>
</View>)
}