import { InputProps } from "@/types/components/atoms/Input/Input.types";
import { FieldProps } from "@/types/components/molecules/Field/Field.types";
import { isValidElement, cloneElement, ReactElement, InputHTMLAttributes } from "react";
import { FieldValues, get } from "react-hook-form";

export const Field = <T extends FieldValues>({
    label="label",
    name,
    id,
    register,
    rules,
    errors,
    children
}: FieldProps<T>) => {
    const error = get(errors, name);
    const hasError = !!error;
    
    const bindedChild = isValidElement(children)
        ? cloneElement(children as ReactElement<InputHTMLAttributes<HTMLInputElement> & InputProps>, {
            ...register(name, rules as any),
            id,
            name,
            isError: hasError,
        })
        : children;

    return (
        <div className="flex flex-col gap-2">   
            <label className="flex flex-col gap-2">
                <span className="text-body-2 text-neutral-fg1-default after:content-['*'] after:text-red-500 after:ml-0.5">
                    {label}
                </span>
                {bindedChild}
            </label>
            {hasError && <p className="text-error-fg1-default text-caption-1-strong">{error.message}</p>}
        </div>
    );
};