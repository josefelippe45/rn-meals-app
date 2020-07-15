//loads our favorites recepies and meals
import React  from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>Favorites Screen</Text>
        </View>
    );
}

styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FavoritesScreen;