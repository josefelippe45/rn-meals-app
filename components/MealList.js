import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem'

const MealList = props => {
    //function to render a single item on our flatlist
    const renderMealItem = itemData => {
        return (<MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
                props.navigation.navigate('MealDetail',
                    { mealId: itemData.item.id })
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