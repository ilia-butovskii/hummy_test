import { HttpService } from "../HttpService";
import { RANDOM_IMAGE_BASE_URL } from "./consts";

export class RandomImageHttpService extends HttpService {
  protected _baseUrl(): string {
    return RANDOM_IMAGE_BASE_URL;
  }

  protected _basePrefix(): string {
    return "seed/";
  }

  public async getRandomCoffeImage(seed: number) {
    const response = await this.http.get(`${seed}/info`);

    return response.data;
  }
}
