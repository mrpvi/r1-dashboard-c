'use client'

import { Button } from "@/components/shared/atoms/Button";
import { articles } from "@/lib/api/articles";
import { useSession } from "next-auth/react";
import { useArticlesStore } from "@/stores/articels.store";
import { useState } from "react";
import Menu from "@/components/shared/organisms/Menu";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notification.store";

export default function MenuButton({ row, slug }: { row: any, slug: string }) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [loadingItems, setLoadingItems] = useState<string[]>([]);
    const { data: session } = useSession();
    const { allArticles, setAllArticles } = useArticlesStore();
    const router = useRouter();
    const { showNotification } = useNotificationStore();
    const handleDelete = async (slug: string) => {
      setLoadingItems(state => [...state, "Delete"]);
      
      try {
        const response = await articles.deleteArticle(slug, {
          "Authorization": `Token ${session?.user.token}`
        });
        setAllArticles(allArticles.filter(article => article.slug !== slug));
      } catch (error: any) {
        showNotification({
          title: "Error!",
          message: error.message,
          type: "error"
        });
      }

      setLoadingItems(state => state.filter(item => item !== "Delete"));
    };
    return (
      <div className="relative">
        <Button variant="secondary" icon="ellipsis" onClick={() => setIsActive(!isActive)} />
        {isActive && (
          <div className="absolute z-40 top-[calc(100%+8px)] -left-[120%]">
            <Menu 
              items={[
                {
                  label: 'Edit',
                  onClick: () => router.push(`/dashboard/articles/edit/${row.original.slug}`),
                },
                {
                  label: 'Delete',
                  onClick: () => handleDelete(row.original.slug),
                }
              ]}
              loadingItems={loadingItems}
             />
          </div>
        )}
      </div>
    )
  }