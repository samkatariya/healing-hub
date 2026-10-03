import { queryOptions } from "@tanstack/react-query";
import { getHospitals, getPublicArticle, getPublicContent } from "./content.functions";

export const publicContentOptions = queryOptions({
  queryKey: ["public-content"],
  queryFn: () => getPublicContent(),
  staleTime: 60_000,
});

export const publicArticleOptions = (slug: string) => queryOptions({
  queryKey: ["public-article", slug],
  queryFn: () => getPublicArticle({ data: { slug } }),
  staleTime: 60_000,
});
export const hospitalsOptions = queryOptions({
  queryKey: ["hospitals"],
  queryFn: () => getHospitals(),
  staleTime: 5 * 60_000,
});
