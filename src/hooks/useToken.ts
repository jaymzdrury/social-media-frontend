export default function useToken(){
    const storage = localStorage.getItem('user')
    const user = storage ? JSON.parse(storage) : null
    return {user}
}