[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/iuze45af)

# Final-Project-Team-Friday
### Team Members
- Mohammad Ahsan Nazmul (Backend)
- Yue Liang (Frontend)

## Overview
This project consists of a backend Express server and a frontend React UI.

### Server Address and Endpoints
- Backend Server: 4000 
- Frontend Server: 8000

### API Endpoints
- **Get All Items:**
  - **Endpoint:** `GET /api/items`
  - **Example:** http://localhost:4000/api/items

- **Get Item by ID:**
  - **Endpoint:** `GET /api/items/:id`

- **Add a New Item:**
  - **Endpoint:** `POST /api/items`

- **Delete Item by ID:**
  - **Endpoint:** `DELETE /api/items/:id`


### Instructions for Running project Locally

1. Clone the repository: `git clone https://github.com/se-5G00DM04/2023---final-project-team-friday.git`
2. Navigate to the backend folder: `cd backend`
3. Install backend dependencies: `npm install`
4. Run the backend server: `npm run dev`
5. Open a new terminal window and navigate to the frontend folder: `cd ../frontend`
6. Install frontend dependencies: `npm install`
7. Run the frontend UI: `npm start`

### Instructions for Running Docker Containers Locally

1. **Build Docker Images:**
   - Navigate to the backend folder:
     cd backend
   - Build the backend Docker image:
     docker build -t backend-image-name .
     
   - Open a new terminal window and navigate to the frontend folder:
     cd ../frontend
   - Build the frontend Docker image:
     docker build -t frontend-image-name .
     

2. **Run Docker Containers:**
   - Start the backend Docker container:
     docker run -p 4000:5000 -d backend-image (local port can be adjusted)

   - Start the frontend Docker container:
     docker run -p 8000:3000 -d frontend-image

Now you should be able to access your project at:
- Backend: http://localhost:4000
- Frontend: http://localhost:8000

### Completed Phases

- Phase 1
- Phase 2
- Phase 3
- Phase 4
- Phase 5


### Project Grade

Expected Grade: ....
Reasoning: .................


