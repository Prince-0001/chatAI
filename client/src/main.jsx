import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Homepage from './routes/homepage/Homepage.jsx';
import DashboardPage from './routes/dashboardPage/DashboardPage.jsx';
import ChatPage from './routes/chatPage/ChatPage.jsx';
import RootLayout from './layouts/rootlayout/RootLayout.jsx';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout.jsx';
import SignInPage from './routes/signInPage/SignInPage.jsx';
import SignUpPage from './routes/signUpPage/SignUpPage.jsx';
import Login from './routes/Login/Login.jsx';
import Register from './routes/Register/Register.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

const router= createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {
        path:"/",
        element:<Homepage/>,
      },
      
      
      // { path: '/sign-in/*', element: <SignInPage/> },
      // { path: '/sign-up/*', element: <SignUpPage/> },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        element:<DashboardLayout/>,
        children:[
          {
            path:'/dashboard',
            element:<DashboardPage/>,
          },
          {
            path:'/dashboard/chats/:id',
            element:<ChatPage/>
          }
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthContextProvider >
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </AuthContextProvider>
    
  </StrictMode>,
)
