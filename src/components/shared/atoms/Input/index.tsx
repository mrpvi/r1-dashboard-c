import { InputProps } from "@/types/components/atoms/Input/Input.types";
import classNames from "classnames";

export const Input = ({
    isDisabled = false,
    className,
    variant = "primary",
    size = "md",
    isError = false,
    as = 'input',
    ...props
}: InputProps) => {
    const classes = classNames(
        className,
        { "pointer-events-none": isDisabled },
        { [`ar-input ar-input-${variant}`]: variant },
        { "error": isError },
        { [`ar-input--${size}`]: as === 'input' ? size : false }
    );

    if (as === 'textarea') {
        return (
            <textarea
                className={classes}
                disabled={isDisabled}
                {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
            />
        );
    }

    return (
        <input
            className={classes}
            disabled={isDisabled}
            {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
    );
};