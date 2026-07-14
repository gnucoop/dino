FROM node:22.16.0

WORKDIR /app
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update -qqy \
    && apt-get -qqy install google-chrome-stable \
    && apt-get -qqy install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb psmisc net-tools \
    && rm -rf /var/lib/apt/lists/*

RUN export CHROME_BIN=/usr/bin/google-chrome

# Build context must be the repo root, e.g.:
#   docker build -f dino-pipeline/Dockerfile -t devgnucoop/dinopipeline .
# The path below is relative to the build context, so it copies the whole project.
COPY ["./", "/app"]

EXPOSE 4200
