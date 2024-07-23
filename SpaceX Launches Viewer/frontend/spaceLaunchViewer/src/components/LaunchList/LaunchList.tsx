import { fetchLaunches } from "../../services/spacexService";
import LaunchItem from "../LaunchItem/LaunchItem";
import { useState, useEffect } from "react";
import PageSizeDropdown from "../PageSizeDropdown/PageSizeDropdown";
import LaunchItemPagination from "../LaunchItemPagination/LaunchItemPagination";
import styles from './LaunchList.module.css'

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
}

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const getLaunches = async () => {
      try {
        setLoading(true)
        const data = await fetchLaunches(
          pageSize,
          (currentPage - 1) * pageSize
        );
        setLaunches(data.docs);
        setTotalPages(Math.ceil(data.totalDocs / pageSize));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); 
        setError("Failed to fetch launch data");
        setLoading(false);
      }
    };
    getLaunches();
  }, [pageSize, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.launchList}>
      <PageSizeDropdown pageSize={pageSize} setPageSize={setPageSize} />
      {launches.map((launch) => (
        <LaunchItem key={launch.id} launch={launch} />
      ))}
      <LaunchItemPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LaunchList;
