type H2Types = {
  children: React.ReactNode;
  bold?: boolean;
  large?: boolean;
  textCenter?: boolean;
};

export default function H2({
  children,
  bold = true,
  large = false,
  textCenter = false,
}: H2Types) {
  return (
    <h2
      className={`
    ${large ? "text-4xl" : "text-2xl"}
    ${bold ? "font-bold" : ""}
    ${textCenter ? "text-center" : ""}
    `}
    >
      {children}
    </h2>
  );
}
