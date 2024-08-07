import { useParams } from "react-router-dom";
import { fetchLaunch } from "../../services/spacexService";
import { ILaunch } from "../../types/launches";
import { useEffect, useState } from "react";
import styles from './LaunchDetails.module.css'

const LaunchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [launch, setLaunch] = useState<ILaunch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLaunch = async () => {
      if (id) {
        try {
          const data = await fetchLaunch(id);
          setLaunch(data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch launch details");
          setLoading(false);
        }
      } else {
        setError("No launch ID provided");
        setLoading(false);
      }
    };
    getLaunch();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!launch) {
    return <div>No launch details available</div>;
  }

  return (
    <div className={styles.launchDetails}>
      <h2>{launch.name}</h2>
      <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>Rocket: {launch.rocket}</p>
      <p>Details: {launch.details}</p>
      {launch.links.webcast && (
        <p>
          Webcast:
          <a
            href={launch.links.webcast}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Here
          </a>
        </p>
      )}
    </div>
  );
};

export default LaunchDetails;
