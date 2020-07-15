//allow us to set filters like vegan or gluten-free or whatever...
import React  from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FiltersScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>Filters Screen</Text>
        </View>
    );
};

styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FiltersScreen;