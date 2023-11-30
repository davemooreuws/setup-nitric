# Nitric CLI Action

This action sets up the [Nitric](https://nitric.io) CLI on GitHub's hosted Actions runners.

Nitric's GitHub Setup exposes the Nitric CLI to your GitHub workflow so that you can run any command you wish using actions.

Run this action on `ubuntu-latest` since the MacOS runner lacks Docker and Windows VMs have depth limitations. The action installs and exposes the specified version of the Nitric CLI on the runner environment.

## Usage

Setup the Nitric CLI:

```yaml
steps:
  - uses: nitrictech/setup-nitric@v1
```

A specific version of the `Nitric` CLI can be installed:

```yaml
steps:
  - uses: nitrictech/setup-nitric@v1
    with:
      version: 1.33.3
```

Run `nitric up` to deploy a stack named `dev` to AWS:

```yaml
steps:
  - uses: nitrictech/setup-nitric@v1
    with:
      version: latest
  - run: nitric up -s dev --ci
```

## Inputs

```yaml
version:
  description: Version of the CLI being used
  required: false
  default: 1.2.1
```

## Example workflow

```yaml
name: Sample configuration to deploy to AWS
on:
  workflow_dispatch:
  push:
    branches:
      - main
env:
  PULUMI_CONFIG_PASSPHRASE: ${{ secrets.PULUMI_CONFIG_PASSPHRASE }}
  PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
jobs:
  update:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - name: Install Nitric CLI
        uses: nitrictech/setup-nitric@v1
        with:
          version: 1.2.1
      - name: Install dependencies
        uses: pulumi/setup-pulumi@v2
      - name: Checkout project
        uses: actions/checkout@v3
      - name: Resolve packages
        run: npm install
      - name: Deploy stack to aws
        run: nitric up -s dev -v0
```

## Develop

To update your changes, rebuild the dist folder with the following command -

```bash
npm run build
```
