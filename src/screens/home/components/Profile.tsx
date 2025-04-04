// import FractalSketch from "./sketches/FractalSketch.tsx";
import useMediaQuery from "../../../hooks/useMediaQuery.ts";
import SmileySketch from "./sketches/SmileySketch.tsx";

const Profile = () => {

    const isSmall = useMediaQuery('(max-width: 768px)');
    const isMedium = useMediaQuery('(max-width: 1024px)');

    const fractalSize: number = isSmall ? 250 : isMedium ? 250 : 400;

    return (
        <div className='flex flex-col md:flex-row gap-8 items-center justify-center md:h-screen mb-32'>
            <div className="max-w-[80%] md:max-w-[50%]">
                <p className='font-itim text-[22px]'>
                    <span className='font-joti text-[64px]'>Hi, </span> I am <br />
                    <h1 className='text-yellow-500 text-4xl md:text-8xl leading-none'>Mohamed Irsath Kareem</h1>
                    <br/>
                    <h1 className='text-pink-500 text-sm md:text-2xl leading-none'>Full Stack (Web &amp; Mobile) App Developer</h1>
                </p>
            </div>
            <div className='rotate-180'>
                {/*<FractalSketch width={fractalSize} height={fractalSize} />*/}
                <SmileySketch width={fractalSize} height={fractalSize} />
            </div>
        </div>
    );
};

export default Profile;