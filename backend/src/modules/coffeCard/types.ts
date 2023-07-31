import { ICoffeeCardData } from '../../models/types/coffeeCard';

export interface ICardPayload extends Omit<ICoffeeCardData, '_coffeeImage' | 'uid'> {
  image: string;
}
