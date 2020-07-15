//loads the meals from a chosen category
import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
//import our array of data
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';

const CategoryMealsScreen = props => {
    //getting access to the parameter we passed on navigate
    const catId = props.navigation.getParam('categoryId');
    //finding our selected category
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return (
        <View style={styles.screen}>
            <Text>Category Meals Screen</Text><Text>{selectedCategory.title}</Text>

            <Button title="Go to Meals Detail!" onPress={() => {
                /**navigation ia a property get by react navigation because we loaded
                 * the CategoriesScreen Component with the help of our MealsNavigator component*/
                props.navigation.navigate('MealDetail')
            }} />
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