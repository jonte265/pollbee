type H2Types = {
  children: React.ReactNode;
};

export default function H2({ children }: H2Types) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
