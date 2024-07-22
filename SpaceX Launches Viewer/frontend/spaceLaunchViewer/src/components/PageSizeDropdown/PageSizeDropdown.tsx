interface PageSizeDropdownProps {
  pageSize: number;
  setPageSize: (size: number) => void;
}

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({
  pageSize,
  setPageSize,
}) => {
  return (
    <div>
      <label htmlFor="pageSize">Page Size:</label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PageSizeDropdown;
