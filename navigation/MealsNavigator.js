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
import { Platform, Text } from 'react-native';
import { Ionicons, Feather, MaterialIcons  } from '@expo/vector-icons';


//importing screens components
import CategoriesScreen from '../views/CategoriesScreen';
import CategoryMealsScreen from '../views/CategoryMealsScreen';
import MealDetailScreen from '../views/MealDetailScreen';
import FavoritesScreen from '../views/FavoritesScreen';
import FiltersScreen from '../views/FiltersScreen'
import Colors from '../constants/Colors';



//const that contains our default navigation options
const defaultStackNavOptions = {
    //only style the container itself
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    //more for ios
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
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
            tabBarColor: Colors.primaryColor,
            //changing the color on android
            tabBarLabel: Platform.OS === 'android'
                ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
                : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />);
            },
            tabBarColor: Colors.secondaryColor,
            tabBarLabel: Platform.OS === 'android'
                ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
                : 'Favorites'
        }
    },
}

//creating our tab navigator at the bottom of the app

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            //changing the font for IOS
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.secondaryColor
        }
    })
//this nav will works only to give a header to FiltersScreen
const FilterHead = createStackNavigator(
    {
        Filters: FiltersScreen,

    },
    {
        //OPTION 1 - navigationOptions to change the name only of the filtersscreen
        navigationOptions: { drawerLabel: 'Filters' },
        defaultNavigationOptions: defaultStackNavOptions
    })
const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator,
        //OPTION 2
        navigationOptions: {
            drawerLabel: 'Meals',
            drawerIcon: <MaterialIcons name="restaurant" size={25} color={Colors.secondaryColor} />
        }
    },
    Filters: {
        screen: FilterHead,
        //OPTION 2
        navigationOptions: {
            drawerLabel: 'Filters',
            drawerIcon: <Feather name="filter" size={25} color={Colors.secondaryColor} />
        }
    },
},
    //seconde argument to style the drawerNavigator
    {
        contentOptions: {
            activeTintColor: Colors.secondaryColor,
            labelStyle: {
                fontFamily: 'open-sans-bold',
                fontSize: 18
            },
        },
    }
);

/**we need to wrap our navigator with createAppContainer, so it will be the root navigator.
  *the MainNavigator has the MealsNavigator nested inside of it so it will be loaded as well.*/
export default createAppContainer(MainNavigator);