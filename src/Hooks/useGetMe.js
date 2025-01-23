import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "./useAxiosNotSecure";

const useGetMe = () => {
  const { axiosNotSecure } = useAxiosNotSecure();
  const {
    data: meData = {},
    refetch,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const res = await axiosNotSecure.get(`/getMe`);
      return res.data;
    },
  });
  return { meData, refetch, isLoading, isFetched };
};

export default useGetMe;
