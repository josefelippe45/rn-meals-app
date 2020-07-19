//setting up configuration for navigation
/**using v4 or higher of react-navigation requires the instalation
* and imports of differents navigators*/
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

//importing screens components
import CategoriesScreen from '../views/CategoriesScreen';
import CategoryMealsScreen from '../views/CategoryMealsScreen';
import MealDetailScreen from '../views/MealDetailScreen';
import Colors from '../constants/Colors';
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
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
});

//we need to wrap our navigator with createAppContainer
export default createAppContainer(MealsNavgiator);