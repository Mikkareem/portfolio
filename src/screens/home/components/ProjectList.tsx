
type ProjectListModel = {
    title: string,
    thumbnailUrl: string,
    subtitle: string,
    description: string,
    sublistModel: any[],
}

const projects: ProjectListModel[] = [
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Lotcode - A Leetcode Clone',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    }
]

const ProjectListItem = ({ project }: { project: ProjectListModel }) => {
    return (
        <div className='bg-pink-600 flex flex-col gap-4'>
            <img src={import.meta.env.BASE_URL + project.thumbnailUrl} alt={"thumbnail"} className='w-full'/>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            <button>Read More</button>
        </div>
    )
}

const ProjectList = () => {

    return (
        <div className='grid grid-cols-4 gap-4'>
            {projects.map((project, index) => (
                <ProjectListItem key={index} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;