import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import API from "@/api/axios"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { Textarea } from "@/components/ui/textarea"

import { Progress } from "@/components/ui/progress"

import { Button } from "@/components/ui/button"

import { Sparkles } from "lucide-react"

import { toast } from "sonner"


function ResumeEditor() {

    const { id } = useParams()

    const [loading, setLoading] = useState(true)

    const [report, setReport] = useState(null)

    const [resume, setResume] = useState("")

    const [aiSuggestions, setAiSuggestions] = useState([])

const [aiLoading, setAiLoading] = useState(false)
const [hasGeneratedSuggestions, setHasGeneratedSuggestions] = useState(false)

const generateSuggestions = async () => {

    try {

        setAiLoading(true)

        const res = await API.post(
            "/resume/ai-suggest",
            {
                resume,
                job_description: report.job_description
            }
        )

        setAiSuggestions(res.data.suggestions)

        setHasGeneratedSuggestions(true)

        toast.success("AI Suggestions Generated")

    } catch {

        toast.error("Unable to generate suggestions.")

    } finally {

        setAiLoading(false)

    }

}


    useEffect(() => {

        API.get(`/resume/improvement/${id}`)

            .then(res => {

                setReport(res.data)

                setResume(
                    res.data.improved_resume
                )

            })

            .finally(() => {

                setLoading(false)

            })

    }, [id])


    if (loading) {

        return (

            <div className="p-10">

                Loading...

            </div>

        )

    }
const applySuggestion = (item) => {

    const section = item.section.trim()

    const regex = new RegExp(
        `${section}[\\s\\S]*?(?=\\n[A-Z][A-Z\\s]+\\n|$)`,
        "i"
    )

    const newSection =

`${section}

${item.improved}
`

    setResume(prev =>

        prev.replace(regex, newSection)

    )

    setHasGeneratedSuggestions(false)

    toast.success("Section updated!")

}

    return (

        <div className="p-10 bg-gray-50 min-h-screen">

            <h1 className="text-4xl font-bold mb-10">

                AI Resume Editor 🚀

            </h1>


            <div className="grid grid-cols-3 gap-8">


                {/* Left Side */}

                <div className="space-y-6">


                    <Card>

                        <CardHeader>

                            <CardTitle>

                                ATS Score

                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <h1 className="text-5xl font-bold">

                                {report.ats_score}%

                            </h1>

                            <Progress
                                value={report.ats_score}
                                className="mt-5"
                            />

                        </CardContent>

                    </Card>



                    <Card>

                        <CardHeader>

                            <CardTitle>

                                Matched Skills

                            </CardTitle>

                        </CardHeader>

                        <CardContent className="flex flex-wrap gap-2">

                            {

                                report.matched_skills.map(

                                    skill => (

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

                        <CardContent className="flex flex-wrap gap-2">

                            {

                                report.missing_skills.map(

                                    skill => (

                                        <Badge

                                            key={skill}

                                            variant="destructive"

                                        >

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

            Additional Skills

        </CardTitle>

    </CardHeader>

    <CardContent className="flex flex-wrap gap-2">

        {

            report.additional_skills?.map(

                skill => (

                    <Badge
                        key={skill}
                        variant="secondary"
                    >

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

                                Suggestions

                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <ul className="list-disc ml-5 space-y-2">

                                {

                                    report.suggestions.map(

                                        item => (

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


                {/* Right Side */}


                <div className="col-span-2">


                    <Card>

                       <CardHeader className="flex flex-row justify-between items-center">

    <CardTitle>

        AI Improved Resume

    </CardTitle>

    <Button
    onClick={generateSuggestions}
    disabled={aiLoading || hasGeneratedSuggestions}
>

        <Sparkles className="mr-2 h-4 w-4"/>

        {
    aiLoading
        ? "Generating..."
        : hasGeneratedSuggestions
            ? "Suggestions Generated ✓"
            : "AI Suggestions"
}

    </Button>

</CardHeader>

                        <CardContent>

                            {

    aiSuggestions.length > 0 && (

        <div className="mt-8 space-y-5">

            <h2 className="text-2xl font-bold">

                AI Rewrite Suggestions

            </h2>

            {

                aiSuggestions.map(

                    (item,index)=>(

                        <Card key={index}>

                            <CardContent className="space-y-4 pt-6">

                               <div>

    <p className="font-semibold text-blue-600">

        {item.section}

    </p>

</div>

                                <div>

                                    <p className="font-semibold text-green-700">

                                        Improved

                                    </p>

                                    <p>

                                        {item.improved}

                                    </p>

                                </div>

                                <div>

                                    <p className="font-semibold">

                                        Reason

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {item.reason}

                                    </p>

                                </div>

                                <Button
    onClick={() => applySuggestion(item)}>
        Apply Suggestion
    </Button>

                            </CardContent>

                        </Card>

                    )

                )

            }

        </div>

    )

}

                            <Textarea
    value={resume}
    onChange={(e) => {

        setResume(e.target.value)
        setHasGeneratedSuggestions(false)

    }}
    rows={35}
/>

                        </CardContent>

                    </Card>


                </div>


            </div>

        </div>

    )

}

export default ResumeEditor