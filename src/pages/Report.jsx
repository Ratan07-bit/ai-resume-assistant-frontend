import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import API from "@/api/axios"
import { Progress } from "@/components/ui/progress"



function Report(){


const [report,setReport] = useState(null)
const { id } = useParams()



useEffect(() => {

    API.get(`/resume/report/${id}`)

        .then((res) => {

            setReport(res.data.analysis)

        })

        .catch((err) => {

            console.log(err)

        })

}, [id])


if(!report){


return (

<h1>No Report Found</h1>

)

}




return(

<div className="min-h-screen bg-gray-50 p-10">



<h1 className="text-4xl font-bold mb-10">

ATS Analysis Report 🚀

</h1>




<Card>


<CardHeader>

<CardTitle>

Overall Score

</CardTitle>


</CardHeader>



<CardContent>


<h1 className="text-6xl font-bold">

{report.overall_score}%

</h1>


<Progress

value={report.overall_score}

className="mt-5"

/>



<p className="mt-5 text-lg">

{report.recommendation}

</p>


</CardContent>


</Card>




<div className="grid grid-cols-2 gap-6 mt-8">



<Card>


<CardHeader>

<CardTitle>

Matched Skills

</CardTitle>

</CardHeader>


<CardContent className="flex gap-2 flex-wrap">


{

report.matched_skills?.map(

(skill)=>(


<Badge key={skill}>

{skill}

</Badge>


)

)

}


</CardContent>


</Card>






<Card>


<CardHeader>

<CardTitle>

Missing Skills

</CardTitle>

</CardHeader>


<CardContent className="flex gap-2 flex-wrap">


{


report.missing_required_skills?.map(

(skill)=>(


<Badge

variant="destructive"

key={skill}

>

{skill}

</Badge>


)

)

}



</CardContent>


</Card>



</div>






<Card className="mt-8">


<CardHeader>


<CardTitle>

Resume Improvements

</CardTitle>


</CardHeader>



<CardContent>


<ul className="list-disc ml-5">


{

report.suggested_changes?.map(

(item)=>(


<li key={item}>

{item}

</li>


)

)

}


</ul>


</CardContent>



</Card>





</div>

)


}



export default Report