"use client"

import Link from "next/link"
import styles from "./navLinks.module.css"
import { usePathname } from "next/navigation"

function NavLinks({item}){

    const pathName = usePathname()
    //recupera la parte finale del path
    //utilizzata per creare una coindizione dove lo stile cambia in base al path selezionato

    return (
        <>
            <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>
                {item.title}
            </Link>
        </>
    )
}

export default NavLinks