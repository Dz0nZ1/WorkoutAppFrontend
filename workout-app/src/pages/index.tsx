
import Link from "next/link";

export default function HomePage() {

    return (
        <>
            <h1>HomePage</h1>
            <h2>Hello MiloNite</h2>
            <Link href={"/users"}>go to user page</Link>
        </>
    )
}