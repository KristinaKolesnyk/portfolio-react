import React, { useEffect, useMemo, useState, useRef } from "react";
import {motion} from "framer-motion";
import {
    Mail,
    Github,
    Linkedin,
    Globe,
    ExternalLink,
    ArrowRight,
    Moon,
    Sun,
    MapPin,
    Download,
    Phone,
    CalendarDays,
} from "lucide-react";


// =============== CONTENT (edit me) ===============
const PROFILE = {
    name: "Kristina Kolesnyk",
    role: "Frontend Developer",
    summary:
        "I build clean, accessible, fast UIs with React. I care about performance, a11y, and users experience.",
    location: "Toronto, ON, Canada",
    email: "you@example.com",
    phone: "+1 (000) 000-0000",
    resumeUrl: "#", // your resume link
    socials: {
        github: "https://github.com/your-username",
        linkedin: "https://www.linkedin.com/in/your-username/",
        website: "https://your-domain.com",
    },
};


const SKILLS = [
    "React",
    "JavaScript (ES202x)",
    "TypeScript",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "Node.js",
    "Express",
    "REST APIs",
    "PostgreSQL",
    "Git & GitHub",
    "Testing (Jest)",
    "CI/CD (GitHub Actions)",
    "Accessibility (WCAG)",
    "Performance"
];

const PROJECTS = [
    {
        title: "PlanIt",
        blurb:
            "Планирование поездок и списков с фильтрами, рейтингами и комментариями. React + Express + PostgreSQL.",
        tags: ["React", "Express", "PostgreSQL", "Knex"],
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        demo: "#",
        repo: "#",
    },
    {
        title: "Ranker",
        blurb:
            "Геймифицированные турниры для принятия решений: сравнивай, ранжируй, выбирай.",
        tags: ["React", "Vite", "Zustand"],
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        demo: "#",
        repo: "#",
    },
    {
        title: "BrightBrowser Docs",
        blurb:
            "Техническая документация с geek‑тоном: MDX, поиск, версии, примеры кода.",
        tags: ["Docs", "MDX", "Search"],
        image:
            "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
        demo: "#",
        repo: "#",
    },
];

const EXPERIENCE = [
    {
        role: "NOC & QA",
        company: "Bright Data",
        period: "2023 — 2025",
        points: [
            "Тестирование веб‑фич, отчёты о багах, e2e сценарии.",
            "Автоматизация рутинных проверок и CI‑хуков.",
        ],
    },
    {
        role: "Software Engineer (Projects)",
        company: "Freelance",
        period: "2021 — 2025",
        points: [
            "Проектирование и сборка full‑stack приложений (React/Node/Postgres).",
            "Оптимизация Lighthouse, внедрение a11y и i18n.",
        ],
    },
];

const EDUCATION = [
    {
        place: "Afeka Academic College of Engineering (Tel‑Aviv)",
        program: "B.Sc. Software Engineering (Mobile Systems)",
        period: "2019 — 2024",
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
            "min-h-dvh text-slate-800 bg-slate-50 font-poppins",
            dark && "dark bg-slate-900 text-slate-100"
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
                        className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">{eyebrow}</div>
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
        <div className={cx(
            "rounded-2xl shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-800 bg-white/70 dark:bg-slate-800/60 backdrop-blur p-6",
            className
        )}>
            {children}
        </div>
    );
}

function HeadlineDivider({ text }) {
    return (
        <div className="mb-6 flex items-center gap-6">
            <h2 className="lowercase font-extrabold text-brand text-[48px] sm:text-[60px] lg:text-[75px]">
                {text}
            </h2>
            <div className="h-px flex-1 bg-white/20"></div>
        </div>
    );
}

function Badge({children}) {
    return (
        <span
            className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs leading-5">
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

function PrimaryButton({children, onClick, href, Icon = ArrowRight}) {
    const Comp = href ? "a" : "button";
    const props = href
        ? {href, target: "_blank", rel: "noreferrer"}
        : {onClick};
    return (
        <Comp
            {...props}
            className="inline-flex items-center gap-2 rounded-2xl shadow-sm bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-sm font-medium hover:translate-y-[-1px] hover:shadow md:text-base"
        >
            {children} <Icon className="h-4 w-4"/>
        </Comp>
    );
}

function GhostButton({children, onClick, Icon = ArrowRight}) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:bg-slate-100/60 dark:hover:bg-slate-800"
        >
            {children} <Icon className="h-4 w-4"/>
        </button>
    );
}

// =============== MAIN ===============
export default function Portfolio() {
    const [dark, setDark] = useState(true);
    const sections = useMemo(() => ["home", "about", "work", "projects", "skills", "contact"], []);

    const active = useActiveSection(sections);

    useEffect(() => {
        document.title = `${PROFILE.name} — Portfolio`;
    }, []);

    return (
        <Shell dark={dark} setDark={setDark}>
            <Navbar active={active} onJump={scrollToId} dark={dark} setDark={setDark}/>

            {/* HERO */}
            <Section id="Home">
                <Hero/>
            </Section>

            {/* ABOUT */}
            <Section id="about">
                <div className="mb-6 flex items-center gap-6">
                    <h2 className="lowercase font-extrabold text-brand text-[48px] sm:text-[60px] lg:text-[75px]">
                        about
                    </h2>
                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <Card>
                    <p className="text-slate-300">
                        I’m a frontend engineer focusing on React, clean UI, accessibility, and performance.
                        I enjoy building thoughtful experiences and shipping features end-to-end.
                    </p>
                </Card>
            </Section>

            {/* WORK */}
            <Section id="work">
                <HeadlineDivider text="work" />
                {/* Можно краткое описание как в макете */}
                <p className="max-w-3xl text-slate-300 mb-6">
                    I build, ship, and maintain production UIs with React — with a strong focus on performance,
                    accessibility, and clean design systems.
                </p>

                {/* Используем существующий список опыта */}
                <Experience />
            </Section>

            {/* PROJECTS */}
            <Section id="projects">
                <HeadlineDivider text="projects" />
                <ProjectsCarousel />
            </Section>

            {/* SKILLS */}
            <Section id="skills" title="Skills" eyebrow="Tech stack">
                <SkillsList/>
            </Section>

            {/* CONTACT */}
            <Section id="contact" title="Contact" eyebrow="Get in touch">
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
        {id: "contact", label: "Contact"},
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/70 text-white border-b border-white/10">
            {/* ВАЖНО: relative — чтобы центр-меню позиционировалось от этого контейнера */}
            <div className="relative flex items-center justify-between py-3">
                {/* Left brand */}
                <div onClick={() => onJump("home")} className="cursor-pointer select-none">
                    <div className="text-base font-semibold">Kristina</div>
                </div>

                {/* Centered nav (desktop) — только пункты меню, без переключателя темы */}
                <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => onJump(l.id)}
                            className={cx(
                                "text-[27px] font-medium tracking-normal px-1 transition-colors",
                                active === l.id ? "text-brand" : "text-white/90 hover:text-white"
                            )}
                            aria-current={active === l.id ? "page" : undefined}
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                {/* Right actions (desktop) — GitHub + theme toggle */}
                <div className="hidden md:flex items-center gap-2 ml-auto">
                    <a
                        href={PROFILE.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
                    >
                        <Github className="h-5 w-5"/>
                    </a>
                    <button
                        aria-label="Toggle theme"
                        className="rounded-full p-2 hover:bg-white/10"
                        onClick={() => setDark((d) => !d)}
                    >
                        {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                    </button>
                </div>


                {/* Burger (mobile) */}
                <button
                    className="md:hidden rounded-full p-2 hover:bg-white/10 ml-auto"
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
                                active === l.id
                                    ? "bg-white/10 text-white"
                                    : "hover:bg-white/10"
                            )}
                        >
                            {l.label}
                        </button>
                    ))}
                    <a
                        href={PROFILE.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
                    >
                        <Github className="h-5 w-5"/>
                    </a>
                    <button
                        aria-label="Toggle theme"
                        className="rounded-full p-2 hover:bg-white/10"
                        onClick={() => setDark((d) => !d)}
                    >
                        {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                    </button>
                </div>
            )}
        </header>
    );
}


function Hero() {
    return (
        <div className="grid grid-cols-1 items-center gap-10 py-6 sm:grid-cols-[1.1fr_.9fr]">
            {/* Left: text */}
            <div className="space-y-6">
                <p className="text-[28px] font-medium text-white/90">
                    Hello, I’m {PROFILE.name.split(' ')[0]},
                </p>

                <h1 className="leading-[0.9] text-[42px] sm:text-[60px] lg:text-[100px] font-extrabold text-brand">
                    Frontend<br/>Developer
                </h1>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Contact Me — Poppins ExtraBold 26, белый */}
                    <a
                        href="#contact"
                        className="text-[26px] font-extrabold text-white underline underline-offset-[6px]"
                    >
                        Contact Me
                    </a>

                    {/* Сохранить кнопку «Download Resume» */}
                    <PrimaryButton href={PROFILE.resumeUrl} Icon={Download}>
                        Download Resume
                    </PrimaryButton>
                </div>
            </div>
            {/* Right: portrait */}
            <Card className="relative overflow-hidden bg-slate-800/60">
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop"
                    alt="Portrait"
                    className="h-[420px] w-full rounded-2xl object-cover"
                />
            </Card>
        </div>

    );
}

function ProjectsGrid() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
                <Card key={p.title}>
                    <div className="space-y-3">
                        <div className="overflow-hidden rounded-xl">
                            <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover"/>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">{p.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{p.blurb}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                                <Badge key={t}>{t}</Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <LinkGhost href={p.demo}>Демо</LinkGhost>
                            <LinkGhost href={p.repo} icon={Github}>Код</LinkGhost>
                        </div>
                    </div>
                </Card>
            ))}
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
                            <div className="text-sm text-slate-500 dark:text-slate-400">{e.company}</div>
                            <div className="text-lg font-semibold">{e.role}</div>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{e.period}</div>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                        {e.points.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </Card>
            ))}

            <Section title="Образование">
                <div className="space-y-4">
                    {EDUCATION.map((ed) => (
                        <Card key={ed.place}>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">{ed.place}</div>
                                    <div className="text-lg font-semibold">{ed.program}</div>
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">{ed.period}</div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
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
        node.scrollBy({ left: (dir === "next" ? 1 : -1) * step, behavior: "smooth" });
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
                        <Card className="p-0 overflow-hidden bg-slate-800/60">
                            {/* Прямоугольный превью-блок как в макете */}
                            <div className="aspect-[16/9] w-full overflow-hidden">
                                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                            </div>

                            <div className="p-5 space-y-2">
                                <h3 className="text-xl font-semibold">{p.title}</h3>
                                <p className="text-sm text-slate-400">{p.blurb}</p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {p.tags.map((t) => (
                                        <Badge key={t}>{t}</Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 pt-2">
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
                   h-10 w-10 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur
                   hover:bg-slate-900/90"
            >
                <ArrowRight className="h-5 w-5 -rotate-180" />
            </button>
            <button
                type="button"
                onClick={scroll("next")}
                aria-label="Next"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center
                   h-10 w-10 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur
                   hover:bg-slate-900/90"
            >
                <ArrowRight className="h-5 w-5" />
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
            <Card>
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Связаться напрямую</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${email}`}>
                            <Mail className="h-4 w-4"/> {email}
                        </a>
                        <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.socials.linkedin}
                           target="_blank" rel="noreferrer">
                            <Linkedin className="h-4 w-4"/> LinkedIn
                        </a>
                        <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.socials.github}
                           target="_blank" rel="noreferrer">
                            <Github className="h-4 w-4"/> GitHub
                        </a>
                    </div>
                    <div className="pt-2">
                        <GhostButton onClick={copyEmail}
                                     Icon={Mail}>{copied ? "Скопировано!" : "Скопировать email"}</GhostButton>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Мини‑форма (mailto)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Откроет ваш почтовый клиент с темой и телом письма.
                    </p>
                    <a
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:bg-slate-100/60 dark:hover:bg-slate-800"
                        href={`mailto:${email}?subject=Hi%20${encodeURIComponent(
                            PROFILE.name
                        )}%20—%20давайте%20поговорим&body=Здравствуйте,%20я%20нашёл(а)%20ваше%20портфолио.`}
                    >
                        <Mail className="h-4 w-4"/> Написать письмо
                    </a>
                </div>
            </Card>
        </div>
    );
}

function Social({icon: Icon, href, label}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-100/60 dark:hover:bg-slate-800"
        >
            <Icon className="h-4 w-4"/> {label}
        </a>
    );
}

function Footer() {
    return (
        <footer className="py-10">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <a href={PROFILE.socials.github} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1 hover:underline">
                        <Github className="h-4 w-4"/> GitHub
                    </a>
                    <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1 hover:underline">
                        <Linkedin className="h-4 w-4"/> LinkedIn
                    </a>
                    <a href={PROFILE.socials.website} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1 hover:underline">
                        <Globe className="h-4 w-4"/> Website
                    </a>
                </div>
            </div>
        </footer>
    );
}
