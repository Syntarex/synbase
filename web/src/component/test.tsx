"use client";

import { Button } from "@mui/material";

interface TestProps {
    slug: string;
}

/**
 * Einfach eine Test-Komponente, welche zum schnellen Prototyping verwendet werden kann.
 */
export const Test = ({ slug }: TestProps) => {
    return (
        <Button
            variant={"contained"}
            onClick={() =>
                fetch("/api/blog-post", {
                    method: "POST",
                    body: JSON.stringify({
                        title: "Kurzer Beitrag zu MUI und TypeScript",
                        description: "Einführung in die Verwendung von MUI mit TypeScript",
                        content:
                            "# Überschrift\n\n## H2 Überschrift\n\n### H3 Überschrift\n\n#### H4 Überschrift\n\n##### H5 Überschrift\n\n###### H6 Überschrift\n\nDas ist ein Test\n\n```code```\n\n_Fett_ __Kursiv__",
                        slug,
                    }),
                })
            }
        >
            Erstellen
        </Button>
    );
};
