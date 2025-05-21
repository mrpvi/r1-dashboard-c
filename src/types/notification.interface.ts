export interface Notification {
    id: string;
    duration?: number;
    title?: string;
    message: string;
    type: "success" | "error";
}