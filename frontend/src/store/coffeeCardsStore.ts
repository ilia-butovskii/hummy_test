import { type Writable, writable, type Updater, derived } from "svelte/store";
import type { Invalidator, Subscriber, Unsubscriber } from "svelte/motion";

import type {
  ICoffeeCardCreatePayload,
  ICoffeeCardResponse,
} from "../services/http/coffeeCards/types";
import { CoffeeCardsHttpService } from "../services/http/coffeeCards/CoffeeCardsHttpService";
import { RandomImageHttpService } from "../services/http/randomImage/RandomImageHttpService";
import { RandomDataHttpService } from "../services/http/randomData/RandomDataHttpService";
import type { IRandomCofeeDataResponse } from "../services/http/randomData/types";
import type { IRandomImageresponse } from "../services/http/randomImage/types";
import { RANDOM_IMAGE_BASE_URL } from "../services/http/randomImage/consts";

class CoffeeCardsStore {
  public readonly subscribe: (
    this: void,
    run: Subscriber<ICoffeeCardResponse[]>,
    invalidate?: Invalidator<ICoffeeCardResponse[]>
  ) => Unsubscriber;

  public readonly loadingStateSubscribe: (
    this: void,
    run: Subscriber<boolean>,
    invalidate?: Invalidator<boolean>
  ) => Unsubscriber;

  private readonly update: (
    this: void,
    updater: Updater<ICoffeeCardResponse[]>
  ) => void;

  private readonly loadingStateUpdate: (
    this: void,
    updater: Updater<boolean>
  ) => void;

  private readonly coffeeCardsHttpService = new CoffeeCardsHttpService();
  private readonly randomImageHttpService = new RandomImageHttpService();
  private readonly randomDataHttpService = new RandomDataHttpService();

  private timerId = null;

  constructor() {
    const { subscribe, update } = writable<ICoffeeCardResponse[]>([]);
    this.subscribe = subscribe;
    this.update = update;

    const loadingStateStore = writable<boolean>(false);
    this.loadingStateSubscribe = loadingStateStore.subscribe;
    this.loadingStateUpdate = loadingStateStore.update;

    this.loadLastCard();
    this.initAutoAddCard();
  }

  public async addNewCard(): Promise<void> {
    this.resetAutoAddCard();
    this.setLoadingState(true);

    const payload = await this.getRandomCoffeData();
    const newCard = await this.coffeeCardsHttpService.createCoffeeCard(payload);

    this.update((cards) => [...cards, newCard]);

    this.initAutoAddCard();
    this.setLoadingState(false);
  }

  public setLoadingState(state: boolean) {
    this.loadingStateUpdate(() => state);
  }

  private initAutoAddCard() {
    this.timerId = setInterval(() => this.addNewCard(), 30 * 1000);
  }

  private resetAutoAddCard() {
    clearInterval(this.timerId);
  }

  private async getRandomCoffeData(): Promise<ICoffeeCardCreatePayload> {
    const seed = Date.now();

    const randomDataPromise = this.randomDataHttpService.getRandomCoffeeData();
    const randomImagePromise =
      this.randomImageHttpService.getRandomCoffeImage(seed);

    const [randomData, randomImage] = await Promise.all([
      randomDataPromise,
      randomImagePromise,
    ]);

    return this.mapRandomCoffeeData(randomData, randomImage);
  }

  private mapRandomCoffeeData(
    coffeData: IRandomCofeeDataResponse,
    imageData: IRandomImageresponse
  ): ICoffeeCardCreatePayload {
    return {
      blendName: coffeData.blend_name,
      image: `${RANDOM_IMAGE_BASE_URL}id/${imageData.id}/500/500`,
      intensifier: coffeData.intensifier,
      notes: coffeData.notes.split(", "),
      origin: coffeData.origin,
      variety: coffeData.variety,
    };
  }

  private async loadLastCard(): Promise<void> {
    const card = await this.coffeeCardsHttpService.getLastCoffeeCard();

    if (!card) {
      this.addNewCard();

      return;
    }

    this.update((cards) => [...cards, card]);
  }
}

export const coffeeCardsStore = new CoffeeCardsStore();
