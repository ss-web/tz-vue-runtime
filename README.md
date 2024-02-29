### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Add frontend/.env for backend. Example:
`VITE_API_BACKEND=http://localhost:5001`


![Transcription Google API Popup Vue Module](https://ss-web.ru/assets/images/untitled-min.png)

## TZ vue runtime


This project demonstrates a dynamic Vue component loading system with an admin page for live editing and a client page displaying the component's data fetched from a Node.js API.

### Project Structure

The project consists of three main parts:

1. **Backend (Node.js API)**
    - Handles saving and retrieving component settings (markup and styles).
    - Provides a data endpoint for static JSON.
  
2. **Admin Page (Vue Project)**
    - Allows live editing of the component's markup and styles.
    - Displays the default component with the ability to save changes.
    - Utilizes a WYSIWYG code editor for enhanced editing experience.

3. **Client Page (Vue Project)**
    - Fetches the component's markup and styles from the API.
    - Displays the component with data obtained from the API.

### Getting Started

#### Building and Running the Application

Ensure you have Docker installed. Clone the repository, navigate to the project root, and run:
`docker compose up --build`.

Visit the admin page at http://localhost:8080 and the client page at http://localhost:8081.
Environment Configuration
In the backend, configure the frontend by creating frontend/.env. Example content:
```
#env
VITE_API_BACKEND=http://localhost:5001
```

### Technologies Used

- Node.js
- Vue.js
- Docker
- CodeMirror (for code editing)

### Acknowledgments

Thank you for using this project. Feel free to contribute and make improvements!
