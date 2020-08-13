import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
//helps to provide the store const to the application
import { Provider } from 'react-redux';
//import for the fonts
import * as Font from 'expo-font';
//this component will prolong the splash screens. in this case we'll use it to prolong till the fonts are loaded
import { AppLoading } from 'expo';
//import navigator
import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

enableScreens();
//using combineReducers to merge all the reducers. In this case there's no need of it, but in apps
//that we have like an auth reducer, a products reducers and etc, it would be nice to use combineReducers
const rootReducers = combineReducers({
  //map single reducers to keys
  meals: mealsReducer
})
//setting up redux store
const store = createStore(rootReducers);
//here we'll load the fonts
//loadAsync returns a promise, this way we can use it with AppLoading component
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  //useSate will help us to manage our fonts 
  const [fontLoaded, setFontLoaded] = useState(false);
  //using if to check the font state
  if (!fontLoaded) {
    /**in this return we will load AppLoading component instead of our app component
     * because our font state isn't true already. The AppLoading will start fetching fonts with
     * fetchFonts function, once it's finished we set the state to true, this way we can continue
     * running our app.
     */
    return (
      <AppLoading startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    //wrap provider to load the store const
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
