import auth from "@/api/services/auth"
import articles from "@/api/services/articles"
import tags from "@/api/services/tags"
import comments from "@/api/services/comments"
import users from "@/api/services/users"

export default () => {
    return {
        auth,
        articles,
        tags,
        comments,
        users,
    }
}