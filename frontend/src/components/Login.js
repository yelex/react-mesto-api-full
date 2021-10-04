import React from 'react';
import { AuthForm } from './AuthForm';
import '../index.css';

export function Login(props) {
    
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    function handleChange(e){
        const { name, value } = e.target;
        if (name === 'email'){
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onLogin(email, password, cleanState)
    }

    function cleanState(){
        setEmail('');
        setPassword('');
    }

    return(
        <AuthForm 
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={email}
            password={password}
            title='Вход'
            name='login'
            submitBtnText='Войти'
        >
        </AuthForm>
    ) 
}