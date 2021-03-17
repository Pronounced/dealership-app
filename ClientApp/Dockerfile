FROM node:latest
WORKDIR D:/GitHub/my-new-app/dealership-app/ClientApp
ENV PATH /node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install -g rimraf 
RUN npm install react-scripts
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
