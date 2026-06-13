import { Typography, Box, Stack } from '@mui/material';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import { useParams, useNavigate } from 'react-router';
import { ChatBubble, Delete, Edit, Phone, Place, Star } from '@mui/icons-material';

import { CustomButton } from '../components';

const PropertyDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { id } = useParams();
    const { mutate } = useDelete();
    const { query } = useShow();

    const { data, isLoading, isError } = query;

    const propertyDetails = data?.data ?? {};

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const isCurrentUser = user?.email === propertyDetails.creator?.email;

    const handleDeleteProperty = () => {
        const response = window.confirm('Are you sure you want to delete this property?');
        if (response) {
            mutate({
                resource: 'properties',
                id: id as string,
            }, {
                onSuccess: () => {
                    navigate('/properties');
                }
            });
        }
    };

    return (
        <Box
            className="fade-in-slide-up"
            borderRadius="15px"
            padding="20px"
            bgcolor="#fcfcfc"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Details
            </Typography>

            <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
                {/* Left Side: Image and Details */}
                <Box flex={1} maxWidth={764}>
                    <img
                        src={propertyDetails.photo}
                        alt={propertyDetails.title}
                        height={546}
                        style={{ objectFit: 'cover', borderRadius: '10px' }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                            <Typography fontSize={18} fontWeight={500} color="#11142d" textTransform="capitalize">
                                {propertyDetails.propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={`star-${star}`} sx={{ color: '#F2C94C' }} />
                                ))}
                            </Box>
                        </Stack>

                        <Stack direction="row" alignItems="center" gap={0.5} mt={0.5}>
                            <Place sx={{ color: '#808191' }} />
                            <Typography fontSize={14} color="#808191">
                                {propertyDetails.location}
                            </Typography>
                        </Stack>

                        <Typography fontSize={22} fontWeight={600} color="#11142d" mt={2}>
                            {propertyDetails.title}
                        </Typography>

                        <Typography fontSize={18} fontWeight={500} color="#11142d" mt={2}>
                            Price
                        </Typography>
                        <Typography fontSize={25} fontWeight={700} color="#475BE8">
                            ${propertyDetails.price}
                        </Typography>

                        <Typography fontSize={18} fontWeight={500} color="#11142d" mt={2}>
                            Description
                        </Typography>
                        <Typography fontSize={14} color="#808191">
                            {propertyDetails.description}
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side: Creator Info and Buttons */}
                <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                        sx={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                                transform: "translateY(-5px)"
                            }
                        }}
                    >
                        <img
                            src={propertyDetails.creator?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}
                            alt="avatar"
                            width={90}
                            height={90}
                            style={{ borderRadius: '100%', objectFit: 'cover' }}
                        />

                        <Box mt="15px" display="flex" flexDirection="column" alignItems="center">
                            <Typography fontSize={18} fontWeight={600} color="#11142d">
                                {propertyDetails.creator?.name}
                            </Typography>
                            <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">
                                Agent
                            </Typography>
                        </Box>

                        <Stack mt="15px" direction="row" alignItems="center" gap={1} width="100%">
                            <Place sx={{ color: '#808191' }} />
                            <Typography fontSize={14} fontWeight={400} color="#808191">
                                {propertyDetails.location}
                            </Typography>
                        </Stack>

                        <Typography mt={1} fontSize={16} fontWeight={600} color="#11142d">
                            {propertyDetails.creator?.allProperties?.length || 0} Properties
                        </Typography>
                    </Stack>

                    <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
                        <CustomButton
                            title={!isCurrentUser ? 'Message' : 'Edit'}
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                            icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                            handleClick={() => {
                                if (isCurrentUser) {
                                    navigate(`/properties/edit/${propertyDetails._id}`);
                                }
                            }}
                        />
                        <CustomButton
                            title={!isCurrentUser ? 'Call' : 'Delete'}
                            backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                            color="#FCFCFC"
                            fullWidth
                            icon={!isCurrentUser ? <Phone /> : <Delete />}
                            handleClick={() => {
                                if (isCurrentUser) handleDeleteProperty();
                            }}
                        />
                    </Stack>

                    <Box mt="25px" sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                        <img
                            src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg"
                            alt="map"
                            width="100%"
                            height={306}
                            style={{ objectFit: 'cover', transition: 'transform 0.4s ease', cursor: 'pointer' }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                    </Box>

                    <Box mt="25px">
                        <CustomButton
                            title="Book Now"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;
