FROM nginx:alpine

# Kopiere Konfiguration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

# Starte Nginx im Vordergrund des Containers
CMD ["nginx", "-g", "daemon off;"]
