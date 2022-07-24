FROM node:16
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV PORT=80
CMD npm run start