import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/authentication/Login.jsx";
import { Signup } from "./pages/authentication/Signup.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Provider } from "react-redux";
import { LetsTalk } from "./pages/letstalk/LetsTalk.jsx";
import { ProtectedRoute } from "./components/utility/ProtectedRoute.jsx";
import App from "./App.jsx";
import { PublicRoute } from "./components/utility/publicRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import { Profile } from "./pages/letstalk/Profile.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: (
            <PublicRoute>
              <Home />
            </PublicRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <PublicRoute>
              <Signup />
            </PublicRoute>
          ),
        },
        {
          path: "/letstalk",
          element: (
            <ProtectedRoute>
              <LetsTalk />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],

  {
    future: {
      v7_startTransition: true, // Opt-in to smoother transitions
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
