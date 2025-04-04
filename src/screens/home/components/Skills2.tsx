import {DatabaseAppSkills, MobileAppSkills, OtherAppSkills, WebAppSkills} from "../../../data/Skills.ts";
import {useEffect, useRef} from "react";

const Skills2 = () => {
    return (
        <div className='mt-12 grid md:grid-cols-2 gap-y-24 md:gap-y-32 gap-x-12'>
            <SkillSection skills={MobileAppSkills} />
            <SkillSection skills={WebAppSkills} />
            <SkillSection skills={DatabaseAppSkills} />
            <SkillSection skills={OtherAppSkills} />
        </div>
    );
};

const SkillSection = (
    { skills }: { skills: any[] }
) => {

    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = skillsRef.current?.querySelectorAll(".skill-card") ?? [1];
        const totalCards = cards.length;
        const angleStep = 360 / totalCards; // Divide 360° evenly

        cards.forEach((card, index) => {
            const angle = angleStep * index; // Calculate rotation per card
            // @ts-ignore
            card.style.transform = `
                translateZ(-100px)
                rotateY(
                  calc(${angle}deg + var(--rotation))
                )
                translateX(70%)
            `;
        });
    }, []);

    return (
        <div className='skill-container w-full h-[200px] sm:h-[400px]' ref={skillsRef}>
            {skills.map((skill: any) => (
                <div
                    key={skill}
                    className={`max-sm:w-[100px] w-[200px] h-[150px] md:h-[250px] skill-card bg-[#350303]`}
                >
                    <div className='flex flex-col items-center justify-center text-center w-full h-full'>
                        <img src={skill.image} alt={skill.name} className='aspect-square w-[48px] md:w-[150px]'/>
                        <p className='text-white text-sm md:text-2xl'>{skill.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Skills2;