import { useState } from "react"
import { LoginFormInput } from "@/@types/Login";

export function Login() {
    const [formInputs, setFormInputs] = useState<LoginFormInput>({ login: "", password: "" });

    function updatLogineForm(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // TODO
    }


    return (
        <main className="min-h-screen min-w-screen flex justify-center items-center">
            <form onSubmit={formSubmit} className="border p-5 rounded-md space-y-6 w-[20vw] shadow bg-white">
                <h3 className="text-xl font-semibold">Login</h3>
                <div className="space-y-3">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="login">Login</label>
                        <input type="text" onChange={updatLogineForm} value={formInputs.login} name="login" placeholder="your login here ..." className="border rounded-md px-2 py-1 text-sm text-black/80" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password">Password</label>
                        <input type="text" value={formInputs.password} name="password" placeholder="your password here ..." className="border rounded-md px-2 py-1 text-sm text-black/80" />
                    </div>
                </div>
                <button type="submit" className="transition bg-slate-600 hover:bg-slate-800 px-6 py-1 text-white rounded-md">Login</button>
            </form>
        </main>
    )
}