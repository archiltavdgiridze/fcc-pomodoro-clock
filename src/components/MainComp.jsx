import React from "react";
import TimeChangers from "./TimeChangers";
import SessionTimer from "./SessionTimer";

const MainComp = () => {
  return (
    <div className="main_wrapper">
      <h1 className="title">25 + 5 Clock</h1>
      <div className="time_changers">
        <TimeChangers />
      </div>
      <div className="session_timer">
        {/* <SessionTimer /> */}
      </div>
    </div>
  );
};

export default MainComp;
