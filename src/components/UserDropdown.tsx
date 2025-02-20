import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import userImg from '../assets/profile-icon-9.png'
import { User } from "../models/User"
import UserService from "../services/userService"
import toast from "react-hot-toast"

function UserDropdown({className}:{className?:string}) {
    const [visible, setVisible] = useState(false)
    const [user,setUser] = useState<User>()
    const userAuth = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!userAuth?.user?.id) return
        UserService.getById(userAuth?.user?.id).then(setUser).catch(e=>toast.error(e.message))
    },[userAuth.user])

    const handleOnSignOut = async ()=>{
        await userAuth.logout()
        setUser(undefined)
        navigate("/login")
    }



    
    return (
        <>
            <button id="dropdownUserAvatarButton" onClick={()=>setVisible(true)}  onBlur={()=>setTimeout(()=>setVisible(false),200)} className={"flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 "+className} type="button">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user?.image?user.image:userImg} alt="user photo"/>
            </button>

            
            <div  className={`z-10 ${!visible&&"hidden"} absolute mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>Username: {user?.username}</div>
                    <div>Role: {userAuth.user?.role}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link to={`/users/${user?.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</a>
                    </li>
                </ul>
                <div className="py-2">
                    <button onClick={handleOnSignOut} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                </div>
            </div>


        </>
    )
}

export default UserDropdown