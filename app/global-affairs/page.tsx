"use client";
import React, { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "@/components/protectedroute";
import { CustomNav } from "@/components/ui/customnav";
import Image from "next/image";
import { Article } from "@/db/types";

export default function Page() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const CACHE_DURATION = 20 * 60 * 1000;
  const [lastFetched, setLastFetched] = useState<number>(0);

  const fetchArticles = useCallback(async () => {
    const now = Date.now();
    if (articles && now - lastFetched < CACHE_DURATION) {
      return;
    }
    const res = await fetch("/api/articles");
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setArticles(data);
    setLastFetched(now);
  }, [articles, lastFetched]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <ProtectedRoute>
      <CustomNav />
      <div className=" flex items-center justify-center">
        <h1 className="cursor-pointer text-7xl font-extrabold text-white text-center transition-all duration-300 ease-in-out hover:text-8xl">
          GLOBAL AFFAIRS
        </h1>
      </div>

      <main className="min-h-screen text-white">
        <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4 p-4 [column-fill:_balance]">
          {articles?.map((article) => (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              key={article.source.id + article.title}
              className="mb-4 break-inside-avoid p-4 bg-gray-700 bg-opacity-60 rounded-lg cursor-pointer hover:bg-gray-600 hover:bg-opacity-80 w-full inline-block block transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10"
            >
              <h2 className="text-xl font-bold transition-colors duration-300 group-hover:text-blue-300">
                {article.title}
              </h2>
              <div className="my-2 w-full h-[200px] relative rounded overflow-hidden">
                <Image
                  src={article.urlToImage}
                  fill
                  alt="news cover"
                  className="object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 200px"
                  priority={false}
                />
              </div>
              <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-blue-200">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="mt-2 transition-colors duration-300 group-hover:text-blue-100">
                {article.description}
              </p>
            </a>
          ))}
        </section>
      </main>
    </ProtectedRoute>
  );
}
