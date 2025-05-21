import Link from "next/link";
import classNames from "classnames";
import { LinkButtonProps } from "@/types/components/atoms/LinkButton/LinkButton.type";


export default function LinkButton({
    href,
    children,
    className,
    isDisabled = false
}: LinkButtonProps) {

    const classes = classNames(
        "ar-link-button",
        className,
        {  "disabled": isDisabled }
    )    
    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}