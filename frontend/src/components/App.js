import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import api from '../utils/api';
import { checkToken, authorize, register } from '../utils/auth.js';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {

  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState();
  const [ cards, setCards ] = React.useState([]);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState(false);
  const [ isInfoTooltipSuccess, setIsInfoTooltipSuccess ] = React.useState(false);
  const [ userEmail, setUserEmail ] = React.useState('');
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    handleTokenCheck();
    setInitialData();
  }, [])

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

  function setInitialData(){
    api.getAllInitialData().then(
      ([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      }).catch(err => console.log(err))
  }

  function signOut(){
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in');
  }

  function handleLogin(email, password){
    authorize(email, password)
      .then(() => {
        console.log('im here')
        setUserEmail(email);
        setIsLoggedIn(true);
        setInitialData();
        history.push('/');
      })
      .catch(err => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err)
      })
  }

  function handleRegister(email, password){

    register(email, password).then((res) => {
        console.log(res);
        if(res){
          setIsInfoTooltipSuccess(true);
          history.push('/sign-in');
        } else {
          setIsInfoTooltipSuccess(false);
        }
      })
      .catch(err => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      }
        )
      .finally(()=>{
        setIsInfoTooltipOpen(true);
      })
  }

  function handleTokenCheck(){
    checkToken()
    .then((data) => {
      setUserEmail(data.email);
      setIsLoggedIn(true);
    })
    .catch(err => console.log(err)) // сюда придет 401 если пользователь неавторизован
    .finally(()=>{
      history.push(location.pathname);
    })
  }

  function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err => console.log(err));
  } 

  function handleCardDelete(card) {
      api.removeCardApi(card._id).then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
      }).catch(err => console.log(err));
  }

  function handleClosePopup(evt){
    if (evt.target.classList.contains('popup_opened')||evt.target.classList.contains('popup__close-btn')) {
      closeAllPopups();
    };
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard();
  }

  function handleUpdateUser({ name, about }){
    api.setInfoAboutMe({ name, about }).then((userData)=>{
      setCurrentUser(userData);
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }){
    api.addAvatarToApi(avatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({ title, link }){
    api.addNewCardApi({ title, link }).then((newCard)=>{
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header email={ userEmail } isLoggedIn={ isLoggedIn } 
          onSignOut={ signOut }/>
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={ handleLogin }/>
            </Route>
            <Route path="/sign-up">
              <Register onRegister={ handleRegister }/>
            </Route>
            <ProtectedRoute path="/" isLoggedIn={ isLoggedIn }>
              <Main onEditProfile= { handleEditProfileClick } 
                    onAddPlace = { handleAddPlaceClick }
                    onEditAvatar = { handleEditAvatarClick }
                    onCardClick = { handleCardClick }
                    setCards = { setCards }
                    cards = { cards }
                    onCardLike = { handleCardLike }
                    onCardDelete = { handleCardDelete }
              />
              <Footer />
            </ProtectedRoute>
          </Switch>
          
          
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } 
                            onClose={ closeAllPopups } 
                            handleClosePopup={ handleClosePopup }
                            onUpdateUser = { handleUpdateUser }/>
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen }
                          onClose={ closeAllPopups }
                          handleClosePopup={ handleClosePopup }
                          onUpdateAvatar = { handleUpdateAvatar }
                          />
          <AddPlacePopup isOpen={ isAddPlacePopupOpen }
                          onClose={ closeAllPopups }
                          handleClosePopup={ handleClosePopup }
                          onAddPlace = { handleAddPlaceSubmit }
                          />

          <InfoTooltip isOpen={ isInfoTooltipOpen }
                        isSuccess={ isInfoTooltipSuccess }
                        onClose={ closeAllPopups }
                        handleClosePopup={ handleClosePopup }
          />

          <PopupWithForm title="Вы уверены?" 
                          name="delete" 
                          submitBtnText="Да" 
                          onClose={ closeAllPopups }
                          handleClosePopup = { handleClosePopup }/>
          <ImagePopup card={ selectedCard } 
                      onClose={ closeAllPopups }
                      handleClosePopup = { handleClosePopup }/>
        </div>

        
        
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
