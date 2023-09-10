'use client'
import {useState} from "react";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import {NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/navbar";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";

export default function NewNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {data: session} = useSession();

    const menuItems: string[] = [
        "Admin",
        "Users",
        "Employee"
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white shadow-lg">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-gray-800 hover:text-primary"
                />
                <NavbarBrand>
                    <Link href={"/"}>
                        <h1 className="text-2xl font-bold text-primary">MiloNite</h1>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        color="foreground"
                        href={"/admin"}
                        className="hover:text-primary transition duration-300"
                    >
                        Admin
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link
                        href={"/users"}
                        aria-current="page"
                        className="text-primary font-semibold"
                    >
                        Users
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href={"/employee"}
                        className="hover:text-primary transition duration-300"
                    >
                        Employee
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                {session == null ?

                   <>
                       <NavbarItem>
                           {/*<Link href={"#"}>*/}
                               <Button
                                   as={Link}
                                   color="primary"
                                   href="/auth/login"
                                   variant="flat"
                               >
                                   Sing In
                               </Button>
                           {/*</Link>*/}
                       </NavbarItem>
                       <NavbarItem>
                           <Button
                               as={Link}
                               color="primary"
                               href="/auth/register"
                               variant="flat"
                               className="py-2 px-4 bg-primary text-white hover:bg-primary-dark transition duration-300"
                           >
                               Register
                           </Button>
                       </NavbarItem>
                   </> :
                    <>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href="/"
                                variant="ghost"

                            >
                                {
                                    //@ts-ignore
                                    session.user?.firstName
                                }
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href="#"
                                variant="flat"
                                onPress={() => signOut({redirect: false})}
                            >
                                Sign Out
                            </Button>
                        </NavbarItem>
                    </>


                }
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link

                            color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
                            className="w-full hover:text-primary transition duration-300"
                            href={
                            item === "Admin" ? '/admin' : item === "Users" ? "/users" : "/employee"
                            }
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>

    );
}
