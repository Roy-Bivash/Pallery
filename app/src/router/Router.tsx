import { BrowserRouter, Routes, Route } from "react-router";

import SidebarLayout from "@/components/layouts/Sidebar-layout";

import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/auth/Login";
import { SignIn } from "@/pages/auth/SignIn";
import { Account } from "@/pages/account/Account";
import { Profile } from "@/pages/account/Profile";
import { Security } from "@/pages/account/Security";
import { Upload } from "@/pages/upload/Upload";
import { Error404 } from "@/pages/error404/Error404";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<Home favorite={true} />} />

                    <Route path="/upload" element={<Upload />} />

                    <Route path="/account">
                        <Route index element={<Account />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="security" element={<Security />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}