'use client'
import { useNotificationStore } from "@/stores/notification.store";
import { ToastCard } from "./ToastCard";
import classNames from "classnames";

export const Toast = ({
    position = "top-center"
}: {
    position?: "top-center"
}) => {
    const { notifications, hideNotification } = useNotificationStore();

    const classes = classNames(
        "fixed z-50 flex flex-col gap-3 transition-all duration-300",
        {"top-4 left-1/2 -translate-x-1/2" : position === "top-center"}
    )

    return (
        <div className={classes}>
            {notifications.map((notification) => (
                <ToastCard
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                />
            ))}
        </div>
    );
};
