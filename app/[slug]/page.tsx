import { notFound } from "next/navigation";
import Link from "next/link";
import festivals from "@/data/festivals.json";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

function getFestival(slug: string) {
  return festivals.find((f) => f.id === slug);
}

// Pre-builds all festival pages at build time — faster loading, better for SEO
export function generateStaticParams() {
  return festivals.map((festival) => ({
    slug: festival.id,
  }));
}

// This is what actually shows up in Google search results — title/description per festival
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const festival = getFestival(slug);

  if (!festival) {
    return { title: "Festival Not Found" };
  }

  return {
    title: `${festival.name} 2026 — Date & Significance`,
    description: festival.shortDescription,
  };
}

export default async function FestivalPage({ params }: Props) {
  const { slug } = await params;
  const festival = getFestival(slug);

  if (!festival) {
    notFound();
  }

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/calendar"
        className="text-sm text-orange-600 hover:underline"
      >
        ← Back to calendar
      </Link>

      <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mt-4">
        {festival.name}
      </h1>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
        {new Date(festival.date).toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p className="text-zinc-700 dark:text-zinc-300 mt-6 leading-relaxed">
        {festival.shortDescription}
      </p>
    </main>
  );
}