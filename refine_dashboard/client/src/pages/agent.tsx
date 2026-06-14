import { useList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";
import { AgentCard } from "../components";

const Agents = () => {
    const listResult = useList({
        resource: "users",
        pagination: { pageSize: 100 },
    }) as any;
    
    const { data, isLoading, isError } = listResult.query ?? listResult;

    const allAgents = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Agents List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {allAgents.map((agent: any) => (
                    <AgentCard
                        key={agent._id}
                        id={agent._id}
                        name={agent.name}
                        email={agent.email}
                        avatar={agent.avatar}
                        noOfProperties={agent.allProperties.length}
                        propertyImage={agent.allProperties[0]?.photo}
                        location={agent.allProperties[0]?.location}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Agents;
