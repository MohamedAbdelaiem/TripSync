import React, { useState } from "react";
import AdminSideBar from "../../Components/Admin/AminSideBar/AdminSideBar";
import AllTripsList from "../../Components/Admin/AllTripsList/AllTripsList";
import AllAgenciesList from "../../Components/Admin/AllAgenciesList/AllAgenciesList";
import AllTravellersList from "../../Components/Admin/AllTravellersList/AllTravellersList";
import AllReportsList from "../../Components/Admin/AllReports/AllReportsList";
import AdminRewards from "../../Components/Admin/AdminRewards/AdminRewards";
import AllPolicies from "../../Components/Admin/AdminPolicies/AllPolicies";
import { all_user_trips } from "../../Components/Data/all_user_trips";
import { all_Travellers } from "../../Components/Data/all_Travellers";
import { all_agencies } from "../../Components/Data/all_agencies";
import { all_rewards } from "../../Components/Data/Rewards";
import { all_reports } from "../../Components/Data/all_reports";
import { all_policies } from "../../Components/Data/all_policies";
import { useParams } from "react-router-dom";

function AdminView() {
  const [dis_all_trips, set_dis_all_trips] = useState(false);
  const [dis_all_travellers, set_dis_all_travellers] = useState(false);
  const [dis_all_agencies, set_dis_all_agencies] = useState(false);
  const [dis_all_rewards, set_dis_all_rewards] = useState(false);
  const [dis_all_reports, set_dis_all_reports] = useState(false);
  const [dis_all_policies, set_dis_all_policies] = useState(false);

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
  return (
    <div className="amin-view-container">
      <AdminSideBar onMenuSelected={onMenuSelected} />
      {dis_all_trips ? <AllTripsList all_trips={all_user_trips} /> : null}
      {dis_all_agencies ? (
        <AllAgenciesList all_agencies={all_agencies} />
      ) : null}
      {dis_all_travellers ? (
        <AllTravellersList all_travellers={all_Travellers} />
      ) : null}
      {dis_all_rewards ? (
        <AdminRewards all_rewards={all_rewards} userId={adminId} />
      ) : null}
      {dis_all_reports ? (
        <AllReportsList all_reports={all_reports} userId={adminId} />
      ) : null}
      {dis_all_policies ? (
        <AllPolicies all_policies={all_policies} is_admin = {true} admin_id={adminId} />
      ) : null}
    </div>
  );
}

export default AdminView;
