import { iconRegistry } from "@/app/assets/icons";
import { ButtonProps } from "@/types/components/atoms/Button/Button.types";
import classNames from "classnames";

export const Button = ({
    children = "",
    isDisabled = false,
    type = "button",
    className,
    variant = "primary",
    isLoading = false,
    block = false,
    icon,
    ...props
}: ButtonProps) => {

    const classes = classNames(
        className,
        { "pointer-events-none": isDisabled },
        { "w-full": block },
        { "flex items-center justify-center p-2.5": icon },
        { [`ar-btn ar-btn-${variant}`]: variant },
    );

    let buttonContent;
    if (isLoading) {
        const IconComponent = iconRegistry['spinner'];
        buttonContent = <IconComponent className="animate-spin" />;
    } else if (icon) {
        const IconComponent = iconRegistry[icon];
        buttonContent = <IconComponent />;
    } else {
        buttonContent = children;
    }

    return (
        <button
            type={type} 
            className={classes}
            disabled={isDisabled}
            {...props}
        >
            {buttonContent}
        </button>
    );
};