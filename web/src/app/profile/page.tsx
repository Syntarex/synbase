import { getSession } from "@auth0/nextjs-auth0";
import { Typography } from "@mui/material";

const Profile = async () => {
    const session = await getSession();

    return <Typography>{session?.user ? JSON.stringify(session.user) : "nicht eingeloggt"}</Typography>;
};

export default Profile;
