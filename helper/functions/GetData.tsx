import { useAxios } from "@/hooks/useAxios";


async function getData(path: string) {

    const response = await useAxios().get(`/${path}`, {
        params: {
          page: 1,
          limit: 100,
        },
      });
    return response?.data;
  }
  
  export default async function getProducts(path: string) {
    const data = await getData(path);
    return data;
  }