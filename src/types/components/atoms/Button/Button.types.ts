import { ButtonHTMLAttributes } from "react";
import { ComponentBase } from "@/types/components/ComponentBase.type";
import { IconName } from "@/types/IconName.type";

export type ButtonProps = ComponentBase 
    & ButtonHTMLAttributes<HTMLButtonElement>
    & {
        children?: React.ReactNode;
        isLoading?: boolean;
        block?: boolean;
        icon?: IconName;
        type?: "button" | "submit";
    };