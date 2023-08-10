import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./timechanger.css";
import beepSound from "../assets/ping-82822.mp3"

const TimeChangers = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [time, setTime] = useState(sessionLength * 60);
  const [timer, setTimer] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState("Session");

  useEffect(() => {
    setTime(sessionLength * 60);
  }, [sessionLength]);

  const addBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength((prevBreakLength) => prevBreakLength + 1);
    } else {
      return 0;
    }
  };

  const subtractBreakLength = () => {
    setBreakLength((prevBreakLength) => Math.max(prevBreakLength - 1, 1));
  };

  const addSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength((prevSessionLength) => prevSessionLength + 1);
    } else {
      return 0;
    }
  };

  const subtractSessionLength = () => {
    setSessionLength((prevSessionLength) => Math.max(prevSessionLength - 1, 1));
  };

  const startTimer = () => {
    if (!isTimerRunning) {
      const timerInterval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            setIsTimerRunning(false);
            if (currentMode === "Session") {
              playTimerSound(); 
              setCurrentMode("Break");
              return breakLength * 60; 
            } else {
              playTimerSound(); 
              setCurrentMode("Session");
              return sessionLength * 60; 
            }
          }
        });
      }, 1000);

      setTimer(timerInterval);
      setIsTimerRunning(true);
    } else {
      clearInterval(timer);
      setIsTimerRunning(false);
    }
  };

  const playTimerSound = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const resetTimer = () => {
    clearInterval(timer);
    setBreakLength(5);
    setSessionLength(25);
    setTime(25 * 60);
    setCurrentMode("Session");
    setIsTimerRunning(false);
  };

  return (
    <>
      <div className="time_container">
        <div className="break_length">
          <p id="break-label">Break Length</p>
          <div className="length_control">
            <button id="break-decrement" onClick={subtractBreakLength}>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>

            <p id="break-length">{breakLength}</p>

            <button id="break-increment" onClick={addBreakLength}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
        <div className="session_length">
          <p id="session-label">Session Length</p>
          <div className="length_control">
            <button id="session-decrement" onClick={subtractSessionLength}>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>

            <p id="session-length">{sessionLength}</p>

            <button id="session-increment" onClick={addSessionLength}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
      </div>
      <div className="session_timer">
        <p id="timer-label">
          {currentMode === "Session" ? "Session" : "Break"}
        </p>
        <audio id="beep" src={beepSound}></audio>
        <p id="time-left">
          {isTimerRunning ? formatTime(time) : formatTime(time)}
        </p>

        <button id="start_stop" onClick={startTimer}>
          {isTimerRunning ? "Pause" : "Play"}
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </>
  );
};

export default TimeChangers;
