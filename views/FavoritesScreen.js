//loads our favorites recepies and meals
import React from 'react';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import HeaderButton from '../components/HeaderButton'

const FavoritesScreen = props => {
    //using dummy-data to see some favorites
    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')
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


export default FavoritesScreen;