import instance from "../../config/axiosConfig.jsx";

// ============================ ADMIN - API ============================
const postCreateUser = (name, email, password, confirmPassword, userType) => {
    const data = {
        "name": name,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "userType": userType
    }
    return instance.post('/admin/v1/register', data)
}

const getListUser = () => {
    return instance.get(`/admin/v1/users`)
}
const deleteUser = (id) => {
    return instance.delete(`/admin/v1/users/${id}`)
}







// ============================ CUSTOMER - API ============================



export {postCreateUser, getListUser, deleteUser}