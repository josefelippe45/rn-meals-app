//loads our favorites recepies and meals
import React from 'react';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform, View, StyleSheet } from 'react-native';

import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
const FavoritesScreen = props => {
    //creating a const to use redux
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    //checking if there is some favorite
    if (favMeals.length === 0 || !favMeals) {
        return (
        <View style={styles.content}>
            <DefaultText>No favorites meals found. Start adding some!</DefaultText>
        </View>
        )
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    );
}

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favorites!',
        headerLeft: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? "md-menu" : "ios-menu"} onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        fontSize: 32
    }
});

export default FavoritesScreen;