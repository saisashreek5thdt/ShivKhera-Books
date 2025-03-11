import Image from "next/image";
import menuImg from "../../public/menuImg.png"
import Link from "next/link";
import { chapterData } from "../(utils)/chapterData";
import { CiHome } from "react-icons/ci"; 
export default function Main() {
    return (
        <>

        {/* Home Button */}
        <Link href="/">
                <div className="fixed top-10 right-10 z-10 rounded-full shadow-lg p-2 backdrop-blur-md bg-black hover:bg-white text-white hover:text-gray-600 ">
                    <CiHome className="text-3xl transition-colors cursor-pointer" />
                </div>
            </Link>
             
            <div className="bg-[rgb(223,218,214)] h-screen flex  w-full">
                <div className="image-container w-1/2">
                    <Image
                        src={menuImg}
                        className="h-screen"
                        alt="Picture of the author"
                        width={700}
                        height={500}
                    />
                </div>
                <div className="chapter-list flex flex-col mt-6 w-1/2 overflow-y-scroll scrollbar-hide">
                    {
                        chapterData.map((book) => (
                            <Link href={`/chapter/${book.id}`} key={book.id}>
                                <div className="flex flex-col gap-3 mt-8 quote-font cursor-pointer">
                                    <p className="text-4xl font-normal ">{book.Chapter}</p>
                                    <p className="text-5xl mt-1">{book.title}</p>
                                    <p className="text-4xl font-normal">{book.info}</p>
                                    <hr
                                        className={`bg-gradient-to-r from-${book.color}-600 to-white h-3 drop-shadow-lg -ml-2 mr-4 mt-5`}
                                    />
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
