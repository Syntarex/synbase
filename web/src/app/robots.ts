import { MetadataRoute } from "next";

// TODO: Aktuell werden alle Suchmaschinen ausgeschlossen! Wenn Synbase live geht, sollten wir das ändern
const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: "*",
            disallow: "/",
        },
        //sitemap: "https://acme.com/sitemap.xml", // TODO: Füge Sitemap hinzu
    };
};

export default robots;
