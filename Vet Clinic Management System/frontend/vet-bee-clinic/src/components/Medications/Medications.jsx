import axios from "axios";
import MedicationContainer from "../MedicationContainer/MedicationContainer";
import styles from "./Medications.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Medications() {
  const [medications, setMedications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/meds`)
      .then((response) => {
        setMedications(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddMedication() {
    navigate("/v1/add-medication");
  }

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className={styles.medicationsPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <div className={styles.header}>
        <h1>Medications List</h1>
        <button className={styles.addMedication} onClick={handleAddMedication}>
          Add Medication
        </button>
      </div>
      <div className={styles.medicationsList}>
        {medications.map((medication) => (
          <MedicationContainer key={medication._id} medication={medication} />
        ))}
      </div>
    </div>
  );
}
