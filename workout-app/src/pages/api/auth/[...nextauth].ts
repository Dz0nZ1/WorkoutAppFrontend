import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {label: "Email", type:"text", placeholder: "Enter your email"},
                password:{label: "Password", type:"password", placeholder:"Enter your password"},
            },

            async authorize (credentials, req) {
                const res = await fetch("http://localhost:8080/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                });
                const user = await res.json();
                console.log(user);

                if(user){
                    return user
                }else {
                    return null
                }

            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session ({session, token, user}) {
            session.user = token as any;
            return session;
        },
    },
});