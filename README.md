# **API's Details**



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

# Categories API's


## POST http://localhost:3000/category

### **Header:** `'Content-Type: application/json`

### **Data:**

```
{
    "title": "Node",
    "level": "Begnner"
}

```

### **Response:** 

### success:

```
{
    "status": "success",
    "data": {
        "category": {
            "title": "Node",
            "level": "Begnner",
            "id": "64ae3aacb523a51e4c39ee68"
        }
    }
}

```

### failed:

```
{
    "status": "failed",
    "data": {
        "error": "Failed to create question"
    }
}

```

## GET http://localhost:3000/category

### **Header:** `'Content-Type: application/json`

### **Response:** 

```
{
    "status": "success",
    "data": {
        "category": {
            "title": "Node",
            "level": "Begnner",
            "id": "64ae3aacb523a51e4c39ee68"
        }
    }
}

```

## PATCH http://localhost:3000/category/64ae3aacb523a51e4c39ee68

### **Header:** `'Content-Type: application/json`

### **Data:**

```
{
    "title": "angular",
    "level": "Intermediate"
}

```

### **Response:** 

### success:

```
{
    "status": "success",
    "data": {
        "category": {
            "title": "angular",
            "level": "Intermediate",
            "id": "64ae3aacb523a51e4c39ee68"
        }
    }
}

```

### failed:

```
{
    "status": "failed",
    "data": {
        "error": "Failed to update category"
    }
}

```

## DEL http://localhost:3000/category/64ae3aacb523a51e4c39ee68

### **Header:** `'Content-Type: application/json`

### **Response:** 

### success:

```
{
    "status": "success"
}

```

# Questions API's


## POST http://localhost:3000/questions

### **Header:** `'Content-Type: application/json`

### **Data:**

```
{
    "category": "64ae3a82b523a51e4c39ee64",
    "title": "what is virtualDOM?",
    "answerType": "text",
    "answer": "copy of realDOM"
}

```

### **Response:** 

### success:

```
{
    "status": "success",
    "data": {
        "question": {
            "category": "64ae3a82b523a51e4c39ee64",
            "title": "what is virtualDOM?",
            "answerType": "text",
            "answer": "copy of realDOM",
            "id": "64ae42d342fb347706104f22"
        }
    }
}

```

### failed:

```
{
    "status": "failed",
    "data": {
        "error": "Failed to create question"
    }
}

```

## GET http://localhost:3000/questions

### **Header:** `'Content-Type: application/json`

### **Response:** 

```
{
    "status": "success",
    "data": {
        "allquestions": [
            {
                "id": "64ae3b51b523a51e4c39ee6d",
                "category": {
                    "_id": "64ae3a82b523a51e4c39ee64",
                    "title": "Angular",
                    "level": "Expert",
                    "__v": 0
                },
                "title": "what is virtualDOM?",
                "answerType": "text",
                "answer": "copy of realDOM"
            }
        ]
    }
}

```

## PATCH http://localhost:3000/questions/64ae42d342fb347706104f22

### **Header:** `'Content-Type: application/json`

### **Data:**

```
{
    "category": "64ae3a0fb609db3a63f54de6",
    "title": "what is react.js?",
    "answerType": "text",
    "answer": " user interface framework"
}

```

### **Response:** 

### success:

```
{
    "status": "success",
    "data": {
        "question": {
            "category": "64ae3a0fb609db3a63f54de6",
            "title": "what is react.js?",
            "answerType": "text",
            "answer": " user interface framework",
            "id": "64ae42d342fb347706104f22"
        }
    }
}

```

### failed:

```
{
    "status": "failed",
    "data": {
        "error": "Failed to update question"
    }
}

```

## DEL http://localhost:3000/category/64ae42d342fb347706104f22

### **Header:** `'Content-Type: application/json`

### **Response:** 

### success:

```
{
    "status": "success"
}

```