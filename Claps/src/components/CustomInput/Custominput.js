import React from "react";
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
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
        minWidth: "70%",
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        margin: 5,
    },
    input:{
        color: 'white',
        textAlign: 'center',
        opacity: 0.5,
    },

});
export default CustomInput;