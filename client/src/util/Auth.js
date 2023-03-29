const currentUser = ()=>{
    return JSON.parse(localStorage.getItem('user')||null)
}

export default currentUser