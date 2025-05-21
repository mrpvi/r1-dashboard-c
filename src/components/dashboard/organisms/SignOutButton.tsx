'use client'
import { Button } from "@/components/shared/atoms/Button";
import { signOut } from "next-auth/react";

export default function SignOutButton({ className }: { className?: string }) {
    return (
        <Button
            onClick={() => signOut()}
            type="button"
            variant="secondary"
            className={className}
        >
            Sign out
        </Button>
    )
}