import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export default function useGetLottery(id) {
  const { isLoading, data, refetch, error } = useQuery({
    queryKey: ["lottery", id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/getLotteryDetails/${id}`);
        if (res.status === 200) {
          return res.data.data;
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
  return { isLoading, data, refetch, error };
}
