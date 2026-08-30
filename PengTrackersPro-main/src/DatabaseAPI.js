//for maxing requests
import axios from "axios"


// Function to handle user signup
export async function DatabaseAPI_SignUp(email, username, password)
{
  // Data structure to send in the signup request
    const signUpDataStruct = {
        "email":email,
        "username":username,
        "password":password
    }

    // const jsonSignUpDataStruct = JSON.stringify(signUpDataStruct)

    // Variable to store the response
    var res = null

    // Send a POST request to the signup endpoint with user data
    await axios.post("http://localhost:3000/signup", signUpDataStruct)
     .then(function (response) {
        console.log(response);
        res = response

        // If the response contains data, set the authentication session
        if(res != null)
          {
            if(res.data != null){
              DatabaseAPI_SetAuthSession(res.data)
            } else {
              // Alert the user if authentication data is missing
              alert("Error concerning authentication token.")
              return;
            }
        }
      })
      .catch(function (error) {
        // Log and handle any errors encountered
        console.log(error);
        DatabaseAPI_PrintLoginError(error, "signup");
      })

    // Return the response to the caller
    return res
}

// Function to handle and display login/signup-related errors
function DatabaseAPI_PrintLoginError(error, type)
{
  //Universal errors
  if(error.status == 422)
  {
    alert("Your password must be longer than 7 characters!")
    return;
  }

  // Handle specific signup errors
  if(type == "signup"){
    if(error.status == 409)
    {
      alert("This user already exists! Please choose another email and/or username.")
      return;
    }
    // Handle specific login errors
  } else if(type == "login"){
    if(error.status == 404)
    {
      alert("User not found")
      return;
    }

    if(error.status == 401)
    {
      alert("Username or password is incorrect")
      return;
    }
  }

  // Default error message for unknown issues
  alert("An unknown error occurred.")
}

// Function to handle user login
export async function DatabaseAPI_LogIn(username, password)
{
    // Data structure to send in the login request
    const logInDataStruct = {
        "username":username,
        "password":password
    }

    //Store the response to be returned to the caller
    var res = null
    // Send a POST request to the login endpoint with user data
    await axios.post("http://localhost:3000/login", logInDataStruct)
     .then(function (response) {
        console.log(response);
        res = response

        // If the response contains data, set the authentication session
        if(res != null)
        {

          if(res.data != null){
            DatabaseAPI_SetAuthSession(res.data)
          } else {
            // Alert the user if authentication data is missing
            alert("Error concerning authentication token.")
            return;
          }
      }
      })
      .catch(function (error) {
        // Log and handle any errors encountered
        console.log(error);
        DatabaseAPI_PrintLoginError(error, "login")
      })

    // Return the response to the caller
    return res
}

// Function to set the authentication token in session storage
export async function DatabaseAPI_SetAuthSession(authToken)
{
  console.log("Setting auth token to: ", authToken)
  sessionStorage.setItem("authToken", authToken)
}

// Function to handle user logout
export async function handleLogout() {
    // Send a POST request to the logout API
    try {
        await fetch('api/logout', {method: 'POST'});
        // Clear session storage and redirect the user to the login page
        sessionStorage.clear();
        window.location.pathname = '/login';
    } catch (error) {
        // Log and alert the user if logout fails
        console.error("Logout failed: ", error);
        alert("Error while logging you out.\nPlease try again.");
    }

}


