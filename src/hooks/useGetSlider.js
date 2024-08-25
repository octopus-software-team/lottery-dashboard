import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

export default function useGetSlider() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/getSliders");
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
  return { isLoading, data, error };
}
