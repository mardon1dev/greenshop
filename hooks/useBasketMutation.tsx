import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./useAxios";
import { useContext } from "react";
import { Context } from "@/context/Context";
import toast from "react-hot-toast";

export const useBasketMutation = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();
  const { token } = useContext(Context);

  const basketMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await axiosInstance.post(
        `/basket`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data || null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["basket"],
      });
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

  return basketMutation;
};
