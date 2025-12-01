import { dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();
  const initialParams = { page: 1, perPage: 10, search: "" };
  const queryKey = ["notes", initialParams];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(initialParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NotesClient dehydratedState={dehydratedState} />;
}
