import React from 'react';
import Card from './Card';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container" onClick={ props.onEditAvatar }>
                    <img src={ currentUser.avatar } alt={ currentUser.name } className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{ currentUser.name ? currentUser.name : 'wait...' }</h1>
                    <button type="button" className="profile__edit-button" onClick={ props.onEditProfile }></button>
                    <p className="profile__job">{ currentUser.about ? currentUser.about : 'wait...' }</p>
                </div>
                <button type="button" className="profile__add-button" onClick={ props.onAddPlace }></button>
            </section>

            <section className="cards">
                <ul className="cards__list">
                    { props.cards.map(card => {
                        console.log(card);

                        return (
                                <Card key={card._id} card={ card } 
                                onCardClick={ props.onCardClick }
                                onLikeClick={ props.onCardLike }
                                onDeleteClick={ props.onCardDelete }/>
                                )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main;