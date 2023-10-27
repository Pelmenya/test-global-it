
function getPopup() {
    const popup = document.querySelector('.popup');
    const popupTitle = popup.querySelector('.popup__title');
    const userPhone = popup.querySelector('.popup__property-value_phone');
    const userEmail = popup.querySelector('.popup__property-value_email');
    const userData = popup.querySelector('.popup__property-value_data');
    const userProf = popup.querySelector('.popup__property-value_prof');
    const userGroup = popup.querySelector('.popup__property-value_group');
    
    
    const popupCloseBtn = popup.querySelector('.popup__close');

    const popupClose = () => popup.classList.remove('popup_is-opened');
    
    const popupOpen = (user) => {
        popupTitle.textContent = user.name
        userPhone.textContent = user.phone;
        userEmail.textContent = user.email;
        userData.textContent = user.hire_date;
        userProf.textContent = user.position_name;
        userGroup.textContent = user.department;
        popup.classList.add('popup_is-opened');
    };
    

    popupCloseBtn.addEventListener('click', popupClose)

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popupClose();
        }
    })

    popup.addEventListener('click', (e) => {
        if (e.target.classList.value === popup.classList.value) {
            popupClose();
        }
    })

    return { popup, popupOpen };
}