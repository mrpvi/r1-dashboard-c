import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ComponentBase } from "@/types/components/ComponentBase.type";

type BaseInputProps = ComponentBase & {
    isReadOnly?: boolean;
    isError?: boolean;
    className?: string;
    variant?: "primary";
    placeholder: string;
    as?: 'input' | 'textarea';
};

export type InputProps = BaseInputProps & (
    | Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled'>
    | Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'disabled'>
);