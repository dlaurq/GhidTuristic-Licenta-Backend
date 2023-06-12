FROM node:slim
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --omit=dev; \
        fi
COPY . ./
EXPOSE 5000
CMD ["node", "server.js"]