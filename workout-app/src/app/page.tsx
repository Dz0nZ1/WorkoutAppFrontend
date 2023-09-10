import MainCard from "@/components/ui/mainCard";
export default function HomePage() {


    return (
        <>  {/*from-blue-400 to blue-700*/}
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 py-20 text-center md:py-16 lg:py-20">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-wider">The body achieves what the mind believes</h1>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="mt-4 text-lg md:text-xl lg:text-2xl text-white">It's Not About Intensity, It's About Consistency </p>

            </div>


            <div className="bg-gray-50 py-8">
                <div className="container mx-auto flex flex-wrap justify-center gap-6">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div id="imageCard" className="bg-white rounded-lg p-4">
                                <MainCard image={"https://www.primalstrength.com/cdn/shop/files/gymdesign_render_Two_collumn_grid_cb1b5850-fa8e-4a7b-a2b3-190c2e45facd.jpg?v=1680719688&width=1500"}/>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="bg-white rounded-lg p-4">
                            <MainCard image={"https://www.primalstrength.com/cdn/shop/files/gymdesign_render_Two_collumn_grid_cb1b5850-fa8e-4a7b-a2b3-190c2e45facd.jpg?v=1680719688&width=1500"}/>

                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="bg-white rounded-lg p-4">
                            <MainCard image={"https://www.primalstrength.com/cdn/shop/files/gymdesign_render_Two_collumn_grid_cb1b5850-fa8e-4a7b-a2b3-190c2e45facd.jpg?v=1680719688&width=1500"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-blue-500 py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-white mb-4">Get Started</h2>
                    <p className="text-white text-lg mb-6">
                        Join us today and start tracking your progress
                    </p>
                    <button className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out">
                        Get Started
                    </button>
                </div>
            </div>



        </>

    )
}
