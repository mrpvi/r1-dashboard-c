'use client'

import { Button } from "@/components/shared/atoms/Button";
import { Input } from "@/components/shared/atoms/Input";
import { Field } from "@/components/shared/molecules/Field";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CheckBox } from "@/components/shared/atoms/CheckBox";
import { articles } from "@/lib/api/articles";
import { useSession } from "next-auth/react";
import { useNotificationStore } from "@/stores/notification.store";

interface ArticleFormProps {
    varient: "create" | "edit";
    slug?: string;
}

interface ArticleFormData {
    title: string;
    description: string;
    body: string;
}

interface Tag {
    label: string;
    id: string;
    isActive: boolean;
}

const formValidationRules = {
    title: {
        required: "Title is required",
    },
    description: {
        required: "Description is required",
        minLength: {
            value: 8,
            message: "Description must be at least 8 characters long"
        }
    },
    body: {
        required: "Body is required",
        minLength: {
            value: 10,
            message: "Body must be at least 10 characters long"
        }
    }
} as const;


export default function ArticleForm({
    varient = "create",
    slug
}: ArticleFormProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { showNotification } = useNotificationStore();
    const { data: session } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<ArticleFormData>();

    useEffect(() => {
        const fetchArticleData = async () => {
            if (!slug) return;

            try {
                setIsLoading(true);
                const response = await articles.getArticles({
                    "Authorization": `Token ${session?.user.token}`
                });

                const article = response.articles.find(a => a.slug === slug);
                if (!article) {
                    window.location.href = "/dashboard/articles/create";
                    return;
                }

                setValue("title", article.title);
                setValue("description", article.description);
                setValue("body", article.body);
                setTags(article.tagList.map(t => ({ label: t, id: t, isActive: true })));
            } catch (error) {
                showNotification({
                    title: "Error",
                    message: "Failed to fetch article data",
                    type: "error"
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleData();
    }, [slug, session?.user.token, setValue, showNotification]);

    const handleTagToggle = (tagId: string) => {
        setTags(tags.map(tag =>
            tag.id === tagId ? { ...tag, isActive: !tag.isActive } : tag
        ));
    };

    const handleCreateArticle = async (data: ArticleFormData) => {
        try {
            setIsLoading(true);
            await articles.createArticle(
                {
                    article: {
                        ...data,
                        tagList: tags.filter(t => t.isActive).map(t => t.label)
                    }
                },
                {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${session?.user.token}`
                }
            );

            showNotification({
                title: "Success",
                message: "Article created successfully",
                type: "success"
            });

            setTimeout(() => {
                window.location.href = "/dashboard/articles";
            }, 1000);
        } catch (error) {
            showNotification({
                title: "Error",
                message: "Failed to create article",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateArticle = async (data: ArticleFormData) => {
        if (!slug || !session?.user.token) {
            showNotification({
                title: "Error",
                message: "Missing required data for update",
                type: "error"
            });
            return;
        }

        try {
            setIsLoading(true);
            await articles.updateArticle(
                slug,
                {
                    article: {
                        ...data,
                        tagList: tags.filter(t => t.isActive).map(t => t.label)
                    }
                },
                {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${session.user.token}`
                }
            );

            showNotification({
                title: "Success",
                message: "Article updated successfully",
                type: "success"
            });

            setTimeout(() => {
                window.location.href = "/dashboard/articles";
            }, 1000);
        } catch (error: any) {
            showNotification({
                title: "Error!",
                message: error.message,
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const isNewTag = !tags.find(tag => tag.label === e.currentTarget.value);
            if (isNewTag) {
                setTags([...tags, { label: e.currentTarget.value, id: e.currentTarget.value, isActive: true }]);
                e.currentTarget.value = "";
            } else {
                showNotification({
                    title: "Error",
                    message: "Tag already exists",
                    type: "error"
                });
            }
        }
    };

    const renderFormFields = () => (
        <>
            <Field<ArticleFormData>
                label="Title"
                name="title"
                id="title"
                register={register}
                rules={formValidationRules.title}
                errors={errors}
            >
                <Input
                    placeholder="Enter title"
                    isDisabled={isLoading}
                />
            </Field>
            <Field<ArticleFormData>
                label="Description"
                name="description"
                id="description"
                register={register}
                rules={formValidationRules.description}
                errors={errors}
            >
                <Input
                    placeholder="Enter description"
                    isDisabled={isLoading}
                />
            </Field>
            <Field<ArticleFormData>
                label="Body"
                name="body"
                id="body"
                register={register}
                rules={formValidationRules.body}
                errors={errors}
            >
                <Input
                    placeholder="Enter body"
                    as="textarea"
                    rows={10}
                    className="resize-none"
                    isDisabled={isLoading}
                />
            </Field>
        </>
    );


    return (
        <div className="mx-auto flex flex-col md:flex-row gap-4">
            <div className="rounded-lg bg-neutral-bg1-default w-full">
                <div className="py-9.5 px-6 text-neutral-fg1-default text-title-3 border-b border-neutral-st3-default">
                    <h1>{varient === "create" ? "Create Article" : "Edit Article"}</h1>
                </div>
                <div className="p-6">
                    <div className="flex flex-col gap-6">
                        <form
                            onSubmit={handleSubmit(
                                varient === "create" ? handleCreateArticle : handleUpdateArticle
                            )}
                            className="flex flex-col gap-2"
                        >
                            {renderFormFields()}
                            <Button
                                type="submit"
                                className="w-fit"
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            >
                                {varient === "create" ? "Create Article" : "Update Article"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="rounded-lg bg-neutral-bg1-default p-6 h-fit">
                <h2 className="text-neutral-fg1-default text-body-2 mb-2">Tags</h2>
                <Input 
                    placeholder="New Tag"
                    isDisabled={isLoading} 
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleAddTag(e)}
                />
                {tags.length > 0 && <div className="flex flex-col gap-2 border border-neutral-st3-default rounded-2xl mt-6 p-4">
                    {tags
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((tag) => (
                        <CheckBox
                            key={tag.id}
                            label={tag.label}
                            id={tag.id}
                            checked={tag.isActive}
                            onChange={() => handleTagToggle(tag.id)}
                            isDisabled={isLoading}
                        />
                    ))}
                </div>}
            </div>
        </div>
    );
}