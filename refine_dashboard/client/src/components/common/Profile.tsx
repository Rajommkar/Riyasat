import { Email, Phone, Place } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { ProfileProps, PropertyProps } from "../../interfaces/common";
import PropertyCard from "./PropertyCard";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const Profile = ({ type, name, avatar, email, properties }: ProfileProps) => (
    <Box>
        <Typography fontSize={25} fontWeight={700} color="text.primary">
            {type} Profile
        </Typography>

        <Box
            mt="20px"
            borderRadius="15px"
            padding="20px"
            bgcolor="background.paper"
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2.5,
                }}
            >
                <img
                    src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/JavaScript_Mastery_logo.png/600px-JavaScript_Mastery_logo.png"
                    }
                    width={340}
                    height={320}
                    alt="abstract"
                    className="my_profile-bg"
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                />
                <Box
                    flex={1}
                    sx={{
                        marginTop: { md: "58px" },
                        marginLeft: { xs: "20px", md: "0px" },
                    }}
                >
                    <Box
                        flex={1}
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        gap="20px"
                    >
                        <img
                            src={
                                checkImage(avatar)
                                    ? avatar
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                            }
                            width={78}
                            height={78}
                            alt="user_profile"
                            className="my_profile_user-img"
                            style={{ borderRadius: "100%" }}
                        />

                        <Box
                            flex={1}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            gap="30px"
                        >
                            <Stack direction="column">
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    color="text.primary"
                                >
                                    {name}
                                </Typography>
                                <Typography fontSize={16} color="text.secondary">
                                    Realestate Agent
                                </Typography>
                            </Stack>

                            <Stack direction="column" gap="30px">
                                <Stack gap="15px">
                                    <Typography
                                        fontSize={14}
                                        fontWeight={500}
                                        color="text.secondary"
                                    >
                                        Address
                                    </Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        gap="10px"
                                    >
                                        <Place sx={{ color: "text.primary" }} />
                                        <Typography
                                            fontSize={14}
                                            color="text.primary"
                                        >
                                            4517 Washington Ave. Manchaster,
                                            Kentucky 39495
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    gap="20px"
                                    pb={4}
                                >
                                    <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="text.secondary"
                                        >
                                            Phone Number
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <Phone sx={{ color: "text.primary" }} />
                                            <Typography
                                                fontSize={14}
                                                color="text.primary"
                                            >
                                                +0123 456 7890
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="text.secondary"
                                        >
                                            Email
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <Email sx={{ color: "text.primary" }} />
                                            <Typography
                                                fontSize={14}
                                                color="text.primary"
                                            >
                                                {email}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>

        {properties && properties.length > 0 && (
            <Box
                mt="2.5rem"
                borderRadius="15px"
                padding="20px"
                bgcolor="background.paper"
            >
                <Typography fontSize={18} fontWeight={600} color="text.primary">
                    {type} Properties
                </Typography>

                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    gap="20px"
                >
                    {properties.map((property: PropertyProps) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        )}
    </Box>
);

export default Profile;
