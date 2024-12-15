import { BrowserRouter, Routes, Route } from "react-router";

import SidebarLayout from "@/components/layouts/Sidebar-layout";

import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/login/Login";
import { Folders } from "@/pages/folders/Folders";
import { Account } from "@/pages/account/Account";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<Home favorite={true} />} />
                    <Route path="/folder/:id" element={<Home inFolder={true} />} />

                    <Route path="/folders" element={<Folders />} />
                    <Route path="/account" element={<Account />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}