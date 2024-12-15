
const Profile = () => {
    return (
        <div className="flex gap-12 h-screen items-center">
            <div className='flex flex-col gap-4'>
                <h1 className='text-5xl font-extrabold'>Mohamed Irsath Kareem</h1>
                <p className='italic'>Full stack (Web & Mobile) Software Engineer</p>
                <p className=''>A highly motivated software engineer with 5+ years of Work/Hands-on experience, and have many projects in hand. Eager to work on many projects which will horn my technical skills</p>
                <div>
                    <button>CV/Resume</button>
                </div>
            </div>
            <div>
                <img src={import.meta.env.BASE_URL + '/assets/irsath-dp.png'} alt='cover-picture' className='w-[900px] h-[450px]'/>
            </div>
        </div>
    );
};

export default Profile;