# Next.js Starter

A modular Next.js starter with a scalable folder structure, shared utilities, and a `create-folders` script to scaffold modules automatically.

---

## Table of Contents

1. [Install Next.js](#1-install-nextjs)
2. [Choose Below](#2-choose-below)
3. [Add script to package.json](#3-add-script-to-packagejson)
4. [Add module folder structure in folders.cjs](#4-add-module-folder-structure-in-folderscjs)
5. [Run create-folders](#5-run-create-folders)
6. [Install all dependencies](#6-install-all-dependencies)
7. [Install zustand](#7-install-zustand)
8. [Init shadcn](#8-init-shadcn)
9. [Install react-hook-form](#9-install-react-hook-form)
10. [Install zod](#10-install-zod)
11. [Install @hookform/resolvers](#11-install-hookformresolvers)

---

## 1. Install Next.js

```bash
npx create-next-app@latest
```

---

## 2. Choose Below

When prompted, use these options:

```
Would you like to use the recommended Next.js defaults?

  Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md

  No, reuse previous settings

❯ No, customize settings - Choose your own preferences

√ What is your project named? ... .

√ Would you like to use the recommended Next.js defaults? » No, customize settings

√ Would you like to use TypeScript? ... No / Yes

√ Which linter would you like to use? » ESLint

√ Would you like to use React Compiler? ... No / Yes

√ Would you like to use Tailwind CSS? ... No / Yes

√ Would you like your code inside a `src/` directory? ... No / Yes

√ Would you like to use App Router? (recommended) ... No / Yes

√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes

√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... No / Yes
```

---

## 3. Add script to package.json

Add this line under `scripts` in `package.json`:

```json
"create-folders": "node folders.cjs"
```

---

## 4. Add module folder structure in folders.cjs

Update the `modules` array in `folders.cjs` as per your requirement:

```js
const modules = ["home", "shop", "auth", "admin", "account"];
```

---

## 5. Run create-folders

```bash
npm run create-folders
```

This scaffolds the modular folder structure, shared constants, API helpers, and boilerplate files for each module.

---

## 6. Install all dependencies

Install all remaining dependencies required for the project.

---

## 7. Install zustand

```bash
npm install zustand
```

---

## 8. Init shadcn

```bash
npx shadcn@latest init
```

---

## 9. Install react-hook-form

```bash
npm install react-hook-form
```

---

## 10. Install zod

```bash
npm install zod
```

---

## 11. Install @hookform/resolvers

```bash
npm install @hookform/resolvers
```

---

## Quick Start (after setup)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
