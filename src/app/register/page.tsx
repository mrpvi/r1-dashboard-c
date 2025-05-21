'use client'

import { Button } from "@/components/shared/atoms/Button";
import { Input } from "@/components/shared/atoms/Input";
import { Field } from "@/components/shared/molecules/Field";
import LinkButton from "@/components/shared/atoms/LinkButton";
import { auth } from "@/lib/api/auth";
import { useNotificationStore } from "@/stores/notification.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

const registerFormRules = {
    username: {
        required: "Username is required",
        minLength: {
            value: 3,
            message: "Username must be at least 3 characters long"
        }
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        }
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
        }
    }
}

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification } = useNotificationStore();
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterForm>();

    const onSubmit = async(data: RegisterForm) => {
        setIsLoading(true);
        try {
            const response = await auth.register({ user: data });

            if (!!response.error) {
                throw new Error('Registration failed');
            }

            showNotification({
                title: "Success!",
                message: "Registration successful. Please sign in.",
                type: "success"
            });
            
            router.push("/login");
        } catch (error) {
            showNotification({
                title: "Registration Failed!",
                message: "Something went wrong. Please try again.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-neutral-bg2-default">
            <div className="bg-neutral-bg1-default rounded-md w-3xs lg:w-[480px]">
                <div className="py-9.5 px-6 border-b border-neutral-st3-default">
                    <h1 className="text-title-3 text-neutral-fg1-default">Sign up</h1>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <Field<RegisterForm>
                            label="Username"
                            name="username"
                            id="username"
                            register={register}
                            rules={registerFormRules.username}
                            errors={errors}
                        >
                            <Input
                                placeholder="Username"
                                type="text"
                                size="md"
                                isDisabled={isLoading}
                            />
                        </Field>

                        <Field<RegisterForm>
                            label="Email"
                            name="email"
                            id="email"
                            register={register}
                            rules={registerFormRules.email}
                            errors={errors}
                        >
                            <Input
                                placeholder="Email"
                                type="text"
                                size="md"
                                isDisabled={isLoading}
                            />
                        </Field>

                        <Field<RegisterForm>
                            label="Password"
                            name="password"
                            id="password"
                            register={register}
                            rules={registerFormRules.password}
                            errors={errors}
                        >
                            <Input
                                placeholder="Password"
                                type="password"
                                size="md"
                                isDisabled={isLoading}
                            />
                        </Field>

                        <Button
                            variant="primary"
                            type="submit"
                            block={true}
                            className="mt-3"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                        >
                            Sign up
                        </Button>
                    </form>
                    <p className="text-body-2 text-neutral-fg1-default text-center mt-3 flex flex-col md:flex-row md:justify-center md:gap-1">
                        Already have an account? <LinkButton href="/login">Sign in</LinkButton>
                    </p>
                </div>
            </div>
        </main>
    );
}