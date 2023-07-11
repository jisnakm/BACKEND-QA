# API details

## POST http://localhost:3000/register

### **Header:** `'Content-Type: application/json'`

### **Data:**

```
{
    "email": "jis@gmail.com",
    "name": "testuser4",
    "password": "testpassword4",
    "role": "user"
}

```

### **Response:** 

### success:

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

### failed:

```
{
    "status": "failed",
    "data": {
        "error": "Failed to register user"
    }
}

```

## POST http://localhost:3000/login

### **Header:** `'Content-Type: application/json`

### **Data:**

```
{
    "email": "m@gmail.com",
    "password": "123"
}

```

### **Response:** 

### success:

```
{
    "status": "success",
    "data": {
        "user": {
            "email": "m@gmail.com",
            "name": "midhun",
            "role": "user",
            "id": "64a2ef00260401b53db0d6c1"
        }
    }
}

```

### failed:

```
{
    "status": "failed",
    "data": {
        "error": "Invalid credentials"
    }
}

```