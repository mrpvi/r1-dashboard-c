import { redirect } from 'next/navigation';
import  ArticlesTable  from '../components/ArticlesTable';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function page({ params }: PageProps) {
  const resolvedParams = await params;
  const page = resolvedParams.page;
  
  if (page === '1') {
    return redirect('/dashboard/articles');
  }

  return (
    <div className="mx-auto h-full">
        <ArticlesTable />
    </div>
  );
}