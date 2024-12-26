import { BrowserRouter, Routes, Route } from "react-router";

import SidebarLayout from "@/components/layouts/Sidebar-layout";

import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/login/Login";
import { Folders } from "@/pages/folders/Folders";
import { Account } from "@/pages/account/Account";
import { Profile } from "@/pages/account/Profile";
import { Security } from "@/pages/account/Security";
import { Upload } from "@/pages/upload/Upload";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<Home favorite={true} />} />
                    <Route path="/folder/:id" element={<Home inFolder={true} />} />

                    <Route path="/folders" element={<Folders />} />

                    <Route path="/upload" element={<Upload />} />

                    <Route path="/account">
                        <Route index element={<Account />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="security" element={<Security />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<h1>Erreur 404</h1>} />
            </Routes>
        </BrowserRouter>
    )
}