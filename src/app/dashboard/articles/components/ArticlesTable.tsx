'use client'

import { useEffect } from "react";
import { Table } from "@/components/shared/organisms/Table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { articles } from "@/lib/api/articles";
import { useSession } from "next-auth/react";
import { useArticlesStore } from "@/stores/articels.store";
import MenuButton from "./MenuButton";
export default function ArticlesTable() {
  const { allArticles, setAllArticles } = useArticlesStore();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await articles.getArticles({
        "Authorization": `Token ${session?.user.token}`
      });
      setAllArticles([...response.articles, ...response.articles, ...response.articles, ...response.articles]);
    };

    if (allArticles.length === 0) {
      fetchArticles();
    }
  }, []);

  const handleDelete = async (slug: string) => {
    const response = await articles.deleteArticle(slug, {
      "Authorization": `Token ${session?.user.token}`
    });
    setAllArticles(allArticles.filter(article => article.slug !== slug));
  };

  const columns: ColumnDef<any>[] = [
    {
      id: 'number',
      header: '#',
      cell: ({ row }) => (
        <div className="bg-neutral-bg2-default rounded-sm w-8 h-8 text-neutral-fg1-default text-caption-1-strong flex items-center justify-center -ms-2.25">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="max-w-24 truncate text-body-1 text-neutral-fg1-default" title={row.original.title}>
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => <div className="text-body-2 text-neutral-fg1-default"> @{row.original.author.username}</div>,
    },
    {
      accessorKey: 'tagList',
      header: 'Tags',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 max-w-50">
          {row.original.tagList.map((tag: any, index: any) => (
            <span
              key={index}
              className="rounded bg-neutral-bg2-default px-2 py-1 text-xs text-neutral-fg1-default"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Excerpt',
      cell: ({ row }) => (
        <div className="max-w-sm truncate text-body-2 text-neutral-fg1-default" title={row.original.description}>
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => <div className="text-body-2 text-neutral-fg1-default"> {format(new Date(row.original.createdAt), 'MMM dd, yyyy')} </div>,
    },
    {
      accessorKey: 'fn',
      header: '',
      cell: ({ row }) => (<MenuButton row={row} slug={row.original.slug} />),
    }
  ];

  return (
    <div className="rounded-md bg-neutral-bg1-default h-full">
      <h1 className="py-9.5 px-6 text-neutral-fg1-default text-title-3 border-b border-neutral-st3-default">
        All Posts
      </h1>
      <Table
        columns={columns}
        data={allArticles}
        enablePagination={true}
        defaultPageSize={5}
        baseUrl="/dashboard/articles"
      />
    </div>
  );
}


