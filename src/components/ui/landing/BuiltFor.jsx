import { Card, CardContent } from "@/components/ui/card"

const roles = [
  {
    emoji: "💻",
    title: "Software Engineers",
  },
  {
    emoji: "📊",
    title: "Data Analysts",
  },
  {
    emoji: "☁️",
    title: "Cloud Engineers",
  },
  {
    emoji: "🎨",
    title: "UI/UX Designers",
  },
  {
    emoji: "📈",
    title: "Product Managers",
  },
]

function BuiltFor() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Built For
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Designed for professionals across multiple industries.
        </p>

        <div className="grid md:grid-cols-5 gap-6">

          {roles.map((role) => (

            <Card
              key={role.title}
              className="hover:shadow-lg transition"
            >

              <CardContent className="py-10 text-center">

                <div className="text-5xl">
                  {role.emoji}
                </div>

                <h3 className="mt-5 font-semibold text-lg">
                  {role.title}
                </h3>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>

    </section>
  )
}

export default BuiltFor