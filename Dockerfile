ARG API_URL
FROM ghcr.io/cirruslabs/flutter:stable AS builder
WORKDIR /app
COPY . .
RUN flutter config --enable-web \
 && flutter pub get \
 && flutter build web --release \
    --dart-define=APP_ENV=production \
    --dart-define=API_URL=${API_URL}

FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
