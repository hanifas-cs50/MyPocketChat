import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import './index.css';
import pb from './lib/pocketbase';
import App from './pages/App';
import Login from './pages/Login';
import Signup from './pages/Signup';

function checkUser() {
  let isLoggedIn = pb.authStore.isValid;
  return isLoggedIn
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      if (checkUser() === true) return redirect("/home");
      return null;
    },
    element: <Login />
  },
  {
    path: "signup",
    loader: () => {
      if (checkUser() === true) return redirect("/home");
      return null;
    },
    element: <Signup />
  },
  {
    path: "home",
    loader: () => {
      if (checkUser() === false) return redirect("/");
      return null;
    },
    element: <App />
  }
])

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main className="absolute w-screen h-screen flex flex-col items-center justify-center bg-zinc-900">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </main>
  </React.StrictMode>
);