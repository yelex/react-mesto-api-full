import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          about: description,
        });
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (currentUser.name){
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]); 

    return (
        <PopupWithForm title="Редактировать профиль" 
            name="profile" 
            submitBtnText="Сохранить" 
            isOpen={ props.isOpen } 
            onClose={ props.onClose }
            handleClosePopup = { props.handleClosePopup }
            onSubmit = { handleSubmit }>
            <ul className="popup__list-fields">
                <li className="popup__list-item">
                    <input onChange={ handleChangeName } value={ name } 
                    className="popup__input" id="name" name="name" type="text" 
                        placeholder="Имя" minLength="2" maxLength="40" required/>
                    <span className="popup__error name-input-error"></span>
                </li>
                <li className="popup__list-item">
                    <input onChange={ handleChangeDescription } value={ description } 
                    className="popup__input" id="job" name="job" type="text" 
                    placeholder="Работа" minLength="2" maxLength="200" required/>
                    <span className="popup__error job-input-error"></span>
                </li>
            </ul>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
