import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
    //now we can use default with opening and closing tags and in between pass our text
    return ( <Text style={styles.text}>{props.children}</Text> );
}

const styles = StyleSheet.create({
    text:{
        fontFamily: 'open-sans-bold'
    }
});

export default DefaultText;