import {useSelector} from "react-redux";

const useAuth = () => {
    const {user} = useSelector(state => state.auth.account)
    let isAdmin = false
    let isUser = false
    if (user) {
        const {email, authorities} = user
        const roles = authorities.map((item) => item.authority)
        isUser = roles.includes("USER")
        isAdmin = roles.includes("ADMIN")

        return {
            email, isUser, isAdmin, roles
        }
    }

    return { email: '', roles: [], isAdmin, isUser}
}
export default useAuth