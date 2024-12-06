import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./useAxios";
import { useContext } from "react";
import { Context } from "@/context/Context";
import toast from "react-hot-toast";

export const useLikeMutation = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();
  const { token } = useContext(Context);

  const likeMutation = useMutation({
    mutationFn: async (product_id: string) => {
      const response = await axiosInstance.post(
        `/like/${product_id}`,
        {},
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      return response?.data || null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
    onError: () => {
      toast.error("Birinchi ro'yhatdan o'ting.");
    },
  });
  return likeMutation;
};
