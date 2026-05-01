type TypographyTypes = {
  children: React.ReactNode;
  bold?: boolean;
  light?: boolean;
  small?: boolean;
  textCenter?: boolean;
};

export default function Typography({
  children,
  bold = false,
  light = false,
  small = false,
  textCenter = false,
}: TypographyTypes) {
  return (
    <p
      className={`   
        ${bold ? "font-bold" : ""}
        ${light ? "opacity-70" : ""}
        ${small ? "text-sm" : ""}
        ${textCenter ? "text-center" : ""}
        `}
    >
      {children}
    </p>
  );
}
