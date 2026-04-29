import Link from "next/link";
import ActiveBadge from "./ActiveBadge";
import Button from "./Button";
import { LuCopy, LuCheck, LuSquarePen } from "react-icons/lu";
import { useState, useEffect } from "react";
import H2 from "./ui/typography/H2";

type pollCardType = {
  poll_title: string;
  is_active: boolean;
  share_id: string;
  created_at: string;
};

export default function PollCard({
  poll_title,
  is_active,
  share_id,
  created_at,
}: pollCardType) {
  const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(`${apiUrl}/poll/${share_id}`);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-8 justify-center bg-gray-100 p-16 rounded-4xl">
      <div className="flex justify-center items-center">
        <ActiveBadge isActive={is_active} />
      </div>
      <div>
        <H2>{poll_title}</H2>
        <p className="opacity-50 text-sm text-center">
          Created: {new Date(created_at).toLocaleDateString("sv-SE")}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2 ">
        <Link href={`${apiUrl}/poll/${share_id}`}>
          <Button variant="secondary" btnText="View Poll" />
        </Link>
        <Link href={`${apiUrl}/edit/${share_id}`}>
          <Button
            variant="outline"
            btnText={
              <>
                <LuSquarePen /> Edit
              </>
            }
          />
        </Link>
        <Button
          variant="outline"
          btnText={
            copied ? (
              <>
                <LuCheck /> Copied
              </>
            ) : (
              <>
                <LuCopy /> Copy link
              </>
            )
          }
          onClick={handleCopyLink}
        />
      </div>
    </div>
  );
}
