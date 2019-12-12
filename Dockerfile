FROM node:9
RUN mkdir /src
WORKDIR /src
COPY package*.json ./
COPY .sequelizerc ./
COPY .babelrc ./
RUN npm install
COPY ./src ./src
RUN npm run build:server
ENV NODE_ENV production
EXPOSE 3000
COPY wait-for-it.sh .
# CMD ["npm", "run", "start"]