import {withAuth} from "next-auth/middleware"
import {NextResponse} from "next/server";
import {RoleEnum} from "@/types";
import {AUTH_ROUTES} from "@/data/auth-routes";


export default withAuth(
    function middleware(req){

        const pathname : string = req.nextUrl.pathname;
        const role : any  = req.nextauth.token?.role

        switch (role) {
            case RoleEnum.USER:
                if(!AUTH_ROUTES.USER.some(route => pathname.startsWith(route))){
                    return NextResponse.rewrite(new URL("/auth/login?message=You Are Not Authorized", req.url));
                }
                break;
            case RoleEnum.ADMIN:
                if(!AUTH_ROUTES.ADMIN.some(route => pathname.startsWith(route))){
                    return NextResponse.rewrite(new URL("/auth/login?message=You Are Not Authorized", req.url));
                }
                break;
            // case RoleEnum.EMPLOYEE:
            //     if(!AUTH_ROUTES.EMPLOYEE.some(route => pathname.startsWith(route))){
            //         return NextResponse.rewrite(new URL("/auth/login?message=You Are Not Authorized", req.url));
            //     }
            //     break;
        }

    },
    {
        callbacks: {
            authorized: ({token}) => !!token,
        }
    }
)

export const config = {
    matcher: ["/admin/:path*", "/users/:path*", "/workout/:path*"]
};