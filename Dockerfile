FROM node:9
USER node
RUN mkdir /home/node/diagnosis/
WORKDIR /home/node/diagnosis/
COPY --chown=node:node package*.json .sequelizerc .babelrc ./
RUN npm install
COPY --chown=node:node ./src ./src
RUN npm run build:server
ENV NODE_ENV production
EXPOSE 3000
COPY wait-for-it.sh .
# CMD ["npm", "run", "start"]
