import { useEffect, useState } from "react"
import React  from 'react'
import {
    MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify'
 import { register } from "../redux/features/authSlice"

import store from "../redux/store"


const initialValues = {
    firstName: "",
    lastName: "",
    email:"",
    password:"",
    confirmPassword: ""
}

const Login = () => {

    const [ formValue, setFormValue] = useState(initialValues)

    const { loading, error  } = useSelector((store)=> ({...store.auth}))

  

    const {email, password, firstName, lastName, confirmPassword} = formValue

    const dispatch = useDispatch()
    const navigate = useNavigate()

  useEffect(()=>{
      error && toast.error(error)
    },[error])


    const handleSubmit =(e)=>{
        e.preventDefault()

        if(password !== confirmPassword)
        {
          return toast.error("Password should match")
        }

        if(email && password && firstName && lastName && confirmPassword )
        {
          dispatch(register({formValue, navigate, toast}))
        }

    }
    const onInputChange =(e)=>{
        const name = e.target.name
        const value = e.target.value

        setFormValue({...formValue, [name]:value})
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
        <h5>Sign Up</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3" >
              <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="firstName"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your First Name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="lastName"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your Last Name"
              />
            </div>
              <div className="col-md-6">
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
             <div className="col-md-12">
              <MDBInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your Confirm Password"
              />
            </div>
                <div className="col-12" >
                    <MDBBtn style={{width: "100%"}} className="mt-2" >
                      {loading && (<MDBSpinner size='sm' role='status' tag='span' className="me-2" ></MDBSpinner>)}
                      Register</MDBBtn>
                </div>
            </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
            <Link to='/login'>
            <p>Already have an account ? Sign in</p></Link>
        </MDBCardFooter>
    </MDBCard>

    </div>
  )
}

export default Login