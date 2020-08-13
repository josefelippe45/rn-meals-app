//loads the meals from a chosen category
import React from 'react';
//allows to select a slice of our state, global manage state, and use it in this component
import { useSelector } from 'react-redux'
//import our array of data
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props => {

    //getting access to the parameter we passed on navigate
    const catId = props.navigation.getParam('categoryId');

    //using useSelector that retrives data out of the state and the const will take the return of it
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    /**finding the meals that belong to the selected category. filter will 
    run a function on every meal on that array */
    const displayedMeals = availableMeals.filter(meals => meals.categoryIds.indexOf(catId) >= 0)
    if (displayedMeals.length === 0){
        return (
            <View style={styles.content}>
                <DefaultText>There are no meals for the filters you've selected</DefaultText>
            </View>
        )
    }
    //nested components doesn't get access to navigation props, in this case we foward these props manually
    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
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
const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        fontSize: 32
    }
});



export default CategoryMealsScreen;

/**navigation ia a property get by react navigation because we loaded
              * the CategoriesScreen Component with the help of our MealsNavigator component*/