"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";

const Profile: NextPage = () => {
    const session = useUser();

    return <Typography>{session.user ? JSON.stringify(session.user) : "nicht eingeloggt"}</Typography>;
};

export default Profile;
