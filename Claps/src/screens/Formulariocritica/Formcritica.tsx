import React,{ useState } from "react";

export const Formularios = () => {
    const [formulario, setFormulario] = useState({
        email: 'gmail@test.com',
        password: '12345'
    })
    return(
    <>
    <h3>Formularios</h3>
    <input
        type ='text'
        className='form-control mt-2 mb-2'
        placeholder='email'
        value={formulario.email}
    
    />
    </>
    )
}