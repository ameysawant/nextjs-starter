const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

const modules = ["shop", "auth", "admin", "account"];

const directories = [
  "src/app",
  "src/config",
  "src/lib",
  "src/lib/api",
  "src/lib/api-helpers",
  "src/assets/logos",
  "src/assets/fonts",
  "src/shared/components/feedback",
  "src/shared/components/shadcn-ui",
  "src/shared/components/skeleton",
  "src/shared/constants",
  "src/shared/hooks",
  "src/shared/store",
  "src/styles",
  "src/shared/types",
  "src/shared/utils",
  // Module directories
  ...modules.flatMap((module) => [
    `src/app/(${module})/_modules/components`,
    `src/app/(${module})/_modules/hooks`,
    `src/app/(${module})/_modules/layout`,
    `src/app/(${module})/_modules/services`,
    `src/app/(${module})/_modules/store`,
    `src/app/(${module})/_modules/types`,
    `src/app/(${module})/_modules/utils`,
    `src/app/(${module})/_modules/schema`,
    `src/app/(${module})`,
    `src/app/(${module})/${module}`,
  ]),
];

// Create Directories
const createDirectories = () => {
  directories.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Build routes.ts content dynamically
const routesContent = `export const ROUTES = {
  base: "/",
  ${modules[0]}: "/${modules[0]}",
};

${modules
  .map((m) => {
    const mUpper = m.toUpperCase();
    const basePath = m === modules[0] ? "/" : `/${m}`;
    return `export const ${mUpper}_ROUTES = {\n  base: "${basePath}",\n  ${m}: "/${m}",\n};`;
  })
  .join("\n\n")}
`;

// Global boilerplate files
const globalFiles = [
  {
    path: "src/config/configuration.ts",
    content:
      'export const configuration = {\n  api: {\n    baseUrl:\n      process.env.API_BASE_URL || "http://localhost:9000/rajeshbeej/api",\n  },\n};\n',
  },
  {
    path: "src/lib/api/apiClient.ts",
    content: [
      'import { configuration as config } from "@/config/configuration";',
      'import type { ApiResponse, ApiClientRequest } from "@/shared/types/api.types";',
      "",
      "export const apiClient = async <T = unknown>(params: ApiClientRequest): Promise<ApiResponse<T>> => {",
      "  const { url, method = \"GET\", body, headers: extraHeaders, signal } = params;",
      "",
      "  const headers: HeadersInit = {",
      '    "Content-Type": "application/json",',
      "    ...(extraHeaders ?? {}),",
      "  };",
      "",
      "  let bodyInit: BodyInit | undefined;",
      "  if (body !== undefined) {",
      '    bodyInit = typeof body === "string" ? body : JSON.stringify(body);',
      "  }",
      "",
      "  const requestInit: RequestInit = {",
      "    method,",
      "    headers,",
      "    body: bodyInit,",
      "    signal,",
      "  };",
      "",
      "  try {",
      "    const response = await fetch(`${config.api.baseUrl}${url}`, requestInit);",
      "",
      "    try {",
      "      const payload = (await response.json()) as ApiResponse<T>;",
      "      return {",
      "        ...payload,",
      "        statusCode: payload.statusCode ?? response.status,",
      "      };",
      "    } catch {",
      "      return {",
      "        isSuccessful: false,",
      '        exceptionMessage: response.ok ? "Invalid JSON in response." : `Request failed (${response.status}).`,',
      "        result: null,",
      "        statusCode: response.status,",
      "      };",
      "    }",
      "  } catch {",
      "    return {",
      "      isSuccessful: false,",
      '      exceptionMessage:',
      '        "Unable to connect to the server. Please check your network connection or try again later.",',
      "      result: null,",
      "      statusCode: 0,",
      "    };",
      "  }",
      "};",
    ].join("\n"),
  },
  {
    path: "src/shared/types/api.types.ts",
    content: [
      'export type ApiClientMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";',
      "",
      "export type ApiClientRequest<TBody = unknown> = {",
      "  url: string;",
      "  method?: ApiClientMethod;",
      "  body?: TBody;",
      "  headers?: HeadersInit;",
      "  signal?: AbortSignal;",
      "};",
      "",
      "export interface ApiResponse<T> {",
      "  isSuccessful: boolean;",
      "  exceptionMessage: string;",
      "  result: T | null;",
      "  statusCode: number;",
      "}",
    ].join("\n"),
  },
  {
    path: "src/lib/api-helpers/api-helpers.ts",
    content:
      'export const apiHelpers = {\n  handleError: (error: unknown) => {\n    console.error("API Error:", error);\n  },\n};\n',
  },
  {
    path: "src/shared/components/feedback/Loading.tsx",
    content: "const Loading = () => {\n  return (\n    <div>Loading...</div>\n  );\n};\n\nexport default Loading;\n",
  },
  {
    path: "src/shared/components/feedback/Error.tsx",
    content:
      "const Error = () => {\n  return (\n    <div>Something went wrong.</div>\n  );\n};\n\nexport default Error;\n",
  },
  {
    path: "src/shared/components/feedback/PageNotFound.tsx",
    content:
      "const PageNotFound = () => {\n  return (\n    <div>404 - Page Not Found</div>\n  );\n};\n\nexport default PageNotFound;\n",
  },
  {
    path: "src/shared/constants/routes.ts",
    content: routesContent,
  },
  {
    path: "src/shared/constants/endpoints.ts",
    content: `export const ENDPOINTS = {
  auth: {
    signup: "/auth/signup",
    verifyEmail: "/auth/verify-email",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    verifyResetOtp: "/auth/verify-reset-otp",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  ${modules[0]}: {
    products: {
      getAllProducts: "/product/getAllProducts",
      getFlatProducts: "/product/getFlatProducts?limit=3&page=1",
      searchProducts: "/product/searchProducts?q=p&limit=10",
      getProductById: "/product/getProductById/:id",
      addProduct: "/product/addProduct",
      updateProduct: "/product/updateProduct/:id",
      deleteProduct: "/product/deleteProduct/:id",
    },
    categories: {
      addCategory: "/category/addCategory",
      getAllCategories: "/category/getAllCategories",
      getCategoryById: "/category/getCategoryById/:id",
      getFlatCategories: "/category/getFlatCategories",
      updateCategory: "/category/updateCategory/:id",
      deleteCategory: "/category/deleteCategory/:id",
    },
    cart: {
      addToCart: "/cart/addToCart",
      getCart: "/cart/getCart",
      getCartCount: "/cart/getCartCount",
      removeFromCart: "/cart/removeFromCart",
      clearCart: "/cart/clearCart",
      updateCart: "/cart/updateCart",
      deleteCart: "/cart/deleteCart",
    },
    checkout: {
      createOrder: "/checkout/createOrder",
      getOrderById: "/checkout/getOrderById/:id",
    },
    account: {
      getAddresses: "/account/getAddresses",
      addAddress: "/account/addAddress",
      updateAddress: "/account/updateAddress/:id",
      getProfile: "/account/getProfile",
      updateProfile: "/account/updateProfile",
      deleteAddress: "/account/deleteAddress/:id",
      getMyOrders: "/account/getMyOrders",
    },
  },
  admin: {},
  hotels: {},
  flights: {},
};
`,
  },
  {
    path: "src/styles/globals.css",
    overwrite: false,
    content:
      "@import \"tailwindcss\";\n\n:root {\n  --background: #ffffff;\n  --foreground: #0f172a;\n}\n\nbody {\n  background-color: var(--background);\n  color: var(--foreground);\n  font-family: 'Inter', sans-serif;\n}\n",
  },
  {
    path: "src/styles/colors.css",
    overwrite: false,
    content: ":root {\n  --primary: #3b82f6;\n}\n",
  },
  {
    path: "src/app/layout.tsx",
    overwrite: false,
    content: `import type { Metadata } from "next";
import "@/styles/globals.css";
import { roboto } from "@/assets/fonts/fonts";

export const metadata: Metadata = {
  title: "Company name | All Services",
  description: "Company name is a leading provider of all services",
  keywords: "Company name, All Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={\`\${roboto.variable}\`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
`,
  },
];

// Execution
const run = async () => {
  const projectExists = fs.existsSync(path.join(process.cwd(), `src/app/(${modules[0]})/_modules`));
  if (projectExists) {
    console.log("ℹ️  Project structure already exists. Only missing files will be created.");
  } else {
    console.log("🚀 Initializing new project structure...");
  }

  createDirectories();

  // Create Global Files
  for (const file of globalFiles) {
    const fullPath = path.join(process.cwd(), file.path);
    const exists = fs.existsSync(fullPath);

    if (!exists || file.overwrite) {
      fs.writeFileSync(fullPath, file.content);
      if (!exists) {
        console.log(`📝 Created global file: ${file.path}`);
      } else {
        console.log(`🔄 Replaced global file: ${file.path}`);
      }
    } else {
      // console.log(`⏭️  Skipping existing global file: ${file.path}`);
    }
  }

  // Create Boilerplate Files for each module
  modules.forEach((module) => {
    const modUpper = capitalize(module);

    const files = [
      {
        path: `src/app/(${module})/_modules/layout/${modUpper}Header.tsx`,
        content: `const ${modUpper}Header = () => {\n  return <header>${modUpper} Header</header>;\n};\n\nexport default ${modUpper}Header;\n`,
      },
      {
        path: `src/app/(${module})/_modules/layout/${modUpper}Footer.tsx`,
        content: `const ${modUpper}Footer = () => {\n  return <footer>${modUpper} Footer</footer>;\n};\n\nexport default ${modUpper}Footer;\n`,
      },
      {
        path: `src/app/(${module})/_modules/components/${modUpper}Component.tsx`,
        content: `const ${modUpper}Component = () => {\n  return <div>${modUpper} Component</div>;\n};\n\nexport default ${modUpper}Component;\n`,
      },
      {
        path: `src/app/(${module})/_modules/hooks/use${modUpper}.ts`,
        content: `export const use${modUpper} = () => {\n  return {};\n};\n`,
      },
      {
        path: `src/app/(${module})/_modules/services/${module}.service.ts`,
        content: `export const ${module}Service = {\n  // Add service methods here\n};\n`,
      },
      {
        path: `src/app/(${module})/_modules/store/${module}.store.ts`,
        content: `import { create } from 'zustand';\n\ninterface ${modUpper}State {\n  // Define state types\n}\n\nexport const use${modUpper}Store = create<${modUpper}State>(() => ({\n  // Define initial state\n}));\n`,
      },
      {
        path: `src/app/(${module})/_modules/types/${module}.types.ts`,
        content: `export interface ${modUpper}Data {\n  id: string;\n}\n`,
      },
      {
        path: `src/app/(${module})/_modules/utils/${module}.utils.ts`,
        content: `export const ${module}Utils = {\n  formatData: <T>(data: T): T => data\n};\n`,
      },
      {
        path: `src/app/(${module})/_modules/schema/${module}.schema.ts`,
        content: `import { z } from "zod";\n\nexport const ${module}Schema = z.object({\n  id: z.string()\n});\n\nexport type ${modUpper}FormData = z.infer<typeof ${module}Schema>;\n`,
      },
      {
        path: `src/app/(${module})/layout.tsx`,
        content: `import ${modUpper}Header from "@/app/(${module})/_modules/layout/${modUpper}Header";\nimport ${modUpper}Footer from "@/app/(${module})/_modules/layout/${modUpper}Footer";\n\nexport default function ${modUpper}Layout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <section>\n      <${modUpper}Header />\n      <main>{children}</main>\n      <${modUpper}Footer />\n    </section>\n  );\n}\n`,
      },
      {
        path: `src/app/(${module})/${module}/page.tsx`,
        content: `import ${modUpper}Component from "@/app/(${module})/_modules/components/${modUpper}Component";\n\nconst ${modUpper}Page = () => {\n  return (\n    <${modUpper}Component />\n  );\n};\n\nexport default ${modUpper}Page;\n`,
      },
    ];

    // If it's the first module, also create a page.tsx at the root of the group to make it the homepage
    if (module === modules[0]) {
      files.push({
        path: `src/app/(${module})/page.tsx`,
        content: `import ${modUpper}Component from "@/app/(${module})/_modules/components/${modUpper}Component";\n\nconst HomePage = () => {\n  return (\n    <${modUpper}Component />\n  );\n};\n\nexport default HomePage;\n`,
      });
    }

    files.forEach((file) => {
      const fullPath = path.join(process.cwd(), file.path);
      const exists = fs.existsSync(fullPath);
      if (!exists) {
        fs.writeFileSync(fullPath, file.content);
        console.log(`📝 Created module file: ${file.path}`);
      }
    });
  });

  // Remove default src/app/page.tsx to avoid conflicts with the new homepage
  const defaultPagePath = path.join(process.cwd(), "src/app/page.tsx");
  if (fs.existsSync(defaultPagePath)) {
    fs.unlinkSync(defaultPagePath);
    console.log("🗑️ Removed default src/app/page.tsx to enable modular homepage.");
  }

  console.log("\n✨ Next.js Folder structure is synchronized and ready!");
  rl.close();
  process.exit(0);
};

run();
