FROM node:18-alpine3.18 AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
RUN --mount=type=bind,source=./package.json,target=./package.json \
    npm install

# Copying all the files in project
# COPY . .

# Expose port
EXPOSE 3000

# Starting application
ENTRYPOINT [ "npm", "start" ]
