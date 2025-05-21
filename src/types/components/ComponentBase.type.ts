export type ComponentBase = {
    isDisabled?: boolean;
    className?: string;
    variant?: Variant;
    size?: Size;
}

export type Size = 
      "sm" 
    | "md"
    | "lg";

export type Variant =
    | "primary" 
    | "secondary" 
    | "primary-danger" ;