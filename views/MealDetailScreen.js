//shows the details of a single meal inside of a chosen category
import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';
//const to style our ingrendients + steps
const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    //get all favoriteMeals to check if the current meal is a favorite and change the icon
    //some is a build in method that can return true if at least one item is true on the array
    //and it checks for every meal if the meal id is equal to the mealId we get
    const currentMealIsFav = useSelector(state =>state.meals.favoriteMeals.some(meal=> meal.id === mealId))

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        //here we forward the action that we want to dispatch
        dispatch(toggleFavorite(mealId /**or selectedMeal.id */));
    }, [dispatch, mealId]);
    //using params to get access and forward the selectedMeal that is favorited and use it in navigationOptions
    //note: everything you set with setParams will be merged with existing params but not overwrite them
    //you only overwrite it if it already exits
    //set this params to my header when the component renders

    useEffect(() => {
        // props.navigation.setParams({ mealTitle: selectedMeal.title });
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);
    //using useEffect to set the params so we can use those params in the navigationOptions
    useEffect(()=>{
        props.navigation.setParams({isFav: currentMealIsFav});
        //we currentMealIsFav change it will forward the information to setParams
    }, [currentMealIsFav])
    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    //retrieving information we get with setParams
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: mealTitle,
        //adding our icon button for favorites
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Favorite"
                    iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;
