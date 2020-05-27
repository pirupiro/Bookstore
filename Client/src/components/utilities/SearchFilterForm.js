import React, { useState, useRef } from "react";

function SearchFilterForm({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const timeoutRef = useRef(null);

  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value);
    if (!onSearchChange) {
      console.log("not Search Func");
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    };

    timeoutRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      }
      onSearchChange(formValue);
    }, 300);
  };

  return (
    <form>
      <div className="form-group">
        <input
          type="search"
          className=" form-inline form-blg form-control-lg"
          id="search"
          aria-describedby="Search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}
export default SearchFilterForm;
