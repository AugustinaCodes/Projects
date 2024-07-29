import { ILaunchFilter } from "../../types/launches";
import LaunchItem from "../LaunchItem/LaunchItem";
import { useState, useMemo } from "react";
import PageSizeDropdown from "../PageSizeDropdown/PageSizeDropdown";
import LaunchItemPagination from "../LaunchItemPagination/LaunchItemPagination";
import styles from "./LaunchList.module.css";
import SearchBar from "../SearchBar/SearchBar";
import DateFilter from "../DateFilter/DateFilter";
import Skeleton from "react-loading-skeleton";
import { useLaunches } from "../../hooks/useLaunches";

const LaunchList = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filter: ILaunchFilter = useMemo(
    () => ({
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
      searchTerm,
      startDate,
      endDate,
    }),
    [pageSize, currentPage, searchTerm, startDate, endDate]
  );

  const { launches, loading, error, totalPages } = useLaunches(filter);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className={styles.launchList}>
        <Skeleton count={5} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.launchList}>
      <SearchBar onSearch={handleSearch} />
      <DateFilter onDateChange={handleDateChange} />
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
