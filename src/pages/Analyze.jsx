import { useState } from "react"

import API from "@/api/axios"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"


function Analyze(){


const [file,setFile] = useState(null)

const [job,setJob] = useState("")

const [loading,setLoading] = useState(false)



const analyze = async()=>{


if(!file || !job){

alert("Upload resume and enter job description")

return

}



const formData = new FormData()


formData.append(
"file",
file
)


formData.append(
"job_description",
job
)



try{


setLoading(true)


const res = await API.post(

"/resume/match-job",

formData

)




window.location.href = `/report/${res.data.report_id}`


}

catch(error){


alert(
error.response?.data?.detail || 
"Analysis failed"
)


}


setLoading(false)


}




return(

<div className="min-h-screen bg-gray-50 p-10">


<h1 className="text-4xl font-bold">

Analyze Resume 🚀

</h1>



<Card className="mt-10 max-w-2xl">


<CardHeader>

<CardTitle>

Upload Resume

</CardTitle>

</CardHeader>



<CardContent className="space-y-5">



<input

type="file"

accept=".pdf"

onChange={
e=>setFile(e.target.files[0])
}

/>



<Textarea

placeholder="Paste job description here..."

rows="8"

onChange={
e=>setJob(e.target.value)
}

/>



<Button

onClick={analyze}

disabled={loading}

>


{
loading
?
"Analyzing..."
:
"Analyze Resume"
}


</Button>




</CardContent>


</Card>


</div>


)

}


export default Analyze