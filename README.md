# Restfull API Express


<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Prerequiste

- Node.js - Download and install [Node.js](https://nodejs.org/en/)
- Mysql - Download and install [Mysql](https://www.mysql.com/downloads/)

## How to run the app ?
1. Open CMD or Terminal and enter to the app directory
2. [Instalation](#Instalation)
3. Make a new file called **.env** in the root directory, set up first [here](#Create-Environment)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create Database on **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000)
8. You can see all the end point [here](#Endpoint) or you can see Collection [here](https://www.getpostman.com/collections/6713be7edb5506063f10)

## Instalation

```
$ git clone https://github.com/ayiangio/backEndAuthLib.git
$ cd restApiWithExpress
$ npm install
```
## Create Environment
```
$ touch .env
$ nano .env
```
```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

PORT = 5000
REQUEST_HEADERS = "Your Header"
SECRET_KEY = "Key for Encryption Password"
WHITELIST ="http://localhost:5000,http:example1.com"
```
## Start Server
```
$ npm start
```
## Endpoint
* Get 
```
http://localhost:5000/book/
http://localhost:5000/book/:idBook
http://localhost:5000/borrow/:idBook
http://localhost:5000/borrow/list/:idUser
http://localhost:5000/user
http://localhost:5000/user/token/:token
http://localhost:5000/user/:idUser
```

* Post 
```
http://localhost:5000/book/
http://localhost:5000/borrow/
http://localhost:5000/user/register
http://localhost:5000/user/login
http://localhost:5000/user/logout
```

* Patch

```
http://localhost:5000/book/:idBook
http://localhost:5000/borrow/:idBook
```

* Delete

```
http://localhost:5000/book/:idBook
http://localhost:5000/borrow/:idBook
http://localhost:5000/user/delete/:idUser
```

## Contributors
<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/andreferi3">
          <img width="100" src="https://avatars3.githubusercontent.com/u/15377357?s=460&v=4" alt="Ayiangio"><br/>
          <sub><b>Ayi Angio</b></sub>
        </a>
      </td>
    </tr>
  </table>
</center>