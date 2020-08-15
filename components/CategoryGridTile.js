import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, ImageBackground } from 'react-native';

const CategoryGridTile = props => {
    //building a component to get a little bit of responsive design
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    //passing params with navigate we are forwarding the categoryId to the next screen
    //when onPress onSelect, defined on CategoriesScreen, will  trigger
    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
                <ImageBackground
                    source={{ uri: props.bg }}
                    style={styles.bgImage}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={2}>
                            {props.title}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableCmp>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible',
        elevation: 8,
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        alignItems: 'flex-end',
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    //shadow properties are for iOS while elevation is for android
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,

        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'right'
    }
});

export default CategoryGridTile;