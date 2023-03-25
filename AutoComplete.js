import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
  { id: 0, name: "Option 3" },
];

const AutoCompleteFilter = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  alert(selectedOption);
  const handleOptionChange = (event, newValue) => {
    if (newValue) {
      setSelectedOption(newValue.id);
    } else {
      setSelectedOption(0);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={handleOptionChange}
      renderInput={(params) => (
        <TextField {...params} label="Select an option" />
      )}
    />
  );
};

export default AutoCompleteFilter;
