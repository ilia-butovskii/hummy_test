import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const DEFAULT_CONFIG = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export class HttpService {
  protected readonly http: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    const baseURL = this._baseUrl() + this._basePrefix();

    this.http = axios.create({
      baseURL,
      ...DEFAULT_CONFIG,
      ...config,
    });
  }

  protected _basePrefix(): string {
    return "";
  }

  protected _baseUrl(): string {
    return "http://localhost:8080/";
  }
}
