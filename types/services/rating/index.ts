import { IDriver } from "../driver";

export interface IRating {
    id: string;
    finish: string;
    drivers: IDriver[];
}

export interface IRatingSummary {
    id: string;
    raceWeekId: string;
    drivers: IDriverRating[];
}

export interface IDriverRating {
    rating: number;
    driver: IDriver;
}