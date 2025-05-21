import Spinner from "@/app/assets/icons/Spinner";
import classNames from "classnames";

type MenuItem = {
    label: string;
    onClick: () => void;
}

type MenuProps = {
    items: MenuItem[];
    loadingItems?: string[];
}
export default function Menu({ items, loadingItems = [] }: MenuProps) {

    const classes = (isLoading: boolean) => classNames(
        "p-2 text-body-2 rounded-md cursor-pointer transition-all",
        {
            "text-neutral-fg2-default hover:bg-neutral-bg1-default pointer-events-none cursor-default": isLoading,
            "text-neutral-fg1-default hover:bg-neutral-bg1-press hover:text-neutral-fg1-press": !isLoading,
        }
    );

    return (    
        <div className="flex flex-col gap-3.5 p-2 bg-neutral-bg1-default rounded-lg min-w-32 shadow-xl ">
            {items.map((item) => (
                <div
                    key={item.label}
                    onClick={item.onClick}
                    className={classes(loadingItems.includes(item.label))}
                >   
                    {loadingItems.includes(item.label) ? <div className="flex items-center gap-2"><Spinner className="animate-spin" /> loading... </div> : item.label}
                </div>
            ))}
        </div>
    );
}