# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as builder
# Set the working directory
WORKDIR /app
# Add the source code to app
COPY package.json package-lock.json ./
# Install all the dependencies
RUN npm install
COPY . .
# Generate the build of the application
RUN npm run build

FROM httpd:latest
COPY ./httpd.conf /usr/local/apache2/conf
COPY --from=builder /app/dist/vra-merdocente-web-app /usr/local/apache2/htdocs/
EXPOSE 8080:8080
