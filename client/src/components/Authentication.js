import { useState } from "react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setSignUp((prevState) => !prevState)
  }

  const handleSubmit = (values) => {
    console.log(values)
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Incorrect username!") // Provide a meaningful error message
        }
      })
      .then((data) => {
        updateUser(data)
        // currently navigates to their timeline page but would like for the page to instead load 
        navigate(`/timelines/${data.id}`)
      })
      .catch((error) => {
        console.error(error)
        // Handle the error, display an error message to the user, etc.
      })
  }

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    // password: yup.string().required("Please enter a password"),
    // birthday: yup.date().required("Please enter your birthdate"),
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      birthday: "",
      // password: "",
    },
    validationSchema:formSchema,
    onSubmit:(values) =>{
      fetch(signUp?'http://localhost:5000/users':'http://localhost:5000/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(values)
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Incorrect username!") 
        }
      })
      .then((data) => {
        updateUser(data)
        // currently navigates to their timeline page but would like for the page to instead load 
        navigate(`/timelines/${data.id}`)
      })
      .catch((error) => {
        console.error(error)
      })
    }
})

  return (
    <>
      <div>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <p>To fully enjoy this application, it is best you create an account.</p>
        <button onClick={handleClick}>
          {signUp ? "Log In!" : "Sign Up!"}
        </button>
        <br />
        <br />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <label>Username : </label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        {/* <label>Password : </label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        /> */}
        {signUp && (
          <>
            <br />
            <br />
            <label>Birthdate : </label>
            <input
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
          </>
        )}
        <br />
        <br />
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>
    </>
  )
}

export default Authentication
