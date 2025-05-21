'use client'
import { CheckboxProps } from "@/types/components/atoms/CheckBox/CheckBox.types";
import classNames from "classnames";
import { useEffect, useRef } from "react";

export const CheckBox = ({
    label,
    onChange,
    value,
    checked,
    indeterminate,
    className,
    isDisabled,
    id,
    ...props
}: CheckboxProps) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate || false;
        }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
    };

    return (
        <label className={classNames("ar-checkbox", className)}>
            <input
                ref={checkboxRef}
                type="checkbox"
                id={id}
                checked={checked}
                onChange={handleChange}
                disabled={isDisabled}
                value={value}
                {...props}
            />
            <span className={classNames("checkmark", {"indeterminate": indeterminate === true})}></span>
            {label && <span>{label}</span>}
        </label>
    );
};