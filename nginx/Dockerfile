FROM nginx:alpine

# Lösche existierende Konfigurationen
RUN rm /etc/nginx/conf.d/*

# Kopiere Konfiguration
COPY ./nginx/default.conf /etc/nginx/conf.d/

# Starte Nginx
EXPOSE 80/tcp
CMD ["nginx", "-g", "daemon off;"]
