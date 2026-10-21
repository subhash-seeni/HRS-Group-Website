import { redirect } from 'next/navigation';
import { entities } from '@/content/entities';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return entities.map((e) => ({ slug: e.slug }));
}

export default async function EntityRedirectPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/businesses/${slug}`);
}
