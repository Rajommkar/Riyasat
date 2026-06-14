import { useGetIdentity, useOne } from "@refinedev/core";
import { Profile } from "../components";

const MyProfile = () => {
    const { data: user } = useGetIdentity() as any;
    const oneResult = useOne({
        resource: "users",
        id: user?.userid,
    }) as any;
    const { data, isLoading, isError } = oneResult.query ?? oneResult;

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="My"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            properties={myProfile.allProperties}
        />
    );
};

export default MyProfile;
