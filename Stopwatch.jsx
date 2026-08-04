import  { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    const pad = (number) => (number < 10 ? "0" : "") + number;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.display}>{formatTime()}</div>
      <div style={styles.controls}>
        {!isRunning ? (
          <button style={{ ...styles.button, ...styles.startBtn }} onClick={start}>
            Start
          </button>
        ) : (
          <button style={{ ...styles.button, ...styles.stopBtn }} onClick={stop}>
            Stop
          </button>
        )}
        <button style={{ ...styles.button, ...styles.resetBtn }} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "320px",
    border: "2px solid #ccc",
    borderRadius: "15px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  display: {
    fontSize: "2.5rem",
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  controls: {
    display: "flex",
    gap: "12px",
  },
  button: {
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#fff",
  },
  startBtn: { backgroundColor: "#2ed573" },
  stopBtn: { backgroundColor: "#ff4757" },
  resetBtn: { backgroundColor: "#1e90ff" },
};

export default Stopwatch;