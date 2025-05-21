import { ComponentBase } from "@/types/components/ComponentBase.type";

export type LinkButtonProps = ComponentBase & {
    href: string;
    children: React.ReactNode;
    className?: string;
    isDisabled?: boolean;
}