import React from 'react';
import PopupWithForm from './PopupWithForm';
import '../index.css';

function AddPlacePopup(props) {
    const [ title, setTitle ] = React.useState('');
    const [ link, setLink ] = React.useState('');

    React.useEffect(() => {
        if (props.isOpen){
            setTitle('');
            setLink('');
        }
    }, [props.isOpen])

    function handleChangeTitle(e){
        setTitle(e.target.value);
    }

    function handleChangeLink(e){
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onAddPlace({ title, link });

    }

    return (
        <PopupWithForm title="Новое место" 
                    name="card" submitBtnText="Создать" 
                    isOpen={ props.isOpen } 
                    onClose={ props.onClose }
                    onSubmit = { handleSubmit }
                    handleClosePopup = { props.handleClosePopup }>
                    <ul className="popup__list-fields">
                        <li className="popup__list-item">
                            <input onChange={ handleChangeTitle } className="popup__input" id="title" name="title" 
                                    placeholder="Название" type="text" minLength="2" 
                                    maxLength="30" value={ title } required/>
                            <span className="popup__error title-input-error"></span>
                        </li>
                        <li className="popup__list-item">
                            <input onChange={ handleChangeLink } className="popup__input" id="linkPicture" name="linkPicture" 
                                    placeholder="Ссылка на картинку" type="url" value={ link } required/>
                            <span className="popup__error linkPicture-input-error"></span>
                        </li>
                    </ul>
        </PopupWithForm>
    )
}

export default AddPlacePopup;