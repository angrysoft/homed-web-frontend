FROM node:lts-slim AS base

FROM base AS deps
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_ENV production
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN adduser --system --group www-data --uid 106 --gid 112
RUN mkdir .next
RUN chown -R homed-web:homed-web .next
RUN npm i sharp

COPY --from=builder --chown=homed-web:homed-web /app/public ./public
COPY --from=builder --chown=homed-web:homed-web /app/next.config.js ./
COPY --from=builder --chown=homed-web:homed-web /app/.next/standalone ./
COPY --from=builder --chown=homed-web:homed-web /app/.next/static ./.next/static
RUN chown -R homed-web:homed-web .

USER homed-web
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]