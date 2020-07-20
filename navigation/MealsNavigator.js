//setting up configuration for navigation
/**using v4 or higher of react-navigation requires the instalation
* and imports of differents navigators*/
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
//alternative navigator for bottomTabNavigator
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//importing screens components
import CategoriesScreen from '../views/CategoriesScreen';
import CategoryMealsScreen from '../views/CategoryMealsScreen';
import MealDetailScreen from '../views/MealDetailScreen';
import FavoritesScreen from '../views/FavoritesScreen';
import Colors from '../constants/Colors';


//const that contains our default navigation options
const defaultStackNavOptions = {

    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor

}

//stack navigator "pilha"
//this takes at least one objetc a js object, the second argument will take care of the configuration
const MealsNavgiator = createStackNavigator({
    //here we define our key values. Categories is a property name, at it points at the component we want to show
    Categories: {
        screen: CategoriesScreen,
    },
    //doing in this way we can set another configurations
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: { screen: MealDetailScreen }
    //here we insert the secon argument, the defaultNavigationOptions applies its configuration to all screens
}, { defaultNavigationOptions: defaultStackNavOptions });
//this will be the stack for our favorites screen
const FavNavigator = createStackNavigator({
    Favorites: { screen: FavoritesScreen, navigationOptions: { headerStyle: { backgroundColor: Colors.secondaryColor } } },
    MealDetail: MealDetailScreen,

}, { defaultNavigationOptions: defaultStackNavOptions });

//this const contains the information of our tabNavigator
const tabScreenConfig = {
    //points to our stack navigator to be loaded as the Meals tab
    Meals: {
        screen: MealsNavgiator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />);
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />);
            },
            tabBarColor: Colors.secondaryColor
        }
    },
}

//creating our tab navigator at the bottom of the app

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.secondaryColor
        }
    })
/**we need to wrap our navigator with createAppContainer, so it will be the root navigator.
  *the MealsFavTabNavigator has the MealsNavigator nested inside of it so it will be loaded as well.*/
export default createAppContainer(MealsFavTabNavigator);