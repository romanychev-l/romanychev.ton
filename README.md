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

Сайт размещается на сервере DEV (`129.101.126.88`) и доступен в сети TON
по адресу `http://romanychev.ton` после привязки домена владельцем.

Обновление с Mac:

```bash
npm run deploy
```

Скрипт собирает сайт локально (`build:light`), загружает отдельный релиз
и атомарно переключает `/var/www/romanychev.ton/current`. Предыдущие релизы
сохраняются для отката. При необходимости можно задать `TON_DEPLOY_TARGET`
и `TON_DEPLOY_KEY`.

Конфигурация сервера:

- `deploy/nginx.conf` → `/etc/nginx/sites-available/romanychev.ton`.
  nginx слушает `127.0.0.1:8080`, поддерживает страницы без расширения и поиск Pagefind.
- `deploy/ton-site.service` → `/etc/systemd/system/ton-site.service`.
  [tonutils/reverse-proxy](https://github.com/tonutils/reverse-proxy) работает
  от пользователя `ton-site`, принимает TON-трафик на UDP-порту `3333`
  и пересылает запросы в nginx.
- `/var/lib/ton-site/config.json` содержит постоянный приватный ключ сайта.
  Хранить резервную копию отдельно от публичного репозитория и сохранять при обновлениях.
  Ключ кошелька для работы сайта не нужен.

Для новой установки нужны nginx, актуальный Linux AMD64-релиз TON-прокси
с проверенной контрольной суммой, пользователь `ton-site`, указанные конфигурации
и доступный извне UDP-порт `3333`. Затем включить службы
`nginx` и `ton-site` через systemd.

Привязка домена: в TON DNS записать ADNL-адрес прокси в поле Site
и подтвердить транзакцию кошельком владельца. `.ton` открывается через
совместимый TON-браузер, TON Proxy или HTTP-шлюз.

## Лицензия

- **Контент**: [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
- **Код**: [MIT](LICENSE)

Спасибо [Sat Naing](https://github.com/satnaing) за тему [AstroPaper](https://astro-paper.pages.dev/).
