import Profile from "./components/Profile.tsx";
import Skills from "./components/Skills.tsx";
import Experience from "./components/Experience.tsx";
import ProjectList from "./components/ProjectList.tsx";

const Home = () => {
    return (
        <div className='max-w-[80%] mx-auto'>
            <Profile />
            <Skills />
            <Experience />
            <ProjectList />
        </div>
    );
};

export default Home;