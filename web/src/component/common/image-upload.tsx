"use client";

import { UploadRouter } from "@/app/api/uploadthing/core";
import { fail } from "@/util/log";
import { CloudUpload } from "@mui/icons-material";
import { Button, FormControl, FormHelperText } from "@mui/material";
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

    // Gab es einen Upload-Fehler?
    const [uploadFailed, setUploadFailed] = useState(false);

    // Nutze UploadThing um Upload-Prozess zu vereinfachen
    const { isUploading, permittedFileInfo, startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            setFiles([]);
            setUploadFailed(false);
        },
        onUploadError: (error) => {
            setFiles([]);
            setUploadFailed(true);
            fail("onUploadError", error);
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
        <FormControl component={"div"} error={uploadFailed} {...getRootProps}>
            <Button component={"label"} disabled={isUploading} variant={"contained"} startIcon={<CloudUpload />}>
                Hochladen
                <input {...getInputProps()} />
            </Button>

            {!isUploading && permittedFileInfo?.config.image?.maxFileSize && (
                <FormHelperText>
                    {uploadFailed
                        ? `Das hochgeladene Bild darf maximal ${permittedFileInfo.config.image.maxFileSize} groß sein.`
                        : `Maximal ${permittedFileInfo.config.image.maxFileSize}`}
                </FormHelperText>
            )}
        </FormControl>
    );
};
