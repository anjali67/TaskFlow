# TaskFlow - Task Management Application

This is a full-stack task management application with a React Native frontend and a Node.js backend.

## Prerequisites
Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- Expo CLI (for running the frontend)
- A mobile device or emulator for testing the frontend

## Setup Instructions

### Frontend Setup
1. Navigate to the `TaskFlow` folder:
   cd TaskFlow

2. Install dependencies:
npm install

3. Start the Expo development server:
npx expo start

4. Scan the QR code with your mobile device using the Expo Go app or run it on an emulator.

### Backend Setup
1. Navigate to the task-manager-backend folder:
cd task-manager-backend

2. Install dependencies:
npm install

3. Start the backend server:
node src/server.js

4. The backend will run on http://localhost:5002. To access it from your mobile device:
 - Connect your mobile device and PC to the same network.
 - Replace localhost with your PC's IPv4 address (e.g., http://192.168.209.74:5002).

### API Configuration
The backend API is hosted at http://<your-ipv4-address>:5002.

Ensure the frontend is configured to use this URL for API requests.

### Running the Project
- Start the backend server first (follow the Backend Setup instructions).
- Start the frontend development server (follow the Frontend Setup instructions).
- Use the Expo Go app on your mobile device to test the application.