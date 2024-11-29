
import './OurStory.css'

import AgencyNav from '../../Components/AgencyNav/AgencyNav';
import AgencyFooter from '../../Components/AgencyFooter/AgencyFooter';
import  { useState, useEffect } from "react";

const OurStory = () => {
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
    <AgencyNav></AgencyNav>
    <div className="about-us">
      <h1 className="header-title">{Name}</h1>
      <div className="header-underline"></div>
      <div className="description">{description}</div>
    </div>
    <AgencyFooter></AgencyFooter>
    </div>
 
    </>
  );
};

export default OurStory;

