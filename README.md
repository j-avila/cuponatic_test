# cuponatic_test
aplicacion creada con mySql + nodeJs  y react como cliente


## dependencias necesarias
Server: typescript: `npm i typescript --save-dev`

docker: instalacion (https://docs.docker.com/get-docker/) 

## para correr el proyecto:

Ejecutar `docker-compose up` para montar el servidor de mysql de phpmyadmin el cual se encuentra en el puerto `:8080`

Para ejecutar el compilador de typescript en modo watcher utilizar `npm run watch`

Correr en el directorio server `npm install` y `nodemon dist/index.js` este estara corriendo en el puerto `:3030`

Y por ultimo en el directorio client correr `npm install` luego `npm start` para correr el servidor de ReactJs 

todo quedaria corriendo. 

pd: tengo pendiente realilzar los contenedores del servidor de node y react para facilitar el build.
