import SkillsSketch from "./sketches/SkillsSketch.tsx";
import {useEffect, useState, useRef} from "react";

const Skills = () => {

    const skillContainer = useRef<HTMLDivElement>(null);

    const [availableWidth, setAvailableWidth] = useState(0)

    useEffect(() => {
        function handleResize() {
            setAvailableWidth(skillContainer.current.getBoundingClientRect().width);
        }

        if(skillContainer.current) {
            handleResize();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [skillContainer.current])

    return (
        <div className='flex flex-col justify-center gap-12' ref={skillContainer}>
            <h3 className='text-2xl font-bold'>Skills</h3>

            <SkillsSketch width={availableWidth} height={500}/>
        </div>
    );
};

const SkillPill = (
    {name}: { name: String }
) => {
    return (
        <div className='rounded-3xl bg-pink-700 px-4 py-1 font-bold'>
            <p>{name}</p>
        </div>
    )
}

export default Skills;