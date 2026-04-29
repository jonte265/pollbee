type TypographyTypes = {
  children: React.ReactNode;
  bold?: boolean;
  light?: boolean;
  small?: boolean;
};

export default function Typography({
  children,
  bold = false,
  light = false,
  small = false,
}: TypographyTypes) {
  return (
    <p
      className={`   
        ${bold ? "font-bold" : ""}
        ${light ? "opacity-70" : ""}
        ${small ? "text-sm" : ""}
        `}
    >
      {children}
    </p>
  );
}
