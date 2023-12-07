# Бэкенд Диплома Movies Explorer API

## Описание проекта
Репозиторий для дипломной работы Movies Explorer, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями.

## Функционал:
- Роуты для пользователей:
  - GET /users/me — возвращает информацию о пользователе;
  - PATCH /users/me — обновляет информацию о пользователе.

- Роуты для фильмов:
  - GET /movies — возвращает все фильмы из базы;
  - POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN;
  - DELETE /movies/:movieId — удаляет фильм по _id.

## Стек технологий:
- JavaScript:
  - Промисы (Promise);
  - Асинхронность и оптимизация;
  - Rest API;
- Node.js;
- Express;
- MongoDB;

## Директории
* `/controllers` – содержит файлы описания моделей пользователя и фильма;
* `/models` – содержит файлы описания схем пользователя и фильма;
* `/routes` — содержит описание основных роутов для пользователя и фильма;
* `/errors` – содержит описание ошибок.

## Установка и запуск проекта:
Клонировать репозиторий:

    git clone https://github.com/RuslanVoronov/movies-explorer-api

Установить зависимости:

    npm install

Запустить сервер:

    npm run start

Запустить сервер с hot-reload:

    npm run dev
    
* [Frontend](https://github.com/RuslanVoronov/movies-explorer-frontend)
