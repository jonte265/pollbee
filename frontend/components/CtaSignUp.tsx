import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import { LuArrowRight } from "react-icons/lu";

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
    <section className="flex flex-col justify-center items-center gap-2 py-32">
      <h3>Want to create and share your own polls?</h3>
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
