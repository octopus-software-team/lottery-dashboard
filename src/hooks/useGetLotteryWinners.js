import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export default function useGetLotteryWinners(lotttery_id, category_id, main) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["lottery-winners", lotttery_id, category_id, main],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/getWinners?lottery_id=${lotttery_id}&category_id=${category_id}&main=${main}`
        );
        if (res.status === 200) {
          return res.data.data;
        }
      } catch (error) {
        console.error("Error fetching winners:", error.message);
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
