import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";

export default function useGetImpotedUsers({ page = 1, limit = 10 } = {}) {
  const [searchParms] = useSearchParams();
  const search = searchParms.get("search");

  const { isLoading, data, error } = useQuery({
    queryKey: ["imported-users", search, page],
    queryFn: async () => {
      try {
        let url = `/getUserFromImport?page=${page}&limit=${limit}`;

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        const res = await axiosInstance.get(url);
        if (res.status === 200) {
          return {
            data: res.data.data.data,
            count: res.data.data?.total
          };
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  return { isLoading, data, error };
}
