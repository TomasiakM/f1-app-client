export type IFinishType = "Finished" | "DSQ" | "DNF" | "DNS";

interface IBaseSessionForm {
    place: number;
    laps: number;
    fastestLap: string;
    driverId: string;
    teamId: string;
}

interface IBaseQualificationSessionForm {
    place: number;
    q1Time: string | null;
    q2Time: string | null;
    q3Time: string | null;
    driverId: string;
    teamId: string;
}

export interface IFreePracticeResultForm extends IBaseSessionForm { }

export interface ISprintQualificationResultForm extends IBaseQualificationSessionForm { }

export interface IRaceQualificationResultForm extends IBaseQualificationSessionForm { }

export interface ISprintResultForm extends IBaseSessionForm {
    startPosition: number;
    finishTime: string;
    finishType: IFinishType;
    points: number;
}

export interface IRaceResultForm extends IBaseSessionForm {
    startPosition: number;
    finishTime: string;
    finishType: IFinishType;
    points: number;
}