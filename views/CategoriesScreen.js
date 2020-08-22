//here we select the categories in our app like: asian, italian and etc...
import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { FlatList, TextInput, RectButton } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
//import data
import { CATEGORIES, MEALS } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors';

//the props means that this component will take or receive props within a function
const CategoriesScreens = props => {
    const { navigation } = props;
    //search state
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    //searched meal state
    const [meal, setMeal] = useState('');
    //handle that sets search
    const handleSearchVisible = () => {
        setIsSearchVisible(!isSearchVisible)
    }
    //handle submit search
    const handleSearchSubmit = ()=>{
        
    }
    useEffect(() => {
        navigation.setParams({ search: handleSearchVisible });
    }, [isSearchVisible]);

    /*const used to render our items on the flatlist. it takes the item from CATEGORIES, 
     *wich has been shaped at models/category.js */

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                bg={itemData.item.bg}
                onSelect={() => {
                    props.navigation.navigate('CategoryMeals',
                        { categoryId: itemData.item.id })
                }} />);
    }
    return (
        <View>
            {isSearchVisible && <View style={styles.searchForm}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.label}>Meal</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '80%' }}>
                        <TextInput
                            style={styles.input}
                            value={meal}
                            onChangeText={text => setMeal(text)}
                            placeholder="Meal"
                            placeholderTextColor='#c1bccc'
                        />
                    </View>
                </View>
                <RectButton style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Search</Text>

                </RectButton>
            </View>

            }
            <FlatList data={CATEGORIES}
                renderItem={renderGridItem}
                numColumns={2} />

        </View>
    );
}

//creating property to our component CategoriesScreen
//using a function to get access to navigation props
CategoriesScreens.navigationOptions = navData => {
    const searchItem = navData.navigation.getParam('search')
    return {
        headerTitle: 'Meals Categories',
        //adding the icon to the drawer navigation
        headerLeft: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
        headerRight: (() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Search" iconName={Platform.OS === 'android' ? "md-search" : "ios-search"} onPress={searchItem} />
        </HeaderButtons>),
    };
}
//when we define flex: 1 the component will take all the available space that it can get
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchForm: {
        backgroundColor: Colors.primaryColor,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
    },
    label: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 20,
    },
    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: Colors.primaryColor,
        height: 56,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',

    },
    submitButtonText: {
        color: '#FFF',
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        marginLeft: 16
    },

});

export default CategoriesScreens;