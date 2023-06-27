import { ITagForm } from "@/types/services/tag"

const add = (data: ITagForm) => {
    return useApiSend('api/tag', { method: "POST", body: data})
}

const remove = (tagId: string) => {
    return useApiSend(`api/tag/${tagId}`, { method: "DELETE" })
}

export default { add, remove }