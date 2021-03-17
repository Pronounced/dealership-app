FROM node:latest
WORKDIR D:/GitHub/my-new-app/dealership-app/ClientApp
ENV PATH /node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
