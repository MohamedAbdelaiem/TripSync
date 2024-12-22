import {React,useState,useEffect} from "react";
import axios from "axios";
import "./AllAgenciesList.css";
import { useNavigate } from "react-router-dom";

function AgencyCard({ image_url, id, prof_name, rerender }) {
  const navigete = useNavigate();
  const [blocks, setBlocks] = useState(0);
  const onViewProfile = () => {
    navigete(`/travel-agency/${id}`);
  };
  const token = localStorage.getItem("token");
  const getNumberOfBlocks = async () => {
    try{
      const res = await axios.get(
        `http://localhost:3000/api/v1/reports/getallreportsofAgency/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setBlocks(res.data.data);
    }
    catch(err){
      console.log(err);
    }
  };
  
  const onBlockUser = async() => {
    await axios
      .delete(`http://localhost:3000/api/v1/users/deleteUser`, {
        data: {
          user_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        rerender();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNumberOfBlocks();
  }, []);

  
  return (
    <div className="agency-card-container">
      <div className="agency-card-info">
        <img src={image_url} alt={prof_name} className="agnecy-card-photo" />
        <div className="informatonAgency">
          <h3 className="agency-card-name">{prof_name}</h3>
          <p className="agency-card-reports"> number of reports are: {blocks}</p>
        </div>
        <div className="agency-card-actions">
          <button
            className="view-agency-card-profile-btn"
            onClick={onViewProfile}
          >
            View Profile
          </button>
          <button className="block-agency-card-user-btn" onClick={onBlockUser}>
            Block User
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgencyCard;
