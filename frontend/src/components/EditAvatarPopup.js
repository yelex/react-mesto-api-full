import React from 'react';
import PopupWithForm from './PopupWithForm';
import '../index.css';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm title="Обновить аватар" 
            name="avatar" 
            submitBtnText="Сохранить"
            isOpen={ props.isOpen } 
            onClose={ props.onClose }
            handleClosePopup = { props.handleClosePopup }
            onSubmit={ handleSubmit }>
            <ul className="popup__list-fields">
                <li className="popup__list-item">
                    <input className="popup__input" ref={ avatarRef } id="linkAvatar" 
                    name="linkAvatar" placeholder="Ссылка на картинку" 
                    type="url" required/>
                    <span className="popup__error linkAvatar-input-error"></span>
                </li>
            </ul>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;