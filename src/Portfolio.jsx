import React, {useEffect, useMemo, useState, useRef} from "react";
import imgRanker from "./assets/projects/ranker.jpg";
import resumePdf from "./assets/resume/Kristina_Kolesnyk_Resume.pdf";
import profileImg from "./assets/profile.jpg";
import {motion} from "framer-motion";
import {
    Mail,
    Github,
    Linkedin,
    ExternalLink,
    ArrowRight,
    Moon,
    Sun,
    Download,
} from "lucide-react";


// =============== CONTENT (edit me) ===============
const PROFILE = {
    name: "Kristina Kolesnyk",
    role: "Frontend Developer",
    summary:
        "Frontend developer focused on making technology simple and enjoyable. I build clean, responsive experiences with React and ship end-to-end features with Node and PostgreSQL — with strong attention to performance, accessibility, and clear communication.",
    location: "Toronto, ON, Canada",
    email: "kkristina.work@gmail.com",
    phone: "+1 (437) 430-9647",
    resumeUrl: resumePdf,
    socials: {
        github: "https://github.com/KristinaKolesnyk",
        linkedin: "https://www.linkedin.com/in/kristina-kolesnyk/",
        website: "https://your-domain.com",
    },
};


const SKILLS = [
    // Frontend
    "React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Sass/SCSS",
    // Backend & APIs
    "Node.js", "Express.js", "REST APIs", "WebSocket",
    // Databases & ORM
    "PostgreSQL", "MySQL", "Sequelize", "SQL",
    // Tools & CI/CD
    "Git", "GitHub", "GitHub Actions",
    // Environments
    "Linux (Ubuntu)", "macOS", "Windows",
    // UX & Practices
    "UX/UI principles", "Accessibility (WCAG basics)", "Performance optimization", "Code review", "Git Flow",
    // Additional
    "Java (fundamentals/OOP)",
];

const PROJECTS = [
    {
        title: "Ranker",
        blurb:
            "Full-stack web app to help users make decisions by ranking items in lists and head-to-head tournaments. Responsive React frontend with real-time updates and visual feedback; secure backend with REST API, auth, and PostgreSQL.",
        tags: ["React", "Node", "Express", "PostgreSQL", "Auth"],
        image: imgRanker,
        demo: "https://drive.google.com/file/d/1VphzLdFyHtjBdn0MP5WybtCAW-bC7GQY/view?usp=sharing",
        repo: "https://github.com/KristinaKolesnyk/Ranker",
    },
    {
        title: "PlanIt",
        blurb:
            "Trip and list planning with filters, ratings, and comments. React + Express + PostgreSQL.",
        tags: ["React", "Express", "PostgreSQL", "Knex"],
        image: imgRanker,
        demo: "#",
        repo: "#",
    },
    {
        title: "BrightBrowser Docs",
        blurb:
            "Technical documentation site: MDX content, search, versioning, and code samples.",
        tags: ["Docs", "MDX", "Search"],
        image: imgRanker,
        demo: "#",
        repo: "#",
    },
];


const EXPERIENCE = [
    {
        role: "AI Knowledge Engineer",
        company: "Hola",
        period: "2024 — 2025",
        points: [
            "Built a structured, Git-versioned knowledge base (stable IDs, cross-links) for the LLM support agent.",
            "Designed intents, prompts, guardrails; created evaluation sets; iterated answers to increase accuracy.",
            "Deflected ~28–35% of repetitive FAQs and reduced first-response time from hours to seconds.",
            "Wrote developer-grade docs; proposed UX improvements; shipped Figma-to-HTML emails.",
        ],
    },
    {
        role: "QA Engineer (Web & Mobile)",
        company: "Bright Data",
        period: "2022 — 2024",
        points: [
            "Validated releases across web/iOS/Android/TV; blocked risky builds and coordinated quick fixes.",
            "Automated sanity/regression steps (Bash/Node); cut verification time by ~30–40%.",
            "Monitored dashboards/alerts; triaged incidents with fast FRT and low MTTD; ensured stable prod.",
            "Collaborated on deployments/rollouts with clear rollback criteria; covered device/OS/browser matrices.",
        ],
    },
];


const EDUCATION = [
    {
        place: "Afeka Tel-Aviv Academic College of Engineering",
        program: "BSc in Software Engineering",
    },
    {
        place: "Zero To Mastery Academy",
        program: "Web Developer Certification — Full-Stack Web Development",
    },
];

// =============== UTIL ===============
const cx = (...arr) => arr.filter(Boolean).join(" ");

const useActiveSection = (ids) => {
    const [active, setActive] = useState(ids[0] ?? "");
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            {rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1]}
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, [ids]);
    return active;
};

const scrollToId = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({behavior: "smooth", block: "start"});
};

// =============== UI PRIMITIVES ===============
function Shell({children, dark, setDark}) {
    return (
        <div className={cx(
            "min-h-dvh font-poppins bg-slate-50 text-ink",
            dark && "dark bg-slate-900"
        )}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
        </div>
    );
}


function Section({id, title, eyebrow, children}) {
    return (
        <section id={id} className="scroll-mt-24 py-14 sm:py-20">
            <motion.div
                initial={{opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.5}}
                className="space-y-6"
            >
                {eyebrow && (
                    <div
                        className="text-sm uppercase tracking-widest text-muted">{eyebrow}</div>
                )}
                {title && (
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
                )}
                {children}
            </motion.div>
        </section>
    );
}

function Card({className = "", children}) {
    return (
        <div
            className={cx(
                // рамка и фон теперь через токены
                "rounded-2xl shadow-sm ring-1 ring-border/60 bg-card/40 backdrop-blur p-6",
                className
            )}
        >
            {children}
        </div>
    );
}


function HeadlineDivider({text}) {
    return (
        <div className="mb-6 flex items-center gap-6">
            <h2 className="lowercase font-extrabold text-brand text-[48px] sm:text-[60px] lg:text-[75px]">
                {text}
            </h2>
            <div
                aria-hidden="true"
                className="flex-1 h-1 sm:h-0.5 bg-gradient-to-r from-transparent via-brand/80 to-transparent rounded-full"
            />
        </div>
    );
}


function Badge({children}) {
    return (
        <span
            className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-sm leading-5 text-ink/80">
      {children}
    </span>
    );
}


function LinkGhost({href, children, icon: Icon = ExternalLink}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:underline"
        >
            <Icon className="h-4 w-4"/> {children}
        </a>
    );
}

function PrimaryButton({children, onClick, href, Icon = ArrowRight, downloadFileName}) {
    if (href) {
        // если есть имя — скачиваем; иначе открываем в новой вкладке
        const linkProps = downloadFileName
            ? {href, download: downloadFileName}
            : {href, target: "_blank", rel: "noreferrer"};

        return (
            <a {...linkProps}
               className="inline-flex items-center gap-2 rounded-2xl shadow-sm bg-brand text-surface2 px-4 py-2 text-sm font-medium hover:translate-y-[-1px] hover:shadow md:text-base">
                {children} <Icon className="h-4 w-4"/>
            </a>
        );
    }

    return (
        <button onClick={onClick}
                className="inline-flex items-center gap-2 rounded-2xl shadow-sm bg-brand text-surface2 px-4 py-2 text-sm font-medium hover:translate-y-[-1px] hover:shadow md:text-base">
            {children} <Icon className="h-4 w-4"/>
        </button>
    );
}


function GhostButton({children, onClick, Icon = ArrowRight}) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-2xl shadow-sm border border-brand font-medium px-4 py-2 text-sm hover:bg-ink/5 hover:border-ink transition-colors"        >
            {children} <Icon className="h-4 w-4"/>
        </button>
    );
}

// =============== MAIN ===============
export default function Portfolio() {
    const [dark, setDark] = useState(true);
    const sections = useMemo(() => ["home", "about", "work", "projects", "skills", "education", "contact"], []);

    const active = useActiveSection(sections);

    useEffect(() => {
        document.title = `${PROFILE.name} — Portfolio`;
    }, []);

    return (
        <Shell dark={dark} setDark={setDark}>
            <Navbar active={active} onJump={scrollToId} dark={dark} setDark={setDark}/>

            {/* HERO */}
            <Section id="home">
                <Hero/>
            </Section>

            {/* ABOUT */}
            <Section id="about">
                <HeadlineDivider text="about"/>
                <Card>
                    <p className="text-muted">
                        Frontend developer focused on making technology simple and enjoyable. I build clean, responsive
                        experiences with React and ship end-to-end features with Node and PostgreSQL — with strong
                        attention to performance, accessibility, and clear communication.
                    </p>
                </Card>
            </Section>

            {/* WORK */}
            <Section id="work">
                <HeadlineDivider text="work"/>
                <Experience/>
            </Section>

            {/* PROJECTS */}
            <Section id="projects">
                <HeadlineDivider text="projects"/>
                <ProjectsCarousel/>
            </Section>

            {/* SKILLS */}
            <Section id="skills">
                <HeadlineDivider text="skills"/>
                <SkillsList/>
            </Section>

            {/* EDUCATION */}
            <Section id="education">
                <HeadlineDivider text="education"/>
                <div className="space-y-4">
                    {EDUCATION.map((ed) => (
                        <Card key={ed.place}>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div className="text-sm text-muted">{ed.place}</div>
                                    <div className="text-lg font-semibold">{ed.program}</div>
                                </div>
                                {ed.period && (
                                    <div className="text-sm text-muted">{ed.period}</div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* CONTACT */}
            <Section id="contact">
                <HeadlineDivider text="contact me"/>
                <p className="max-w-3xl text-muted mb-8">
                    I would love to hear about your project and how I can help. Feel free to reach out —
                    I’ll get back to you as soon as possible.
                </p>
                <Contact/>
            </Section>

            <Footer/>
        </Shell>
    );
}

function Navbar({active, onJump, dark, setDark}) {
    const [open, setOpen] = useState(false);
    const links = [
        {id: "home", label: "Home"},
        {id: "about", label: "About"},
        {id: "work", label: "Work"},
        {id: "projects", label: "Projects"},
        {id: "skills", label: "Skills"},
        {id: "education", label: "Education"},
        {id: "contact", label: "Contact"},
    ];

    return (
        <header
            className="sticky top-0 z-50 mx-[calc(50%-50vw)] w-screen backdrop-blur bg-surface/70 text-ink border-b border-border/40 overflow-x-clip">
            {/* внутренний контейнер по сетке сайта */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* верхняя строка */}
                <div className="relative z-0 flex items-center justify-end py-3">
                    {/* Centered nav (desktop) */}
                    <nav
                        role="navigation"
                        className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 z-10"
                    >
                        {links.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => onJump(l.id)}
                                className={cx(
                                    // размер шрифта оставляю как у тебя
                                    "text-[17px] font-medium px-3 py-1.5 rounded-full",
                                    // эффект как у иконок:
                                    "hover:bg-ink/10 active:bg-ink/15 transition-colors",
                                    // цвет текста всегда одинаковый (без active-логики):
                                    "text-ink/90 hover:text-ink",
                                    // клавиатурная доступность
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                                )}
                                // можно оставить aria-current для a11y, оно стилей не меняет
                                aria-current={active === l.id ? "page" : undefined}
                            >
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right actions (desktop) */}
                    <div className="hidden md:flex items-center gap-2 ml-auto z-[1]">
                        <a
                            href={PROFILE.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/10"
                            title="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5"/>
                        </a>
                        <a
                            href={PROFILE.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/10"
                            title="GitHub"
                        >
                            <Github className="h-5 w-5"/>
                        </a>
                        <button
                            aria-label="Toggle theme"
                            className="rounded-full p-2 hover:bg-ink/10"
                            onClick={() => setDark((d) => !d)}
                            title={dark ? "Switch to light theme" : "Switch to dark theme"}
                        >
                            {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                        </button>
                    </div>

                    {/* Burger (mobile) */}
                    <button
                        className="md:hidden rounded-full p-2 hover:bg-ink/10 ml-auto"
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        <ArrowRight className={cx("h-5 w-5 transition", open && "rotate-90")}/>
                    </button>
                </div>

                {/* Mobile dropdown */}
                {open && (
                    <div className="md:hidden pb-3 flex flex-wrap items-center gap-2">
                        {links.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => {
                                    onJump(l.id);
                                    setOpen(false);
                                }}
                                className={cx(
                                    "rounded-full px-3 py-1.5 text-base",
                                    "hover:bg-ink/10 active:bg-ink/15"
                                )}
                            >
                                {l.label}
                            </button>
                        ))}
                        <span className="ml-auto inline-flex items-center gap-1">
            <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/10"
                title="LinkedIn"
            >
              <Linkedin className="h-5 w-5"/>
            </a>
            <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/10"
                title="GitHub"
            >
              <Github className="h-5 w-5"/>
            </a>
            <button
                aria-label="Toggle theme"
                className="rounded-full p-2 hover:bg-ink/10"
                onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </button>
          </span>
                    </div>
                )}
            </div>
        </header>
    );
}


function Hero() {
    return (
        <div className="grid grid-cols-1 items-center gap-10 py-6 sm:grid-cols-[1.1fr_.9fr]">
            {/* Left: text */}
            <div className="space-y-6">
                <p className="text-[28px] font-medium text-ink/90">
                    Hello, I’m {PROFILE.name.split(' ')[0]},
                </p>

                <h1 className="leading-[0.9] text-[42px] sm:text-[60px] lg:text-[100px] font-extrabold text-brand">
                    Frontend<br/>Developer
                </h1>

                <div className="flex flex-wrap items-center gap-4">
                    <a
                        href="#contact"
                        className="text-[26px] font-extrabold text-ink underline underline-offset-[6px]"
                    >
                        Contact Me
                    </a>

                    <div className="flex gap-3">
                        <PrimaryButton
                            href={PROFILE.resumeUrl}
                            Icon={Download}
                            downloadFileName="Kristina_Kolesnyk_Resume.pdf"
                        >
                            Download Resume
                        </PrimaryButton>

                        <GhostButton onClick={() => window.open(PROFILE.resumeUrl, "_blank", "noopener,noreferrer")}>
                            View Resume
                        </GhostButton>
                    </div>

                </div>
            </div>
            {/* Right: portrait */}
            <Card className="relative overflow-hidden">
                <img
                    src={profileImg}
                    alt="Portrait"
                    className="h-[420px] w-full rounded-2xl object-cover"
                    loading="lazy"
                    decoding="async"
                />
            </Card>
        </div>

    );
}


function SkillsList() {
    return (
        <Card>
            <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                    <Badge key={s}>{s}</Badge>
                ))}
            </div>
        </Card>
    );
}

function Experience() {
    return (
        <div className="space-y-6">
            {EXPERIENCE.map((e) => (
                <Card key={e.role}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="text-sm text-muted">{e.company}</div>
                            <div className="text-lg font-semibold">{e.role}</div>
                        </div>
                        <div className="text-sm text-muted">{e.period}</div>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                        {e.points.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </Card>
            ))}
        </div>
    );
}

function ProjectsCarousel() {
    const scrollerRef = useRef(null);

    const scroll = (dir) => () => {
        const node = scrollerRef.current;
        if (!node) return;
        const card = node.querySelector("[data-card]");
        const step = card ? card.clientWidth + 24 : node.clientWidth * 0.9; // 24 = gap-6
        node.scrollBy({left: (dir === "next" ? 1 : -1) * step, behavior: "smooth"});
    };

    return (
        <div className="relative">
            {/* Лента */}
            <div
                ref={scrollerRef}
                className="
          flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          pt-1 pb-2
        "
                aria-label="Projects carousel"
            >
                {PROJECTS.map((p) => (
                    <article
                        key={p.title}
                        data-card
                        className="snap-start shrink-0 w-[320px] sm:w-[420px] lg:w-[520px]"
                    >
                        <Card
                            className="p-0 overflow-hidden group ring-brand-soft hover:ring-brand-strong transition-all hover:translate-y-[-1px] hover:shadow">
                            {/* Прямоугольный превью-блок как в макете */}
                            <div className="aspect-[16/9] w-full overflow-hidden">
                                <img src={p.image} alt={p.title} className="h-full w-full object-cover"/>
                            </div>

                            <div className="p-5 flex flex-col gap-2 min-h-[250px]">
                                <h3 className="text-xl font-semibold">{p.title}</h3>
                                <p className="text-sm text-muted line-clamp-4">{p.blurb}</p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {p.tags.map((t) => (
                                        <Badge key={t}>{t}</Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 pt-2 mt-auto">
                                    <LinkGhost href={p.demo}>Demo</LinkGhost>
                                    <LinkGhost href={p.repo} icon={Github}>Code</LinkGhost>
                                </div>
                            </div>
                        </Card>
                    </article>
                ))}
            </div>

            {/* Навигация (прячем на мобилке, там — свайп) */}
            <button
                type="button"
                onClick={scroll("prev")}
                aria-label="Previous"
                className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 items-center justify-center
                   h-10 w-10 rounded-full bg-surface/70 border border-border/40 backdrop-blur
                   hover:bg-surface"
            >
                <ArrowRight className="h-5 w-5 -rotate-180"/>
            </button>
            <button
                type="button"
                onClick={scroll("next")}
                aria-label="Next"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center
                   h-10 w-10 rounded-full bg-surface/70 border border-border/40 backdrop-blur
                   hover:bg-surface"
            >
                <ArrowRight className="h-5 w-5"/>
            </button>
        </div>
    );
}

function Contact() {
    const [copied, setCopied] = useState(false);
    const email = PROFILE.email;

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            // ignore
        }
    };

    return (
        <div className="grid gap-6 sm:grid-cols-2">
            {/* Direct contact */}
            <Card>
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Contact directly</h3>


                    <div className="flex flex-col gap-2 text-sm">
                        <a
                            className="inline-flex items-center gap-2 hover:underline"
                            href={`mailto:${email}`}
                        >
                            <Mail className="h-4 w-4"/> {email}
                        </a>

                        <a
                            className="inline-flex items-center gap-2 hover:underline"
                            href={PROFILE.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Linkedin className="h-4 w-4"/> LinkedIn
                        </a>

                        <a
                            className="inline-flex items-center gap-2 hover:underline"
                            href={PROFILE.socials.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github className="h-4 w-4"/> GitHub
                        </a>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                        <GhostButton onClick={copyEmail} Icon={Mail}>
                            {copied ? "Copied!" : "Copy email"}
                        </GhostButton>

                        <PrimaryButton
                            href={`mailto:${email}?subject=${encodeURIComponent(
                                "Hi Kristina — let's talk"
                            )}&body=${encodeURIComponent(
                                "Hi Kristina,\n\nI found your portfolio and would like to connect.\n\nThanks!"
                            )}`}
                            Icon={Mail}
                        >
                            Open email client
                        </PrimaryButton>
                    </div>
                </div>
            </Card>

        </div>
    );
}

function Footer() {
    return (
        <footer className="py-10">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-sm text-muted">
                    © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
