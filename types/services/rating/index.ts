import { IDriver } from "../driver";
import { IRaceWeek } from "../raceWeek";

export interface IRating {
    id: string;
    finish: string;
    drivers: IDriver[];
    raceWeek: IRaceWeek;
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

export interface IUserRatingSummary {
    userId: string;
    ratings: IDriverUserRating[];
}

export interface IDriverUserRating {
    rating: number;
    driverId: string;
}