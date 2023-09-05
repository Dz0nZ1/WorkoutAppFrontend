import React from "react";
import Provider from "@/app/provider";
import "@/styles/globals.css"
import TopNavBar from "@/components/layout/TopNavBar";
import SessionStatus from "@/components/layout/SessionStatus";

export const metadata = {
    title: 'MiloNite.app',
    description: 'Generated by Next.js',
}


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body style={{backgroundColor:"#fff"}}>
        <Provider>
          <SessionStatus>
              <TopNavBar/>
              {children}
          </SessionStatus>
        </Provider>
        </body>
        </html>
    )
}