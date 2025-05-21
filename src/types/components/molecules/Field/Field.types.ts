import { UseFormRegister, RegisterOptions, FieldValues, Path, FieldErrors, DeepMap } from 'react-hook-form';

export interface FieldProps<T extends FieldValues> {
    label: string,
    name: Path<T>,
    id: string,
    register: UseFormRegister<T>,
    rules?: RegisterOptions,
    errors?: FieldErrors<T>,
    children: React.ReactNode
};