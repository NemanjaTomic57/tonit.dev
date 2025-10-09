# Project tonit.dev

[![.NET 9.0](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Node.js 22.x](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL 17](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

This project is the codebase for my homepage tonit.dev, where I run my blog and aquire customers for contract work. Everything is open-source, and I take best practices very seriously. Take a look and if you like what you see, let's work together!

## Technologies

- Next.js
- Asp.Net Core
- PostgreSQL
- Docker
- GitHub Actions
- SMTP
- Kubernetes

## Functionality

- Devcontainers - works the same in every environment
- REST API with CRUD operations and authentication/authorization
- Server-side rendering for lightning fast loading speeds
- Contact form with client-side and server-side validation
- Fully accessible for keyboard users
- Fully fledged CI/CD pipeline with GitHub Actions
- Self-hosted SMTP server for reliable email delivery

## How to run locally

Perform the following steps to run this project locally:

1. Clone the project.
2. Open the project in VScode.
3. Download the extensions "Dev Containers" and reopen the project in a devcontainer. For this to work, you need to have Docker Desktop installed on your machine. Click this [link](https://docs.docker.com/desktop/setup/install/linux/) for instructions on how to install Docker Desktop.
4. In a terminal window inside the devcontainer, run `dotnet watch`.
5. In a second terminal, run `npm run dev` and open the link in your browser. Whatever changes you make from here on out will instantly be visible in the browser.

Note: Some functionalities will not work depending on wheather or not you configure the `./API/.env.default` file and rename it to `./API/.env`. This includes sending emails, adding attachments and the admin dashboard. The connection string to the database will work as long as you are in the devcontainer.

## Database Management

The database is not really large. However, to ensure best practices, there is a database for development and production. 

The database is code first. Because the project is lead only by me, there is no need for persistent test data across multiple dev environments. This led to the decision to have the development database only locally inside the devcontainer, as opposed to publically accessible on the server. 

To find out more about the database structure, you can check out the migrations as well as the entities under `/API/Objects/`. Or you can run `dotnet run` and take a look at the Scalar documentation of the project under https://localhost:5000/scalar. If you want to connect to the PostgreSQL database, you can run `psql -h db -U postgres` with password `postgres` in a terminal. Postgres comes preinstalled with the Docker image of the devcontainer, so you don't have to install anything.

The production database is hosted on a server via a kubernetes pod and is exposed by a ClusterIP. The credentials for the database connection string are stored inside a [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/).

## API 

For the API, we have Asp.Net Core with Scalar for testing and automated API documentation. 

I've had the pleasure of building APIs in a few different languages so far in my carreer, including Flask, Node.js, Laravel, and Rust. I think every language has its pros and cons, but in terms of Web APIs, Asp.Net Core is the clear winner for me. The Syntax is easy, the code has a high readability, the documentation is generated automatically with Swagger or Scalar, and the performance is unbeatable (actually, Rust does have a better performance, but I think it's way to complex to be used for a Web API with simple CRUD operations).

### API endpoints

#### LeadController

- ✅ SendResume
- ✅ BookAppointment

#### BlogController

- ✅ CreateBlogPost
- ✅ UpdateBlogPost
- ⬜ DeleteBlogPost
- ✅ GetAllBlogPosts
- ✅ GetBlogPost
- ✅ Subscribe
- ✅ Unsubscribe

#### AdminController

- ✅ Login
- ✅ GetAuthStatus
