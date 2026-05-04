type H2Types = {
  children: React.ReactNode;
  bold?: boolean;
  textCenter?: boolean;
};

export default function H2({
  children,
  bold = true,
  textCenter = false,
}: H2Types) {
  return (
    <h2
      className={`
    text-2xl 
    ${bold ? "font-bold" : ""}
    ${textCenter ? "text-center" : ""}
    `}
    >
      {children}
    </h2>
  );
}
