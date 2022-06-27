import * as path from "path";

export const LENGTH = {
    UUID: 36,
    URL: 2048,
    MIMETYPE: 64,
};

export const SSL = {
    CERT_PATH: path.join(__dirname, "../../../ssl-cert.pem"),
    KEY_PATH: path.join(__dirname, "../../../ssl-key.pem"),
};
