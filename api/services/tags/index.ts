import { ITag, ITagForm } from "@/types/services/tag"

const getAll = () => {
    return useApiRead<ITag[]>('api/tag')
}

const add = (data: ITagForm) => {
    return useApiSend('api/tag', { method: "POST", body: data})
}

export default { getAll, add }