import cedrickAvatar from "@/assets/images/team/cedrick-tacan.png";
import angelitoAvatar from "@/assets/images/team/angelito-halmain.png";
import joashAvatar from "@/assets/images/team/joash-elizzer.jpg";
import gabrielAvatar from "@/assets/images/team/gabriel-carpio.jpg";
import pauleenAvatar from "@/assets/images/team/pauleen-sabillo.jpg";

const coreTeam = [
  {
    name: "Pauleen Sabillo",
    role: "Lead/Pitcher",
    avatar: pauleenAvatar,
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
    avatar: gabrielAvatar,
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
    <section id="team" className="bg-[#f8fbf5] py-14 dark:bg-[#0d1117] sm:py-16 md:py-20 lg:py-24">
      <div className="section-shell">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16">
          <h2 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 dark:text-slate-50 sm:text-4xl lg:text-5xl">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-500 sm:text-base sm:leading-7">
            The passionate individuals behind GabayGamot, working together to revolutionize medicine coordination in barangay health centers.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {/* Core Team */}
          <div>
            <h3 className="mb-6 text-center text-xl font-medium text-slate-900 dark:text-slate-200 sm:text-left">Core Team</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-[#dbe9d5] pt-8 dark:border-white/5 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 md:grid-cols-5">
              {coreTeam.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex size-20 items-center justify-center rounded-full border-2 border-[#cfe3c7] bg-white p-1 shadow-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-[#1a1f2e] sm:size-24 md:size-28">
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-[#dbe9d5] pt-8 dark:border-white/5 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 md:grid-cols-5">
              {advisors.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex size-20 items-center justify-center rounded-full border-2 border-[#cfe3c7] bg-white p-1 shadow-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-[#1a1f2e] sm:size-24 md:size-28">
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
