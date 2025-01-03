import Profile from "./components/Profile.tsx";
import Skills from "./components/Skills.tsx";
import Experience from "./components/Experience.tsx";
import Projects from "./components/Projects.tsx";

const Home = () => {
    return (
        <div className='max-w-[80%] mx-auto'>
            <Profile />
            <Skills />
            <Experience />
            <Projects />
        </div>
    );
};

export default Home;