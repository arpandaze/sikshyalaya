<div align="center">
  <h1>Sikshyalaya</h1>
<p>
  Crossplatform Education Portal for Modern Classrooms
</p>

<p>
  <a href="https://gitlab.com/arpandaze/sikshyalaya/-/pipelines">
    <img src="https://gitlab.com/arpandaze/sikshyalaya/badges/main/pipeline.svg" alt="CI/CD Pipeline" />
  </a>
</p> 
</div>

![Sikshyalaya, Crossplatform Education Hub](https://user-images.githubusercontent.com/46302068/179336239-33a0c1f4-132c-48e8-93d9-4d9b7b21fe64.jpg "Optional Title")

# Notable Features
* Resource Sharing
* Assignment Creation
* Live Class Chatroom
* Note Taking
* Multiple Choice Question Quiz
* Separate Panel for Teacher, Student and Admin
* Passwordless QR Login
* Two Factor Authentication
* Role Based Authorization System

# Architecture
<div align="center">
<p>
<img src="https://user-images.githubusercontent.com/46302068/179137113-3f1e8e26-9e8e-4936-8e32-8de144b945f7.jpeg" alt="Architecture" width="500" />
</p> 
</div>

# Technologies Used
## Backend
### FastAPI
Python based asynchronous HTTP Framework used for creating HTTP and WebSocket endpoints.
### PostgreSQL
Widely popular and open source SQL database used for storing all persistant data.
### Redis
Extremely fast in-memory database used for server side caching and as a session store.

## Web Frontend
### ReactJS
Open source JavaScript library used for designing the web interface.
### Axios
Promise based JavaScript HTTP Client used for calling API endpoints.

## Mobile Frontend
### Flutter
Dart based open source UI development kit used for designing mobile interface.
### Flutter Bloc
State management library for Flutter based on *Business Logic Component* pattern.

## Deployment and Other Tools
### Docker
Containerization tool used for creating images for all services.
### Nginx
Extremely popular open source web server used for serving static data and as a reverse proxy.
### Gitlab
Software development platform used for hosting git repository and for running automated CI/CD jobs.  
