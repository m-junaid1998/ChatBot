export const customSelectStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    padding: "0px",
    minHeight: "auto",
    backgroundColor: "transparent",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    padding: "0px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#999",
    fontSize: "12px",
    fontWeight: "400",
    padding: "0px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0px",
    transform: "scale(1.0)",
    marginTop: "-4px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),

  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#f7f9ff" : isFocused ? "#f1f1f1" : "white",
    color: "black",
    cursor: "pointer",
  }),
};
