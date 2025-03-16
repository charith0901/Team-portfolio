import Navbar from '../components/Navbar';
import HorizontalScroll from '../components/horizontal-scroll';
import SkillShowcaseParallax from '../components/skill-scroll';
import ProjectShowcase from '../components/project-showcase';
import {projects} from '../data/Data';
import { useEffect } from 'react';

export default function Home() {
    useEffect(
        ()=>{
        window.scrollTo(0,0)},[]
    );
    return (
        <div>
        <Navbar />
        <SkillShowcaseParallax />
        <HorizontalScroll />
        <ProjectShowcase projects={projects}/>
        <footer id='contact' className="h-20 flex items-center justify-center bg-gray-800">
            <p className="text-white">© 2025 DataDragons. All rights reserved.</p>
        </footer>
        </div>
    );
}
