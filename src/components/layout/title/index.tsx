import React from "react";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { logo, yariga } from "../../../assets";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="12px"
        sx={{
          padding: "12px 16px",
        }}
      >
        {collapsed ? (
          <img src={logo} alt="Riyasat Logo" width="28px" />
        ) : (
          <Stack direction="row" alignItems="center" gap="12px">
            <img src={logo} alt="Riyasat Logo" width="28px" />
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Riyasat
            </Typography>
          </Stack>
        )}
      </Box>
    </Link>
  );
};
