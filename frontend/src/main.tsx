import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Subjects from './pages/Subjects'
import SubjectDetail from './pages/SubjectDetail'
import Routine from './pages/Routine'
import Tasks from './pages/Tasks'
import './styles.css'; import './theme.css'
const router = createBrowserRouter([
  { path: '/', element: <App/>, children: [
    { index:true, element: <Subjects/> },
    { path: 'subjects/:id', element: <SubjectDetail/> },
    { path: 'routine', element: <Routine/> },
    { path: 'tasks', element: <Tasks/> }
  ]},
  { path: '/login', element: <Login/> },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
