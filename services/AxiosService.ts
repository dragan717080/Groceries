import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosOptions = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
}

class AxiosService {
  private axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    ...axiosOptions
  });

  private localAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    ...axiosOptions
  });

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  // Data from the Local API
  public async getLocal<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.localAxiosInstance.get(url, config);
    return response.data;
  }
}

export default new AxiosService();
