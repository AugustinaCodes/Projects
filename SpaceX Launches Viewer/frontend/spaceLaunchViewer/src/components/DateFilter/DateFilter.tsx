import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface DateFilterProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateFilter = ({ onDateChange }: DateFilterProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div>
      <label>Start Date:</label>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        placeholderText="Select start date"
      />
      <label>End Date:</label>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        placeholderText="Select end date"
      />
    </div>
  );
};

export default DateFilter;
