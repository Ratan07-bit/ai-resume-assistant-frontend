import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"

import {
 FileText,
 History,
 Brain,
 LogOut
} from "lucide-react"



function Dashboard(){


const navigate = useNavigate()



const logout = ()=>{


localStorage.removeItem(
"token"
)


navigate("/login")


}



return(

<div className="min-h-screen bg-gray-50 p-10">


<div className="flex justify-between items-center">


<div>

<h1 className="text-4xl font-bold">
AI Resume Dashboard 🚀
</h1>


<p className="text-gray-500 mt-2">

Improve your resume using AI ATS analysis

</p>


</div>


<Button
variant="outline"
onClick={logout}
>

<LogOut className="mr-2"/>

Logout

</Button>


</div>




<div className="grid grid-cols-3 gap-6 mt-12">



<Card
className="cursor-pointer hover:shadow-lg"
onClick={()=>navigate("/analyze")}
>


<CardHeader>

<Brain size={40}/>

<CardTitle>
Analyze Resume
</CardTitle>


</CardHeader>


<CardContent>

Upload resume and compare with job description

</CardContent>


</Card>





<Card
className="cursor-pointer hover:shadow-lg"
onClick={()=>navigate("/history")}
>


<CardHeader>

<History size={40}/>


<CardTitle>

Previous Reports

</CardTitle>


</CardHeader>


<CardContent>

View your ATS history

</CardContent>


</Card>





<Card className="cursor-pointer hover:shadow-lg">


<CardHeader>

<FileText size={40}/>


<CardTitle>

AI Suggestions

</CardTitle>


</CardHeader>


<CardContent>

Improve skills and resume keywords

</CardContent>


</Card>



</div>


</div>

)

}


export default Dashboard