import NextAuth from "next-auth";
import { authConfig } from "./server/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// Cosa fa il matcher:
// Il matcher è un'espressione regolare che specifica quali percorsi devono far scattare il middleware.
// In questo caso, l'espressione regolare "/((?!api|static|.*\\..*|_next).*)" è configurata per escludere 
//determinati percorsi specifici.

// Dettagli dell'espressione regolare:
// /(...) indica che stiamo cercando di far combaciare qualcosa che inizia con /.

// (?!...) è una "negative lookahead assertion", il che significa che stiamo cercando di evitare di 
//far combaciare certe stringhe specifiche.

// All'interno di ?! abbiamo:
// api: esclude tutti i percorsi che iniziano con /api.
// static: esclude tutti i percorsi che iniziano con /static.
// .*\\..*: esclude tutti i percorsi che contengono un punto . seguito da qualsiasi cosa, ad esempio file 
//con estensioni come .css, .js, .png, ecc.
// _next: esclude tutti i percorsi che iniziano con /_next, 
//che sono tipicamente usati per risorse interne di Next.js (come i bundle JavaScript e le risorse di build).