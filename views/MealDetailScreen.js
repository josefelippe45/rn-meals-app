//shows the details of a single meal inside of a chosen category
import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//import MEALS
import { MEALS } from '../data/dummy-data';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText'
//const to style our ingrendients + steps
const ListItem = props => {
    return (
        <View style={styles.text}>
            <DefaultText>{props.children}</DefaultText>
        </View>);
}
const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return (
        //{selectedMeal.ingredients.map() will map our ingredients into an array of components
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient =>
                (<ListItem key={ingredient}>{ingredient}</ListItem>)
            )}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step =>
                (<ListItem key={step} style={styles.text}>{step}</ListItem>)
            )}
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: selectedMeal.title,
        //adding our icon button for favorites
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Favorite' iconName='ios-star' onPress={() => {
                //debug
                console.log('works');
            }} />
        </HeaderButtons>
    };
}

styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 200
    },
    text: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10 
    }
});

export default MealDetailScreen;