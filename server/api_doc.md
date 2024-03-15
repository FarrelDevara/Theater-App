
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

- `GET /getMovies` 
- `GET /movie/detail/:id` 

- `POST /login`
- `POST /google-login`
- `POST /register`  

And routes below need authentication

- `GET /ticket/:id` 
- `POST /create-ticket/:id` 
- `GET /my-ticket` 
- `POST /payment` 
- `PATCH /payment/status/:id` 

&nbsp;

## 1. GET /getMovies
Description:
- Get Movies from tmdb Api

Request:

None

_Response (200 - Ok)_