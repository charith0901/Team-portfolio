import React from "react";
import { teamMembers } from '../data/Data';
import ProfileCard from "./profile-card";
import AnimatedTitle from "./AnimatedTitle";

const TeamMemberCarousel = () => {
  return (
    <main className="w-full">
      <section id="team" className="w-full flex items-center justify-center bg-gray-800 py-8">
      <AnimatedTitle
          title={"Team Mem<b>ber</b>s"}
          containerClass={"skills-title  text-gradient-to-r from-blue-400 to-purple-500"}
        />
      </section>
      <section className="min-h-screen bg-neutral-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full h-screen">
              {member.name && <ProfileCard member={member} className="w-full h-full" />}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TeamMemberCarousel;