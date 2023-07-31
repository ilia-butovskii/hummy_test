export interface ICoffeeCardResponse {
    id: string;
    uid: string;
    blendName: string;
    image: string;
    intensifier: string;
    notes: string[];
    origin: string;
    variety: string;
}

export interface ICoffeeCardCreatePayload {
    blendName: string;
    image: string;
    intensifier: string;
    notes: string[];
    origin: string;
    variety: string;
}