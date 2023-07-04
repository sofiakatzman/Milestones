import { useState } from "react"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => setSignUp((signUp) => !signUp)

  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    password: yup.string().required("Please enter a password"),
    birthday: yup.date().required("Please enter your birthdate.")
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      birthday: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values)
      fetch(signUp ? 'http://127.0.0.1:5000/users' : 'http://127.0.0.1:5000/login', {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(user => {
          console.log(user)
          updateUser(user)
          navigate('/')
      })
    }
  })

  return (
    <>
      <h2>Please LOGIN or SIGNUP!</h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member?'}</h2>
      <button onClick={handleClick}>{signUp ? 'Log In!' : 'Sign Up!'}</button>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Username
        </label>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
        <label>
          Password
        </label>
        <input type='text' name='password' value={formik.values.password} onChange={formik.handleChange} />
        {signUp && (
          <>
            <label>
              Birthdate
            </label>
            <input type='date' name='birthday' value={formik.values.birthday} onChange={formik.handleChange} />
          </>
        )}
        <input type='submit' value={signUp ? 'Sign Up!' : 'Log In!'} />
      </form>
    </>
  )
}

export default Authentication
