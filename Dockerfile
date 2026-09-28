# Stage 1: Build phase
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifest
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build aplikasi Vite
RUN npm run build

# Stage 2: Serve phase dengan Nginx
FROM nginx:alpine

# Copy hasil build Vite (folder dist) ke Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi custom Nginx untuk SPA Routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]