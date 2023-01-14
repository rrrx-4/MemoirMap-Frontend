import { useEffect, useState } from "react"
import React  from 'react'
import {
    MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify'
import { googleSignIn, login } from "../redux/features/authSlice"
import {GoogleLogin} from 'react-google-login'
import {gapi} from 'gapi-script'
import store from "../redux/store"


const initialValues = {
    email:'',
    password:'',
}

const Login = () => {

    const [ formValue, setFormValue] = useState(initialValues)

    const { loading, error  } = useSelector((store)=> ({...store.auth}))

    useEffect(()=>{
      error && toast.error(error)
    },[error])

    const {email, password} = formValue

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit =(e)=>{
        e.preventDefault()

        if(email && password)
        {
          dispatch(login({formValue, navigate, toast}))
        }

    }
    const onInputChange =(e)=>{
        const name = e.target.name
        const value = e.target.value

        setFormValue({...formValue, [name]:value})
    }

    const clientId = "85330852291-8t682bur17gqg0rpf34utimgjovftt3a.apps.googleusercontent.com"

useEffect (() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId : clientId })
    })
  }, [])

  const googleSuccess = (resp)=>{
    // console.log(resp);
    const email = resp?.profileObj?.email
    const name = resp?.profileObj?.name
    const token = resp?.tokenId
    const googleId = resp?.googleId
    const result = { email, name, token, googleId }
    // console.log(result);
    dispatch(googleSignIn({result, navigate, toast}))
  };
  const googleFailure = (error)=>{
    toast.error(error)
  }

  return (
    <div style={{
        margin:"auto",
        padding:"15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop:"120px",
    }}  >

    <MDBCard>
        <MDBIcon fas icon="user-circle" className="fa-2x" ></MDBIcon>
        <h5>Sign In</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3" >
                 <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
                <div className="col-12" >
                    <MDBBtn style={{width: "100%"}} className="mt-2" >
                      {loading && (<MDBSpinner size='sm' role='status' tag='span' className="me-2" ></MDBSpinner>)}
                      Login</MDBBtn>
                </div>
            </MDBValidation>
            <br></br>
             <GoogleLogin
            clientId="85330852291-8t682bur17gqg0rpf34utimgjovftt3a.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </MDBCardBody>
        <MDBCardFooter>
            <Link to='/register'>
            <p>Don't have an account ? Sign up</p></Link>
        </MDBCardFooter>
    </MDBCard>

    </div>
  )
}

export default Login