const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { 
    BadRequestError,
    UnauthorizedError,
    ValidationError,
    NotFoundError,
    UnhandledExeption,
    NetworkError
} from '@/types/requests/https-errors.interface';

type ApiError = BadRequestError | UnauthorizedError | ValidationError | NotFoundError | UnhandledExeption | NetworkError;

const httpSerivce = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpSerivce.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const statusCode = error.response.status;

            if (statusCode >= 400) {
                const errorData: ApiError = error.response.data;

                if (statusCode === 400 && !errorData.errors) {
                    throw {
                        ...errorData
                    } as BadRequestError;
                }

                if (statusCode === 400 && errorData.errors) {
                    throw {
                        ...errorData
                    } as ValidationError;
                }

                if (statusCode === 403) {
                    throw {
                        ...errorData,
                        detail: "forbidden"
                    } as UnauthorizedError;
                }

                if (statusCode === 404) {
                    throw {
                        ...errorData,
                        detail: "not found"
                    } as NotFoundError;
                }

                if (statusCode >= 500) {
                    throw {
                        ...errorData,
                        detail: "internal server error"
                    } as UnhandledExeption;
                }
            } else {
                throw {
                    detail: "network error"
                } as NetworkError;
            }
        }
    }
)

async function apiBase<T>(
    url: string,
    options: AxiosRequestConfig
): Promise<T> {
    const response: AxiosResponse = await httpSerivce(url, options);
    return response.data as T;
}

async function readData<T>(
    url: string,
    headers?: RawAxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: 'GET',
        headers,
    };
    return await apiBase<T>(url, options);
}

async function createData<T>(
    url: string,
    data: any,
    headers?: RawAxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: 'POST',
        data: JSON.stringify(data),
        headers,
    };

    return await apiBase<T>(url, options);
}

async function deleteData<T>(
    url: string,
    data: any,
    headers?: RawAxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: 'DELETE',
        headers,
    };

    return await apiBase<T>(url, options);
}

async function updateData<T>(
    url: string,
    data: any,
    headers?: RawAxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: 'PUT',
        data: JSON.stringify(data),
        headers,
    };

    return await apiBase<T>(url, options);
}

export {
    readData,
    createData,
    deleteData,
    updateData,
}