# NextJS blog
A blog application written in NextJS + TypeScript

## How to run

### Installing
```bash
npm install
```

### Migrating the database
```bash
npx prisma generate

# Migrate the schema afterwards:

npx prisma migrate dev --name initial_migration
```

The database runs on PostgreSQL.

### Authentication
By default, the application uses NextAuth's Google provider as a means to authenticate the user. In order to make this work on your local demo, populate your ``.env`` file with the following:

```bash
GOOGLE_ID="some_id_that_google_generated_for_you"
GOOGLE_SECRET="some_secret_that_google_generated_for_you"
NEXTAUTH_URL="http://localhost:3000" # change the port if running on a different one
NEXTAUTH_SECRET="some_secret" 
```

Generate your own Google ID and secret at [https://console.cloud.google.com/](https://console.cloud.google.com/)

## Architecture

### Roles
This app uses role-based authorization. The roles are of an incrementing nature, meaning that each role has the same permissions as the previous ones plus more. The roles are the following:

* **guest** - the role of unauthenticated users. Guest users can view articles. They cannot perform any non-GET requests.
* **user** - the default role of an authenticated user. Users can comment on articles.
* **writer** - writers can publish articles and edit or delete the ones they have published. Writers that have been demoted to a user cannot edit or delete their articles.
* **admin** - admins can edit or delete any article, regardless of who is the author of the article.
* **superadmin** - super admins can promote users up to ``admin`` and demote them down to ``user``. This role can only be assigned through the database, as the app does not expose any APIs for this purpose

The application provides three guards: ``WriterGuard``, ``AdminGuard``, and ``SuperAdminGuard``. Those can be used to check if the user has the given role's permissions (for example, an ``admin`` would pass through the ``WriterGuard``). If you need to check if the user is logged in (aka has a ``user`` role), you can use NextAuth's built-in session hooks and getters.

## License
MIT