FROM node:10.9.0-alpine

RUN mkdir -p /work

WORKDIR /work/

COPY package.json /work/

RUN yarn install

COPY . /work/

EXPOSE 3000

CMD ["yarn", "start"]

