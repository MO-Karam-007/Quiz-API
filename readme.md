## Video Demo

[Watch the video demo]('./Quiz.mp4')

# Quiz API

This is a simple Quiz API built using MongoDB, Node.js, Express, and React. It allows you to create quizzes, add questions, set time limits, and test students. Additionally, it features authentication (Auth) and authorization (OAuth) functionalities to secure access to the API endpoints.

## Setup

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MO-Karam-007/Quiz-API.git

2. cd quiz-api

3. npm install

4. npm run start:server

### Backend API

The backend API exposes the following endpoints:

### Auth & OAuth {`/v1`}
- `POST /signup`: Create new user account.
- `POST /complete_sign_up`: To complate user data.
- `POST /login`: login using email and password.
- `POST /send_email`: Verification email.
- `POST /verify`: Verifying logged in users.
### Students {`/v1`}
- `GET /get_students`: Delete a specific quiz.
### quiz. {`/v1`}
- `POST /quiz`: Add a Quiz.
- `GET /quiz`: Get all quizzes.
- `GET /quizbycategory?category=final`: get quized dependence on its category [final - mid_term - quiz].
- `GET /last_exam`: The last test added about 20 minutes ago will retrieve.
- `POST /test/:id`: Retrieve quiz and its questions.
### Archive{`/v1/archive`}
- `GET /all`: Retrieve all drafts.
- `GET /one/:id`: Retrieve specific draft.
- `PUT /change_status/:id`: Update draft status for public.
### Questions {`/v1`}
- `POST /questions`: Create new question.
- `GET /questions`: Retrieve all questions.
- `GET /questionsbank?no=1`: Retrieve question by the lecture number.
- `DELETE /questions/:id`: Remove question.
### Answers{`/v1`}
- `POST /:questionId/answer`: Submit answers.
- `GET /user_degress`: Retrieve student mark.
- `GET /:quizId/score`: Retrive recent quiz answer.
- `GET /quizzes_score`: Quiz score with more details.
  
You can visited the API Docmentation :
- (https://documenter.getpostman.com/view/19040062/2s93eYWCem)