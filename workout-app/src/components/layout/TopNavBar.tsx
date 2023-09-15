'use client'
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useState} from "react";

export default function TopNavBar() {
    const {data: session} = useSession();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-2xl font-bold">MiloNite</div>
                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                id="mobile-menu-button"
                                className="text-white hover:text-gray-300"
                                onClick={toggleMobileMenu}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        {/* Desktop menu */}
                        <ul className="hidden lg:flex space-x-4">
                            <button>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/"}
                                >
                                    Home
                                </Link>
                            </button>
                            <button>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/users"}
                                >
                                    Users
                                </Link>
                            </button>
                            <button>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/admin"}
                                >
                                    Admin
                                </Link>
                            </button>
                            <button>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/workout"}
                                >
                                    Employee
                                </Link>
                            </button>
                            {session == null ? (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                        onClick={() => signIn()}
                                    >
                                        Sign in
                                    </button>
                            ) : (

                                <>
                                    <button>
                                        <Link
                                            className="text-white hover:text-gray-300"
                                            href={"/"}
                                        >
                                            {
                                                //@ts-ignore
                                                session.user?.firstName
                                            }
                                        </Link>
                                    </button>

                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                        onClick={() => signOut()}
                                    >
                                        Sign out
                                    </button>
                                </>
                            )}
                        </ul>
                    </div>
                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <ul className="lg:hidden bg-blue-500 mt-4">
                            <li>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/"}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/users"}
                                >
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/admin"}
                                >
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-white hover:text-gray-300"
                                    href={"/workout"}
                                >
                                    Employee
                                </Link>
                            </li>
                            {session == null ? (

                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                        onClick={() => signIn()}
                                    >
                                        Sign in
                                    </button>

                            ) : (
                                   <>
                                       <br/>
                                       <hr/>
                                       <Link
                                           className="text-white hover:text-gray-300"
                                           href={"/"}
                                       >
                                           {
                                               //@ts-ignore
                                               session.user?.firstName
                                           }
                                       </Link>
                                       <button
                                           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                           onClick={() => signOut()}
                                       >
                                           Sign out
                                       </button>
                                   </>
                            )}
                        </ul>
                    )}
                </div>
            </nav>
        </>
    )
}