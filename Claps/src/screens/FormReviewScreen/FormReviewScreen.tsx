import React,{ useState } from "react";
import { View, Text, TextInput } from 'react-native';

const Formularios = () => {
    const [formulario, setFormulario] = useState({
        email: 'gmail@test.com',
        password: '12345'
    });

    return(
    <View>
        <Text>Formularios</Text>
        <TextInput
            style = {{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='email'
            value={formulario.email}
        />
    </View>
    );
}

