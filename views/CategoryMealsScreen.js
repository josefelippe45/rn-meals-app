//loads the meals from a chosen category
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
//import our array of data
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealsScreen = props => {
    //function to render a single item on our flatlist
    const renderMealItem = itemData => {
        return (<MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => { props.navigation.navigate('MealDetail',
            { mealId: itemData.item.id }) }} />)
    }
    //getting access to the parameter we passed on navigate
    const catId = props.navigation.getParam('categoryId');
    /**finding the meals that belong to the selected category filter will 
    run a function on every meal on that array */
    const displayedMeals = MEALS.filter(meals => meals.categoryIds.indexOf(catId) >= 0)

    return (
        /*the data that we wanna show is the displayedMeals
         * renderItem points to a function where we render a single item of the list
        */
        <View style={styles.screen}>
            <FlatList data={displayedMeals} renderItem={renderMealItem} style={{ width: '100%' }} />
        </View>
    );
}
//adding dynamic navigationOptions
CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};


styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CategoryMealsScreen;

/**navigation ia a property get by react navigation because we loaded
              * the CategoriesScreen Component with the help of our MealsNavigator component*/