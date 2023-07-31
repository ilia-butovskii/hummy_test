import { HttpService } from "../HttpService";
import type { IRandomCofeeDataResponse } from "./types";

export class RandomDataHttpService extends HttpService {
  protected _baseUrl(): string {
    return "https://random-data-api.com/";
  }

  protected _basePrefix(): string {
    return "api/";
  }

  public async getRandomCoffeeData(): Promise<IRandomCofeeDataResponse> {
    const response = await this.http.get<IRandomCofeeDataResponse>(
      "coffee/random_coffee"
    );

    return response.data;
  }
}
