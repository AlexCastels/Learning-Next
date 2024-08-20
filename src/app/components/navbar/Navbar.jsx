"use client";

import Link from "next/link"
import styles from "./navbar.module.css"
import NavLinks from "./NavLinks"
import { useState } from "react"
import Image from "next/image";

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

    //Temporanei
    const session = true
    const isAdmin = true

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
                            {isAdmin && <NavLinks item={{title: "Admin" , path: "/admin"}}/>}
                            <button className={styles.logout}>Logout</button>
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