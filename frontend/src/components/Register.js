
import React from 'react';
import { AuthForm } from './AuthForm';
import '../index.css';
import { Link } from 'react-router-dom';


export function Register(props) {
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
        props.onRegister(email, password);
    }

    return(
        <AuthForm 
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={email}
            password={password}
            title='Регистрация'
            name='login'
            submitBtnText='Зарегистрироваться'
        >
            <p className="auth__caption">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
        </AuthForm>
    ) 
}
