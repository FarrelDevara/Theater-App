# Individual Project Phase 2
=======

# WadidawTheater API Documentation

## Models :
### User
```
username : string
email : string, unique (required) emailFormat
password : string (required) length>=5
```
### Ticket
```
MovieId : integer (required)
UserId : integer (required)
movieName : string 
price : integer (required)
```

### Relationship :
```
User to Ticket : One-to-Many
```

## Base URL
www.wadidawclothing.shop

## Endpoints :

List of available endpoints:


- `POST /login`
- `POST /register` 
- `POST /forget-password`
- `GET /reset-password/:id/:token`
- `PATCH /new-password/:id/:token`
- `POST /google-login`
 

- `GET /getMovies` 
- `GET /movie/detail/:id` 


And routes below need authentication

- `GET /ticket/:id` 
- `POST /create-ticket/:id` 
- `GET /my-ticket` 
- `POST /payment` 
- `PATCH /payment/status/:id` 

&nbsp;


## 1. POST /login
Description:
- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Success",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

## 2. POST /register
Description:
- Add user 

Request:

- body:

```json
{
    "username" : "string",
    "email" : "string",
    "password" : "string",
}
```

_Response (201 - Created)_

```json
{
    "message": "User has been created",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email must be unique"
}
OR
{
  "message": "Must be a valid email format"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Passwords length must be 5 or more"
}
```
&nbsp;

## 3. POST /forget-password
Description:
- Forget Password 

Request:

- body:

```json
{
    "email" : "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "string",
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email"
}

```
&nbsp;

## 4. GET /reset-password/:id/:token
Description:
- Link Reset Password

Request:
- params : 
```json
{
    "id" : "integer",
    "token" : "string"
}
```
- body:

```json
{
    "email" : "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "Check your email",
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```
&nbsp;
## 5. PATCH /new-password/:id/:token
Description:
- Update new passowrd

Request:
- params : 
```json
{
    "id" : "integer",
    "token" : "string"
}
```
- body:

```json
{
    "password" : "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "berhasil ubah password",
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```
&nbsp;
## 6. POST /google-login
Description:
- google login

Request:

- body:

```json
{
    "googleToken" : "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "Login Google Success",
    "access_token" : "string"
}
```

_Response (401 - Unauthorize)_

```json
{
  "message": "Invalid Token"
}
```
&nbsp;
## 7. GET /getMovies
Description:
- Get Movies from tmdb Api

Request:
- headers : 
```json
{
    accept: "application/json",
    Authorization : Bearer + Api_key
}
```

_Response (200 - Ok)_

```json

{
    "dates": {
        "maximum": "2024-03-20",
        "minimum": "2024-02-07"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/gJL5kp5FMopB2sN4WZYnNT5uO0u.jpg",
            "genre_ids": [
                28,
                12,
                16,
                35,
                10751
            ],
            "id": 1011985,
            "original_language": "en",
            "original_title": "Kung Fu Panda 4",
            "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
            "popularity": 1929.496,
            "poster_path": "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
            "release_date": "2024-03-02",
            "title": "Kung Fu Panda 4",
            "video": false,
            "vote_average": 6.864,
            "vote_count": 121
        },
        ...
    ],
    "total_pages": 186,
    "total_results": 3716
}
```

&nbsp;

## 8. GET /movie/detail/id
Description:
- Get Movies from tmdb Api

Request:
- params :
```json
{
    "id": "integer (required)"
}
```
- headers : 
```json
{
    accept: "application/json",
    Authorization : Bearer + Api_key
}
```

_Response (200 - Ok)_

```json
{
    "adult": false,
    "backdrop_path": "/ehumsuIBbgAe1hg343oszCLrAfI.jpg",
    "belongs_to_collection": null,
    "budget": 175000000,
    "genres": [
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 12,
            "name": "Adventure"
        }
    ],
    "homepage": "https://movies.disney.com/wish",
    "id": 1022796,
    "imdb_id": "tt11304740",
    "original_language": "en",
    "original_title": "Wish",
    "overview": "Asha, a sharp-witted idealist, makes a wish so powerful that it is answered by a cosmic force – a little ball of boundless energy called Star. Together, Asha and Star confront a most formidable foe - the ruler of Rosas, King Magnifico - to save her community and prove that when the will of one courageous human connects with the magic of the stars, wondrous things can happen.",
    "popularity": 377.756,
    "poster_path": "https://image.tmdb.org/t/p/w500/AcoVfiv1rrWOmAdpnAMnM56ki19.jpg",
    "production_companies": [
        {
            "id": 2,
            "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
            "name": "Walt Disney Pictures",
            "origin_country": "US"
        },
        {
            "id": 6125,
            "logo_path": "/tzsMJBJZINu7GHzrpYzpReWhh66.png",
            "name": "Walt Disney Animation Studios",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2023-11-13",
    "revenue": 251720820,
    "runtime": 95,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Be careful what you wish for.",
    "title": "Wish",
    "video": false,
    "vote_average": 6.615,
    "vote_count": 864
}
```
## 9. POST /create-ticket/:id
Description:
- Create ticket

Request:
- params :
```json
{
    "id": "integer (required)"
}
```
- headers : 
```json
{
  "access_token": "string"
}
```

- body : 
```json
{
    "MovieId": "integer",
    "UserId": "integer",
    "movieName": "string",
    "price": "integer",
}
```

_Response (201 - Ok)_

```json
 {
    "MovieId": "integer",
    "UserId": "integer",
    "movieName": "string",
    "price": "integer",
    "paymentStatus" : "boolean"
 }
```
&nbsp;

## 10. GET /my-ticket
Description:
- Get User Tickets

Request:
- params :
```json
{
    "id": "integer (required)"
}
```
- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
 {
    "MovieId": "integer",
    "UserId": "integer",
    "movieName": "string",
    "price": "integer",
    "paymentStatus" : "boolean"
 },
 ...
```
_Response (401 - Unauthorize)_

```json
 {
    "message" : "Invalid Token"
 }
```
&nbsp;

## 11. GET /ticket/:id
Description:
- Get Detail Ticket

Request:
- params :
```json
{
    "id": "integer (required)"
}
```
- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
 {
    "MovieId": "integer",
    "UserId": "integer",
    "movieName": "string",
    "price": "integer",
    "paymentStatus" : "boolean"
 }
```
_Response (404 - Not Found)_

```json
 {
    "message" : "Not Found"
 }
```

&nbsp;

## 12. POST /payment
Description:
- Get payment detail

Request:

- 3rd Party Api = Midtrans

_Response (200 - Ok)_

```json
 {
    "message": "Order created",
    "transactionToken": "integer",
    "order_id": "integer",
 }
```

&nbsp;

## 12. POST /payment
Description:
- Get payment detail

Request:

- 3rd Party Api = Midtrans

_Response (200 - Ok)_

```json
 {
    "message": "Order created",
    "transactionToken": "integer",
    "order_id": "integer",
 }
```

&nbsp;

## 13. POST /payment/status/id
Description:
- Changing paymentStatus & Send Email Confirmation

Request:

- params : 
```json
{
    "id" : "integer"
}
```

_Response (200 - Ok)_

```json
 {
    "message": "Pemayaran Berhasil",
 }
```
_Response (400 - Bad Request)_

```json
 {
    "message": "Already Paid",
 }
```

_Response (401 - Unauthorize)_

```json
 {
    "message": "Invalid Email",
 }
```

&nbsp;

## 14. POST /ticket/delete/:id
Description:
- Delete ticket

Request:

- params : 
```json
{
    "id" : "integer"
}
```

_Response (200 - Ok)_

```json
 {
    "message": "Pemayaran Berhasil",
 }
```
_Response (400 - Bad Request)_

```json
 {
    "message": "Already Paid",
 }
 OR
 {
    "message": "Cant delete Payed Ticket",
 }
 
```

_Response (403 - forbidden)_

```json
 {
    "message": "Forbidden",
 }
```


&nbsp;
<<<<<<< HEAD


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Invalid email/password"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
=======
=======
&nbsp;

>>>>>>> 88f93abb27948ad16f37e618bb982759798b7e1b
