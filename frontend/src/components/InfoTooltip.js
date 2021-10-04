import React from 'react';
import successSignPath from '../images/infotooltip-success.svg';
import failSignPath from '../images/infotooltip-fail.svg';
import '../index.css';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={ props.handleClosePopup }>
            <div className="popup__container">
                <img className="popup__sign" 
                src={ props.isSuccess? successSignPath : failSignPath } 
                alt={ props.isSuccess? 'success' : 'fail'}/>
                <h3 className="popup__title popup__title_type_infotooltip">{ props.isSuccess? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }</h3>
                <button type="button" className="popup__close-btn" onClick={ props.onClose }></button>
            </div>
        </div>
    )
}

export default InfoTooltip;