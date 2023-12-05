export interface ITeam {
    id: string;
    name: string;
    slug: string;
    image: string;
    countryCode: string;
    descriptionHtml: string;
}

export interface ITeamStatistics {
    driverId: string;
    poles: number;
    wins: number;
    podiums: number;
}