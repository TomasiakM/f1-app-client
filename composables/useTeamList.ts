import { ITeam } from "~/types/services/team";

export default async () => {
    const { data: teams } = await useApi<ITeam[]>("team/all");
    
    return { teams: teams.value }
}