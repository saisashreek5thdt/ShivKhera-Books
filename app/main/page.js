import Image from "next/image";
import menuImg from "../../public/menuImg.png"
import Link from "next/link";
import { chapterData } from "../(utils)/chapterData";
export default function Main() {
    return (
        <>
            <div className="bg-[rgb(223,218,214)] h-screen flex  w-full">
                <div className="w-1/2">
                    <Image
                        src={menuImg}
                        className="h-screen"
                        alt="Picture of the author"
                        width={700}
                        height={500}
                    />
                </div>
                <div className="flex flex-col mt-6 w-1/2 overflow-y-scroll scrollbar-hide">
                    {
                        chapterData.map((book) => (
                            <Link href={`/chapter/${book.id}`} key={book.id}>
                            <div className="flex flex-col gap-3 mt-8 from-blue-600 cursor-pointer">
                                <p className="text-4xl font-normal ">{book.Chapter}</p>
                                <p className="text-5xl mt-1">{book.title}</p>
                                <p className="text-4xl font-normal">{book.info}</p>
                                <hr className={`bg-gradient-to-r from-${book.color}-600  to-white h-3 drop-shadow-lg -ml-2 mr-4 mt-5`} />
                            </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
