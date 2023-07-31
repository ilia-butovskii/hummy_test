import { HttpService } from "../HttpService";
import type { ICoffeeCardCreatePayload, ICoffeeCardResponse } from "./types";

export class CoffeeCardsHttpService extends HttpService {
  protected _basePrefix(): string {
    return "coffeeCards";
  }

  public async getCoffeeCards(): Promise<ICoffeeCardResponse[]> {
    const response = await this.http.get<ICoffeeCardResponse[]>("/");

    return response.data;
  }

  public async getLastCoffeeCard(): Promise<ICoffeeCardResponse | undefined> {
    const response = await this.http.get<ICoffeeCardResponse>("/last");

    return response.data;
  }

  public async createCoffeeCard(
    payload: ICoffeeCardCreatePayload
  ): Promise<ICoffeeCardResponse> {
    const response = await this.http.post<ICoffeeCardResponse>("/", payload);

    return response.data;
  }
}
