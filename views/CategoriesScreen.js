//here we select the categories in our app like: asian, italian and etc...
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
//import data
import { CATEGORIES } from '../data/dummy-data';

import CategoryGridTile from '../components/CategoryGridTile';
import Colors from '../constants/Colors';

//the props means that this component will take or receive props within a function
const CategoriesScreens = props => {
    /*const used to render our items on the flatlist. it takes the item from CATEGORIES, 
     *wich has been shaped at models/category.js */
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate('CategoryMeals',
                        { categoryId: itemData.item.id })
                }} />);
    }
    return (
        <FlatList data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2} />
    );
}

//creating property to our component CategoriesScreen
CategoriesScreens.navigationOptions = {
    headerTitle: 'Meals Categories',
}
//when we define flex: 1 the component will take all the available space that it can get
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default CategoriesScreens;