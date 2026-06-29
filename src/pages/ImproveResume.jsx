import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "@/api/axios"

import UploadDropzone from "@/components/ui/landing/UploadDropzone"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import { toast } from "sonner"

function ImproveResume() {

    const navigate = useNavigate()

    const [file, setFile] = useState(null)

    const [jobDescription, setJobDescription] = useState("")

    const [loading, setLoading] = useState(false)

    const improveResume = async () => {

        if (!file) {

            toast.warning("Please upload your resume.")

            return

        }

        if (!jobDescription.trim()) {

            toast.warning("Please paste the job description.")

            return

        }

        try {

            setLoading(true)

            const formData = new FormData()

            formData.append(
                "file",
                file
            )

            formData.append(
                "job_description",
                jobDescription
            )

            const res = await API.post(
                "/resume/improve",
                formData
            )

            toast.success(
                "Resume Improved Successfully!"
            )

            navigate(
                `/resume-editor/${res.data.improvement_id}`
            )

        }

        catch (error) {

            toast.error(

                error.response?.data?.detail ||

                "Resume improvement failed."

            )

        }

        finally {

            setLoading(false)

        }

    }


    if (loading) {

        return (

            <div className="min-h-screen flex flex-col justify-center items-center">

                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-black"></div>

                <h1 className="text-4xl font-bold mt-8">

                    AI is Improving your Resume...

                </h1>

                <p className="text-gray-500 mt-4">

                    Matching with Job Description

                </p>

            </div>

        )

    }


    return (

        <div className="min-h-screen bg-gray-50 p-10">

            <h1 className="text-4xl font-bold mb-8">

                Improve Resume 🚀

            </h1>


            <Card className="max-w-3xl">

                <CardHeader>

                    <CardTitle>

                        Upload Resume

                    </CardTitle>

                </CardHeader>


                <CardContent className="space-y-5">

                    <UploadDropzone

                        file={file}

                        setFile={setFile}

                    />

                    <Textarea

                        rows={12}

                        placeholder="Paste Job Description Here..."

                        value={jobDescription}

                        onChange={(e)=>setJobDescription(e.target.value)}

                    />

                    <Button

                        className="w-full"

                        onClick={improveResume}

                    >

                        Improve Resume

                    </Button>

                </CardContent>

            </Card>

        </div>

    )

}

export default ImproveResume