FROM node:19-alpine3.16
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]