import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./HealthRecordsContainer.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function HealthRecordsContainer({ petId }) {
  const [logs, setLogs] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [showLogs, setShowLogs] = useState(true);
  const [showPrescriptions, setShowPrescriptions] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/logs/${petId}`)
      .then((response) => setLogs(response.data))
      .catch((err) => console.log("Error fetching logs", err));

    axios
      .get(`${API_URL}/v1/prescriptions/${petId}`)
      .then((response) => setPrescriptions(response.data))
      .catch((err) => console.log("Error fetching prescriptions", err));
  }, [petId]);

  function toggleShowLogs() {
    setShowLogs((prevShowLogs) => !prevShowLogs);
  }

  function toggleShowPrescriptions() {
    setShowPrescriptions((prevShowPrescriptions) => !prevShowPrescriptions);
  }

  return (
    <div>
      <div className={styles.displayButtons}>
        <button
          className={`${styles.displayButton} ${showLogs ? styles.active : ""}`}
          onClick={toggleShowLogs}
        >
          Logs {showLogs && "✔"}
        </button>
        <button
          className={`${styles.displayButton} ${
            showPrescriptions ? styles.active : ""
          }`}
          onClick={toggleShowPrescriptions}
        >
          Prescriptions {showPrescriptions && "✔"}
        </button>
      </div>
      <div className={styles.recordsList}>
        {showLogs &&
          logs.map((log) => (
            <div key={log._id} className={styles.recordCard}>
              <h4>Description: {log.description}</h4>
              <p>Status: {log.status}</p>
            </div>
          ))}
        {showPrescriptions &&
          prescriptions.map((prescription) => (
            <div key={prescription._id} className={styles.recordCard}>
              <h2>{prescription.medication_id.name}</h2>
              <p>{prescription.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
