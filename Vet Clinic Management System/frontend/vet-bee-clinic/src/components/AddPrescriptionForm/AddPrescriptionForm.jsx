import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddPrescriptionForm.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddPrescriptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/meds`)
      .then((respponse) => {
        setMedications(respponse.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/v1/prescriptions`, {
        medication_id: selectedMedication,
        pet_id: id,
        comment,
      });
      navigate(-1);
    } catch (error) {
      console.log("Error adding prescription", error);
    }
  }

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className={styles.addPrescriptionPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <h1>Add Prescription</h1>
      <form className={styles.addPrescriptionForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="medication">Medication</label>
          <select
            id="medication"
            value={selectedMedication}
            onChange={(e) => setSelectedMedication(e.target.value)}
            required
          >
            <option value="">Select Medication</option>
            {medications.map((medication) => (
              <option key={medication._id} value={medication._id}>
                {medication.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Prescription
        </button>
      </form>
    </div>
  );
}
