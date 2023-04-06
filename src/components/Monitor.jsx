import React, { useEffect, useState } from "react";
import "./Monitor.css";
import TopUsersForEachEndpoint from "./admin_components/TopUsersForEachEndpoint";
import TopUsersAfter from './admin_components/TopUsersAfter'
import EndpointError from './admin_components/EndpointError'
import ErrorsAfter from './admin_components/ErrorsAfter'
import {link} from '../backend'

const Monitor = ({ accessToken, refreshToken }) => {
  const [report, setReport] = useState([]);
  const [reportType, setReportTpe] = useState("");
  const [days, setDays] = useState({afterDay:'2020-01-01', beforeDay: '2024-01-01' });
  const getReport = (reportType) => {
    fetch(link+"report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token-refresh": refreshToken,
        "auth-token-access": accessToken,
      },
      // topUsersForEachEndpoint topUsersAfter endpointError errorsAfter
      body: JSON.stringify({ reportType: reportType,  afterDay: days.afterDay, beforeDay: days.beforeDay}),
    })
      .then((response) => response.json())
      .then((data) => {
        setReport(data);
        setReportTpe(reportType)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const topUsersForEachEndpoint = () => {
    getReport("topUsersForEachEndpoint");
    // setTimeout(() => setReportTpe('topUsersForEachEndpoint'), 1000)
  };

  const topUsersAfter = () => {
    getReport("topUsersAfter");
    // setTimeout(() => setReportTpe('topUsersAfter'), 1000)
  };

  const endpointError = () => {
    getReport("endpointError");
    // setTimeout(() => setReportTpe('topUsersAfter'), 1000)
  };

  const errorsAfter = () => {
    getReport("errorsAfter");
    // setTimeout(() => setReportTpe('errorsAfter'), 1000)
  };

  return (
    <>
      <div>
        <button onClick={topUsersForEachEndpoint}>Top Users by endpoint</button>
        <button onClick={topUsersAfter}>Top users in time</button>
        <button onClick={endpointError}>Errors by endpoint</button>
        <button onClick={errorsAfter}>Errors in time</button>
        <label>After day:</label>
        <input type="date" value={days.afterDay} onChange={e => setDays({...days, afterDay: e.target.value})} />
        <label>Before day:</label>
        <input type="date" value={days.beforeDay} onChange={e => setDays({...days, beforeDay: e.target.value})} />
      </div>

      {/* <div>{(console.log(report) && false) || JSON.stringify(report)}</div> */}
      <div className="monitor-content-main">
        {report.length !== 0 && reportType === 'topUsersForEachEndpoint' ? <TopUsersForEachEndpoint info={report} /> : <></>}
        {report.length !== 0 && reportType === 'topUsersAfter' ? <TopUsersAfter info={report} /> : <></>}
        {report.length !== 0 && reportType === 'endpointError' ? <EndpointError info={report} /> : <></>}
        {report.length !== 0 && reportType === 'errorsAfter' ? <ErrorsAfter info={report} /> : <></>}
      </div>
    </>
  );
};

export default Monitor;
