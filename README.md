# Project tonit.dev

This project is the codebase for my homepage tonit.dev, where I run my blog and aquire customers for contract work.

## Technologies

- Next.js
- Asp.Net Core
- PostgreSQL
- Docker
- Kubernetes
- Kustomize

## Todos

- Add PostgreSQL to the project.
- Make sure the containers in development can communicate with each other.
- Set up the infrastructure on the VPS with the corresponding images and a gateway to the frontend. Utilize Kustomize for this.
- Set up the CI/CD pipeline to build the new images and update the infrastructure when pushing to git.
- Add Monitoring with Prometheus and Grafana.

## How to run locally

Perform the following steps to run this project locally:

1. Clone the project.
2. Open the project in VScode.
3. Download the extensions "Dev Containers" and reopen the project in a devcontainer. For this to work, you need to have Docker Desktop installed on your machine.
4. In a terminal, run `dotnet watch`.
5. In a second terminal, run `npm run dev` and open the link in your browser.
