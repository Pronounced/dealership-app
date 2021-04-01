FROM node:latest
WORKDIR /ClientApp
ENV PATH /ClientApp/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
ARG REACT_APP_PORT
ENV REACT_APP_PORT ${REACT_APP_PORT}
RUN npm build
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]