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

class API {
  protected BASE_URL: string = "http://localhost:4500";
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      withCredentials: true,
      baseURL: this.BASE_URL,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async register(body: { email: string; password: string }) {
    return await this.instance.post<void>(`/register`, body);
  }

  public async login(body: { email: string; password: string }) {
    return await this.instance
      .post<Pick<IUser, "user_id" | "role">>(`/login`, body)
      .then(prop("data"));
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
