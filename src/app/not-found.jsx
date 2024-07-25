import Link from "next/link"

function NotFound(){
    return (
        <div>
            <h2>Error 404</h2>
            <p>Page not found!</p>
            <Link href={"/"}>Return Home</Link> 
        </div>
    )
}

export default NotFound