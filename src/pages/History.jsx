import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
 Card,
 CardContent
} from "@/components/ui/card"
import API from "@/api/axios"

function History(){


const [reports,setReports] = useState([])


const navigate = useNavigate()



useEffect(() => {

    API.get("/resume/history")

        .then((res) => {

            setReports(res.data)

        })

        .catch((err) => {

            console.log(err)

        })

}, [])



return (

<div className="p-10">


<h1 className="text-4xl font-bold mb-8">

Previous ATS Reports 📜

</h1>



<div className="grid gap-5">


{

reports.map(

(report)=>(


<Card

key={report.id}

className="cursor-pointer hover:shadow-lg"

onClick={()=>{

navigate(
`/report/${report.id}`
)

}}

>


<CardContent className="p-5">


<h2 className="text-xl font-bold">

{report.resume_name}

</h2>


<p>

ATS Score: {report.ats_score}%

</p>


<p className="text-gray-500">

{
new Date(
report.created_at
).toLocaleString()

}

</p>



</CardContent>


</Card>


)

)

}


</div>


</div>

)


}


export default History