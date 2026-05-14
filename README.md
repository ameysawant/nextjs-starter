1. npx create-next-app@latest

2. choose below -
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

3. add this line under scripts in package.json
   "create-folders": "node folders.cjs"

4. Add module folder structure as per your requirement in folders.cjs like below-
   const modules = ["shop", "auth", "hotels", "flights", "experiences", "admin", "account"];

5. npm run create-folders

6. Now install all the dependencies which are required.

7. npm install zustand

8. npx shadcn@latest init

9. npm install react-hook-form

10. npm install zod

11. npm install @hookform/resolvers
