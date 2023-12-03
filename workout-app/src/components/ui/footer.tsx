export default function Footer(){

    return(
        <footer className="bg-gray-50 py-5">
            <div className="container mx-auto flex flex-col items-center justify-center text-center">
                <p className="text-gray-600 text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} MiloNite. All Rights Reserved.
                </p>
                <div className="flex mt-4">
                    <a href="#" className="text-gray-400 hover:text-blue-500 px-2">
                        Facebook
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500 px-2">
                        Twitter
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500 px-2">
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    )
}