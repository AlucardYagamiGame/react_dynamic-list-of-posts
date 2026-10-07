/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method } from 'axios';

const BASE_URL = 'https://mate.academy/students-api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// Створюємо базовий екземпляр axios, щоб не дублювати URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

function request<T>(
  url: string,
  method: Method = 'GET',
  data: any = null,
): Promise<T> {
  return (
    wait(300)
      .then(() =>
        axiosInstance.request<T>({
          url,
          method,
          data, // Axios автоматично ігнорує data, якщо вона null, і сам додає body
        }),
      )
      // В axios відповідь вже розпарсена, результат лежить у властивості response.data
      .then(response => response.data)
  );
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
