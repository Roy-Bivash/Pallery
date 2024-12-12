import { BrowserRouter, Routes, Route } from "react-router";

import SidebarLayout from "@/components/layouts/Sidebar-layout";

import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/login/Login";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/:folder?" element={<Home />} />
                    <Route path="/favorite" element={<Home favorite={true} />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}