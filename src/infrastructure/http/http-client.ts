import { fetch } from 'expo/fetch';
import { z } from 'zod';

import { ApiError } from './api-error';

const apiErrorResponseSchema = z.object({
  success: z.literal(false),
  code: z.string().optional(),
  message: z.string(),
  details: z.unknown().optional(),
});

type AccessTokenProvider = () => Promise<string | null>;
type HttpQueryValue = boolean | number | string | null | undefined;

type HttpRequestOptions = Omit<
  RequestInit,
  'body' | 'headers' | 'method'
> & {
  authenticated?: boolean;
  headers?: HeadersInit;
  query?: Record<string, HttpQueryValue>;
};

export class HttpClient {
  private readonly baseUrl: string;

  constructor(
    baseUrl: string,
    private readonly getAccessToken?: AccessTokenProvider,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  get<T>(
    path: string,
    schema: z.ZodType<T>,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    return this.request('GET', path, schema, undefined, options);
  }

  post<T>(
    path: string,
    schema: z.ZodType<T>,
    payload?: unknown,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    return this.request('POST', path, schema, payload, options);
  }

  put<T>(
    path: string,
    schema: z.ZodType<T>,
    payload?: unknown,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    return this.request('PUT', path, schema, payload, options);
  }

  patch<T>(
    path: string,
    schema: z.ZodType<T>,
    payload?: unknown,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    return this.request('PATCH', path, schema, payload, options);
  }

  delete<T>(
    path: string,
    schema: z.ZodType<T>,
    options: HttpRequestOptions = {},
  ): Promise<T> {
    return this.request('DELETE', path, schema, undefined, options);
  }

  private async request<T>(
    method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT',
    path: string,
    schema: z.ZodType<T>,
    payload: unknown,
    options: HttpRequestOptions,
  ): Promise<T> {
    const {
      authenticated = true,
      headers: customHeaders,
      query,
      ...requestOptions
    } = options;
    const headers = new Headers(customHeaders);

    headers.set('Accept', 'application/json');

    if (payload !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    if (authenticated) {
      const token = await this.getAccessToken?.();

      if (!token) {
        throw new ApiError(
          'No authenticated Firebase session is available',
          0,
          'AUTH_TOKEN_UNAVAILABLE',
        );
      }

      headers.set('Authorization', `Bearer ${token}`);
    }

    let response: Response;

    try {
      response = await fetch(this.buildUrl(path, query), {
        ...requestOptions,
        method,
        headers,
        body: payload === undefined ? undefined : JSON.stringify(payload),
      });
    } catch {
      throw new ApiError(
        'No fue posible conectarse con el servidor',
        0,
        'NETWORK_ERROR',
      );
    }

    const responseBody = await this.readResponseBody(response);

    if (!response.ok) {
      const apiError = apiErrorResponseSchema.safeParse(responseBody);

      if (apiError.success) {
        throw new ApiError(
          apiError.data.message,
          response.status,
          apiError.data.code,
          apiError.data.details,
        );
      }

      throw new ApiError(
        `La petición falló con código ${response.status}`,
        response.status,
      );
    }

    const parsedResponse = schema.safeParse(responseBody);

    if (!parsedResponse.success) {
      console.error('Invalid API response', parsedResponse.error);

      throw new ApiError(
        'El servidor respondió con datos inesperados',
        response.status,
        'INVALID_RESPONSE',
        parsedResponse.error,
      );
    }

    return parsedResponse.data;
  }

  private buildUrl(
    path: string,
    query?: Record<string, HttpQueryValue>,
  ): string {
    const relativePath = path.replace(/^\/+/, '');
    const url = new URL(relativePath, `${this.baseUrl}/`);

    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });

    return url.toString();
  }

  private async readResponseBody(response: Response): Promise<unknown> {
    if (response.status === 204) return null;

    return response.json().catch(() => null);
  }
}
