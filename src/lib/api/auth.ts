import { createData } from "@/lib/api/http-service";
import { AuthResponse, RegisterInput, SignInInput } from "@/types/requests/auth.type";

export const auth = {
    signIn: (data: SignInInput) => createData<AuthResponse>('/api/users/login', data),
    register: (data: RegisterInput) => createData<AuthResponse>('/api/users', data),
};
