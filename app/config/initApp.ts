import AxiosService from "@/services/AxiosService";
import { AxiosResponse } from "axios";

export const initApp = async (uuid: string, uuidOS: string): Promise<string> => {
  try {
    const response = await AxiosService.post('/v2/init/app', 
    { uuid, uuidOS }, 
    {
      auth: {
        username: process.env.NEXT_PUBLIC_INIT_USERNAME as string,
        password: process.env.NEXT_PUBLIC_INIT_PASSWORD as string,
      },
    });

    return (response as AxiosResponse).data.token;
  } catch (error) {
    console.error('Error in initApp:', error);
    throw error;
  }
};

export const getProducts = async (token: string) => {
  const response = await AxiosService.get('/v2/session/product', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return (response as AxiosResponse).data;
};
