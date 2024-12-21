import {React,useContext} from 'react';
import './reviewCard.css';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { UserContext } from '../../assets/userContext';

function ReviewCard({ review, rate, traveller_id, travel_agency_id, profilename, profilephoto,reRender }) {
    // Function to render stars based on rating
    const {user}=useContext(UserContext);
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i key={i} className={i <= rate ? "fas fa-star" : "far fa-star"}></i>
            );
        }
        return stars;
    };

    const deleteReview = async () => {
        if(user.role!=="admin")
        {
        if(user.user_id!==traveller_id){
            alert("You can't delete this review");
            return;
        }
    }
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:3000/api/v1/users/${travel_agency_id}/reviews/reviews/deleteReview`,
                {
                    data: {
                        traveller_id: traveller_id, // Sending traveller_id in the body
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            console.log(response.data);
            reRender();
        }

        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
                <div className="testimonial-container">
                    <div className="testimonial-box">
                        <div className="box-top">
                            <div className="profile-in-card">
                                <div className="profile-img-in-card">
                                    <img src={profilephoto} alt="Profile" />
                                </div>
                                <div className="profile-name-in-card">
                                    <strong>{profilename}</strong>
                                </div>
                            </div>
                            <div className="review-actions">
                                <div className="reviews-in-card">
                                    {renderStars()}
                                </div>
                                <button 
                                    className="delete-button-review"
                                    onClick={() => {
                                        deleteReview();
                                    }}
                                    aria-label="Delete review"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="review-text-in-card">
                            <p>{review}</p>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default ReviewCard;
