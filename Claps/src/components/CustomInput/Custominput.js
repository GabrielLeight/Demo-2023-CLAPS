import React from "react";
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry, bgColor}) => {
    return (
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value = {value}
                onChangeText = {setValue}
                secureTextEntry = {secureTextEntry}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(237, 106, 48, 0.111)',
        minWidth: "70%",
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        margin: 5,
    },
    input:{
        color: 'rgb(169, 27, 13)',
        textAlign: 'center',
    },

});
export default CustomInput;