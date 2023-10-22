import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CustomButton = ({onPress, text, bgColor = 'blue', fgColor = 'white'}) => {
    const isBackgroundTransparent = bgColor === 'transparent';
    return (
        <TouchableOpacity
            onPress={onPress} 
            style={[
                styles.container,
                {backgroundColor: bgColor},
                (isBackgroundTransparent &&{
                    marginVertical: 0,
                    width: 'auto',
                    padding: 0,
                }),
            ]}>
            <Text
                style={[
                    {color: fgColor},
                    {fontWeight: isBackgroundTransparent ? 'normal' : 'bold'},
                ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
		alignItems: 'center',
		marginVertical: 5,
		padding: 12,
		borderRadius: 5,
    },
});
export default CustomButton