const fs = require("fs");
const path = require("path");

const modules = ["home", "auth", "admin", "account", "library"];

const directories = [
  "src/app",
  "src/config",
  "src/lib",
  "src/lib/api",
  "src/lib/api-helpers",
  "src/shared/assets/fonts",
  "src/shared/assets/fonts/roboto",
  "src/shared/assets/images",
  "src/shared/components/custom-ui",
  "src/shared/components/flexbox-grid",
  "src/shared/components/feedback",
  "src/shared/components/shadcn-ui",
  "src/shared/components/skeleton",
  "src/shared/constants",
  "src/shared/hooks",
  "src/shared/store",
  "src/shared/styles",
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

const writeFileIfMissing = (filePath, content, label = "global file") => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) return false;

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log(`📝 Created ${label}: ${filePath}`);
  return true;
};

// Create Directories
const createDirectories = () => {
  directories.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const gridComponentTemplate = (componentName, label) => `import { Container, Row, Col } from "@/shared/components/flexbox-grid/Index";

const ${componentName} = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>${label}</Col>
        </Row>
      </Container>
    </>
  );
};

export default ${componentName};
`;

const moduleLayoutTemplate = (module, modUpper) => `import ${modUpper}Header from "@/app/(${module})/_modules/layout/${modUpper}Header";
import ${modUpper}Footer from "@/app/(${module})/_modules/layout/${modUpper}Footer";

export default function ${modUpper}Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <${modUpper}Header />
      <main>{children}</main>
      <${modUpper}Footer />
    </>
  );
}
`;

const flexboxGridFiles = [
  {
    path: "src/shared/components/flexbox-grid/grid-config.ts",
    content: `/**
 * Grid System Configuration
 * Use this file to maintain all grid-related variables in one place.
 */

export const GRID_CONFIG = {
  columns: 12,
  defaultGutter: 4, // 1rem (4 * 0.25rem)
  
  // Container max-widths for each breakpoint
  containerWidths: {
    sm: "544px",
    md: "736px",
    lg: "960px",
    xl: "1168px",
    xxl: "1368px",
    xxxl: "1504px",
  },

  // Breakpoints (Matching global.css)
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
    xxxl: "1536px",
  },
};
`,
  },
  {
    path: "src/shared/components/flexbox-grid/Index.tsx",
    content: `export { Container } from "@/shared/components/flexbox-grid/Container";
export { Row } from "@/shared/components/flexbox-grid/Row";
export { Col } from "@/shared/components/flexbox-grid/Col";
`,
  },
  {
    path: "src/shared/components/flexbox-grid/Row.tsx",
    content: `import React from "react";
import { cn } from "@/shared/utils/utils";
import { GRID_CONFIG } from "@/shared/components/flexbox-grid/grid-config";

interface RowProps {
  children: React.ReactNode;
  className?: string;
  gutter?: number;
}

export function Row({ children, className = "", gutter = GRID_CONFIG.defaultGutter }: RowProps) {
  const gutterVal = \`\${gutter * 0.25}rem\`;
  const style = {
    "--gutter-x": gutterVal,
    marginLeft: \`calc(\${gutterVal} * -1)\`,
    marginRight: \`calc(\${gutterVal} * -1)\`,
  } as React.CSSProperties;

  return (
    <div style={style} className={cn("bootstrap-row flex flex-wrap", className)}>
      {children}
    </div>
  );
}
`,
  },
  {
    path: "src/shared/components/flexbox-grid/Container.tsx",
    content: `import React from "react";
import { cn } from "@/shared/utils/utils";
import { GRID_CONFIG } from "@/shared/components/flexbox-grid/grid-config";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
  xxxl?: boolean;
}

export function Container({ children, className = "", fluid, sm, md, lg, xl, xxl, xxxl }: ContainerProps) {
  if (fluid) {
    return <div className={cn("bootstrap-container-fluid w-full px-4", className)}>{children}</div>;
  }

  const isDefault = !sm && !md && !lg && !xl && !xxl && !xxxl;

  const style = {
    "--sm-w": GRID_CONFIG.containerWidths.sm,
    "--md-w": GRID_CONFIG.containerWidths.md,
    "--lg-w": GRID_CONFIG.containerWidths.lg,
    "--xl-w": GRID_CONFIG.containerWidths.xl,
    "--xxl-w": GRID_CONFIG.containerWidths.xxl,
    "--xxxl-w": GRID_CONFIG.containerWidths.xxxl,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "bootstrap-container mx-auto w-full px-4",
        (isDefault || sm) && "sm:max-w-(--sm-w)",
        (isDefault || sm || md) && "md:max-w-(--md-w)",
        (isDefault || sm || md || lg) && "lg:max-w-(--lg-w)",
        (isDefault || sm || md || lg || xl) && "xl:max-w-(--xl-w)",
        (isDefault || sm || md || lg || xl || xxl) && "xxl:max-w-(--xxl-w)",
        (isDefault || sm || md || lg || xl || xxl || xxxl) && "xxxl:max-w-(--xxxl-w)",
        className,
      )}
    >
      {children}
    </div>
  );
}
`,
  },
  {
    path: "src/shared/components/flexbox-grid/Col.tsx",
    content: `import React from "react";
import { cn } from "@/shared/utils/utils";
import { GRID_CONFIG } from "@/shared/components/flexbox-grid/grid-config";

type ColSize = number | "auto" | boolean;

interface ColProps {
  col?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  xxxl?: ColSize;
  children: React.ReactNode;
  className?: string;
}

const getWidth = (size?: ColSize) => {
  if (typeof size === "number") {
    return \`\${(size / GRID_CONFIG.columns) * 100}%\`;
  }
  return undefined;
};

export function Col({ col, sm, md, lg, xl, xxl, xxxl, children, className = "" }: ColProps) {
  const dynamicStyles: Record<string, string | undefined> = {
    "--col-w": getWidth(col),
    "--sm-w": getWidth(sm),
    "--md-w": getWidth(md),
    "--lg-w": getWidth(lg),
    "--xl-w": getWidth(xl),
    "--xxl-w": getWidth(xxl),
    "--xxxl-w": getWidth(xxxl),
  };

  const style = Object.fromEntries(
    Object.entries(dynamicStyles).filter((entry) => entry[1] !== undefined),
  ) as React.CSSProperties;

  const colLogic = (prefix: string, value?: ColSize) => {
    if (value === undefined || value === false) return null;

    if (value === "auto") {
      switch (prefix) {
        case "sm":
          return "sm:flex-none sm:w-auto sm:max-w-full";
        case "md":
          return "md:flex-none md:w-auto md:max-w-full";
        case "lg":
          return "lg:flex-none lg:w-auto lg:max-w-full";
        case "xl":
          return "xl:flex-none xl:w-auto xl:max-w-full";
        case "xxl":
          return "xxl:flex-none xxl:w-auto xxl:max-w-full";
        case "xxxl":
          return "xxxl:flex-none xxxl:w-auto xxxl:max-w-full";
        default:
          return "flex-none w-auto max-w-full";
      }
    }

    if (typeof value === "number") {
      switch (prefix) {
        case "sm":
          return "sm:flex-none sm:w-[var(--sm-w)] sm:max-w-[var(--sm-w)]";
        case "md":
          return "md:flex-none md:w-[var(--md-w)] md:max-w-[var(--md-w)]";
        case "lg":
          return "lg:flex-none lg:w-[var(--lg-w)] lg:max-w-[var(--lg-w)]";
        case "xl":
          return "xl:flex-none xl:w-[var(--xl-w)] xl:max-w-[var(--xl-w)]";
        case "xxl":
          return "xxl:flex-none xxl:w-[var(--xxl-w)] xxl:max-w-[var(--xxl-w)]";
        case "xxxl":
          return "xxxl:flex-none xxxl:w-[var(--xxxl-w)] xxxl:max-w-[var(--xxxl-w)]";
        default:
          return "flex-none w-[var(--col-w)] max-w-[var(--col-w)]";
      }
    }

    switch (prefix) {
      case "sm":
        return "sm:flex-1 sm:basis-0 sm:max-w-full sm:w-full";
      case "md":
        return "md:flex-1 md:basis-0 md:max-w-full md:w-full";
      case "lg":
        return "lg:flex-1 lg:basis-0 lg:max-w-full lg:w-full";
      case "xl":
        return "xl:flex-1 xl:basis-0 xl:max-w-full xl:w-full";
      case "xxl":
        return "xxl:flex-1 xxl:basis-0 xxl:max-w-full xxl:w-full";
      case "xxxl":
        return "xxxl:flex-1 xxxl:basis-0 xxxl:max-w-full xxxl:w-full";
      default:
        return "flex-1 basis-0 max-w-full w-full";
    }
  };

  return (
    <div
      style={{
        ...style,
        paddingLeft: "var(--gutter-x, 1rem)",
        paddingRight: "var(--gutter-x, 1rem)",
      }}
      className={cn(
        "bootstrap-col",
        className,
        col === "auto" ? "w-auto flex-none" : "w-full",
        col === undefined ? null : colLogic("", col),
        colLogic("sm", sm),
        colLogic("md", md),
        colLogic("lg", lg),
        colLogic("xl", xl),
        colLogic("xxl", xxl),
        colLogic("xxxl", xxxl),
      )}
    >
      {children}
    </div>
  );
}
`,
  },
];

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
      'export const configuration = {\n  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",\n};\n',
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
      "    const response = await fetch(`${config.apiUrl}${url}`, requestInit);",
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
      '      exceptionMessage: "Unable to connect to the server. Please check your network connection or try again later.",',
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
    content: "export const apiHelpers = {};\n",
  },
  {
    path: "src/shared/utils/utils.ts",
    content: [
      'import { clsx, type ClassValue } from "clsx";',
      'import { twMerge } from "tailwind-merge";',
      "",
      "export function cn(...inputs: ClassValue[]) {",
      "  return twMerge(clsx(inputs));",
      "}",
    ].join("\n"),
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
    path: "src/shared/constants/componentNames.ts",
    content: "export const COMPONENT_NAMES = {};\n",
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
    path: "src/shared/styles/globals.css",
    content:
      '@import "tailwindcss";\n@import "./reusable.css";\n\n:root {\n  --background: #ffffff;\n  --foreground: #0f172a;\n}\n\nbody {\n  background-color: var(--background);\n  color: var(--foreground);\n}\n',
  },
  {
    path: "src/shared/styles/reusable.css",
    content: "/* Add reusable utility classes here */\n",
  },
  {
    path: "src/shared/assets/fonts/fonts.ts",
    content: [
      'import localFont from "next/font/local";',
      "",
      "export const roboto = localFont({",
      "  src: [",
      "    {",
      '      path: "./roboto/Roboto-Thin.ttf",',
      '      weight: "100",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-ExtraLight.ttf",',
      '      weight: "200",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-Light.ttf",',
      '      weight: "300",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-Regular.ttf",',
      '      weight: "400",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-Medium.ttf",',
      '      weight: "500",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-SemiBold.ttf",',
      '      weight: "600",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-Bold.ttf",',
      '      weight: "700",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-ExtraBold.ttf",',
      '      weight: "800",',
      '      style: "normal",',
      "    },",
      "    {",
      '      path: "./roboto/Roboto-Black.ttf",',
      '      weight: "900",',
      '      style: "normal",',
      "    },",
      "  ],",
      '  variable: "--font-sans",',
      '  display: "swap",',
      '  fallback: ["system-ui", "Arial", "sans-serif"],',
      "});",
    ].join("\n"),
  },
  {
    path: "src/app/layout.tsx",
    content: `import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { roboto } from "@/shared/assets/fonts/fonts";
import { cn } from "@/shared/utils/utils";
import { TooltipProvider } from "@/shared/components/shadcn-ui/tooltip";
import { Toaster } from "@/shared/components/shadcn-ui/sonner";

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "Next.js Starter is a scalable and modular starter kit for Next.js projects",
  keywords: "nextjs starter, all services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(roboto.variable, "font-sans")}>
      <body className="body bg-background text-foreground">
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </body>
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

  // Create Global Files (only when missing)
  for (const file of [...globalFiles, ...flexboxGridFiles]) {
    writeFileIfMissing(file.path, file.content);
  }

  // Create Boilerplate Files for each module
  modules.forEach((module) => {
    const modUpper = capitalize(module);

    const files = [
      {
        path: `src/app/(${module})/_modules/layout/${modUpper}Header.tsx`,
        content: gridComponentTemplate(`${modUpper}Header`, `${modUpper} Header`),
      },
      {
        path: `src/app/(${module})/_modules/layout/${modUpper}Footer.tsx`,
        content: gridComponentTemplate(`${modUpper}Footer`, `${modUpper} Footer`),
      },
      {
        path: `src/app/(${module})/_modules/components/${modUpper}Component.tsx`,
        content: gridComponentTemplate(`${modUpper}Component`, `${modUpper} Component`),
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
        content: `import { create } from "zustand";\n\ninterface ${modUpper}State {\n  demo: string;\n}\n\nexport const use${modUpper}Store = create<${modUpper}State>(() => ({\n  demo: "",\n}));\n`,
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
        content: moduleLayoutTemplate(module, modUpper),
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
      writeFileIfMissing(file.path, file.content, "module file");
    });
  });

  // Remove default src/app/page.tsx to avoid conflicts with the new homepage
  const defaultPagePath = path.join(process.cwd(), "src/app/page.tsx");
  if (fs.existsSync(defaultPagePath)) {
    fs.unlinkSync(defaultPagePath);
    console.log("🗑️ Removed default src/app/page.tsx to enable modular homepage.");
  }

  console.log("\n✨ Next.js Folder structure is synchronized and ready!");
  process.exit(0);
};

run();
