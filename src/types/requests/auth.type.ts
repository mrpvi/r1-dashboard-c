export type SignInInput = {
    user: {
        email: string;
        password: string;
    };
};

export type RegisterInput = {
    user: {
        username: string;
        email: string;
        password: string;
    };
};

export type AuthResponse = {
    errors: any;
    error: any;
    user: {
        email: string;
        username: string;
        bio: string | null;
        image: string;
        token: string;
    }
};