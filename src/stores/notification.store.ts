import { Notification } from "@/types/notification.interface";
import { generateId } from "@/utils/string";
import { create } from "zustand";

type NotificationState = {
    notifications: Notification[];
    showNotification: (notification: Omit<Notification, "id">) => void;
    hideNotification: (id: string) => void;
}
export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    showNotification: (notification: Omit<Notification, "id">) => {
        const id = generateId();
        set(state => ({
            notifications: [
                ...state.notifications,
                { id, ...notification }
            ]
        }))

        setTimeout(() => {
            set(state => ({
                notifications: state.notifications.filter(n => n.id !== id)
            }));
        }, notification.duration || 3000)
    },
    hideNotification: (id: string) => {
        set(state => {
            const notifications = state.notifications.filter(n => n.id !== id);
            return { notifications };
        })
    }
}))