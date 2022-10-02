## ENTREGA DE PROYECTO FINAL

### ENTORNOS

development

    npm run dev

production

    npm run start


Para la correcta configuración se deberá crear un archivo .env con los siguientes parámetros:

MONGO_USER = XXXXXXX

MONGO_PASSWORD = XXXXXXX

MONGO_USER_LOCAL = XXXXXXX

MONGO_PASSWORD_LOCAL = XXXXXXX

ADMIN = XXXXXXX

MAIL_AUTH_USER= XXXXXXX

MAIL_AUTH_PASS= XXXXXXX

JWT_PRIVATE_KEY= XXXXXXX


**_NOTA:_** se adjunta un .model.env con explicación de cada parámetro.

**_NOTA-2:_** en caso de desear configurar una DB firebase se deberá adjuntar el archivo de configuración ".json" correspondiente en la carpeta "./src/databases".

#### Archivo Config.js

Adicionalmente al archivo .env se deberá, previo a levantar el servidor, configurar adecuadamente el archivo config.js.
Son dos los aspectos importantes a tener en cuenta.

    1) Configurar el tipo de persistencia; opciones:
        -   json: persistencia en un archivo json local.
        -   mongodb: persistencia en mongoDB (recordar que debe ejecutarse un contenedor docker con instancia de mongo para utilizar el servidor en entorno de desarrollo)
        -   firebase: persistencia en firebase (recordar colocar el archivo json en la carpeta correspondiente)
        -   default: cualquier otro texto introducido en el campo ejecutará la persistencia en memoria.

    2) Configurar el servicio SMTP; opciones verificadas:

        -   gmail: si se utilizase una cuenta gmail.
        -   ethereal: si se utilizase una cuenta ethereal.

#### HEROKU

Para su uso en Heroku las variables de entorno ya estan configuradas y se utiliza la persistencia en mongoAtlas.
En caso de desear ingresar como administrador se deberá hacer creando el usuario gggdesarrollos@gmail.com.
Los email se encuentran configurados con SMTP gmail, y procederan de una casilla gmail creada para el proyecto.
