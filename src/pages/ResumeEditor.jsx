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

    const [saveStatus, setSaveStatus] = useState("Saved")
const [saveTimeout, setSaveTimeout] = useState(null)

const [aiLoading, setAiLoading] = useState(false)
const [hasGeneratedSuggestions, setHasGeneratedSuggestions] = useState(false)

const generateSuggestions = async () => {

    try {

        setAiLoading(true)

        const res = await API.post(
            "/resume/ai-suggest",
            {
                improvement_id: Number(id),
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
        .then((res) => {

            setReport(res.data)

            setResume(res.data.improved_resume)

            setAiSuggestions(
                res.data.ai_suggestions || []
            )

            setHasGeneratedSuggestions(
                res.data.has_generated_suggestions || false
            )

        })
        .catch((err) => {

            console.error(err)

            toast.error("Unable to load resume.")

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

const autoSaveResume = async (updatedResume) => {

    try {

        setSaveStatus("Saving...")

        // Save resume
        await API.put(
            `/resume/improvement/${id}`,
            {
                improved_resume: updatedResume
            }
        )

        // Recalculate ATS
        const recalculate = await API.post(
            `/resume/recalculate/${id}`
        )

        // Update left panel immediately
        setReport(prev => ({
            ...prev,

            ats_score: recalculate.data.ats_score,

            matched_skills: recalculate.data.matched_skills,

            missing_skills: recalculate.data.missing_skills,

            additional_skills: recalculate.data.additional_skills,

            suggestions: recalculate.data.suggestions
        }))

        setSaveStatus("Saved ✓")

    } catch (error) {

        console.error(error)

        setSaveStatus("Save Failed")

    }

}

const applySuggestion = async (item) => {

    const section = item.section.trim()

    const regex = new RegExp(
        `${section}[\\s\\S]*?(?=\\n[A-Z][A-Z\\s]+\\n|$)`,
        "i"
    )

    const newSection = `${section}

${item.improved}
`

    const updatedResume = resume.replace(regex, newSection)

    try {

        // Update UI immediately
        setResume(updatedResume)

        // Save into database
       await autoSaveResume(updatedResume)

        setHasGeneratedSuggestions(false)

        toast.success("Resume updated successfully!")

    } catch (error) {

        console.error(error)

        toast.error("Unable to save resume.")

    }

}

    return (

        <div className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">

            <h1 className="text-4xl font-bold mb-10">

                AI Resume Editor 🚀

            </h1>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                {/* Left Side */}

                <div className="space-y-6 lg:sticky lg:top-6 self-start">


                    <Card>

                        <CardHeader>

                            <CardTitle>

                                ATS Score

                            </CardTitle>

                        </CardHeader>

                        <CardContent className="space-y-6">

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

                        <CardContent className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">

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

                        <CardContent className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">

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

    <CardContent className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">

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

                        <CardContent className="space-y-6">

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

                       <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>

    <CardTitle>

        AI Improved Resume

    </CardTitle>

    <p className="text-sm text-gray-500 mt-1">

        {saveStatus}

    </p>

</div>

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

                        <CardContent className="space-y-6">

                            {

    aiSuggestions.length > 0 && (

        <div className="mt-8 space-y-5 max-h-[600px] overflow-y-auto pr-2">

            <h2 className="text-2xl font-bold">

                AI Rewrite Suggestions

            </h2>

            {

                aiSuggestions.map(

                    (item,index)=>(

                        <Card
    key={index}
    className="border-l-4 border-l-blue-500 shadow-md"
>

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
    className="w-fit"
    onClick={() => applySuggestion(item)}
>
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

    const value = e.target.value

    setResume(value)

    setHasGeneratedSuggestions(false)

    setSaveStatus("Typing...")

    if (saveTimeout) {

        clearTimeout(saveTimeout)

    }

    const timeout = setTimeout(() => {

        autoSaveResume(value)

    }, 1000)

    setSaveTimeout(timeout)

}}

    className="
    h-[950px]
    w-full
    resize-none
    overflow-y-auto
    rounded-xl
    border
    bg-white
    font-mono
    text-[15px]
    leading-7
    p-6
    shadow-inner
"
/>

                        </CardContent>

                    </Card>


                </div>


            </div>

        </div>

    )

}

export default ResumeEditor