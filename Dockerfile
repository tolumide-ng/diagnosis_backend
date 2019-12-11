## Specifies the base image we're extending
FROM node:9

## Create base directory
RUN mkdir /src

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /src


## Install packages using NPM 5 (bundled with the node:9 image)
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
RUN npm install --silent
COPY . /src

# Create the build
RUN npm run build:server

## Add application code
COPY ./src /src/app


## Set environment to "development" by default
ENV NODE_ENV production

## Allows port 3000 to be publicly available
EXPOSE 3000

## The command uses nodemon to run the application
CMD ["node", "app"]