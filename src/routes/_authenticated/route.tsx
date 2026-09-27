import { Outlet, redirect, createFileRoute } from "@tanstack/react-router";
import { checkAuthFn } from "@/lib/auth.functions";
export const Route=createFileRoute("/_authenticated")({ssr:false,beforeLoad:async()=>{const{user}=await checkAuthFn();if(!user)throw redirect({to:"/auth"});return{user}},component:()=> <Outlet/>});