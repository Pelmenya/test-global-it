
const store = getStore();
const { fromEvent, debounceTime, map, mergeMap } = rxjs;
const { ajax } = rxjs.ajax;



function main() {
    const inputSearchUsers = document.querySelector('.searchInput');
    const resUsers = document.querySelector('.cards');
    let usersHTML = '';

    const inputSerchUsers$ = fromEvent(inputSearchUsers, 'input');

    inputSerchUsers$.pipe(debounceTime(500)).subscribe(
        () => {
            usersHTML = '';
            resUsers.innerHTML = '';
            const projects$ = ajax.getJSON(`/users?term=${inputSearchUsers.value}`)
                .pipe(
                    mergeMap((res) => res),
                    map((item) => getCardTemplate(item)),
                );
            projects$.subscribe({
                next: (value) => {
                    usersHTML += value;
                    resUsers.innerHTML = usersHTML;
                },
                complete: () => {
                },
                error: (error) => console.log('Error!', error),
            });
        },
    );

}

main();