FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY index.js .

ENV NODE_ENV=production
EXPOSE 4010

USER node

CMD ["node", "index.js"]
