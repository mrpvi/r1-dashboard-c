import { Notification } from "@/types/notification.interface";
import classNames from "classnames";

export const ToastCard = ({
    id,
    title,
    message,
    type,
}: Notification) => {

    const classes = classNames(
        "py-3 px-4 flex items-center justify-between gap-1 rounded-lg shadow-xl transition-all animate-move-down",
        {
            "bg-success-bg1-default text-success-fg1-default": type === "success",
            "bg-error-bg1-default text-error-fg1-default": type === "error",
        }
    )
    return (
        <div className={classes}>
            <span className="text-body-2-strong">{title}</span>
            <p className="text-caption-1">{message}</p>
        </div>
    )
}