import { IDriver } from "@/types/services/driver";

export default async () => {
    const { data: drivers } = await useApi<IDriver[]>("driver/all");
    
    return { drivers: drivers.value }
}