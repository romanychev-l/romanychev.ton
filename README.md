# romanychev.ton

Личный сайт / блог Леонида Романычева. Архив постов из Telegram-канала [@daily_scrum](https://t.me/daily_scrum).

Построен на [Astro](https://astro.build) + [AstroPaper](https://astro-paper.pages.dev/).

## Команды

| Команда            | Действие                                     |
| :----------------- | :------------------------------------------- |
| `npm install`      | Установка зависимостей                       |
| `npm run build`    | Сборка сайта в `./dist/`                     |
| `npm run preview`  | Превью сборки локально                       |

## Деплой

1. `npm run build` — генерирует статику в `dist/`
2. Отдавать `dist/` через nginx
3. Проксировать через [tonutils/reverse-proxy](https://github.com/tonutils/reverse-proxy) в сеть TON

## Лицензия

- **Контент**: [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
- **Код**: [MIT](LICENSE)

Спасибо [Sat Naing](https://github.com/satnaing) за тему [AstroPaper](https://astro-paper.pages.dev/).
