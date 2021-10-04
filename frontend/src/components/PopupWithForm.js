import React from 'react';
import '../index.css';

function PopupWithForm(props) {
    
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={ props.handleClosePopup }>
            <form name={`${props.name}Form`} action="#" className="popup__container" onSubmit={ props.onSubmit }>
                <h3 className="popup__title popup__title_type_form">{ props.title }</h3>
                <fieldset className="popup__fieldset">
                    { props.children }
                    <button type="submit" className="popup__submit-btn">{ props.submitBtnText }</button>
                    <button type="button" className="popup__close-btn" onClick={ props.onClose }></button>
                </fieldset>
            </form>
        </div>
    )
}

export default PopupWithForm;