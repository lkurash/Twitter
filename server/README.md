# Tweetter

## Database setup

#### This project was made with PostgreSQL (https://www.postgresql.org/) and Sequelize (https://sequelize.org/).

### `cd server`

### Install npm packages

### `npm install`

## Create database config

### `cp config/config.example.json config/config.json`

## Create database

### `npx sequelize-cli db:create`

## Run migrations

### `npx sequelize-cli db:migrate`

## Run seeds

### `npx sequelize-cli db:seed:all`

### or

### `npx sequelize-cli db:seed --seed SEED_NAME`

## Run the app

### `npm start`

## Open http://localhost:5500 to view it in your browser.
