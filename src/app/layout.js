import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Next App",
    description: "First Next.js App",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="global-container">
                    <Navbar/>
                    {children}
                    <Footer/>
                </div>
            </body>
        </html>
    );
}

//il Layout da la possibilità di poter inserire elementi sempre presenti a livello globale, utilizza il children per contenere
//tutti gli elementi di tutte le route, dunque è possibile inserire altri componenti che saranno sempre visualizzati
// export default function RootLayout({ children }) {
//     return (
//         <html lang="en">
//             <body className={inter.className}>
//                 <h1>This is the main navbar</h1>
//                 {children}
//                 <h2>This is the footer</h2>
//             </body>
//         </html>
//     );
// }
