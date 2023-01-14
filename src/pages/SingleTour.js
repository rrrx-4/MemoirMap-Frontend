import { useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment"
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }))
    const { id } = useParams()
    const tags = tour?.tags

    useEffect(() => {
        tags && dispatch(getRelatedTours(tags))
    }, [tags])

    useEffect(() => {
        dispatch(getTour(id))
    }, [id])

    return (
        <>
            <MDBContainer>
                <MDBCard className="mb-3 mt-2" >
                    <MDBCardImage position="top" style={{ width: "100%", maxHeight: "600px" }} src={tour.imageFile} alt={tour.title} >
                    </MDBCardImage>



                    <MDBCardBody>
                        <MDBBtn
                            tag="a"
                            color="none"
                            style={{ float: "left", color: "#000" }}
                            onClick={() => navigate("/")}
                        >
                            <MDBIcon
                                fas
                                size="lg"
                                icon="long-arrow-alt-left"
                                style={{ float: "left" }}
                            />
                        </MDBBtn>
                        <h3>{tour.title}</h3>
                        <span>
                            <p className="text-start tourName">Created By: {tour.name}</p>
                        </span>
                        <div style={{ float: "left" }}>
                            <span className="text-start" >{tour && tour.tags && tour.tags.map((item) => `#${item} `)}</span>
                        </div>
                        <br></br>
                        <MDBCardText className="text-start mt-2" >
                            <MDBIcon style={{ float: "left", margin: "5px" }} far icon="calendar-alt" size="lg"></MDBIcon>
                            <small className="text-muted">
                                {moment(tour.createdAt).fromNow()}
                            </small>
                        </MDBCardText>
                        <MDBCardText className="lead md-0 text-start" >
                            {tour.description}
                        </MDBCardText>
                    </MDBCardBody>
                    <RelatedTours relatedTours={relatedTours} tourId={id} ></RelatedTours>
                </MDBCard>
                <DisqusThread id={id} title={tour.title} path={`/tour/${id}`}></DisqusThread>
            </MDBContainer>
        </>
    )
}

export default SingleTour