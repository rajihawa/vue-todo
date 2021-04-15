FROM golang:1.16.2-alpine3.13

RUN apk add --update tzdata \
    git;



ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

CMD ["fresh"]