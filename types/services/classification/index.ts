import { IDriver } from "../driver";
import { ITeam } from "../team";

export interface IDriverClassification {
    place: number;
    points: number;
    driver: IDriver;
}

export interface ITeamClassification {
    place: number;
    points: number;
    team: ITeam;
}