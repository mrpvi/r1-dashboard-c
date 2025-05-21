import { create } from "zustand";

type SidebarState = {
    sidebarVisible: boolean;
    setSidebarVisible: (visible: boolean) => void;
}
export const useSidebarStore = create<SidebarState>((set) => ({
    sidebarVisible: false,
    setSidebarVisible: (visible: boolean) => {
        set(() => ({
            sidebarVisible: visible
        }))
    },
}))