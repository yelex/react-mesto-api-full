import React from 'react';
import '../index.css';

export function AuthForm(props) {

    return (
        <div className='auth'>
            <form name={`${props.name}Form`} action="#" 
            className="auth__container" 
            onSubmit={ props.onSubmit }
            >
                <h3 className="auth__title">{ props.title }</h3>
                <fieldset className="auth__fieldset">
                    <ul className="auth__list-fields">
                        <li className="auth__list-item">
                            <input onChange={ props.onChange } value={ props.email } 
                            className="auth__input" 
                            id="email" name="email" type="email" 
                            placeholder="Email" minLength="2" 
                            maxLength="40" required/>
                            <span className="auth__error email-input-error"></span>
                        </li>
                        <li className="auth__list-item">
                            <input onChange={ props.onChange } value={ props.password } 
                            className="auth__input" id="password" name="password" type="password" 
                            placeholder="Пароль" minLength="2" maxLength="200" required/>
                            <span className="auth__error password-input-error"></span>
                        </li>
                    </ul>
                    <button type="submit" className="auth__submit-btn">{ props.submitBtnText }</button>
                    { props.children }
                </fieldset>
            </form>
        </div>
    )
}