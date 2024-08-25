import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export default function useGetUser(enabled) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/getUser");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        throw error;
      }
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  return { isLoading, data, error, refetch, isFetched };
}
