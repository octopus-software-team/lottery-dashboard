import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";

export default function useGetLotteries({ page = 1, limit = 10 } = {}) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const status = searchParams.get("status") || "active";

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["lotteries", page, limit, search, status],
    queryFn: async () => {
      try {
        let url = `/lotteriesWithPagination?page=${page}&limit=${limit}&status=${status}`;

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        const res = await axiosInstance.get(url);

        if (res.status === 200) {
          return {
            data: res.data.data?.Data,
            count: res.data.data?.total_count
          };
        }
      } catch (error) {
        console.error("Error Fetching Lotteries:", error.message);
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error, refetch };
}
