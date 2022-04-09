FROM nginx:1.20-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /extras/static
RUN mkdir /content

RUN wget https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui-bundle.js -P /extras/static
RUN wget https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.css -P /extras/static

EXPOSE 80

