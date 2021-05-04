# Example AdonisJS API
<br>

#### Status: **Concluded** ✅

## Description
API built with Adonisjs to demo from basics functionalities

## Functionalities
- Authentication with JWT
- User register
- Password recovery
- Password reset
- Sends emails
- Queue of the jobs
- Upload files
- Creates project
- Creates tasks of the project

## Prerequisites (installed in your machine)
- Node.JS/npm (https://nodejs.org/en/download/)
- AdonisJS (https://adonisjs.com/docs/4.1/installation#_installing_adonisjs)
- Postgresql (https://www.postgresql.org/download/)
- Redis (https://redis.io/download)

## Installation
```
git clone https://github.com/al-pereira/example-adonisjs-api.git

cd example-adonisjs-api

npm install
```

## Configuration
1. In the Postgresql server creates database with name gonode 

2. Rename file .env.example to .env

3. In the file .env configure:
    ```
    DB_HOST=host_postgresql
    DB_PORT=port_postgresql 
    DB_USER=user_postgresql
    DB_PASSWORD=password_postgresql

    REDIS_HOST=host_redis
    REDIS_PORT=port_redis
    ```
4. Execute the migrations: 
    ``` 
    adonis migration:run 
    ```

### Execute the application
- Two terminals will be required. 

- In a terminal run the API:
    ```
    adonis serve --dev
    ``` 
    *If all goes well, the terminal should return the message: info: serving app on http://127.0.0.1:3333* 


- In another terminal run the queue of jobs
    ```
    adonis kue:listen
    ```
    *If all goes well, the terminal should return the message: info: kue worker listening for 1 job(s)* 


## Licence
MIT