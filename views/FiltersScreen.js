//allow us to set filters like vegan or gluten-free or whatever...
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'

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

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

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
            <Item title="Save" iconName={Platform.OS === 'android' ? "md-save" : "ios-save"} onPress={() => {
                //debug
                console.log('Saving')
            }} />
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