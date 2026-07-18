import { Profile } from '../types';
import { majorProjectsData } from './majorprojects';
import { miniProjectsData } from './miniprojects';
import { blogsData } from './blogs';

const majorProjectsCount = majorProjectsData.length;
const miniProjectsCount = miniProjectsData.length;
const inlineBlogsCount = blogsData.filter(blog => !blog.isExternal).length;
const mediumBlogsCount = blogsData.filter(blog => blog.isExternal).length;

export const profileData: Profile = {
  name: "Mohamed Irsath Kareem",
  title: "Full Stack Web / Mobile App Developer",
  tagline: "Creating Seamless Experiences Across Devices and Infrastructure.",
  bio: "I build modern software from mobile to cloud. My work spans Android and Kotlin Multiplatform applications, scalable backend services, and cloud-native infrastructure, with a strong focus on clean architecture, reliability, performance, and developer experience. I enjoy designing systems that are as maintainable as they are scalable.",
  yearsExperience: 6,
  projectsBuiltCount: majorProjectsCount + miniProjectsCount - 1,
  articlesCount: inlineBlogsCount + mediumBlogsCount - 1,
  technologiesCount: 35,
  socials: {
    github: "https://github.com/Mikkareem",
    linkedin: "https://www.linkedin.com/in/mikkareem/",
    medium: "https://medium.com/@irsathkareem",
    email: "irsathkareem.ofcl@gmail.com"
  },
  roles: [
    "Full Stack Web Developer",
    "Mobile App Developer",
    "Cloud Native Specialist",
    "DevOps Practitioner"
  ]
};

