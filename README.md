- The webpages are in **KOREAN** language.

- <a href="https://www.mysql.com/" target="_blank">MySQL</a> is needed for database.

- <a href="https://getcomposer.org/" target="_blank">Composer</a> is needed for dependencies installation.

- To run this, you need to:

  1. Create a `.env` file under `req` directory, paste these variables into the file, and fill them in with your database info:

    ```
    DB_HOSTNAME=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    ```

  2. Run this at the root folder of this repo in a terminal:
    ```bash
    composer install
    ```

  3. Run your PHP server.