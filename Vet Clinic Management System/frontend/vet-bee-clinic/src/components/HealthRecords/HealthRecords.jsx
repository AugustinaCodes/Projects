import { useLocation, useNavigate } from "react-router-dom";
import styles from "./HealthRecords.module.css";
import HealthRecordsContainer from "../HealthRecordsContainer/HealthRecordsContainer";

export default function HealthRecords() {
  const navigate = useNavigate();
  const location = useLocation();
  const { petName, petId } = location.state;

  function handleBackButton() {
    navigate(-1);
  }

  function handleAddPrescription() {
    navigate(`/v1/health-records/${petId}/add-prescription`);
  }

  return (
    <div className={styles.healthRecordsPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <div className={styles.topBit}>
        <h1>{petName}: Health Records</h1>
        <div className={styles.topButtons}>
          <button
            className={styles.addPrescription}
            onClick={handleAddPrescription}
          >
            Add Prescription
          </button>
          <button className={styles.addLog}>Add Log</button>
        </div>
      </div>
      <div>
        <h2>Display:</h2>
        <HealthRecordsContainer petId={petId} />
      </div>
    </div>
  );
}
