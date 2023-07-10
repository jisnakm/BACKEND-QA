# API details

## POST http://localhost:3000/register

**Header:** `'Content-Type: application/json'`

**Data:**

```
{
    "email": "jis@gmail.com",
    "name": "testuser4",
    "password": "testpassword4",
    "role": "user"
}
```

**Response:** 

```
{
    "status": "success",
    "data": {
        "user": {
            "email": "jis@gmail.com",
            "name": "testuser4",
            "role": "user",
            "id": "64ac192c241fb6f44eef0035"
        }
    }
}
```
