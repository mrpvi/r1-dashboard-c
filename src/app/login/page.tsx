'use client'

import { Button } from "@/components/shared/atoms/Button";
import { Input } from "@/components/shared/atoms/Input";
import LinkButton from "@/components/shared/atoms/LinkButton";
import { Field } from "@/components/shared/molecules/Field";
import { useNotificationStore } from "@/stores/notification.store";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { get, useForm } from "react-hook-form";

interface LoginForm {
    email: string;
    password: string;
}

const loginFormRoules = {
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

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification } = useNotificationStore();
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>();

    const onSubmit = async(data: LoginForm) => {
        setIsLoading(true);
        
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                callbackUrl: "/dashboard/articles",
                redirect: false,
            });

            if (!!response.error) {
                showNotification({
                    title: "Sign-in Failed!",
                    message: "Email or password is invalid.",
                    type: "error"
                })
            } else {
                router.push("/dashboard/articles");
            }


        setIsLoading(false);
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-neutral-bg2-default">
            <div className="bg-neutral-bg1-default rounded-md w-3xs lg:w-[480px]">
                <div className="py-9.5 px-6 border-b border-neutral-st3-default">
                    <h1 className="text-title-3 text-neutral-fg1-default">Sign in</h1>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <Field<LoginForm>
                            label="Email"
                            name="email"
                            id="email"
                            register={register}
                            rules={loginFormRoules.email}
                            errors={errors}
                        >
                            <Input
                                placeholder="Email"
                                type="text"
                                size="md"
                                isDisabled={isLoading}
                            />
                        </Field>

                        <Field<LoginForm>
                            label="Password"
                            name="password"
                            id="password"
                            register={register}
                            rules={loginFormRoules.password}
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
                            Sign in
                        </Button>
                    </form>
                    <p className="text-body-2 text-neutral-fg1-default text-center mt-3">
                        Don't have an account? <LinkButton href="/register">Sign up</LinkButton>
                    </p>
                </div>
            </div>
        </main>
    );
}
