### TERCER ENTREGA DE PROYECTO FINAL

Para la correcta configuración se deberá crear un archivo .env con los siguientes parámetros:

MONGO_PASSWORD = XXXXXXX
ADMIN = XXXXXXX
MAIL_AUTH_USER= XXXXXXX
MAIL_AUTH_PASS= XXXXXXX
TWILIO_ID= XXXXXXX
TWILIO_TOKEN= XXXXXXX
TWILIO_SMS_NUMBER= XXXXXXX
TWILIO_WHATSAPP_NUMBER= XXXXXXX
SMS_ADMIN= XXXXXXX

En la base de datos se debera cargar por solicitud API rest un usuario con email: admin@admin.com, el cual será quien será reconocido por el sistema como administrador y podr, por ende, crear, modificar o borrar productos de la base de datos y demás acciones atribuidas solo al administrador. 

Para su uso en Heroku las variables de entorno ya estan configuradas y se pueden utilizar la base previo generar su propio usuario.
En caso de querer ingresar como administrador se deberá hacer con el usuario admin@admin.com y password 1234.
