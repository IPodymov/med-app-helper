# Установка и запуск

## Node.js

Проверьте инструменты:

```bash
node --version
npm --version
```

Установите зависимости:

```bash
npm install
```

## Docker и Ollama

Проверьте Docker:

```bash
docker --version
docker compose version
```

Запустите сервис и загрузите модель:

```bash
npm run ollama:up
npm run ollama:pull
```

Контейнер использует volume `medical-app_ollama-data`, поэтому модель сохраняется между перезапусками.

Остановить сервис:

```bash
npm run ollama:down
```

## Веб-приложение

Запустите dev-сервер:

```bash
npm run dev
```

После запуска откройте адрес Vite в браузере. Для остановки нажмите `Ctrl+C` в терминале.

## Проверка

```bash
docker compose ps
curl http://localhost:11434/api/tags
```

В списке моделей должна присутствовать `qwen3:1.7b`.
