
import  { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every 1000ms (1 second)
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour to 12-hour format
    hours = hours % 12 || 12;

    // Pad single digits with a leading zero
    const padZero = (num) => (num < 10 ? "0" : "") + num;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.clock}>{formatTime()}</h1>
    </div>
  );
}

// Quick inline styling so it looks great right away!
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  clock: {
    fontSize: "3rem",
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#2c3e50",
    backgroundColor: "#ecf0f1",
    padding: "15px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default DigitalClock;