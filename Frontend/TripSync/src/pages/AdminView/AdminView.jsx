import React, { useState, useEffect } from "react";
import AdminSideBar from "../../Components/Admin/AminSideBar/AdminSideBar";
import AllTripsList from "../../Components/Admin/AllTripsList/AllTripsList";
import AllAgenciesList from "../../Components/Admin/AllAgenciesList/AllAgenciesList";
import AllTravellersList from "../../Components/Admin/AllTravellersList/AllTravellersList";
import AllReportsList from "../../Components/Admin/AllReports/AllReportsList";
import AdminRewards from "../../Components/Admin/AdminRewards/AdminRewards";
import AllPolicies from "../../Components/Admin/AdminPolicies/AllPolicies";
import { all_user_trips } from "../../Components/Data/all_user_trips";
// import { all_Travellers } from "../../Components/Data/all_Travellers";
// import { all_agencies } from "../../Components/Data/all_agencies";
// import { all_rewards } from "../../Components/Data/Rewards";
// import { all_reports } from "../../Components/Data/all_reports";
// import { all_policies } from "../../Components/Data/all_policies";
import { useParams } from "react-router-dom";
import { func } from "prop-types";
import axios from "axios";
// import { getAllReports } from "../../../../../Server/Controllers/ReportController";

function AdminView() {
  const [dis_all_trips, set_dis_all_trips] = useState(false);
  const [dis_all_travellers, set_dis_all_travellers] = useState(false);
  const [dis_all_agencies, set_dis_all_agencies] = useState(false);
  const [dis_all_rewards, set_dis_all_rewards] = useState(false);
  const [dis_all_reports, set_dis_all_reports] = useState(false);
  const [dis_all_policies, set_dis_all_policies] = useState(false);

  const [all_user_trips, set_all_user_trips] = useState([]);
  const [all_Travellers, set_all_Travellers] = useState([]);
  const [all_Travelagencies, set_all_agencies] = useState([]);
  const [all_rewards, set_all_rewards] = useState([]);
  const [all_reports, set_all_reports] = useState([]);
  const [all_policies, set_all_policies] = useState([]);

  let { adminId } = useParams();
  const onMenuSelected = (selected_item_name) => {
    set_dis_all_agencies(selected_item_name === "all-agencies" ? true : false);
    set_dis_all_travellers(
      selected_item_name === "all-travellers" ? true : false
    );
    set_dis_all_trips(selected_item_name === "all-trips" ? true : false);
    set_dis_all_rewards(selected_item_name === "all-rewards" ? true : false);
    set_dis_all_reports(selected_item_name === "all-reports" ? true : false);
    set_dis_all_policies(selected_item_name === "all-policies" ? true : false);
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
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTrips = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/trips/getAllTrips`,
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
      console.log(res.data);
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
      console.log(res.data);
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
      console.log(res.data);
      set_all_Travellers(res.data);
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
  }, []);

  const Rerender_admin_component = () => {
    console.log("rerender");
    getAllTravellers();
  }

  return (
    <div className="amin-view-container">
      <AdminSideBar onMenuSelected={onMenuSelected} />
      {dis_all_trips ? (
        <AllTripsList
          all_trips={all_user_trips}
          rerender={getAllTrips}
        />
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
    </div>
  );
}

export default AdminView;
