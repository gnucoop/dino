#!/bin/sh
set -e

echo "Avvio iniezione delle configurazioni tramite variabili d'ambiente..."

# Controllo di sicurezza: verifichiamo che almeno la variabile principale sia stata fornita
if [ -z "$AUTH_URL" ]; then
  echo "ERRORE CRITICO: La variabile d'ambiente AUTH_URL non è stata impostata."
  echo "Assicurati di avviare il container passando le variabili con il flag -e"
  echo "Esempio: docker run -e AUTH_URL=\"https://...\" ..."
  exit 1
fi

echo "Sostituzione dei placeholder in corso..."

# Eseguiamo il trova-e-sostituisci prendendo i valori direttamente dall'ambiente.
# Se una variabile non viene passata, il sed sostituirà il placeholder con una stringa vuota.
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__AUTH_URL__|$AUTH_URL|g" {} +
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__SYNC_GRAPHQL_URL__|$SYNC_GRAPHQL_URL|g" {} +
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__WS_URL__|$WS_URL|g" {} +
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__INSTANCE_NAME__|$INSTANCE_NAME|g" {} +

echo "Iniezione completata con successo! Passo il controllo a Nginx..."
