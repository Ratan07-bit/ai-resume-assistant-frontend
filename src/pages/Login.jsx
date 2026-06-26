import { useState } from "react"
import { useNavigate } from "react-router-dom"

import API from "@/api/axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"


function Login(){


const navigate = useNavigate()


const [form,setForm] = useState({

 email:"",
 password:""

})


const login = async()=>{


try{


const res = await API.post(
"/auth/login",
form
)


localStorage.setItem(
"token",
res.data.access_token
)


navigate("/dashboard")


}

catch(error){

alert(
"Invalid login details"
)

}


}



return(

<div className="min-h-screen flex items-center justify-center">


<Card className="w-[400px]">


<CardHeader>

<CardTitle>
Login
</CardTitle>

</CardHeader>



<CardContent className="space-y-4">


<Input

placeholder="Email"

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>



<Input

type="password"

placeholder="Password"

onChange={
e=>setForm({
...form,
password:e.target.value
})
}

/>



<Button

className="w-full"

onClick={login}

>

Login

</Button>



</CardContent>


</Card>


</div>


)

}


export default Login