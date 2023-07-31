import { HttpService } from "../HttpService";
import type { ICoffeeImageResponse } from "./types";

export class CoffeeImagesHttpService extends HttpService {
  protected _basePrefix(): string {
    return "coffeeImages";
  }

  public async getImageById(id: string): Promise<ICoffeeImageResponse> {
    const response = await this.http.get<ICoffeeImageResponse>(`/${id}`);

    return response.data;
  }
}
