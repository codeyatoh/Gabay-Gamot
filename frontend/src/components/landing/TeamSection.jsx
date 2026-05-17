import React from "react";
import cedrickAvatar from "@/assets/images/team/cedrick-tacan.png";
import angelitoAvatar from "@/assets/images/team/angelito-halmain.png";
import joashAvatar from "@/assets/images/team/joash-elizzer.jpg";

const coreTeam = [
  {
    name: "Pauleen Sabillo",
    role: "Lead/Pitcher",
    avatar: "https://ui-avatars.com/api/?name=Pauleen+Sabillo&background=0b6b35&color=fff&size=256",
  },
  {
    name: "Angelito Halmain",
    role: "Full Stack Programmer",
    avatar: angelitoAvatar,
  },
  {
    name: "Joash Elizzer",
    role: "Data Analyst",
    avatar: joashAvatar,
  },
  {
    name: "Gabriel Carpio",
    role: "Researcher",
    avatar: "https://ui-avatars.com/api/?name=Gabriel+Carpio&background=0b6b35&color=fff&size=256",
  },
  {
    name: "Cedrick Tacan",
    role: "Tester",
    avatar: cedrickAvatar,
  },
];

const advisors = [
  {
    name: "Roman Jade Sol",
    role: "Coach",
    avatar: "https://ui-avatars.com/api/?name=Roman+Jade+Sol&background=0b6b35&color=fff&size=256",
  },
  {
    name: "Rai Beligolo",
    role: "Mentor",
    avatar: "https://ui-avatars.com/api/?name=Rai+Beligolo&background=0b6b35&color=fff&size=256",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="bg-[#f8fbf5] py-16 dark:bg-[#0d1117] md:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-4xl font-semibold leading-tight tracking-normal text-slate-950 dark:text-slate-50 sm:text-5xl">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-500">
            The passionate individuals behind GabayGamot, working together to revolutionize medicine coordination in barangay health centers.
          </p>
        </div>

        <div className="space-y-16">
          {/* Core Team */}
          <div>
            <h3 className="mb-6 text-center text-xl font-medium text-slate-900 dark:text-slate-200 sm:text-left">Core Team</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[#dbe9d5] pt-8 dark:border-white/5 sm:grid-cols-3 md:grid-cols-5">
              {coreTeam.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex size-24 items-center justify-center rounded-full border-2 border-[#cfe3c7] bg-white p-1 shadow-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-[#1a1f2e] sm:size-28">
                    <img
                      className="aspect-square rounded-full object-cover"
                      src={member.avatar}
                      alt={member.name}
                      loading="lazy"
                    />
                  </div>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{member.name}</span>
                  <span className="mt-1 block text-xs font-medium text-[#0b6b35] dark:text-[#4ade80]">{member.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mentors / Advisors */}
          <div>
            <h3 className="mb-6 text-center text-xl font-medium text-slate-900 dark:text-slate-200 sm:text-left">Advisors</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[#dbe9d5] pt-8 dark:border-white/5 sm:grid-cols-4 md:grid-cols-5">
              {advisors.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex size-24 items-center justify-center rounded-full border-2 border-[#cfe3c7] bg-white p-1 shadow-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-[#1a1f2e] sm:size-28">
                    <img
                      className="aspect-square rounded-full object-cover"
                      src={member.avatar}
                      alt={member.name}
                      loading="lazy"
                    />
                  </div>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{member.name}</span>
                  <span className="mt-1 block text-xs font-medium text-[#0b6b35] dark:text-[#4ade80]">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
