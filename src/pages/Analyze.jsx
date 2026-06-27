import { useState } from "react"

import API from "@/api/axios"
import { useNavigate } from "react-router-dom"
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
const navigate = useNavigate()


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



try {

    setLoading(true)

    const res = await API.post(

        "/resume/match-job",

        formData

    )

    navigate(`/report/${res.data.report_id}`)

}
catch (error) {

    alert(

        error.response?.data?.detail ||

        "Analysis failed"

    )

}
finally {

    setLoading(false)

}
}




if (loading) {

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-white">

            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-black"></div>

            <h1 className="text-4xl font-bold mt-8">

                AI Resume Assistant

            </h1>

            <p className="text-gray-500 mt-4">

                Analyzing your resume...

            </p>

            <div className="w-96 h-3 bg-gray-200 rounded-full mt-8 overflow-hidden">

                <div className="h-full w-full bg-black animate-pulse"></div>

            </div>

            <div className="mt-10 space-y-2 text-center">

                <p>📄 Extracting Resume</p>

                <p>🤖 Matching Job Description</p>

                <p>📊 Calculating ATS Score</p>

                <p>💡 Generating Suggestions</p>

            </div>

        </div>

    )

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