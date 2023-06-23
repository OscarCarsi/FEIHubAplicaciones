FROM node:19-alpine3.16
EXPOSE 8081
COPY . ./app
WORKDIR /app
RUN npm install
CMD [ "node" , "app" ]