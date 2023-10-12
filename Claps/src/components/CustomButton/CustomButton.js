import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CustomButton = ({onPress, text, bgColor = 'blue', fgColor = 'white'}) => {
    return (
        <TouchableOpacity
            onPress={onPress} 
            style={[
                styles.container,
                {backgroundColor: bgColor},
            ]}>
            <Text
                style={[
                    styles.text,
                    {color: fgColor},
                ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: "70%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },

    text:{
        color: 'black',
        fontWeight: 'bold',
    },

});
export default CustomButton