import "./AdminView.css";

import AdminSideBar from "../../Components/Admin/AminSideBar/AdminSideBar";
import AllTripsList from "../../Components/Admin/AllTripsList/AllTripsList";
import AllAgenciesList from "../../Components/Admin/AllAgenciesList/AllAgenciesList";
import AllTravellersList from "../../Components/Admin/AllTravellersList/AllTravellersList";
import AllReportsList from "../../Components/Admin/AllReports/AllReportsList";
import AdminRewards from "../../Components/Admin/AdminRewards/AdminRewards";
import AllPolicies from "../../Components/Admin/AdminPolicies/AllPolicies";
import CreateAdmin from "../../Components/Admin/CreateAdmin/CreateAdmin";
import AllAdminsList from "../../Components/Admin/AllAdminsList/AllAdmins";
import AdminEditForm from "../../Components/Admin/editAdmin/EditAdmin";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../assets/userContext";
import { useParams } from "react-router-dom";
import { func } from "prop-types";
import axios from "axios";

function AdminView() {
  const [dis_all_trips, set_dis_all_trips] = useState(false);
  const [dis_all_travellers, set_dis_all_travellers] = useState(false);
  const [dis_all_agencies, set_dis_all_agencies] = useState(false);
  const [dis_all_rewards, set_dis_all_rewards] = useState(false);
  const [dis_all_reports, set_dis_all_reports] = useState(false);
  const [dis_all_policies, set_dis_all_policies] = useState(false);
  const [dis_create_admin, set_dis_create_admin] = useState(false);
  const [dis_all_admins, set_dis_all_admins] = useState(false);
  const [edit_me, set_edit_me] = useState(false);

  const [all_user_trips, set_all_user_trips] = useState([]);
  const [all_Travellers, set_all_Travellers] = useState([]);
  const [all_Travelagencies, set_all_agencies] = useState([]);
  const [all_rewards, set_all_rewards] = useState([]);
  const [all_reports, set_all_reports] = useState([]);
  const [all_policies, set_all_policies] = useState([]);
  const [all_admins, set_all_admins] = useState([]);

  const { user, setUser } = useContext(UserContext);
  let { adminId } = useParams();

  const [showPopup, setShowPopup] = useState(false);
  const [fail, setFail] = useState(false);
  const [success, setsuccess] = useState(false);
  const [popMessageContent, setPopMessageContent] = useState("");
  const togglePoppUp = (content, status) => {
    setShowPopup(!showPopup);
    setsuccess(status === "success" ? true : false);
    setFail(status === "success" ? false : true);
    setPopMessageContent(content);
  };

  if (user === null || user.role !== "admin") {
    return (
      <div className="not-admin-container">
        <div className="not-admin-card">
          <h1 className="not-admin-title">Access Denied</h1>
          <p className="not-admin-message">
            You do not have the necessary permissions to access this page. This
            section is for administrators only.
          </p>
          <a href="/" className="back-to-home-button">
            Go Back to Home
          </a>
        </div>
      </div>
    );
  }
  if (user.user_id != adminId) {
    return (
      <>
        <div className="error-in-id">
          <h1> not found </h1>
        </div>
      </>
    );
  }

  const onMenuSelected = (selected_item_name) => {
    set_dis_all_agencies(selected_item_name === "all-agencies" ? true : false);
    set_dis_all_travellers(
      selected_item_name === "all-travellers" ? true : false
    );
    set_dis_all_trips(selected_item_name === "all-trips" ? true : false);
    set_dis_all_rewards(selected_item_name === "all-rewards" ? true : false);
    set_dis_all_reports(selected_item_name === "all-reports" ? true : false);
    set_dis_all_policies(selected_item_name === "all-policies" ? true : false);
    set_dis_create_admin(selected_item_name === "create-admin" ? true : false);
    set_dis_all_admins(selected_item_name === "all-admins" ? true : false);
    set_edit_me(selected_item_name === "edit-me" ? true : false);
  };
  const getAllTravelAgencies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getAllTravelAgencies`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // set_dis_all_agencies(true);
      set_all_agencies(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTrips = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/trips/getAllTripsForAdmin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      set_all_user_trips(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRewards = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/rewards/getAllRewards`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      set_all_rewards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllReports = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/reports/getAllReports`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.data);
      set_all_reports(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPolicies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/policies/getAllPolicies`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      set_all_policies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTravellers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getAllTravelers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      set_all_Travellers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAdmins = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getAllAdmins`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
      set_all_admins(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTravellers();
    getAllTravelAgencies();
    getAllRewards();
    getAllReports();
    getAllPolicies();
    getAllTrips();
    getAllAdmins();
    setShowPopup(false);
  }, []);

  const rerender = () => {
        getAllAdmins();
        setShowPopup(false);
  }
  // console.log(all_user_trips);

  return (
    <div className="amin-view-container">
      <AdminSideBar onMenuSelected={onMenuSelected} />
      {dis_all_trips ? (
        <AllTripsList all_trips={all_user_trips} rerender={getAllTrips} />
      ) : null}
      {dis_all_agencies ? (
        <AllAgenciesList
          all_agencies={all_Travelagencies}
          rerender={getAllTravelAgencies}
        />
      ) : null}
      {dis_all_travellers ? (
        <AllTravellersList
          all_travellers={all_Travellers}
          rerender={getAllTravellers}
        />
      ) : null}
      {dis_all_rewards ? (
        <AdminRewards
          all_rewards={all_rewards}
          userId={adminId}
          rerender={getAllRewards}
        />
      ) : null}
      {dis_all_reports ? (
        <AllReportsList
          all_reports={all_reports}
          userId={adminId}
          rerender={getAllReports}
        />
      ) : null}
      {dis_all_policies ? (
        <AllPolicies
          all_policies={all_policies}
          is_admin={true}
          admin_id={adminId}
          rerender={getAllPolicies}
        />
      ) : null}
      {dis_all_admins ? (
        <AllAdminsList all_admins={all_admins} rerender={getAllAdmins} />
      ) : null}
      {dis_create_admin ? (
        <CreateAdmin rerender={rerender} showPopUp={togglePoppUp} />
      ) : null}

      {edit_me ? <AdminEditForm /> : null}

      {showPopup && (
        <div className="popup-overlay-Reward-container">
          <div className="popup-overlay-Reward">
            <div className="popup-content-Reward">
              <h5>
                <span style={{ color: success ? "#1ac136" : "#ff0000" }}>
                  {success ? "successful process" : "un successful process"}
                </span>
              </h5>
              <p>
                {popMessageContent} &nbsp;
                {success ? (
                  <i
                    className="fa-solid fa-check"
                    style={{
                      color: "#1ac136",
                      fontSize: "2rem",
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-x"
                    style={{
                      color: "#ff0000",
                      fontSize: "2rem",
                    }}
                  ></i>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;
