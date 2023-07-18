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
    const url = signUp ? "http://localhost:5000/signup" : "http://localhost:5000/login"
    fetch(url, {
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
          throw new Error("Incorrect credentials!") // Provide a meaningful error message
        }
      })
      .then((data) => {
        updateUser(data)
        // currently navigates to their timeline page but would like for the page to instead load the user's milestones ** 
        navigate(`/timelines/${data.id}`)
      })
      .catch((error) => {
        console.error(error)
        console.log(error.response)
        // Handle the error, display an error message to the user, etc.
      })
  }

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    // birthday: yup.date().required("Please enter your birthdate"), * took this validation off because it wouldnt allow my login function to work 
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      birthday: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <div>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <p>To fully enjoy this application, it is best you create an account.</p>
        <button onClick={handleClick}>{signUp ? "Log In!" : "Sign Up!"}</button>
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
        <label>Password : </label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        {signUp && (
          <>
            <label>Birthdate : </label>
            <input
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
            {formik.touched.birthday && formik.errors.birthday ? (
              <div>{formik.errors.birthday}</div>
            ) : null}
            <br />
            <br />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>
    </>
  )
}

export default Authentication