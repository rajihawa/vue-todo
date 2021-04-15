FROM golang:1.16.2-alpine3.13

RUN apk update && apk add build-base

ARG PORT
ENV PORT=$PORT

WORKDIR /app

COPY . .


RUN go get -u -v github.com/dgrijalva/jwt-go
RUN go get -u -v gopkg.in/rethinkdb/rethinkdb-go.v6
RUN go get -v github.com/rs/xid
RUN go get -u -v golang.org/x/crypto/bcrypt

EXPOSE 8000

RUN apk add --update nodejs npm yarn

RUN cd /app/web && yarn
RUN cd /app/web && yarn build
RUN cd /app

CMD ["go", "run", "."]