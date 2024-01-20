import axios, { AxiosInstance } from "axios";
import { prop } from "ramda";

import {
  IEnterprise,
  IEnterpriseTotalIncome,
  ISelectedEnterprise,
  IPerformanceIndicator,
  IReport,
  IReportDTO,
  IUser,
} from "work-types";
import { load, save } from "work-common/utils/localStorage";

const BASE_URL = "http://localhost:4500";

const agent = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

agent.interceptors.request.use((config) => {
  const token = load("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

agent.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 403 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        save("accessToken", response.data.accessToken);
        save("user", { email: response.data.email, role: response.data.role });
        return agent.request(originalRequest);
      } catch (e) {
        console.log("Unathorized!");
      }
    }
    throw error;
  },
);
class API {
  instance: AxiosInstance;

  constructor() {
    this.instance = agent;
  }

  public async register(body: { email: string; password: string }) {
    return await this.instance.post<void>(`/register`, body);
  }

  public async login(body: { email: string; password: string }) {
    return await this.instance
      .post<
        Pick<IUser, "email" | "role"> & {
          accessToken: string;
          refreshToken: string;
        }
      >(`/login`, body)
      .then(prop("data"));
  }

  public async logout(): Promise<void> {
    return await this.instance.post(`/logout`);
  }

  public async getUsers() {
    return await this.instance.get<IUser[]>(`/users`).then(prop("data"));
  }

  public async deleteUser(id: IUser["user_id"]) {
    return await this.instance.delete<IUser[]>(`/users/${id}`);
  }

  public async getEnterprises() {
    return await this.instance.get<IEnterprise[]>(`/enterprises`).then(prop("data"));
  }

  public async getEnterpriseTotalIncome() {
    return await this.instance
      .get<IEnterpriseTotalIncome[]>(`/enterprise-total-income`)
      .then(prop("data"));
  }

  public async getSelectedEnterprise(id: IEnterprise["enterprise_id"]) {
    return await this.instance.get<ISelectedEnterprise>(`/enterprise/${id}`).then(prop("data"));
  }

  public async createEnterprise(body: Omit<IEnterprise, "enterprise_id">) {
    return await this.instance.post<IEnterprise>(`/enterprise`, body).then(prop("data"));
  }

  public async deleteEnterprise(id: IEnterprise["enterprise_id"]) {
    return await this.instance.delete(`/enterprise/${id}`);
  }

  public async editEnterprise(id: IEnterprise["enterprise_id"], body: Partial<IEnterprise>) {
    return await this.instance.put(`/enterprise/${id}`, body);
  }

  public async createReport(body: IReportDTO) {
    return await this.instance.post<IReport>(`/financial_report`, body).then(prop("data"));
  }

  public async getPerformanceIndicators() {
    return await this.instance
      .get<IPerformanceIndicator[]>(`/performance_indicators`)
      .then(prop("data"));
  }

  public async createPerformanceIndicator(body: Omit<IPerformanceIndicator, "indicator_id">) {
    return await this.instance
      .post<IPerformanceIndicator>(`/performance_indicator`, body)
      .then(prop("data"));
  }

  public async deletePerformanceIndicator(id: IPerformanceIndicator["indicator_id"]) {
    return await this.instance.delete(`/performance_indicator/${id}`);
  }
}

export default new API();
