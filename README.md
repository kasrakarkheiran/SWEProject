# SWEProject
Welcome to **JoinIn**, built with the MERN stack. This website allows Gators to organize and join casual sport meetups.


![Website Home Page](./JoinIn/images/readmeScreenshot1.png)

## Description

Using this application, users can:
- Create an account and log in
- Filter events by sport or date
- Post a new event
- Join and subscribe to other events as a participant
- Change email, username, and password
- Delete posts with administrative privlege

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token

## Setup Instructions

To run the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kasrakarkheiran/SWEProject
    ```

2. **Install dependencies**:
   - Navigate to both `./JoinIn` and `./server` directories and run:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   - Create a `config.env` file in the root directory of the backend and add the following:
    ```env
    MONGO_URI=                              # your MongoDB URI
    SECRET=                                 # bcrypt salt 
    EMAIL_SECRET=                           # nodemailer email
    EMAIL_PASSWORD=                         # nodemailer password
    FRONTEND_URL=http://localhost:5173      # localhost port to access frontend
    ```
4. **Start the development server**:
   - In two separate terminals, in the `./JoinIn` and `./server` directories, run:
    ```bash
    npm run dev
    ```

5. **Access the app**: 
   - Open the browser and enter `http://localhost:5173/` into the search bar.