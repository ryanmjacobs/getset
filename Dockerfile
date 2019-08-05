FROM node:8

# install npm dependencies
WORKDIR /app
COPY package.json .
RUN npm install

# run app
COPY app.js .
CMD ["node", "app.js"]
