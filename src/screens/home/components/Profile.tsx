import FractalSketch from "./sketches/FractalSketch.tsx";
import {useRef, useEffect, useState} from "react";

const Profile = () => {
    const profileRef = useRef<HTMLDivElement>(null)

    const [size, setSize] = useState<{width: number, height: number}>({width: 0, height: 0})

    useEffect(() => {
        function handleResize() {

            setSize(
                {
                    width: profileRef.current!.getBoundingClientRect().width,
                    height: profileRef.current!.getBoundingClientRect().height
                }
            )
        }
        if(profileRef.current) {
            handleResize();
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [profileRef.current]);

    return (
        <div className='relative'>
            <div className="flex gap-12 items-center aspect-square md:aspect-auto md:h-screen" ref={profileRef}>
                <div className='flex flex-col gap-4 w-full'>
                    <h1 className='lg:text-9xl text-center font-extrabold text-3xl'>Mohamed Irsath Kareem</h1>
                    <p className='font-extrabold italic text-center'>Full stack (Web & Mobile) Software Engineer</p>
                    {/*<p className=''>A highly motivated software engineer with 5+ years of Work/Hands-on experience, and*/}
                    {/*    have many projects in hand. Eager to work on many projects which will horn my technical*/}
                    {/*    skills</p>*/}
                    {/*<div>*/}
                    {/*    <button>CV/Resume</button>*/}
                    {/*</div>*/}
                </div>
                {/*<div>*/}
                {/*    <img src={import.meta.env.BASE_URL + '/assets/irsath-dp.png'} alt='cover-picture'*/}
                {/*         className='w-[900px] h-[450px]'/>*/}
                {/*</div>*/}
            </div>
            <div className="absolute top-0 left-0 -z-10">
                <FractalSketch width={size.width} height={size.height} />
            </div>
        </div>
    );
};

export default Profile;