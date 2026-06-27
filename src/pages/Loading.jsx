import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const steps = [
    "📄 Extracting resume...",
    "🤖 Understanding experience...",
    "🎯 Matching job description...",
    "📊 Calculating ATS score...",
    "✅ Generating recommendations..."
]

function Loading() {

    const navigate = useNavigate()

    const [step, setStep] = useState(0)

    useEffect(() => {

        const interval = setInterval(() => {

            setStep((prev) => {

                if (prev === steps.length - 1) {

                    clearInterval(interval)

                    navigate("/report/latest")

                    return prev
                }

                return prev + 1

            })

        }, 900)

        return () => clearInterval(interval)

    }, [])

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-white">

            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-black"></div>

            <h1 className="text-4xl font-bold mt-10">
                AI is analyzing your resume...
            </h1>

            <p className="mt-8 text-xl text-gray-600">

                {steps[step]}

            </p>

            <div className="w-96 bg-gray-200 rounded-full h-3 mt-10">

                <div
                    className="bg-black h-3 rounded-full transition-all duration-700"
                    style={{
                        width: `${((step + 1) / steps.length) * 100}%`
                    }}
                />

            </div>

        </div>

    )

}

export default Loading