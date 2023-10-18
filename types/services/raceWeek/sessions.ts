import { IDriver } from "../driver";
import { ITeam } from "../team";

export type IFinishType = "Finished" | "DSQ" | "DNF" | "DNS";

export interface ISession<TResults>{
    start: string;
    sessionResults: TResults[];
}

interface IBaseSession {
    place: number;
    laps: number;
    fastestLap: string;
    finishType: IFinishType;
    driver: IDriver;
    team: ITeam;
}

interface IBaseQualificationSession {
    place: number;
    q1Time: string | null;
    q2Time: string | null;
    q3Time: string | null;
    driver: IDriver;
    team: ITeam;
}

export interface IFreePracticeResult extends IBaseSession { }

export interface ISprintQualificationResult extends IBaseQualificationSession { }

export interface IRaceQualificationResult extends IBaseQualificationSession { }

export interface ISprintResult extends IBaseSession {
    startPosition: number;
    finishTime: string;
    points: number;
}

export interface IRaceResult extends IBaseSession {
    startPosition: number;
    finishTime: string;
    points: number;
}