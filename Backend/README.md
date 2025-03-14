# Backend API Documentation

## Endpoints

### /users/register

**Method:** POST

**Description:** Registers a new user.

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Response:**
- **201 Created:** User successfully registered.
    ```json
    {
        "token": "jwt_token",
        "user": {
            "_id": "user_id",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com",
            "password": "hashed_password"
        }
    }
    ```
- **400 Bad Request:** Invalid input.
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "First name must be atleast 3 characters long",
                "param": "fullname.firstname",
                "location": "body"
            },
            {
                "msg": "Password must be atleast 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

### /users/login

**Method:** POST

**Description:** Logs in an existing user.

**Request Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Response:**
- **200 OK:** User successfully logged in.
    ```json
    {
        "token": "jwt_token",
        "user": {
            "_id": "user_id",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "john.doe@example.com"
        }
    }
    ```
- **400 Bad Request:** Invalid input.
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "Password must be atleast 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```
- **401 Unauthorized:** Invalid credentials.
    ```json
    {
        "message": "Invalid email or password"
    }
    ```

## Notes
- Ensure to replace placeholder strings with actual data.
- Use appropriate HTTP status codes for responses.
- Secure endpoints with proper authentication and validation.