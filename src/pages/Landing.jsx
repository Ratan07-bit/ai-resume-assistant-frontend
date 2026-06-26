import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/ui/landing/Navbar"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"


import { Button } from "@/components/ui/button"

import { FileText, Brain, BarChart3 } from "lucide-react"

function Landing() {

    const navigate = useNavigate()

const [file, setFile] = useState(null)

const [job, setJob] = useState("")

const analyze = () => {

    if (!file || !job) {

        alert("Please upload your resume and enter a job description.")

        return
    }

    // Save temporarily

    sessionStorage.setItem("job_description", job)

    // We cannot save a File object,
    // so we'll upload it after login.

    navigate("/login")
}
  return (
    <>
  <Navbar />

  <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">

        <h1 className="text-6xl font-extrabold">
          AI Resume Assistant 🚀
        </h1>

        <p className="text-xl text-gray-600 mt-6 max-w-2xl">
          Analyze your resume against any job description using AI and
          receive an ATS score, skill matching, and personalized
          improvement suggestions.
        </p>

        <Button className="mt-10 px-10 py-6 text-lg">
          Get Started
        </Button>

      </section>

      <section
    id="upload-section"
    className="max-w-3xl mx-auto pb-24"
>

<Card>

<CardHeader>

<CardTitle>

Try AI Resume Analysis

</CardTitle>

</CardHeader>

<CardContent className="space-y-5">

<input
type="file"
accept=".pdf"
onChange={(e)=>setFile(e.target.files[0])}
/>

<Textarea
rows={8}
placeholder="Paste the job description here..."
value={job}
onChange={(e)=>setJob(e.target.value)}
/>

<Button
className="w-full"
onClick={analyze}
>

Analyze Resume

</Button>

</CardContent>

</Card>

</section>

      {/* Features */}
      <section
    id="features"
    className="max-w-6xl mx-auto px-6 pb-24"
>

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Use AI Resume Assistant?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Card>
            <CardContent className="p-8 text-center">
              <Brain className="mx-auto mb-5" size={50} />
              <h3 className="text-2xl font-semibold">
                AI Analysis
              </h3>

              <p className="text-gray-500 mt-3">
                Analyze your resume using AI and receive detailed
                ATS feedback.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="mx-auto mb-5" size={50} />
              <h3 className="text-2xl font-semibold">
                ATS Score
              </h3>

              <p className="text-gray-500 mt-3">
                See how well your resume matches the job description.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="mx-auto mb-5" size={50} />
              <h3 className="text-2xl font-semibold">
                Resume Suggestions
              </h3>

              <p className="text-gray-500 mt-3">
                Improve your resume with personalized AI recommendations.
              </p>
            </CardContent>
          </Card>

        </div>

      </section>

      {/* How It Works */}
      <section className="bg-white py-24">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>
              <div className="text-5xl mb-4">📄</div>

              <h3 className="font-bold text-xl">
                Upload Resume
              </h3>

              <p className="text-gray-500 mt-3">
                Upload your PDF resume securely.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-4">🤖</div>

              <h3 className="font-bold text-xl">
                AI Analysis
              </h3>

              <p className="text-gray-500 mt-3">
                AI compares your resume with the job description.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-4">📊</div>

              <h3 className="font-bold text-xl">
                Get Results
              </h3>

              <p className="text-gray-500 mt-3">
                Receive your ATS score and resume improvements.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section
    id="pricing"
    className="py-24"
>

<h2 className="text-4xl font-bold text-center">

Pricing

</h2>

</section>

<section
    id="faq"
    className="py-24"
>

<h2 className="text-4xl font-bold text-center">

Frequently Asked Questions

</h2>

</section>

      {/* Footer */}

      <footer className="bg-black text-white text-center py-8">
        © 2026 AI Resume Assistant. Built with React + FastAPI.
      </footer>

    </div>
  </>
  )
}

export default Landing