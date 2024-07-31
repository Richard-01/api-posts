<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descripción

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Se implemento una API para Posts o entradas. La idea era que se pueda listar una parrilla de posts, por ejemplo, para planificar las publicaciones de una semana en cualquier red social.

permitiendo crear un usuario solo con email y contraseña, sin necesidad de usar JWT ni ningún otro método de autenticación sofisticado. Solo un login básico que guarde el usuario y la contraseña y retorne si son válidos o no.

El CRUD de posts debe permitir:

Crear un post.
Editar un post.
Consultar todos los posts del usuario logueado.
Consultar un post por su ID (solo del usuario logueado por email).
Eliminar un post (soft delete, es decir, no se elimina físicamente de la base de datos).

Cada post debe tener al menos los siguientes campos:
  - Título
  - Cuerpo (body)
  - Fecha de creación
  - Creador
  - Fecha estimada de publicación
  - Estado (publicado o pendiente)
  - Porcentaje de aprobación (número)
  - Correcciones (cadena de texto)
  - Plataforma (debe aceptar solo: X, Facebook, Instagram, LinkedIn)
  - URL del post
  - URL multimedia

## Requisitos

- Node.js (versión 14 o superior)
- PostgreSQL
- TypeORM

## Instalacion

1. **Clona el repositorio:**
    ```bash
      git clone https://github.com/tu_usuario/tu_repositorio.git
      cd tu_repositorio
    ```

2. **Digitar el siguente comando en la consola para instalar las dependencias del proyecto.**
    ```bash
      $ npm install 
    ```

3. **Configura las variables de entorno en un archivo .env en la raíz del proyecto:**
    ```bash
      DB_HOST=tu_host
      DB_PORT=5432
      DB_USER=tu_usuario
      DB_PASSWORD=tu_contraseña
      DB_NAME=tu_base_de_datos
    ```



## Como correr el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejecucion de Endpoint

1. **Ubicación del Archivo:**

    `PostmanCollections/REST API- CRUD - POSTS.postman_collection.json`

2. **Cómo Importar la Colección en Postman:**

- Abre Postman.
- Haz clic en el icono de importación en la parte superior izquierda.
- Selecciona "Archivo" y navega hasta  `PostmanCollections/REST API- CRUD - POSTS.postman_collection.json`
- Haz clic en "Abrir" para importar la colección.
- Uso de la Colección:

Una vez importada, encontrarás la colección en la pestaña de colecciones de Postman.
Puedes usar los endpoints predefinidos para hacer solicitudes y probar la API. **Tener en cuenta que en los headers se deben cambiar por el correo que se hizo la autenticacion de login para poder aceder a crear y hacer hacer el resto de operaciones CRUD**

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
