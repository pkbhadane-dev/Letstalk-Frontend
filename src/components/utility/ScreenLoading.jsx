import { LuLoader } from "react-icons/lu"

export const ScreenLoading = ()=>{
    return(
        <>
        <div className=" flex justify-center items-center h-screen">
            <div className=" flex gap-2 items-center justify-center">
                <span className=" text-2xl font-semibold">Loading</span><LuLoader className=" animate-spin" size={25}/>
            </div>
        </div>
        </>
    )
}