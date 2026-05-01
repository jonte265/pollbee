import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import { LuArrowRight } from "react-icons/lu";
import Typography from "./ui/typography/Typography";

function CtaSignUp() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

    if (tokenLocal) {
      setSignedIn(true);
    }
  }, []);

  if (signedIn) {
    return null;
  }

  return (
    <section className="flex flex-col justify-center items-center gap-4 py-32">
      <Typography>Want to create and share your own polls?</Typography>
      <Link href="/signup">
        <Button
          btnText={
            <>
              Sign Up <LuArrowRight />
            </>
          }
        />
      </Link>
    </section>
  );
}

export default CtaSignUp;
