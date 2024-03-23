import { auth0 } from "@/util/server/auth0";
import { Typography } from "@mui/material";

const Profile = async () => {
    const session = await auth0.getSession();

    return <Typography>{session?.user ? JSON.stringify(session.user) : "nicht eingeloggt"}</Typography>;
};

export default Profile;
