import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { useGetIdentity } from "@refinedev/core";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

import { AgentCardProp, InfoBarProps } from "../../interfaces/agent";

const InfoBar = ({ icon, name }: InfoBarProps) => (
    <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
        {icon}
        <Typography fontSize={14} color="text.secondary">
            {name}
        </Typography>
    </Stack>
);

const AgentCard = ({
    id,
    name,
    email,
    avatar,
    noOfProperties,
    location,
}: AgentCardProp) => {
    const { data: currentUser } = useGetIdentity() as any;

    const generateLink = () => {
        if (currentUser?.email === email) return "/my-profile";
        return `/agents/show/${id}`;
    };

    const fallbackAvatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256";
    const displayImage = avatar && avatar.startsWith("http") ? avatar : fallbackAvatar;
    const displayLocation = location || "London";

    return (
        <Box
            component={Link}
            to={generateLink()}
            width="100%"
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "20px",
                padding: "20px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                textDecoration: "none",
                bgcolor: "background.paper",
                borderRadius: "15px",
            }}
        >
            <img
                src={displayImage}
                alt="property/avatar"
                loading="lazy"
                width={200}
                height={200}
                style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <Stack
                direction="column"
                justifyContent="space-between"
                flex={1}
                gap={{ xs: 4, sm: 2 }}
            >
                <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
                    <Typography fontSize={22} fontWeight={600} color="text.primary">
                        {name}
                    </Typography>
                    <Typography fontSize={14} color="text.secondary">
                        Real-Estate Agent
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <InfoBar
                        icon={<EmailOutlined sx={{ color: "text.secondary" }} />}
                        name={email}
                    />
                    <InfoBar
                        icon={<Place sx={{ color: "text.secondary" }} />}
                        name={displayLocation}
                    />
                    <InfoBar
                        icon={<Phone sx={{ color: "text.secondary" }} />}
                        name="+502-3231-4141"
                    />
                    <InfoBar
                        icon={<LocationCity sx={{ color: "text.secondary" }} />}
                        name={`${noOfProperties} Properties`}
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

export default AgentCard;
