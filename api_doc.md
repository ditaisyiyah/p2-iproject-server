# UNIVERSE CODE

### A website that serve you: 
#### 1. astronomy picture of the day
#### 2. asteroid near-earth object
#### 3. and facilitate you news search engine

## Environment Variables

### To run this project, you will need to add the following environment variables to your .env file:
#### 1. JWT_SECRET
#### 2. NASA_API_KEY
#### 3. NEWS_API_KEY
#### 4. NODEMAILER_SENDER_PASSWORD

## Endpoints

### REGISTER

```http
  POST /register
```
_Request Body_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Unique |
| `password` | `string` | **Required**. Minimal 5 characters |

_Response (201 - Created)_
```
{
    "access_token": <token> 
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Email is required",
}
```
```
{
    "message": "Email must be in email format",
}
```
```
{
    "message": "Email already registered",
}
```
```
{
    "message": "Email is invalid/inactive",
}
```
```
{
    "message": "Password is required",
}
```
```
{
    "message": "Password length minimal 5 characters",
}
```
_Response (500 - Internet Server Error)_
```
{
    "message": "Internet server error"
}
```

### LOGIN

```http
  POST /login
```
_Request Body_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Unique |
| `password` | `string` | **Required**. Min. 5 chars |

_Response (200 - Ok)_
```
{
    "access_token": <token>
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid username and/or password"
}
```
_Response (500 - Internet Server Error)_
```
{
    "message": "Internet server error"
}
```

### GET ASTRONOMY PICTURE OF THE DAY

```http
  GET /apod
```
_Request Header_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access_token` | `string` | **Required** |

_Request Params_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | **Optional**. Default today. Cannot be used with start_date|
| `start_date` | `string` | **Optional**. Default none|
| `end_date` | `string` | **Optional**. Default today. Be used when start_date be used|

Date in format YYYY-MM-DD

_Response (200 - Ok)_
```
{
    "copyright": "Georges Attard",
    "date": "2020-12-10",
    "explanation": "It's easy to get lost following the ... ",
    "hdurl": <image url>,
    "title": "Simeis 147: Supernova Remnant"
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Failed to get astronomy picture data"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token"
}
```
_Response (500 - Internet Server Error)_
```
{
  "message": "Internet server error"
}
```

### GET A NEAREST ASTEROID

```http
  GET /aneo
```
_Request Header_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access_token` | `string` | **Required** |

_Response (200 - Ok)_
```
{
    "count": 16,
    "name": "(2011 UC292)",
    "distance": 0.0230060366,
    "closestAt": "2021-Aug-24 21:04",
    "velocity": "30751.5396726703",
    "isHazardous": false,
    "diameter": 0.1184520597,
    "url": <url>
}
```
_Response (400 - Bad Request)_
```
{
    "message": "Failed to get asteroid data"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token"
}
```
_Response (500 - Internet Server Error)_
```
{
  "message": "Internet server error"
}
```

### GET NEWS

```http
  GET /news
```
_Request Header_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access_token` | `string` | **Required** |

_Request Params_
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `keywords` | `string` | **Required** |
| `page` | `string` | **Optional**. Default 1. Minimal 1. Maximal 10.  |

_Response (200 - Ok)_
```
[
    {
        "source": {
            "id": null,
            "name": "Adweek"
        },
        "author": "David Kaplan",
        "title": "Stella Artois’ Solstice Celebration Shows ... ",
        "description": "Publishers' live event organizers have ... ",
        "url": <news url>,
        "urlToImage": <iimage url>,
        "publishedAt": "2021-08-17T17:38:46Z",
        "content": "Publishers live event organizers ... "
    },
    ...
]
```
_Response (400 - Bad Request)_
```
{
    "message": "Failed to get news data"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid token"
}
```
_Response (500 - Internet Server Error)_
```
{
  "message": "Internet server error"
}
```
