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
# RUN adduser --system --group www-data --uid 33
RUN mkdir .next
RUN chown -R www-data:www-data .next
RUN npm i sharp

COPY --from=builder --chown=www-data:www-data /app/public ./public
COPY --from=builder --chown=www-data:www-data /app/next.config.js ./
COPY --from=builder --chown=www-data:www-data /app/.next/standalone ./
COPY --from=builder --chown=www-data:www-data /app/.next/static ./.next/static
RUN chown -R www-data:www-data .

USER www-data
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]