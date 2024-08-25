import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";

export default function useGetActiveLotteries() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("searchActive");

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["active-lotteries", search],
    queryFn: async () => {
      try {
        let url = `/lotteriesWithPagination`;
        if (search) {
          url += `?search=${encodeURIComponent(search)}`;
        }

        const res = await axiosInstance.get(url);

        if (res.status === 200) {
          return res.data.data?.Data;
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
