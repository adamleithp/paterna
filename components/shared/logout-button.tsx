"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    >
      Log out
    </Button>
  );
}
