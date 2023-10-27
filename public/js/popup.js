function getPopup() {
    const popup = document.querySelector('.popup');
    const popupCloseBtn = popup.querySelector('.popup__close');

    popupCloseBtn.addEventListener('click', () => {
        popup.classList.remove('popup_is-opened');
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popup.classList.remove('popup_is-opened');
        }
    })

    popup.addEventListener('click', (e) => {
        if (e.target.classList.value === popup.classList.value) {
            popup.classList.remove('popup_is-opened');
        }
    })

    return { popup };
}