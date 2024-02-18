FROM nginx:alpine

# Kopiere Konfiguration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Kopiere SSL Zertifikat
COPY ./ssl.crt /etc/nginx/ssl.crt
COPY ./ssl.key /etc/nginx/ssl.key

EXPOSE 80/tcp
EXPOSE 443/tcp

# Starte Nginx im Vordergrund des Containers
CMD ["nginx", "-g", "daemon off;"]
