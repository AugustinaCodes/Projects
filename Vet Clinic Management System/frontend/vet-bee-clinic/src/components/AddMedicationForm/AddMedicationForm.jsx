import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddMedicationForm.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddMedicationForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/v1/meds`, {
        name,
        description,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error adding medication", error);
    }
  }

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className={styles.addMedicationPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <h1>Add Medication</h1>
      <form className={styles.addMedicationForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Medication
        </button>
      </form>
    </div>
  );
}
