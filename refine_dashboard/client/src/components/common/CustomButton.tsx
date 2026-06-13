import { Button } from "@mui/material";
import { CustomButtonProps } from "../../interfaces/common";

const CustomButton = ({ type, title, backgroundColor, color, fullWidth, icon, handleClick, disabled }: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : "unset",
        padding: "10px 15px",
        width: fullWidth ? "100%" : "fit-content",
        minWidth: 130,
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: "10px",
        transition: "all 0.3s ease",
        "&:hover": {
          opacity: 0.9,
          backgroundColor,
          transform: "translateY(-2px)",
          boxShadow: "0 8px 15px rgba(0,0,0,0.15)",
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
