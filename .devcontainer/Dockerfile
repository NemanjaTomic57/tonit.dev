# Use the official Dev Containers image for .NET 9.0
FROM mcr.microsoft.com/devcontainers/dotnet:9.0

# Install Node.js 22.x
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - \
    && apt-get update \
    && apt-get install -y nodejs=22.* \
    && npm install -g npm@latest

# Install PostgreSQL 17
RUN sudo bash - \
    && apt-get install -y postgresql-common \
    && /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y \
    && apt-get install -y postgresql-17 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]