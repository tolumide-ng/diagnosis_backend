[![Build Status](https://travis-ci.com/tolumide-ng/diagnosis_backend.svg?branch=develop)](https://travis-ci.com/tolumide-ng/diagnosis_backend)

### Onboarding on this Project

1. Clone this repo and cd into it
2. Create a local .env file as stated in the .env.sample file
3. Run test in your local environment with `npm test`
4. Paste this on your terminal to create your database: export DATABASE_URL='postgres://{username}:{password}@{host}:5432/{databaseName}'
5. Run `docker-compose up --build`
6. You can now make request to the endpoints as stated below

### Functionalities

1. Create a new diagnosis with all required data
2. Modify an existing diagnosis
3. Get all existing diagnosis pagination
4. Get a specific existing diagnosis
5. Delete an existing diagnosis

| Routes                                                   | Purpose                      | Method |
| :------------------------------------------------------- | :--------------------------- | :----: |
| `http://localhost:${PORT}/api/v1/diagnos`                | Create a diagnosis           |  POST  |
| `http://localhost:${PORT}/api/v1/diagnos/:id`            | Modify an existing diagnosis |  PUT   |
| `http://localhost:${PORT}/api/v1/diagnos?page=1&limit=1` | Get all available diagnosis  |  GET   |
| `http://localhost:${PORT}/api/v1/diagnos/:id`            | Get a specific diagnosis     |  GET   |
| `http://localhost:${PORT}/api/v1/diagnos/:id`            | Delete a specific diagnosis  | DELETE |

## Technologies used:

-   Node.js
-   Sequelize
-   Mocha
-   Docker
