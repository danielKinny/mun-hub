"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protectedroute";
import { CustomNav } from "@/components/ui/customnav";
import Image from "next/image";
import { Article } from "@/db/types";

export default function Page() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[] | null>(null);

  const fetchSpeeches = async () => {
    const res = await fetch("/api/articles");
    if (!res.ok) {
        console.error("Failed to fetch articles");
        return;
    }
    const data = await res.json();
    setArticles(data);
  };

  useEffect(() => {
    fetchSpeeches();
  }, []);

  return (
    <ProtectedRoute>
      <CustomNav />
      <main className="min-h-screen text-white">
        <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4 p-4 [column-fill:_balance]">
          {articles?.map((article) => (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              key={article.source.id + article.title}
              className="mb-4 break-inside-avoid p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 w-full inline-block block"
              onClick={() => setSelectedArticle(article)}
            >
              <h2 className="text-xl font-bold">{article.title}</h2>
              <img
                src={article.urlToImage}
                width={200}
                height={200}
                alt="news cover"
                className="object-fit my-2 w-full h-auto rounded"
              />
              <p className="text-sm text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="mt-2">{article.description}</p>
            </a>
          ))}
        </section>
      </main>
    </ProtectedRoute>
  );
}
