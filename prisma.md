# Criando o Prisma Client

Utilize o seguinte comando:

```bash
 npx prisma generate --schema=./src/prisma/schema.prisma
```

# Migrations

**Criando a migrate inicial**

```bash
npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma
```

Esse comando vai gerar a migration inicial:

migrations/
  └─ 20210313140442_init/
    └─ migration.sql


**Exemplo de alteracao de schema**

Alterando o schema

```prisma
model User {
  id       Int    @id @default(autoincrement())
  jobTitle String
  name     String
  posts    Post[]
}
```

Agora criamos uma nova migration:

```bash
npx prisma migrate dev --name added_job_title --schema=./src/prisma/schema.prisma
```

Esse comando vai gerar a migration:

migrations/
  └─ 20210313140442_init/
    └─ migration.sql
  └─ 20210313140442_added_job_title/
    └─ migration.sql


**Comando utiliznado em dev pra criar migrations e aplica-lás baseado nas alteracoes do schema**

```bash
npx prisma migrate dev --schema=./src/prisma/schema.prisma
```
