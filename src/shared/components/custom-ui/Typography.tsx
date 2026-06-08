import { cn } from "@/shared/utils/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1 = ({ children, className }: TypographyProps) => {
  return <h1 className={cn("text-4xl font-extrabold", className)}>{children}</h1>;
};

export const H2 = ({ children, className }: TypographyProps) => {
  return <h2 className={cn("text-3xl font-semibold", className)}>{children}</h2>;
};

export const H3 = ({ children, className }: TypographyProps) => {
  return <h3 className={cn("text-2xl font-semibold", className)}>{children}</h3>;
};

export const H4 = ({ children, className }: TypographyProps) => {
  return <h4 className={cn("text-xl font-semibold", className)}>{children}</h4>;
};

export const H5 = ({ children, className }: TypographyProps) => {
  return <h5 className={cn("text-lg font-semibold", className)}>{children}</h5>;
};

export const H6 = ({ children, className }: TypographyProps) => {
  return <h6 className={cn("text-base font-semibold", className)}>{children}</h6>;
};

export const P = ({ children, className }: TypographyProps) => {
  return <p className={cn("text-sm text-gray-400", className)}>{children}</p>;
};

export const Span = ({ children, className }: TypographyProps) => {
  return <span className={cn("text-sm text-gray-400", className)}>{children}</span>;
};
