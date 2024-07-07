import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddLogForm.module.css";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddLogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/v1/logs`, {
        pet_id: id,
        description,
        status,
      });
      navigate(-1);
    } catch (error) {
      console.log("Error adding log", error);
    }
  }

  function handleBackButton() {
    navigate(-1);
  }
  return (
    <div className={styles.addLogPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <h1>Add Log</h1>
      <form className={styles.addLogForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <input
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Log
        </button>
      </form>
    </div>
  );
}
