import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem'
//using redux store
import {useSelector} from 'react-redux'; 
const MealList = props => {
    //to set a default value for isFav we access the favoriteMeals of our reducer
    //doing data we avoid the useEffect delay which only renders after the component is rendered
    //we can use useSelecto on renderMealItem function cause we can only use hooks on the top level/root function
    const favoriteMeals=useSelector(state => state.meals.favoriteMeals)
    //function to render a single item on our flatlist
    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal=> meal.id === itemData.item.id)
        return (<MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
                props.navigation.navigate('MealDetail',
                    { mealId: itemData.item.id, mealTitle: itemData.item.title, isFav:isFavorite  })
            }} />)
    }
    //data will be get by our props
    return (
        <View style={styles.list}>
            <FlatList data={props.listData} renderItem={renderMealItem} style={{ width: '100%' }} />
        </View>);
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MealList;