import logo from './logo.svg';
import './App.css';
import LoginScreen from './LoginScreen';
import MainMenu from './MainMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import functions for creating and managing routes
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Create a router configuration with defined routes
const router = createBrowserRouter([
  {
    // Define the root path "/" to render the LoginScreen component
    path: "/",
    element: <LoginScreen />,
  },
  {
    // Define "/login" path to also render the LoginScreen component
    path:"/login",
    element: <LoginScreen />,
  },
  {
    // Define "/home" path to render the MainMenu component
    path: "/home",
    element: <MainMenu></MainMenu>,
  },
]);

// Define the main App component
function App() {
  return (
      // Provide the created router to the application
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
