export interface IDriver {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    dateOfBirth: string;
    countryCode: string;
    descriptionHtml: string;
    slug: string;
}

export interface IDriverStatistics {
    driverId: string;
    races: number;
    poles: number;
    wins: number;
    podiums: number;
}