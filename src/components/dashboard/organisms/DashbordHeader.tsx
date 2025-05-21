'use client'

import { Button } from "@/components/shared/atoms/Button";
import { signOut, useSession } from "next-auth/react";
import { useSidebarStore } from "@/stores/sidbar.store";
import SignOutButton from "@/components/dashboard/organisms/SignOutButton";
export default function DashbordHeader() {
    const { sidebarVisible, setSidebarVisible } = useSidebarStore();
    const session = useSession();
    const user = session?.data?.user;

    return (
        <header className="bg-neutral-bg1-default py-5.5 px-6 flex justify-between items-center border-b border-neutral-st3-default">
            <span className="text-neutral-fg1-default text-body-2">
                welcome back, <span className="text-body-2-strong">{user?.username}</span>
            </span>
            <span className="text-neutral-fg1-default text-body-1 px-3 py-2 bg-neutral-bg2-default rounded-sm hidden lg:block">
                Arvancloud Challenge
            </span>

            <SignOutButton
                className="hidden lg:block"
            />
            <Button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                type="button"
                variant="secondary"
                icon="ellipsis"
                className="lg:hidden"
            />
        </header>
    )
}