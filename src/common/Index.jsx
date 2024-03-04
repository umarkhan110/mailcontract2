import { InputBase, Select, alpha, styled } from "@mui/material";

export const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: "#cccccc",
    fontSize: 16,
    width: "100%",
    padding: "8px 12px",
    transition: theme?.transitions?.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const CustomInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    // backgroundColor: theme.palette.mode === "#fff" ? "#fff" : "#fff",
    border: "1px solid",
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    // borderColor: theme.palette.mode === "#cccccc" ? "#cccccc" : "#cccccc",
    fontSize: 16,
    width: "100%",
    padding: "8px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: "theme.palette.primary.main",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  },
}));
