import React from "react";
import Blog from "../../Components/Blog/Blog";
import profilePic from "../../assets/profile.png";
import NavbarSignedInner from "../../Components/NavbarSignedInner/NavbarSignedInner";
import "./Blogs.css";

function Blogs() {
  return (
    <>
      <NavbarSignedInner />

      <input
        type="text"
        placeholder="What's in your mind?"
        className="newBlog"
      ></input>

      <div className="blogs-container">
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
        <Blog
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit odio qui ipsum, consequuntur porro accusamus, repudiandae dolorum voluptates est quaerat! Minus, dolore soluta quasi laborum suscipit quas eius quisquam."
          }
          profilePic={profilePic}
          time={"12:20"}
          date={"10/10/2024"}
          username={"Esraa"}
        />
      </div>
    </>
  );
}

export default Blogs;
