import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Homepage from './routes/homepage/homepage.jsx';
import DashboardPage from './routes/dashboardPage/dashboardPage.jsx';
import ChatPage from './routes/chatPage/chatPage.jsx';
import RootLayout from './layouts/rootlayout/RootLayout.jsx';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout.jsx';
import SignInPage from './routes/signInPage/SignInPage.jsx';
import SignUpPage from './routes/signupPage/SignupPage.jsx';

const router= createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {
        path:"/",
        element:<Homepage/>,
      },
      
      
      { path: '/sign-in/*', element: <SignInPage/> },
      { path: '/sign-up/*', element: <SignUpPage/> },
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
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
