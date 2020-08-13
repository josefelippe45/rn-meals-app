//menage meals reducer states update logic.
//marking a meal as favorite
//applying filters

import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';
const initialState = {
    //store a list of meals, a list of filtered meals and a list of favorite meals
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
}

const mealsReducer = (state = initialState, action) => {
    //switch action type
    switch(action.type) {
        case TOGGLE_FAVORITE:
            /**running the function on every meal of the array and if it returns true
             * so the meal the user is trying to favorite is already favorited, so it's removed
            */
            const existingIndex = state.favoriteMeals.findIndex(meal=> meal.id === action.mealId)
            //if it's greater or equal than 0 it's already a meal favorite
            if (existingIndex >= 0){
                //populate it with existing meals
                const updatedFavMeals = [...state.favoriteMeals];
                //remove the item and only that ite,
                updatedFavMeals.splice(existingIndex, 1)
                //remove it. uses the spread operator to copy the existing state so it doesnt lose or overwrite any state
                //but it only overwrite the favoriteMeals with a new one that is the old without the index we just found
                return {...state, favoriteMeals: updatedFavMeals };
            } else{
                //merge the existing state and overwrite favoriteMeals with the old favoriteMeals and concat it
                //with the new item, const meal, it uses the find method
                const meal = state.meals.find(meal=> meal.id === action.mealId)
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}

            }
            case SET_FILTERS:
                const appliedFilters = action.filters;
                //set new filteredMeals based on the total meals and then filter it
                //the filter will return a new array and it will keep all items for what the function returns true
                //and drop if it returns false
                const updatedFilteredMeals = state.meals.filter(meal => {
                    //this condition drops the meals that isn't gluten free
                    if(appliedFilters.glutenFree && !meal.isGlutenFree){
                        return false;
                    }
                    if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                        return false;
                    }
                    if(appliedFilters.vegetarian && !meal.isVegetarian){
                        return false;
                    }
                    if(appliedFilters.vegan && !meal.isVegan){
                        return false;
                    }
                    return true;
                });
                //returning a nwe state. that merges the existing state and
                // overwrite the filteredMeals with the updatedFilteredMeals we've just set
                return {...state, filteredMeals: updatedFilteredMeals}
        default:
            return state;
    }
}

export default mealsReducer;