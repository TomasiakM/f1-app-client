import auth from "@/api/services/auth"
import articles from "@/api/services/articles"
import comments from "@/api/services/comments"

export default () => {
    return {
        auth,
        articles,
        comments
    }
}