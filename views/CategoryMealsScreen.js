//loads the meals from a chosen category
import React from 'react';

//import our array of data
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
    
    //getting access to the parameter we passed on navigate
    const catId = props.navigation.getParam('categoryId');
    /**finding the meals that belong to the selected category filter will 
    run a function on every meal on that array */
    const displayedMeals = MEALS.filter(meals => meals.categoryIds.indexOf(catId) >= 0)
    //nested components doesn't get access to navigation props, in this case we foward these props manually
    return (
        <MealList listData={displayedMeals} navigation={props.navigation}/>
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




export default CategoryMealsScreen;

/**navigation ia a property get by react navigation because we loaded
              * the CategoriesScreen Component with the help of our MealsNavigator component*/