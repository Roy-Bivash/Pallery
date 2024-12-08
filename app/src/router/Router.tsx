import { BrowserRouter, Routes, Route } from "react-router";

import SidebarLayout from "@/components/layouts/Sidebar-layout";

import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/login/Login";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}