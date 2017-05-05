FROM node:boron

WORKDIR /home/booking/backend

ADD . /home/booking/backend

RUN npm install
RUN npm install nodemon -g

EXPOSE 4000

CMD ["nodemon", "server.js"]
