import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import API from "@/api/axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"



function Register(){


const navigate = useNavigate()


const [form,setForm] = useState({

 name:"",
 email:"",
 password:""

})


const submit = async () => {

    try {

        const res = await API.post(
            "/auth/register",
            form
        )

        toast.success(
            res.data.message || "Registration successful!"
        )

        navigate("/login")

    } catch (error) {

        toast.error(
            error.response?.data?.detail ||
            "Registration failed"
        )

    }

}



return (

<div className="min-h-screen flex items-center justify-center">


<Card className="w-[400px]">


<CardHeader>

<CardTitle>
Create Account
</CardTitle>

</CardHeader>


<CardContent className="space-y-4">


<Input
placeholder="Name"
onChange={
e=>setForm({...form,name:e.target.value})
}
/>


<Input
placeholder="Email"
onChange={
e=>setForm({...form,email:e.target.value})
}
/>


<Input
type="password"
placeholder="Password"
onChange={
e=>setForm({...form,password:e.target.value})
}
/>


<Button
className="w-full"
onClick={submit}
>

Register

</Button>


</CardContent>


</Card>


</div>

)

}


export default Register