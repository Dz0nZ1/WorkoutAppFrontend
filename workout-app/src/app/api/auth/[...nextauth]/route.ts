import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler =  NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"text", placeholder:"Enter email"},
                password:{label:"Password", type:"password"},
            },

            async authorize(credentials, req){
                const res = await fetch("http://localhost:8080/api/v1/auth/login", {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password,
                    }),
                });
                const user = await res.json();

                if(user){
                    return user
                }else {
                    return null;
                }
            },
        }),
    ],
    callbacks:{
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
});

export {handler as GET, handler as POST};