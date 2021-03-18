FROM node:latest
WORKDIR /ClientApp
ENV PATH /ClientApp/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]