### Example repo for HTMX extensions: json-attribute & jsx-template

Extension json-attribute can be used as is, jsx-template however requires a building step, as it looks for a single transpiled and bundled JS file made out of the JSX templates being used. Location for this file is currently hardcoded as `dist/templates.js`. This repo contains a possible build setup for generating this bundle, and a live example for both of the extensions. 

For the stand-alone extensions themselves check out the corresponding repos:
- [htmx-json-attribute](https://github.com/numasi/htmx-json-attribute)
- [htmx-jsx-template](https://github.com/numasi/htmx-jsx-template)

## Requirements

- Docker

## What it does

Showing off HTMX capacity for sending a JSON request defined at markup level to a JSON based API and rendering the response (also JSON) using a JSX template.

## Structure
- script/build.ts <- Build script incorporating Bun's build capabilities for generating client code from JSX sources
- templates/BlogEntries.jsx <- Example JSX source
- templates/templates.js <- Build entrypoint exporting all the possible JSX sources that will be needed on client side
- dist/templates.js <- Build output to be consumed by client code (jsx-template extension in this case)
- example.html <- The example site fetching a JSON-RPC API from a public [Hive](https://hive.blog/) node
- json-attribute.js, jsx-template.js <- HTMX extensions being used on the client
- tsconfig.json <- For instructing Bun's bundler, mainly to employ and bundle [kita-js](https://github.com/kitajs/html) direct HTML string generation for JSX code (to use in place of React's createElement).
- packages.json <- Dev packages needed for bundling & serving
- docker-compose.yml <- For nice and easy dev environment

## Use

We use the all-in-one [Bun JS](https://bun.sh/) environment for JSX transpilation and bundling, and to run a minimal dev server to  work around CORS difficulties. You can get it up and running with a docker container defined in the docker-compose.yml included.

Fire up the container in the background first:
`docker compose up -d`

Now start the build script from the container:
```
docker compose exec htmx-example bash
bun scripts/build.ts
```

Finally, from another console, launch the dev server:
```
docker compose exec htmx-example bash
bunx nano-server
```

Example site can be reached, by default at `localhost:5000`

## Tech

- [HTMX](https://htmx.org/)
- [kita-js](https://github.com/kitajs/html)
- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com)
- [Typescript](https://www.typescriptlang.org/) (under the hood)
- [React JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Hive blockchain](https://hive.io/)
