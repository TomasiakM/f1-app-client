import { ITrack } from "@/types/services/track"
import { ISeason } from "@/types/services/season"
import { ISession, IFreePracticeResults, ISprintQualificationResults, ISprintResults, IRaceQualificationResults, IRaceResults } from "./sessions";

export interface IRaceWeek{
    id: string;
    name: string;
    track: ITrack;
    season: ISeason;
    slug: string;
    fP1: string | null;
    fP2: string | null;
    fP3: string | null;
    sprintQualification: string | null;
    sprint: string | null;
    raceQualification: string | null;
    race: string | null;
}

export interface IRaceWeekDetail {
    id: string;
    name: string;
    track: ITrack;
    season: ISeason;
    slug: string;
    fP1: ISession<IFreePracticeResults> | null;
    fP2: ISession<IFreePracticeResults> | null;
    fP3: ISession<IFreePracticeResults> | null;
    sprintQualification: ISession<ISprintQualificationResults> | null;
    sprint: ISession<ISprintResults> | null;
    raceQualification: ISession<IRaceQualificationResults> | null;
    race: ISession<IRaceResults> | null;
}

