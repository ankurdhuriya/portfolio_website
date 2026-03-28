const entries = [
  {
    degree: 'Master of Science in Artificial Intelligence & Machine Learning',
    institution: 'Liverpool John Moores University (LJMU)',
    period: '2023–2025',
  },
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'DIT University',
    period: '2016–2020',
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="section-flowing bg-dark py-16 lg:py-24 z-[48] border-t border-[rgba(244,246,250,0.08)]"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <span className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-8 block">
          Education
        </span>

        <ul className="max-w-2xl space-y-8 lg:space-y-10">
          {entries.map((item) => (
            <li
              key={item.degree}
              className="pb-8 lg:pb-10 border-b border-[rgba(244,246,250,0.08)] last:border-0 last:pb-0"
            >
              <p className="font-heading text-lg sm:text-xl text-text-primary font-semibold leading-snug mb-2">
                {item.degree}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                <span className="text-sm text-text-secondary">{item.institution}</span>
                <span className="font-mono text-xs text-text-secondary tracking-wider tabular-nums shrink-0">
                  {item.period}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Education;
