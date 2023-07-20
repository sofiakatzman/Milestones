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
    const url = signUp ? "/signup" : "/login"
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
          throw new Error("Incorrect credentials!")
        }
      })
      .then((data) => {
        updateUser(data)
        navigate(`/`)
      })
      .catch((error) => {
        console.error(error)
        console.log(error.response)
      })
  }

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.")
    // birthday: yup.date().required("Please enter your birthdate"), * took this validation off because it wouldnt allow my login function to work 
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      birthday: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <form className="auth-form" onSubmit={formik.handleSubmit}> 
     <h4>{signUp ? "Enter your credentials to sign up!" : "Enter your credentials to log in!"}</h4><br />
        <input
          type="text"
          name="username"
          placeholder="username" 
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="password" 
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br /><br />
        {signUp && (
          <>
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
      
      <h5>{signUp ? "Already a member?" : "Not a member?"}</h5>
      <button type="button" onClick={handleClick}>{signUp ? "Log In!" : "Sign Up!"}</button> <br/><br/>
      </form> 
      {formik.errors && (
        <div className="errors">
          <ul>
            {Object.values(formik.errors).map((error, index) => (
              <h6 key={index} style={{ color: 'red' }}>{error}</h6>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Authentication