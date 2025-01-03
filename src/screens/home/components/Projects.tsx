
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
        title: 'Online Chess Game',
        thumbnailUrl: '/projects/online-chess-game/online-chess-game-thumb.jpg',
        subtitle: 'Online Chess Game with 2 players in a Room with Real time updates using Websockets',
        description: 'Description of Online Chess Game',
        sublistModel: []
    },
    {
        title: 'Sudoku Game/Solver',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Finance Tracker Application',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Image Editor Android Application',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Bill Generation Application (Barcode scanning - MLKit)',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    },
    {
        title: 'Jetpack compose Mini-project Collections',
        thumbnailUrl: '/projects/lotcode/Lotcode-thumb.jpg',
        subtitle: 'Online Code Submission platform which is inspired from Leetcode (famously known).',
        description: 'Description of Leetcode Clone',
        sublistModel: []
    }
]

const ProjectListItem = ({ project }: { project: ProjectListModel }) => {
    return (
        <div className='bg-pink-600 flex flex-col gap-4 pb-4'>
            <img src={import.meta.env.BASE_URL + project.thumbnailUrl} alt={"thumbnail"} className='w-full'/>
            <div className='flex flex-col gap-2 px-4 flex-grow'>
                <h3 className='text-xl font-semibold'>{project.title}</h3>
                <p className='font-light flex-grow'>{project.subtitle}</p>
                <button className='bg-amber-500 text-black rounded p-2'>Read More</button>
            </div>
        </div>
    )
}

const Projects = () => {
    return (
        <div className='flex flex-col justify-center min-h-screen gap-4 mt-12'>
            <h3 className='text-2xl font-bold'>Projects</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {projects.map((project) => (
                    <ProjectListItem key={project.title} project={project}/>
                ))}
            </div>
        </div>
    );
};

export default Projects;