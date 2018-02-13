# Hotel Search Web

API Rest para las operaciones CRUD de hoteles, creado con las librerías [HapiJs](https://hapijs.com/) y Nodess [NodeJs](https://nodejs.org/es/)

## Development server

Para correr el proyecto ejecutar:

`npm install`

`node server.js`

(Se requiere la instalacion de Nodejs y Npm)

Url base `http://localhost:5000/`

## Operaciónes Soportadas

`GET /hotel` Obtiene todos los hoteles
`GET /hotel/filter` Obtiene todos los hoteles filtrados por nombre y estrellas
`POST /hotel` Guarda un hotel
`POST /hotel/all` Guarda una lista de hoteles
`PATCH /hotel` Actualiza un hotel por id
`DELETE /hotel` Elimina un hotel por id

## Endporint demo en Heroku
[Endpoint Demo](https://infinite-retreat-72098.herokuapp.com/)
