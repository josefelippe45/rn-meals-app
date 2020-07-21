import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import DefaultText from './DefaultText';
const MealItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    //the first view will act as a column and the other two nested will be rows
    return (
        <View style={{ padding: 12 }}>
            <View style={styles.mealItem}>
                <TouchableCmp onPress={props.onSelectMeal}>
                    <View>
                        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                            <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                            <DefaultText>{props.duration}m</DefaultText>
                            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
       
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});

export default MealItem;