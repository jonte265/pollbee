type H2Types = {
  children: React.ReactNode;
  bold?: boolean;
};

export default function H2({ children, bold = true }: H2Types) {
  return <h2 className={`text-2xl ${bold ? "font-bold" : ""}`}>{children}</h2>;
}
