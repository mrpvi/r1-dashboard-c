import ArticleForm from "../../components/ArticleForm";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function page({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
  
    return (
      <div className="mx-auto h-full">
        <ArticleForm
          varient="edit"
          slug={slug}
        />
      </div>
    );
  }