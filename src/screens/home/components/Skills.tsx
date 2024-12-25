
const AndroidSkills = ['Kotlin/Java', 'Android Development', 'Jetpack Compose', 'Kotlin Multiplatform', 'Compose Multiplatform', 'iOS Development', 'Compose Desktop', 'Room DB', 'Retrofit', 'Firebase', 'Jetpack Navigation', 'WorkManager', 'Coil', 'Dagger/Hilt', 'Koin', 'Unit Testing', 'Compose UI Testing', 'OpenGL ES', 'Shaders', 'Game Development'];

const WebAndBackEndSkills = ['Web development', 'React JS/TS', 'Next JS/TS', 'NodeJS', 'ExpressJS', 'Socket IO', 'Tailwind CSS', 'Websockets', 'Frontend Development', 'Backend Development', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Spring Boot w/Kotlin', 'Spring Boot Reactive Web w/Kotlin', 'REST Api', 'KTOR Server', 'KTOR Client'];

const DatabaseSkills = ['SQL', 'PL/SQL', 'Mysql', 'Oracle', 'PostgreSQL', 'MongoDB'];

const LanguageSkills = ['Java', 'Kotlin', 'C/Cpp', 'JS/TS', 'Python'];

const Skills = () => {
    return (
        <div className='flex flex-col justify-center min-h-screen gap-12'>
            <h3 className='text-2xl font-bold'>Skills</h3>
            <div className='flex flex-wrap gap-4'>
                {
                    AndroidSkills.map(skill => (
                        <SkillPill name={skill} key={skill}/>
                    ))
                }
            </div>

            <div className='flex flex-wrap gap-4'>
                {
                    WebAndBackEndSkills.map(skill => (
                        <SkillPill name={skill} key={skill}/>
                    ))
                }
            </div>

            <div className='flex flex-wrap gap-4'>
                {
                    DatabaseSkills.map(skill => (
                        <SkillPill name={skill} key={skill}/>
                    ))
                }
            </div>

            <div className='flex flex-wrap gap-4'>
                {
                    LanguageSkills.map(skill => (
                        <SkillPill name={skill} key={skill}/>
                    ))
                }
            </div>
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