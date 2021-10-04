import React from 'react';
import '../index.css';

function ImagePopup(props) {

    return (
        <div className={`popup popup_image ${props.card ? 'popup_opened' : ''}`} onClick={ props.handleClosePopup }>
            <div className="popup__container-image">
                <figure className="popup__figure">
                    <img className="popup__image" alt={props.card ? props.card.name : ''} src={props.card ? props.card.link : ''} />
                    <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
                </figure>
                <button type="button" className="popup__close-btn" onClick={ props.onClose }></button>
            </div>
        </div>
    )
}

export default ImagePopup;