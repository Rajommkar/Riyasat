import { useOne } from "@refinedev/core";
import { useParams } from "react-router";
import { Profile } from "../components";

const AgentProfile = () => {
    const { id } = useParams();
    const oneResult = useOne({
        resource: "users",
        id: id as string,
    }) as any;
    const { data, isLoading, isError } = oneResult.query ?? oneResult;

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="Agent"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            properties={myProfile.allProperties}
        />
    );
};

export default AgentProfile;
