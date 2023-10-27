const getCardTemplate = (user) => `
    <div class="card">
        <h6 class="card__title">${user.name}</h6>
        <div class="d-flex align-items-center">
            <img src="/public/img/phone.svg">
            <p class="card__property">
                ${user.phone}
            </p>
        </div>
        <div class="d-flex align-items-center">
            <img src="/public/img/email.svg">
            <p class="card__property">
                ${user.email}
            </p>
        </div>
    </div>`
