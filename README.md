# For Visitors:
This is a PHP-backended Korean style traditional bulletin board (게시판).
> There are still a few big bugs to fix.

## How to run this repo
- [MySQL](https://www.mysql.com/) is needed for database.

- [Composer](https://getcomposer.org/) is needed for dependencies installation.

- The webpages are in **KOREAN** language.

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

> In `/admin.php` page, The admin’s password is *`admin`*.

_______

# Dev Todo:
### 1. Move admin password into `.env`

  in `s\admin.php` on Line 4:
```php
if($_POST['pw']==='admin'){
```


### 2. Bug fix: (logic stack)

in `adminpage.php` on Line 16, 21:
in `_h.php` on Line 12:
```php
<script src="s/<?php echo $js.'.js?v='.$t; ?>"></script>
```
in `s\adminpage.js`, `s\adminreply.js`:
```js
$.ajax({
  url: "s/admin.php", method: "POST",
  // ...
});
```
in `s\admin.js` on Line 13, 29, ***44***, 56, 73, 90, 106:
```php
require "in.su.php";
```
```php
require "s/in.su.php";
```
in `s\in.su.php` on Line 2:
```php
require_once "./req/envi.php";
```
> **Bug reason:** Due to root `require` path problem: `` imported from in different directory level.



### 3. Windows styled path should be fixed
Find all "`\`" in file paths, change into "`/`", then run a test.