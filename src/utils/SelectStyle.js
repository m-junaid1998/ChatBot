export const customSelectStyles = {
  container: (base) => ({
    ...base,
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",
    width: "100%",
  }),
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    padding: "0px",
    minHeight: "auto",
    backgroundColor: "transparent",
    display: "flex", 
    flexWrap: "nowrap",
    width: "100%",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px",
    flex: "1", 
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
  
  }),
  dropdownIndicator: (base) => ({
    ...base,
    transform: "scale(1.0)",
    paddingLeft: "12px",
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
