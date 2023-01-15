import { useState } from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from 'mdb-react-ui-kit'

import { setLogout } from '../redux/features/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { searchTours } from '../redux/features/tourSlice'
import { useNavigate } from 'react-router-dom'


const Header = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch(setLogout())
    }

    const navigate = useNavigate()

    const { user } = useSelector((state) => ({ ...state.auth }))

    // console.log(user);

    const [show, setShow] = useState(false)

    const [search, setSearch] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        if (search) {
            dispatch(searchTours(search))
            navigate(`/tours/search?searchQuery=${search}`)
            setSearch("")
        } else {
            navigate('/')
        }
    }


    return (
        <MDBNavbar fixed='top' expand='lg' style={{ backgroundColor: "#f0e6ea" }} >
            <MDBContainer>
                <MDBNavbarBrand
                    href="/" style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
                >
                    Touropedia

                </MDBNavbarBrand>
                <MDBNavbarToggler type="button" aria-expanded="false"
                    aria-label="Toogle navigation"
                    onClick={() => setShow(!show)}
                    style={{ color: "#606080" }}
                >
                    <MDBIcon icon='bars' fas></MDBIcon>
                </MDBNavbarToggler>

                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-1g-0' >
                        {
                            user?.result?._id && (
                                <h6 style={{ marginRight: "30px", marginTop: "27px" }}>
                                    Logged in as: {user?.result?.name}
                                </h6>
                            )
                        }
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>
                                <p className='header-text'>Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/addTour'>
                                        <p className='header-text'>Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/dashboard'>
                                        <p className='header-text'>Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className='header-text' onClick={handleLogout}>Logout</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (<MDBNavbarItem>
                            <MDBNavbarLink href='/login'>
                                <p className='header-text'>Login</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>)}


                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto' onSubmit={handleSubmit} >
                        <input type='text' className='form-control' placeholder='Search Tour' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                        <div style={{ marginTop: "5px", marginLeft: "5px" }} >
                            <MDBIcon fas icon='search'></MDBIcon>
                        </div>
                    </form>
                </MDBCollapse>

            </MDBContainer>

        </MDBNavbar>
    )
}

export default Header