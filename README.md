# create-enterprise-next-app

CLI to scaffold a production-ready Enterprise Next.js app from the bundled `template/` directory.

## Related links

- GitHub repository: https://github.com/anuradhamudalige/create-enterprise-next-app
- Medium guide: https://medium.com/@theanuradha/next-js-enterprise-project-kickstarter-guide-6be3312ab2f5

## Use with npx (after publish)

Run the package directly without installing it globally:

```bash
npx @ymssa/create-enterprise-next-app
```

The CLI asks for:

1. **App name** (used as the target directory name)
2. **CICD Repo URL** (injected into template files)

Then it will:

- Create a new folder: `<app-name>`
- Copy the template project into it
- Replace template placeholders like `{{appName}}` and `{{cicdRepoUrl}}`
- Run `npm ci --no-audit --no-fund` in the generated app

## Generated app commands

After scaffolding completes:

```bash
cd <app-name>
npm run dev
```

Other useful commands in the generated project:

```bash
npm run build:prod
npm start
```

## Current CLI interface

This package is currently **interactive only**.

- No positional arguments yet
- No command flags/options yet

Use:

```bash
npx @ymssa/create-enterprise-next-app
```

## Local development (maintainer)

From this repository root, run the CLI locally:

```bash
node ./cli.js
```

Test the same flow as an npm package tarball:

```bash
npm pack
npx ./ymss-create-enterprise-next-app-1.0.0.tgz
```

> If the generated filename changes by version, use the tarball name shown by `npm pack`.

## Publishing to npm

This package is configured for public npm publishing (`publishConfig.access=public`).

Typical release flow:

```bash
npm version patch
npm publish
```

For minor/major releases, use `npm version minor` or `npm version major`.

## Notes

- Do **not** commit `.env.local` from generated projects.
- Verify generated project dependencies install successfully in your environment.
