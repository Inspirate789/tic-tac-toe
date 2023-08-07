FROM node:18-alpine3.18 AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
# COPY ./package.json /react-app
# RUN npm install
RUN --mount=type=bind,source=./package.json,target=./package.json \
    npm install

# Copying node_modules from project
COPY ./node_modules ./node_modules

# Building application
RUN --mount=type=bind,source=./package.json,target=./package.json \
    --mount=type=bind,source=./public,target=./public \
    --mount=type=bind,source=./src,target=./src \
    npm run build

# Fetching the nginx image
FROM nginx:1.25.1

# Copying built assets from builder
COPY --from=builder /react-app/build /usr/share/nginx/html

# Copying nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
