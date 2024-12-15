
type ExperienceModel = {
    designation: string,
    totalMonths: string,
    company: string,
    location: string,
    description: string,
    contributions: string[],
    technologies: string
}

const experiences: ExperienceModel[] = [
    {
        designation: 'Senior Software Engineer',
        company: 'Dotcod',
        totalMonths: '2 years (Present)',
        location: 'Bangalore, India',
        description: 'Serving as an Android Engineer for Farmersbyte, a U.S.-based client, focusing on the development of the AgriPro app. Responsible for building high-quality, user-centric features, with a particular emphasis on custom Android components and optimizing user experience through advanced UI elements and interactions.',
        contributions: [
            'Developed and maintained custom views and composables with Jetpack Compose, utilizing advanced custom drawing techniques and animations to enrich user engagement.',
            'Collaborated with cross-functional teams to implement features using Kotlin, Jetpack Compose, Coroutines & Flows, Camera API, Firebase Auth, Push Notifications, Location API, Exoplayer, and various Jetpack Libraries (e.g., Navigation).',
            'Entrusted as one of the two primary maintainers, overseeing project consistency, stability, and code quality to ensure alignment with project standards and client requirements.'
        ],
        technologies: 'Kotlin, Jetpack Compose, Firebase, Exoplayer, Camera API, Location API, Coroutines, Flows, Jetpack Libraries (Navigation), Custom Views, Animations.',
    },
    {
        designation: 'Software Engineer',
        company: 'Softeon',
        totalMonths: '2+ years',
        location: 'Chennai, India',
        description: 'Played a key role as a Software Developer on a Warehouse Management Solutions (SaaS) project, focusing on Distributed Orders Management Solutions (DOMS) to optimize end-to-end workflows for inbound and outbound order management.',
        contributions: [
            'Enhanced system processing efficiency by 20% through implementing streamlined backend workflows with Java and Spring Boot.',
            'Led the successful delivery of over 30+ feature enhancements and bug fixes, resulting in a 15% improvement in application stability and a measurable reduction in support tickets.',
            'Collaborated on frontend interfaces using ReactJS and optimized SQL queries, decreasing query response times by up to 25% to enhance the user experience and database efficiency.',
            'Contributed to mobile development (Android/Kotlin) for seamless cross-platform functionality, supporting a 10% increase in user adoption within the first quarter post-release.'
        ],
        technologies: 'Java, Spring Boot, ReactJS, SQL (Oracle), Android, Kotlin.'
    }
]


const Experience = () => {
    return (
        <div className='flex flex-col gap-8 min-h-screen'>
            <h3 className='text-2xl font-bold'>Work Experience</h3>
            {experiences.map(experience => (
                <ExperienceComponent key={experience.company} experience={experience} />
            ))}
        </div>
    );
};

const ExperienceComponent = (
    { experience }: { experience: ExperienceModel }
) => {
    return (
        <div className='flex flex-col'>
            <h4 className='text-xl font-bold'>{experience.designation}</h4>
            <h4 className='text-xl italic'>{experience.company} - {experience.location} - {experience.totalMonths}</h4>
            <p>{experience.description}</p>
            <ul>
                {experience.contributions.map((contribution) => (
                    <li key={contribution}>
                        <p>{contribution}</p>
                    </li>
                ))}
            </ul>
            <p><strong>Technologies: </strong>{experience.technologies}</p>
        </div>
    )
}

export default Experience;