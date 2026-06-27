import { Card, CardContent } from "@/components/ui/card"

function Stats() {
  const stats = [
    {
      number: "500+",
      title: "Resumes Analyzed",
    },
    {
      number: "120+",
      title: "Registered Users",
    },
    {
      number: "95%",
      title: "Average ATS Accuracy",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((item) => (

            <Card
              key={item.title}
              className="text-center shadow-sm hover:shadow-lg transition"
            >

              <CardContent className="py-10">

                <h2 className="text-5xl font-bold">
                  {item.number}
                </h2>

                <p className="mt-4 text-gray-500 text-lg">
                  {item.title}
                </p>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>
    </section>
  )
}

export default Stats