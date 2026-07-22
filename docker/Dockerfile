# --- STAGE 1: Builder (Build Generica) ---
FROM node:20-alpine AS builder

WORKDIR /app

# Ottimizzazione cache: installiamo prima le dipendenze
COPY package.json yarn.lock ./

COPY scripts/ ./scripts/

RUN yarn install --frozen-lockfile

# Copiamo il resto del codice
COPY . .

# Eseguiamo la build con la configurazione "docker": sostituisce environment.ts
# con environment.docker.ts, così i placeholder come __AUTH_URL__ finiscono nei file JS.
RUN yarn ng build dinoapp --configuration docker

# --- STAGE 2: Nginx Runner ---
FROM nginx:alpine

# 1. Copiamo la configurazione personalizzata per gestire il routing Angular
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 2. Copiamo i file statici generati dal Builder.
# Il builder ":browser" produce l'output direttamente in dist/dinoapp (senza sottocartella browser/).
COPY --from=builder /app/dist/dinoapp /usr/share/nginx/html

# 3. Copiamo lo script di iniezione nella cartella speciale di esecuzione automatica di Nginx
COPY docker/entrypoint.sh /docker-entrypoint.d/99-inject-env.sh

# 4. Assicuriamoci che lo script abbia i permessi di esecuzione
RUN chmod +x /docker-entrypoint.d/99-inject-env.sh

# Esponiamo la porta standard
EXPOSE 80

# Avviamo Nginx
CMD ["nginx", "-g", "daemon off;"]
