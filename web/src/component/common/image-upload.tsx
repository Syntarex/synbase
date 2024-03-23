"use client";

import { UploadRouter } from "@/app/api/uploadthing/core";
import { CloudUpload } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { generateReactHelpers, useDropzone } from "@uploadthing/react";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

// Hooks zum Hochladen von Dateien
const { useUploadThing } = generateReactHelpers<UploadRouter>();

/**
 * Zeigt einen Button, welcher bei Klick den Datei-Browser des Clients aufruft und so einen Upload ermöglicht.
 */
export const ImageUpload = () => {
    // Dateien zum Hochladen
    const [files, setFiles] = useState<File[]>([]);

    // Nutze UploadThing um Upload-Prozess zu vereinfachen
    const { isUploading, permittedFileInfo, startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            setFiles([]);
        },
        onUploadError: (error) => {
            setFiles([]);

            // TODO: Prüfen, ob ich das überhaupt tun muss
            throw error;
        },
    });

    // Lade Datei hoch
    useEffect(() => {
        // Es gibt nichts zum Hochladen
        if (isEmpty(files)) {
            return;
        }

        startUpload(files);
    }, [files, startUpload, permittedFileInfo]);

    // Erstelle Props für Elemente
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: setFiles,
        // Setze erlaubte Datei-Attribute
        accept: permittedFileInfo?.config
            ? generateClientDropzoneAccept(Object.keys(permittedFileInfo.config))
            : undefined,
    });

    return (
        <Box {...getRootProps}>
            <Button component={"label"} disabled={isUploading} variant={"contained"} startIcon={<CloudUpload />}>
                Hochladen
                <input {...getInputProps()} />
            </Button>
        </Box>
    );
};
