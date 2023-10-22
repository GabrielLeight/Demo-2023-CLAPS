import React from "react";
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry, bgColor, minWidth}) => {
    return (
        <View style={[styles.container, {backgroundColor: bgColor, minWidth: minWidth}]}>
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
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
    },
    input:{
        color: 'black',
        textAlign: 'center',
    },

});
export {styles}
export default CustomInput;