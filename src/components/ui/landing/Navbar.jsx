import { useState } from "react"
import { Menu, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const links = [
        {
            name: "Features",
            href: "#features"
        },
        {
            name: "Built For",
            href: "#built-for"
        },
        {
            name: "Pricing",
            href: "#pricing"
        },
        {
            name: "FAQ",
            href: "#faq"
        }
    ]

    return (

        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })}
                >

                    <div className="rounded-lg bg-black p-2">

                        <FileText className="text-white" size={20} />

                    </div>

                    <span className="text-xl font-bold">

                        AI Resume Assistant

                    </span>

                </div>

                {/* Desktop Menu */}

                <nav className="hidden md:flex items-center gap-8">

                    {

                        links.map((item) => (

                            <a

                                key={item.name}

                                href={item.href}

                                className="text-gray-600 hover:text-black transition"

                            >

                                {item.name}

                            </a>

                        ))

                    }

                </nav>

                {/* Desktop Buttons */}

                <div className="hidden md:flex gap-3">

                    <Button
                        variant="ghost"
                        onClick={() => navigate("/login")}
                    >

                        Login

                    </Button>

                    <Button
                        onClick={() => {

                            document
                                .getElementById("upload-section")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })

                        }}
                    >

                        Get Started

                    </Button>

                </div>

                {/* Mobile */}

                <button

                    className="md:hidden"

                    onClick={() => setOpen(!open)}

                >

                    {

                        open

                            ?

                            <X />

                            :

                            <Menu />

                    }

                </button>

            </div>

            {

                open && (

                    <div className="md:hidden border-t bg-white">

                        {

                            links.map((item) => (

                                <a

                                    key={item.name}

                                    href={item.href}

                                    className="block px-6 py-4 hover:bg-gray-100"

                                >

                                    {item.name}

                                </a>

                            ))

                        }

                        <div className="p-6">

                            <Button
                                className="w-full"
                                onClick={() => navigate("/login")}
                            >

                                Login

                            </Button>

                        </div>

                    </div>

                )

            }

        </header>

    )

}

export default Navbar