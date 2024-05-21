## Тестовое задание №1

* Сверстать по макету отчет. В отчете вывести список юзеров.
* На странице есть поиск по юзерам. При вводе в строке поиска список фильтруется. При клике по карточке выводить в pop-up дополнительную информацию по юзеру. При нажатии вне окна с информацией или крестик окно закрывается.
* Список юзеров получаем с бэкенда. Для этого нужно установить и запустить локально сервер. Ссылка будет такой http://127.0.0.1:3000. Для получения всего списка отправляем запрос без параметров, для получения совпадений ФИО со строкой ввода добавляем параметры query (term), например http://127.0.0.1:3000?term=fer
* [Ссылка на макет](https://www.figma.com/file/sVohAvXP1UpHzN3MMLwmkB/%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0-30080?node-id=0%3A1&t=kenPBeTH1t4zLitJ-0)
* [Ссылка на архив в бэкендом](https://drive.google.com/file/d/1bRxaW02JMJA1Z4CBWLv_-j6UzeHSrzJ_/view?usp=sharing)

## Решение


**Установка**

Для установки необходимо наличие Node.js и npm или Docker

Сохраните проект у себя на компьютере:
```
git clone `https://github.com/Pelmenya/test-global-it.git`
```
В корне проекта через консоль/терминал запустите команду:
```
npm install
```

### После успешной установки станут доступны команды

Запуск локального сервера в режиме разработки:  
```
npm run dev
```
Запуск проекта:
```
npm run start
```

Приложение будет доступно на 
```
http://localhost:3000
```

Если установлен Docker в корне проекта в терминале выполните команду
```
docker compose -f docker-compose.yml up --build
```
Приложение будет доступно на 
```
http://localhost
```





## Тестовое задание №2

Написать T-SQL запрос.
Для отладки запроса необходимо скачать SQL Server, а также SSMS.
Базу данных с тестовыми таблицами скачать и экспортировать в SSMS (необходима версия не ниже 2022 г. 19.1)

В БД есть две таблицы:
collaborators - таблица сотрудников. Поля: id, name (имя сотрудника), subdivision_id (id подразделения сотрудника), age (возраст).
subdivisions - таблица подразделений. Поля: id, name, parent_id (id родительского подразделения)

Необходимо получить сотрудников всех нижестоящих подразделений от подразделения сотрудника “Сотрудник 1” с id 710253 у которых возраст менее 40 лет и длина имени более 11 символов. Также в результирующей таблице не должно оказаться подразделений с id 100055 и 100059. Отсортировать по возрастанию уровня вложенности подразделения.

В результирующем наборе должны быть следующие поля:
id - id сотрудника
name - Имя сотрудника
sub_name - Наименование подразделения
sub_id - id подразделения
sub_level - Уровень вложенности подразделения относительно самого верхнего
colls_count - Общее количество сотрудников в подразделении сотрудника (включая самого сотрудника).

Показать сам запрос (приложить файл в формате .sql), результирующую таблицу и время выполнения запроса.

```
/*
CREATE OR ALTER VIEW all_data AS 
	SELECT
		c.id,
		c.name user_name,
		c.age age,
		s.id subdivision_id,
		parent_id,
		s.name sub_name
	FROM collaborators c
	JOIN subdivisions s ON s.id = c.subdivision_id;
*/

WITH prod AS (
    SELECT id, 
        parent_id, 
		subdivision_id,
		user_name,
		age,
		1 
        AS level, 
        sub_name
    FROM all_data 
    WHERE id = 710253
    UNION ALL
        SELECT 
            pr.id, 
            pr.parent_id, 
			pr.subdivision_id,
			pr.user_name,
			pr.age,
            level + 1, 
            pr.sub_name
    FROM all_data pr 
    JOIN prod dev ON 
		dev.subdivision_id = pr.parent_id 
		AND pr.subdivision_id NOT IN (100055,100059)
		AND pr.age < 40
)
SELECT 
	DISTINCT id, 
	user_name name, 
	sub_name, 
	subdivision_id sub_id, 
	level sub_level,
	COUNT(*) OVER() colls_count
FROM prod
GROUP BY 
	id, 
	user_name, 
	sub_name, 
	subdivision_id, 
	level
ORDER BY level;

```
![myimage-alt-tag](/время_таблица.jpg)

### [SQL-script](/test2.sql)
