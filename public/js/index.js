
let { store } = getStore();
const { fromEvent, debounceTime, map, mergeMap } = rxjs;
const { ajax } = rxjs.ajax;

function main() {
    const inputSearchUsers = document.querySelector('.searchInput');
    const resUsers = document.querySelector('.cards');
    const popup = document.querySelector('.popup');

    let usersHTML = '';

    const getUsers = (path) => {
        usersHTML = '';
        resUsers.innerHTML = '';
        store = [];
        const users$ = ajax.getJSON(path)
            .pipe(
                mergeMap((res) => res),
                map((item) => {
                    store.push(item);
                    return getCardTemplate(item);
                }),
            );
        users$.subscribe({
            next: (value) => {
                usersHTML += value;
                resUsers.innerHTML = usersHTML;
            },
            complete: () => {
                console.log(store)
                const usersCards = [...document.querySelectorAll('.card')];
                usersCards.forEach(card => card.addEventListener('click', (e) => {
                    console.log(e.target.id);
                })) 
            },
            error: (error) => console.log('Error!', error),
        });
    }

    const inputSerchUsers$ = fromEvent(inputSearchUsers, 'input');
    // инициализация
    getUsers('/users');
    // поиск
    inputSerchUsers$.pipe(debounceTime(500)).subscribe(
        () => getUsers(`/users?term=${inputSearchUsers.value}`)
    );

}

main();