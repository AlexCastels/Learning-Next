"use client";

import Link from "next/link"
import styles from "./navbar.module.css"
import NavLinks from "./NavLinks"
import { useEffect, useState } from "react"
import Image from "next/image";
import { handleLogout } from "@/app/server/action";
import { auth } from "@/app/server/auth";

function Navbar(){
    const links = [
        {
            title: "Homepage" ,
            path: "/"
        } ,
        {
            title: "About",
            path: "/about"
        } ,         {
            title: "Contact",
            path: "/contact"
        } ,         {
            title: "Blog",
            path: "/blog"
        } ,
    ] 

    const [open , setOpen] = useState(false)
    const [session , setSession] = useState(true)

    //Temporanei
    // const session = true
    const isAdmin = true

    //modificare il comp navbar come nel video, e implementare la richiesta auth che recupera i dati dell'utente
    async function handleSession(){
        try {
            const session = await auth()
            setSession((p) => !p )
            console.log(session);  
        } catch (error) {
            console.log(error);
        }    
    }

    useEffect(()=> {
        handleSession()
        console.log(session)
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href={"/"}>Logo</Link>
            </div>
            <div>
                <div className={styles.links}>
                    {links.map((link) => 
                        <NavLinks item={link} key={link.title}/>
                    )}
                    {session ? (
                        <>
                            {session.isAdmin && <NavLinks item={{title: "Admin" , path: "/admin"}}/>}
                            <form action={handleLogout}>
                                <button className={styles.logout}>Logout</button>
                            </form>
                        </>
                    ) : (
                        <NavLinks item={{title: "Login" , path: "/login"}}/>
                    )}
                </div>
                <div className={styles.mobileNav}>
                    {/* <button className={styles.menuBtn} onClick={() => setOpen(prev => !prev)}>Menu</button> */}
                    <Image className={styles.menuBtn} src="/menu.png" alt="menu img" width={30} height={30} onClick={() => setOpen(prev => !prev)}></Image>
                    {
                        open && <div className={styles.mobileLinks}>
                            {links.map((link) => (
                                <NavLinks item ={link} key={link.title}/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar