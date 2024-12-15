import React from 'react';
import Profile from "./components/Profile.tsx";
import Skills from "./components/Skills.tsx";
import Experience from "./components/Experience.tsx";

const Home = () => {
    return (
        <div className='max-w-[80%] mx-auto'>
            <Profile />
            <Skills />
            <Experience />
        </div>
    );
};

export default Home;