import * as path from "path";

export const Length = {
    UUID: 36,
    URL: 2048,
    MIMETYPE: 64,
};

export const Constants = {
    SSL_CERT_PATH: path.join(__dirname, "../../../ssl-cert.pem"),
    SSL_KEY_PATH: path.join(__dirname, "../../../ssl-key.pem"),
};
