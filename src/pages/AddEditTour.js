import { useState, useEffect } from "react"
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner, MDBInput } from "mdb-react-ui-kit"
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { oast, toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createTour, updatedTour } from "../redux/features/tourSlice"


const initialState = {
    title: "",
    description: "",
    tags: []
}

const AddEditTour = () => {

    const [tourData, setTourData] = useState(initialState)

    const [tagErrMsg, setTagErrMsg] = useState(null);

    const navigate = useNavigate()

    const { error, loading, userTours } = useSelector((store) => ({ ...store.tour }))

    const { user } = useSelector((store) => ({ ...store.auth }))

    const dispatch = useDispatch()

    const { title, description, tags } = tourData

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const singleTour = userTours.find((item) => item._id === id)
            setTourData({ ...singleTour })
        }
    }, [id])

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tags.length) {
            setTagErrMsg("Please provide some tags")
        }

        if (title && description && tags) {
            //  console.log('hhh');
            const updatedTourData = { ...tourData, name: user?.result?.name }

            if (!id) {
                dispatch(createTour({ updatedTourData, navigate, toast }))
            } else {
                dispatch(updatedTour({ id, updatedTourData, navigate, toast }))
            }


            handleClear()
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setTourData({ ...tourData, [name]: value })
    }

    const handleAddTag = (tag) => {
        setTagErrMsg(null)
        setTourData({ ...tourData, tags: [...tourData.tags, tag] })
    }

    const handleDeleteTag = (deleteTag) => {
        setTourData({ ...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag), })
    }

    const handleClear = () => {
        setTourData({ title: "", description: "", tags: [] })
    }

    return (
        <div style={{
            marginTop: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px",
        }} className='container' >

            <MDBCard alignment="center" >
                <h5> {id ? "Update TOur" : "Add Tour"} </h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate >
                        <div className="col-md-12" >
                            <MDBInput placeholder="Title"
                                type="text"
                                value={title}
                                name='title'
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please provide title"
                            ></MDBInput>
                        </div>
                        <div className="col-md-12" >
                            <MDBInput placeholder="Description"
                                type="text"
                                value={description}
                                name='description'
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                textarea
                                rows={4}
                                validation="Please provide description"
                            ></MDBInput>
                        </div>
                        <div className="col-md-12" >
                            <ChipInput
                                name="tags"
                                variant="outlined"
                                placeholder="Enter Tag"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            ></ChipInput>
                            {tagErrMsg && (<div className="tagErrMsg">{tagErrMsg}</div>)}
                        </div>
                        <div className="d-flex justify-content-start" >
                            <FileBase type="file" multiple={false}
                                onDone={({ base64 }) =>
                                    setTourData({ ...tourData, imageFile: base64 })
                                }
                            ></FileBase>
                        </div>
                        <div className="col-12" >
                            <MDBBtn style={{ width: "100%" }}>{id ? "Update" : "Submit"}</MDBBtn>
                            <MDBBtn style={{ width: "100%" }} className="mt-2" color="danger" onClick={handleClear}>clear</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>

        </div>

    )
}

export default AddEditTour