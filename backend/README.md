# About

Backend WEB API application using:
- Express
- Typescript
- Postgres
- TypeORM
- pnpm

# Quick start
### Local
1. Install dependencies
  ```pnpm i```
   - Install postgres and add to config connection params
   - Generate RSA keys for JWT authentication
        ```
       mkdir -p src/config \
       && openssl genpkey -algorithm RSA -out src/config/private.pem -pkeyopt rsa_keygen_bits:2048 \
       && openssl rsa -pubout -in src/config/private.pem -out src/config/public.pem \
       && chmod 644 src/config/private.pem src/config/public.pem
       ```
2. Start backend:
   - Production ready: 
      ```pnpm start```
   - Development with hot reloading by Nodemon:
      ```pnpm dev```
3. Listen [localhost:3000/](http://localhost:3000/)


# Contribution

- Reformat code
- Lint
    - fix linter issues
- Test
- Commit and push branch
- Create PR and ask review

```
npm prettify
npm lint
npm lint:fix
npm test
```

```
git add .
git commit -m "commit message"
```
