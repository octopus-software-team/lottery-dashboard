import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export default function useGetLotteryUsers(id, currentPage) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["lottery-users", id, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post(
          `/getLotteriesUsers?page=${currentPage}`,
          {
            lottery_id: id
          }
        );
        if (res.status === 200) {
          return {
            data: res.data.data.data,
            count: res.data.data.total
          };
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
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
