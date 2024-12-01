
import './OurStory.css'
import  SidNavBar from '../../Components/SideNavBar/SideNavBar';
import  { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const OurStory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("type"); // Retrieve the 'type' value
  const [description, setDescription] = useState(""); 
  const [Name, setName] = useState(""); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch data from the API
    const fetchDescription = async () => {
      try {
        const response = await fetch('/OurStory.json');
        
        const data = await response.json();
        console.log(data);
        setDescription(data.description);
        setName(data.Name); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
        setLoading(false);
      }
    };

    fetchDescription();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className='flex'>
    <SidNavBar type={userType}></SidNavBar>
    <div className="about-us">
      <h1 className="header-title">{Name}</h1>
      <div className="header-underline"></div>
      <div className="description">{description}</div>
    </div>
    
    </div>
 
    </>
  );
};

export default OurStory;

