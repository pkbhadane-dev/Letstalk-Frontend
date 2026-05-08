# Lets Talk - Real-Time Messaging Application

A modern, feature-rich real-time messaging application built with React and Socket.IO. Lets Talk enables users to communicate seamlessly with real-time message delivery, user presence tracking, and persistent state management.

## 📋 Overview

Lets Talk is a full-stack web application that allows users to:
- Create accounts and authenticate securely
- Search and connect with other users
- Send and receive messages in real-time
- See online/offline status of users
- View user profiles
- Mark messages as read
- Persistent messaging history

## 🎯 Key Features

- **Real-Time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure login and signup with token-based authentication
- **User Discovery**: Search and find other users in the system
- **Online Status**: Real-time tracking of user presence (online/offline)
- **Message History**: View previous conversations with message persistence
- **Read Receipts**: Track message read status
- **User Profiles**: View and manage user profiles
- **Responsive UI**: Mobile-friendly interface with Tailwind CSS and DaisyUI
- **Error Handling**: Comprehensive error handling and user feedback via React Hot Toast
- **State Persistence**: Redux Persist for maintaining app state across sessions

## 🛠️ Tech Stack

### Frontend Framework & Libraries
- **React 19.1.0** - UI library
- **Vite 7.0.4** - Build tool and dev server
- **React Router 6.30.1** - Client-side routing
- **React Redux 9.2.0** - State management
- **Redux Toolkit 2.8.2** - Redux utilities and simplified state management
- **Redux Persist 6.0.0** - Persistent state management

### Real-Time Communication
- **Socket.IO Client 4.8.1** - Real-time bidirectional communication

### HTTP Client
- **Axios 1.12.1** - HTTP requests with interceptors

### Styling & UI
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **DaisyUI 5.0.46** - Tailwind CSS component library
- **React Icons 5.5.0** - Icon library

### User Feedback
- **React Hot Toast 2.6.0** - Toast notifications

### Development Tools
- **ESLint 9.30.1** - Code linting
- **Vite Plugin React 4.6.0** - React Fast Refresh

## 📁 Project Structure

```
src/
├── pages/                          # Page components
│   ├── authentication/
│   │   ├── Login.jsx              # Login page
│   │   └── Signup.jsx             # Signup page
│   ├── home/
│   │   └── Home.jsx               # Home landing page
│   └── letstalk/
│       ├── LetsTalk.jsx           # Main messaging interface
│       └── Profile.jsx            # User profile page
│
├── components/                     # Reusable components
│   ├── ChatBubble.jsx             # Individual message bubble
│   ├── Heading.jsx                # App header/navigation
│   ├── MessageContainer.jsx       # Message display container
│   ├── MessageSend.jsx            # Message input & send
│   ├── NetworkError.jsx           # Network error display
│   ├── UserAvatar.jsx             # User avatar component
│   ├── UserSidebar.jsx            # User list sidebar
│   └── utility/                   # Utility components
│       ├── axiosInstance.js       # Axios configuration
│       ├── ButtonLoading.jsx      # Loading button state
│       ├── handleErrors.js        # Error handling utilities
│       ├── ProtectedRoute.jsx     # Protected route wrapper
│       ├── publicRoute.jsx        # Public route wrapper
│       └── ScreenLoading.jsx      # Full screen loading component
│
├── hooks/                         # Custom React hooks
│   ├── useFetchUserProfile.js    # Fetch and initialize user profile
│   └── useUserIcon.js            # User icon/avatar hook
│
├── store/                         # Redux state management
│   ├── store.js                  # Redux store configuration with persistence
│   ├── reducers.js               # Root reducer combination
│   └── slice/
│       ├── user/
│       │   ├── userSlice.js      # User state (profile, auth, other users)
│       │   └── userThunk.js      # User async thunks (login, signup, fetch profile)
│       ├── message/
│       │   ├── messageSlice.js   # Message state (conversations, read status)
│       │   └── messageThunk.js   # Message async thunks (fetch, send messages)
│       └── socket/
│           ├── socket.js         # Socket.IO initialization and connection
│           └── socketSlice.js    # Socket connection state and online users
│
├── App.jsx                        # Root app component with layout
├── main.jsx                       # Application entry point with routing
└── index.css                      # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if not already cloned)
```bash
git clone <repository-url>
cd Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
Create a `.env.local` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Adjust the URLs to match your backend server configuration.

### Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

Check code quality:
```bash
npm run lint
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:5000/api

# Socket.IO Server Configuration
VITE_SOCKET_URL=http://localhost:5000
```

These variables are used by:
- **axiosInstance.js** - API base URL for HTTP requests
- **socket.js** - Socket.IO server connection URL

## 🏗️ Architecture & Key Modules

### State Management (Redux)

**User Slice**
- Manages authentication state (login, signup, profile)
- Stores current user profile information
- Maintains list of other users for searching/messaging
- Handles selected user for active conversation

**Message Slice**
- Stores conversation history
- Tracks selected chat/conversation
- Manages message read status
- Maintains unread message counts
- Controls UI state (message container visibility, loading state)

**Socket Slice**
- Manages Socket.IO connection state
- Tracks online users in real-time
- Stores active socket instance reference

### Real-Time Communication (Socket.IO)

- **Initialization**: Socket connection established in `initializeSocket()` with JWT token authentication
- **Events**: Handles real-time events like new messages, user status changes, read receipts
- **Connection**: Socket is authenticated via token passed in auth payload

### Authentication Flow

1. User navigates to home page (unauthenticated users can access)
2. User submits login/signup form
3. `userLoginThunk` or `userSignupThunk` makes API request
4. Backend returns JWT token
5. Token is stored in Redux state with Redux Persist
6. User is redirected to main messaging interface
7. ProtectedRoute ensures authenticated access to LetsTalk page

### Component Hierarchy

```
App
├── Outlet (React Router)
├── Toaster (React Hot Toast)
└── LetsTalk (Protected)
    ├── UserSidebar
    │   └── User search and list
    └── MessageContainer
        ├── UserAvatar
        ├── ChatBubble (multiple)
        └── MessageSend
```

## 🔐 Security Features

- **Token-based Authentication**: JWT tokens for API requests
- **Protected Routes**: ProtectedRoute component guards authenticated pages
- **Public Routes**: PublicRoute prevents authenticated users from accessing login/signup
- **Axios Interceptors**: Automatic token injection in requests
- **Credential Support**: `withCredentials: true` for secure cookie handling

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS for responsive design
- **DaisyUI**: Pre-built Tailwind CSS components
- **Custom CSS**: Global styles in `index.css`
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## 🐛 Error Handling

- **Axios Error Handler**: `handleErrors.js` provides centralized error handling
- **User Feedback**: React Hot Toast for user-friendly error messages
- **Network Error Component**: Special component for network errors
- **Async Thunk Error Handling**: Thunks use `rejectWithValue` for proper error state management

## 🔗 API Integration

The application communicates with a Node.js/Express backend:

### Key Endpoints
- `POST /login` - User login
- `POST /signup` - User registration
- `GET /profile` - Fetch current user profile
- `GET /users` - Get other users (search)
- `GET /messages/:userId` - Fetch conversation history
- `POST /messages` - Send message
- `PUT /messages/:messageId/read` - Mark message as read

(Specific endpoints depend on backend implementation)

## 📱 Responsive Design

The application is responsive across:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)

Built with Tailwind CSS responsive utilities.

## 🤝 Contributing

When contributing to this project:
1. Follow the existing code structure and naming conventions
2. Use Redux Thunks for async operations
3. Create reusable components in the components folder
4. Use custom hooks for common logic
5. Run `npm run lint` before committing
6. Keep components focused on single responsibility

## 📝 Notes

- Redux Persist is configured to persist all state except the `update` slice
- Socket.IO connection is re-established when the token changes
- Message containers are optimized using refs for better performance
- Authentication state is maintained across page refreshes via Redux Persist

## 🚀 Future Enhancements

Potential features for future development:
- Group messaging
- Message encryption
- Voice/video calling
- Message search and filtering
- Message reactions/emojis
- Typing indicators
- Message forwarding
- Image/file sharing

---

**Last Updated**: May 2026
**Project Type**: Real-Time Messaging Application
**Frontend Framework**: React 19.1.0 with Vite

