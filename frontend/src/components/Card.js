import React from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
    
function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__trash-ico${isOwn ? '' : ' card__trash-ico_hidden'}`
        );
        
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__heart-ico${isLiked ? ' card__heart-ico_active' : ''}`
        ); 

    function handleLikeClick(){
        props.onLikeClick(props.card)
    }

    function handleDeleteClick(){
        props.onDeleteClick(props.card)
    }

    function handleClick(){
        props.onCardClick(props.card)
    }

    return (
        <li className="card" >
            <img className="card__image" alt={ props.card.name } src={ props.card.link } onClick={ handleClick }/>
            <div className="card__text-container">
            <h3 className="card__title">{ props.card.name }</h3>
            <div className="card__heart-container">
                <button type="button" className={ cardLikeButtonClassName } onClick={ handleLikeClick }></button>
                <p className="card__heart-counter">{ props.card.likes.length }</p>
            </div>
            </div>
            <button type="button" className={ cardDeleteButtonClassName } onClick={ handleDeleteClick }></button>
        </li>
    )
}

export default Card;