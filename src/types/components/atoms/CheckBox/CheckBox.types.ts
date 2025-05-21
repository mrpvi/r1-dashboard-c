import { InputHTMLAttributes } from "react";
import { ComponentBase } from "@/types/components/ComponentBase.type";

export type CheckboxProps = ComponentBase 
    & InputHTMLAttributes<HTMLInputElement>
    & {
        label?: string;
        onChange?: (checked: boolean) => void;
        value?: boolean;
        indeterminate?: boolean;
        id: string;
    };