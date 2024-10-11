## How to Contribute

1. Clone the project

```bash
git clone https://github.com/s1lvax/route
```

2. Install dependencies

```bash
pnpm i
```

3. Run a Postgres instance (I recommend using Docker)

```bash
docker run --name your_postgres_container -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=your_database -p 5432:5432 -d postgres
```

4. Update the `example.env` to `.env` and fill in your data
5. Push the databse schema using Prisma

```bash
npx prisma db push
```

6. Start the dev server

```bash
pnpm dev
```

7. Develop the change using a separate branch, either `bugfix/name` or `feature/name`
8. Push your changes and open a Pull Request with details about your changes