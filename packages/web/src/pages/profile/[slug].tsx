import { useRouter } from "next/router";
import React from "react";

const ProfilePage = () => {
    const router = useRouter();

    const { slug } = router.query;

    return <div>Slug: {slug}</div>;
};

export default ProfilePage;
