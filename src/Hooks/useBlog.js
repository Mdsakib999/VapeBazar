import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBlog = () => {
  const {
    data: blogData = [],
    refetch,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blog`);
      return res.data;
    },
  });
  return { blogData, refetch, isLoading, isFetched };
};

export default useBlog;
