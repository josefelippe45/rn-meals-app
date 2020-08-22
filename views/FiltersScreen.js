//allow us to set filters like vegan or gluten-free or whatever...
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, Switch } from 'react-native';
import { useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import {setFilters} from '../store/actions/meals';

import Colors from '../constants/Colors';


//will manage the switch.
const FilterSwitch = props => {

    return (
        //managing the switch component, trackColor takes an object so it uses the {{}}
        <View style={styles.filterContainer}>
            <Text>{props.text}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange} />
        </View>);
}

const FiltersScreen = props => {
    /*syntax to use object destructuring. it'll help with useEffect. props is an object,
       and navigation key will store it in a brand new const with same name */
    const { navigation } = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    //using useDispatch
    const dispatch = useDispatch();
    //using useCallBack to certify that saveFilters only updates when our state changes
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
        };
        //fires a action from redux actions
        dispatch(setFilters(appliedFilters));
        //in the second argument we will specify all the dependencies that could change and would lead to recreate that function
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
    //will execute code whenever our state changes. useEffect is being used here cause saveFilters will be constant recreated
    //useEffect will only run when saveFilters gets a new value we determine it by using the second argument
    //the array of dependencies.
    useEffect(() => {
        //using setParams to update the params values for the currently loaded screen
        /*save is a key that will point at saveFilters 'note: it doesnt execute the function just point at it
        and forward the value'. So save, which is the object of setParams method, will get the values of saveFilters
        this allows us to get to navigationOptions*/
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);
    //handle that sets search
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch text="Gluten Free" state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch text="Lactose Free" state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch text="Vegan" state={isVegan}
                onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch text="Vegetarian" state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)} />

        </View>
    );
};


FiltersScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Filter Meal',
        headerLeft: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? "md-menu" : "ios-menu"} onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
        headerRight: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName={Platform.OS === 'android' ? "md-save" : "ios-save"}
                onPress={
                    ()=>{}
                } />
        </HeaderButtons>),
    };
}
styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    }
});

export default FiltersScreen;