import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import API from "@/api/axios"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import UploadDropzone from "@/components/ui/landing/UploadDropzone"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"

function Analyze() {

  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [job, setJob] = useState(
    sessionStorage.getItem("job_description") || ""
)
  const [loading, setLoading] = useState(false)
  const objectKey = sessionStorage.getItem("object_key")

const pendingAnalysis =
    sessionStorage.getItem("pendingAnalysis") === "true"

    useEffect(() => {

    if (
        pendingAnalysis &&
        objectKey &&
        job
    ) {

        analyzePendingResume()

    }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [objectKey, job])

  const analyze = async () => {

    if (!file) {
      toast.warning("Please upload your resume.")
      return
    }

    if (!job.trim()) {
      toast.warning("Please enter a job description.")
      return
    }

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append("file", file)
      formData.append("job_description", job)

      const res = await API.post(
        "/resume/match-job",
        formData
      )

      navigate(`/report/${res.data.report_id}`)

    }
    catch (error) {

      toast.error(
    error.response?.data?.detail ||
    "Analysis failed"
)

    }
    finally {

      setLoading(false)

    }

  }

  const analyzePendingResume = async () => {

    if (!objectKey || !job) return

    try {

        setLoading(true)

        const formData = new FormData()

        formData.append(
            "object_key",
            objectKey
        )

        formData.append(
            "job_description",
            job
        )

        const res = await API.post(
            "/resume/match-job",
            formData
        )

        sessionStorage.removeItem("object_key")
        sessionStorage.removeItem("job_description")
        sessionStorage.removeItem("pendingAnalysis")

        navigate(`/report/${res.data.report_id}`)

    }
    catch (error) {

        toast.error(
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

  return (

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

          <UploadDropzone
            file={file}
            setFile={setFile}
          />

          <Textarea
            rows={8}
            placeholder="Paste job description here..."
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={analyze}
            disabled={loading}
          >
            Analyze Resume
          </Button>

        </CardContent>

      </Card>

    </div>

  )

}

export default Analyze