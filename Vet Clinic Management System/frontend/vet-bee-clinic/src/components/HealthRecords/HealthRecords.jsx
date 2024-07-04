import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HealthRecords.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function HealthRecords() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [displayType, setDisplayType] = useState("logs"); // "logs" or "prescriptions"
  const [petName, setPetName] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/v1/pets/${id}`).then((response) => {
      setPetName(response.data.name);
    });

    axios.get(`${API_URL}/v1/logs/${id}`).then((response) => {
      setLogs(response.data);
    });
    axios.get(`${API_URL}/v1/prescriptions/${id}`).then((response) => {
      setPrescriptions(response.data);
    });
  }, [id]);

  function handleAddLog() {
    navigate(`/v1/add-log/${id}`);
  }

  function handleAddPrescription() {
    navigate(`/v1/add-prescription/${id}`);
  }

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className={styles.healthRecordsPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <h1>{petName}: Health Records</h1>
      <div className={styles.topButtons}>
        <button
          className={styles.addPrescription}
          onClick={handleAddPrescription}
        >
          Add Prescription
        </button>
        <button className={styles.addLog} onClick={handleAddLog}>
          Add Log
        </button>
      </div>
      <div className={styles.displayButtons}>
        <span>Display:</span>
        <button
          className={`${styles.displayButton} ${
            displayType === "logs" ? styles.active : ""
          }`}
          onClick={() => setDisplayType("logs")}
        >
          Logs
        </button>
        <button
          className={`${styles.displayButton} ${
            displayType === "prescriptions" ? styles.active : ""
          }`}
          onClick={() => setDisplayType("prescriptions")}
        >
          Prescriptions
        </button>
      </div>
      <div className={styles.recordsList}>
        {displayType === "logs" &&
          logs.map((log) => (
            <div key={log._id} className={styles.recordCard}>
              <h2>{log.description}</h2>
              <p>{log.date}</p>
            </div>
          ))}
        {displayType === "prescriptions" &&
          prescriptions.map((prescription) => (
            <div key={prescription._id} className={styles.recordCard}>
              <h2>{prescription.name}</h2>
              <p>{prescription.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
