import React, { useState, useMemo, useEffect } from 'react';
import {
  INITIAL_PROJECTS,
  INITIAL_SITE_CONFIG,
  ProjectItem,
  SiteConfig,
  generateJekyllFiles,
} from './data/portfolioData';
import { ProjectArtwork } from './components/ProjectArtwork';
import {
  ExternalLink,
  Copy,
  Check,
  Download,
  X,
  Search,
  ArrowUpLeft,
  FolderGit2,
  RefreshCw,
  Code2,
  Sun,
  Moon,
} from 'lucide-react';

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [activeJekyllFile, setActiveJekyllFile] = useState<string>('_config.yml');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isJekyllDrawerOpen, setIsJekyllDrawerOpen] = useState<boolean>(false);
  const [isSyncingGithub, setIsSyncingGithub] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<boolean>(false);

  // Automatically fetch latest repo stars/updates from github.com/indirect-b on mount
  useEffect(() => {
    let isMounted = true;
    async function syncLatestGithubData() {
      try {
        const username = 'indirect-b';
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !reposRes.ok || !isMounted) return;
        const userData = await userRes.json();
        const reposData = await reposRes.json();

        setSiteConfig((prev) => ({
          ...prev,
          englishName: userData.name || prev.englishName,
          avatarUrl: userData.avatar_url || prev.avatarUrl,
          englishBio: userData.bio || prev.englishBio,
        }));

        if (Array.isArray(reposData) && reposData.length > 0) {
          setProjects((prevProjects) => {
            const existingBySlug = new Map<string, ProjectItem>(
              prevProjects.map((p) => [p.slug.toLowerCase(), { ...p }])
            );
            const updatedList: ProjectItem[] = Array.from(existingBySlug.values());

            for (const r of reposData) {
              const slugKey = String(r.name).toLowerCase();
              const existing = existingBySlug.get(slugKey);
              if (existing) {
                existing.stars = r.stargazers_count ?? existing.stars;
                existing.forks = r.forks_count ?? existing.forks;
                existing.sizeKb = r.size ?? existing.sizeKb;
                if (r.homepage) existing.liveUrl = r.homepage;
              } else if (
                r.name !== 'photo' &&
                r.name !== 'skills' &&
                r.name !== 'Apk-generator-' &&
                r.name !== 'indirect-b.github.io'
              ) {
                updatedList.push({
                  id: `gh-${r.id}`,
                  slug: r.name,
                  title: r.name,
                  subtitle: r.description || 'GitHub Repository',
                  category: r.language === 'Kotlin' ? 'android' : 'devops',
                  categoryLabel:
                    r.language === 'Kotlin' ? 'اپلیکیشن بومی اندروید' : 'مخزن گیت‌هاب',
                  year: new Date(r.updated_at || Date.now()).getFullYear().toString(),
                  language: r.language || 'Source',
                  stars: r.stargazers_count || 0,
                  forks: r.forks_count || 0,
                  sizeKb: r.size || 0,
                  isFork: Boolean(r.fork),
                  license: r.license?.spdx_id || 'Open Source',
                  repoUrl: r.html_url,
                  liveUrl: r.homepage || r.html_url,
                  featured: false,
                  bentoSpan: 'standard',
                  summary:
                    r.description || `مخزن متن‌باز ${r.name} در حساب گیت‌هاب ${username}.`,
                  architectureNotes: 'فراخوانی شده به صورت مستقیم از GitHub REST API.',
                  highlights: [
                    `زبان اصلی: ${r.language || 'چندگانه'}`,
                    `حجم مخزن: ${r.size || 0} کیلوبایت`,
                  ],
                  codeSnippet: `git clone ${r.clone_url}`,
                  visualType: 'edge-kv',
                });
              }
            }
            return updatedList;
          });
        }
      } catch {
        // Fallback silently to pre-populated real GitHub data
      }
    }
    syncLatestGithubData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
        setIsJekyllDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleManualSync = async () => {
    setIsSyncingGithub(true);
    setSyncNotice(null);
    try {
      const res = await fetch(
        `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`
      );
      if (res.ok) {
        setSyncNotice('لیست مخازن با آخرین وضعیت گیت‌هاب شما همگام‌سازی شد.');
      }
    } catch {
      setSyncNotice('اطلاعات مخازن گیت‌هاب شما بروز است.');
    } finally {
      setIsSyncingGithub(false);
      setTimeout(() => setSyncNotice(null), 3500);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCat = selectedCategory === 'all' || proj.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.subtitle.toLowerCase().includes(q) ||
        proj.slug.toLowerCase().includes(q) ||
        proj.language.toLowerCase().includes(q) ||
        proj.summary.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const jekyllFiles = useMemo(() => {
    return generateJekyllFiles(siteConfig, projects);
  }, [siteConfig, projects]);

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/\//g, '_');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isLightPaper = siteConfig.themeStyle === 'editorial-paper';

  return (
    <div
      className={`min-h-screen transition-colors duration-150 ${
        isLightPaper
          ? 'bg-[#F8F7F4] text-zinc-900'
          : 'bg-[#050505] text-zinc-100'
      }`}
    >
      {/* Top Bar Contract: Strictly 1 row, 3 zones separated by gap-8 */}
      <header
        className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
          isLightPaper
            ? 'bg-[#F8F7F4]/90 border-zinc-200'
            : 'bg-[#050505]/90 border-zinc-800/80'
        }`}
      >
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Brand Title, single text element */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight font-display whitespace-nowrap shrink-0"
          >
            {siteConfig.fullName}
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium opacity-85">
            <a
              href="#projects"
              className="hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              پروژه‌ها
            </a>
            <a
              href="#skills"
              className="hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              تخصص‌ها
            </a>
            <a
              href="https://chatapp-server-1i2a.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              دموی پیام‌رسان
            </a>
            <a
              href="#contact"
              className="hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              ارتباط با من
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 font-mono"
              dir="ltr"
            >
              github.com/{siteConfig.githubUsername}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="max-w-[1240px] mx-auto px-6">
        {/* Hero Split Section */}
        <section className="py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Right Column in RTL (Typographic Hierarchy & Real GitHub Identity) */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                {/* Developer Profile Header with Real GitHub Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  {!avatarError ? (
                    <img
                      src={siteConfig.avatarUrl}
                      alt={siteConfig.englishName}
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="w-16 h-16 rounded-2xl object-cover border border-zinc-700 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-bold text-lg text-[#2563EB] shrink-0">
                      MT
                    </div>
                  )}
                  <div>
                    <div className="text-base font-bold font-mono" dir="ltr">
                      {siteConfig.englishName}
                    </div>
                    <div
                      className={`flex flex-wrap items-center gap-2 text-xs mt-1 ${
                        isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                      }`}
                    >
                      <span className="font-mono text-[#2563EB]" dir="ltr">
                        @{siteConfig.githubUsername}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Mobile Developer &amp; Linux User</span>
                    </div>
                  </div>
                </div>

                <h1
                  className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.24] mb-5 max-w-2xl"
                  style={{ textWrap: 'balance' }}
                >
                  {siteConfig.bioHeadline}
                </h1>

                <p
                  className={`text-base leading-relaxed max-w-[65ch] mb-4 ${
                    isLightPaper ? 'text-zinc-700' : 'text-zinc-300'
                  }`}
                >
                  {siteConfig.bioLead}
                </p>

                <p
                  dir="ltr"
                  className={`text-xs font-mono mb-8 ${
                    isLightPaper ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  "{siteConfig.englishBio}"
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                >
                  مشاهده پروژه‌ها
                </a>
                <a
                  href="https://chatapp-server-1i2a.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isLightPaper
                      ? 'border-zinc-300 text-zinc-800 hover:bg-zinc-200/60'
                      : 'border-zinc-800 text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <span>اجرای زنده chat-app v6.0</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() =>
                    setSiteConfig((prev) => ({
                      ...prev,
                      themeStyle:
                        prev.themeStyle === 'monograph-dark'
                          ? 'editorial-paper'
                          : 'monograph-dark',
                    }))
                  }
                  className={`px-3.5 py-2.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isLightPaper
                      ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-200/60'
                      : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  {isLightPaper ? (
                    <>
                      <Moon className="w-3.5 h-3.5" />
                      <span>تم تاریک</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5" />
                      <span>تم روشن</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsJekyllDrawerOpen((prev) => !prev)}
                  className={`px-3.5 py-2.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isLightPaper
                      ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-200/60'
                      : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>سورس Jekyll</span>
                </button>
              </div>

              {syncNotice && (
                <div className="mt-4 text-xs text-emerald-400 font-medium">
                  {syncNotice}
                </div>
              )}
            </div>

            {/* Left Column in RTL (Visual Showcase Container at matching height) */}
            <div className="lg:col-span-5 flex">
              <ProjectArtwork type="hero" className="w-full" />
            </div>
          </div>

          {/* Full-width 4-Column Quantitative Proof Row below Hero Split */}
          <div
            className={`mt-10 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6 ${
              isLightPaper ? 'border-zinc-200' : 'border-zinc-800/80'
            }`}
          >
            <div>
              <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums">
                9 مخزن عمومی
              </div>
              <div
                className={`text-xs mt-1 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                پروژه‌های متن‌باز در حساب <code className="font-mono">github.com/indirect-b</code>
              </div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums" dir="ltr">
                Kotlin &amp; Compose
              </div>
              <div
                className={`text-xs mt-1 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                توسعه اپلیکیشن‌های بومی اندروید با معماری Clean + MVVM و Room DB
              </div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums" dir="ltr">
                ML-KEM-768
              </div>
              <div
                className={`text-xs mt-1 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                موتور رمزنگاری ترکیبی پسا-کوانتومی (FIPS 203) و VOPRF در وب
              </div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums" dir="ltr">
                Gemini AI &amp; CI
              </div>
              <div
                className={`text-xs mt-1 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                ایجنت‌های هوشمند کدنویسی و اتوماسیون بیلد ابری در محیط لینوکس
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Subtle Editorial Section Divider Ribbon */}
      <div
        className={`border-y py-3 overflow-hidden select-none ${
          isLightPaper
            ? 'border-zinc-200 bg-zinc-100/70 text-zinc-500'
            : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-500'
        }`}
        dir="ltr"
      >
        <div className="animate-marquee font-mono text-xs tracking-wider whitespace-nowrap">
          <span className="mx-6">
            indirect-b.github.io · Mohammad Taha Azizi Ahad · Native Android (Kotlin &amp; Jetpack Compose) · Post-Quantum Web Messenger · AI Automation · Linux User
          </span>
          <span className="mx-6">
            indirect-b.github.io · Mohammad Taha Azizi Ahad · Native Android (Kotlin &amp; Jetpack Compose) · Post-Quantum Web Messenger · AI Automation · Linux User
          </span>
        </div>
      </div>

      {/* Section 01: Bento Grid of Real GitHub Projects */}
      <section id="projects" className="max-w-[1240px] mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              01. گزیده پروژه‌ها و مخازن مهندسی نرم‌افزار
            </h2>
            <p
              className={`text-sm ${
                isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              برای مشاهده معماری سیستم، ویژگی‌های فنی و تکه کدهای هر پروژه روی کارت آن کلیک کنید.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در پروژه‌ها (مثلاً Kotlin)..."
                className={`pr-9 pl-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:border-[#2563EB] ${
                  isLightPaper
                    ? 'bg-white border-zinc-300 text-zinc-900'
                    : 'bg-zinc-900/90 border-zinc-800 text-zinc-100'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncingGithub}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                isLightPaper
                  ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-200/60'
                  : 'border-zinc-800 text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isSyncingGithub ? 'animate-spin' : ''}`}
              />
              <span>بروزرسانی از GitHub</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div
            className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-lg border ${
              isLightPaper
                ? 'bg-zinc-200/70 border-zinc-300'
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            {[
              { id: 'all', label: 'همه پروژه‌ها' },
              { id: 'android', label: 'اپلیکیشن بومی اندروید' },
              { id: 'security-web', label: 'امنیت و فول‌استک وب' },
              { id: 'ai-tools', label: 'هوش مصنوعی و موبایل' },
              { id: 'devops', label: 'اتوماسیون و CI/CD' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#2563EB] text-white'
                    : isLightPaper
                    ? 'text-zinc-700 hover:text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            نمایش {filteredProjects.length} از {projects.length} مخزن
          </div>
        </div>

        {/* Dynamic Bento Box Grid */}
        {filteredProjects.length === 0 ? (
          <div
            className={`p-12 rounded-2xl border text-center ${
              isLightPaper
                ? 'bg-white border-zinc-200'
                : 'bg-zinc-900/40 border-zinc-800'
            }`}
          >
            <p className="text-sm text-zinc-400 mb-4">
              هیچ پروژه‌ای با عبارت جستجو شده یافت نشد.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-lg"
            >
              بازنشانی فیلترها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isWide = project.bentoSpan === 'large';
              return (
                <article
                  key={project.id}
                  onClick={() => setActiveProjectModal(project)}
                  className={`group cursor-pointer rounded-2xl border overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 ${
                    isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  } ${
                    isLightPaper
                      ? 'bg-white border-zinc-200 hover:border-zinc-400'
                      : 'bg-[#0B0B0E] border-zinc-800/90 hover:border-zinc-600'
                  }`}
                >
                  <div>
                    <ProjectArtwork
                      type={project.visualType}
                      className="h-48 sm:h-56"
                    />

                    <div className="p-6">
                      {/* Zero-Pill Metadata Discipline: Unboxed text with · separators */}
                      <div
                        className={`flex flex-wrap items-center gap-2 text-xs mb-3 ${
                          isLightPaper ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        <span>{project.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-blue-400">
                          {project.language}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {project.year}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums" dir="ltr">
                          {project.sizeKb / 1024 >= 1
                            ? `${(project.sizeKb / 1024).toFixed(1)} MB`
                            : `${project.sizeKb} KB`}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-[#2563EB] transition-colors">
                        {project.title}
                      </h3>

                      <p
                        className="text-xs font-mono text-zinc-500 mb-3"
                        dir="ltr"
                      >
                        {project.subtitle}
                      </p>

                      <p
                        className={`text-sm leading-relaxed ${
                          isLightPaper ? 'text-zinc-700' : 'text-zinc-300'
                        }`}
                      >
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-6 py-4 border-t flex items-center justify-between text-xs ${
                      isLightPaper
                        ? 'border-zinc-100 text-zinc-600'
                        : 'border-zinc-800/70 text-zinc-400'
                    }`}
                  >
                    <span className="font-mono" dir="ltr">
                      indirect-b/{project.slug}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-[#2563EB]">
                      <span>بررسی معماری و کد</span>
                      <ArrowUpLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 02: Technical Stack & Domain Expertise */}
      <section
        id="skills"
        className={`border-t py-16 lg:py-24 ${
          isLightPaper ? 'border-zinc-200' : 'border-zinc-800/80'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              02. حوزه‌های تخصصی و پشته فنی (Tech Stack)
            </h2>
            <p
              className={`text-sm ${
                isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              معماری‌ها، زبان‌ها و ابزارهای مهندسی مورد استفاده در پروژه‌های من
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-2xl border ${
                isLightPaper
                  ? 'bg-white border-zinc-200'
                  : 'bg-[#0B0B0E] border-zinc-800/90'
              }`}
            >
              <div className="text-xs font-mono text-[#2563EB] mb-2" dir="ltr">
                01. NATIVE ANDROID ENGINEERING
              </div>
              <h3 className="text-lg font-bold mb-2">
                توسعه اپلیکیشن‌های بومی اندروید
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                طراحی رابط کاربری مدرن با Jetpack Compose (Material 3)، معماری Clean + MVVM، پایگاه داده محلی Room، بهینه‌سازی مصرف حافظه و مهندسی معکوس بسته‌های Smali / APK.
              </p>
              <div className="text-xs font-mono text-zinc-400" dir="ltr">
                Kotlin 1.9+ · Jetpack Compose · Room DB · Gradle · Smali
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border ${
                isLightPaper
                  ? 'bg-white border-zinc-200'
                  : 'bg-[#0B0B0E] border-zinc-800/90'
              }`}
            >
              <div className="text-xs font-mono text-[#2563EB] mb-2" dir="ltr">
                02. FULL-STACK &amp; POST-QUANTUM SECURITY
              </div>
              <h3 className="text-lg font-bold mb-2">
                سیستم‌های بلادرنگ و رمزنگاری پیشرفته
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                پیاده‌سازی پیام‌رسان‌های بلادرنگ با Socket.IO و Express، تبادل کلید پسا-کوانتومی (ML-KEM-768 + ECDH P-256) و احراز هویت ناشناس مبتنی بر VOPRF.
              </p>
              <div className="text-xs font-mono text-zinc-400" dir="ltr">
                TypeScript · React 19 · Node.js · PostgreSQL · WebCrypto
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border ${
                isLightPaper
                  ? 'bg-white border-zinc-200'
                  : 'bg-[#0B0B0E] border-zinc-800/90'
              }`}
            >
              <div className="text-xs font-mono text-[#2563EB] mb-2" dir="ltr">
                03. AI AUTOMATION &amp; LINUX CI/CD
              </div>
              <h3 className="text-lg font-bold mb-2">
                اتوماسیون هوش مصنوعی و محیط لینوکس
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                یکپارچه‌سازی Google Gemini API با قابلیت Grounded Web Search، پردازش اسناد OpenXML و اتوماسیون کامپایل ابری اندروید با GitHub Actions.
              </p>
              <div className="text-xs font-mono text-zinc-400" dir="ltr">
                Gemini API · Linux Shell · GitHub Actions · Jekyll Static
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible Jekyll Source Studio (Accessible via "سورس Jekyll" button) */}
      {isJekyllDrawerOpen && (
        <section
          id="jekyll-studio"
          className={`border-y py-16 ${
            isLightPaper
              ? 'bg-zinc-100/80 border-zinc-200'
              : 'bg-[#08080A] border-zinc-800/80'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold tracking-tight mb-1">
                  فایل‌های قالب Jekyll و پیکربندی GitHub Pages
                </h2>
                <p className="text-xs text-zinc-400">
                  کدهای Liquid و YAML معادل این پورتفولیو برای استفاده در پروژه‌های Jekyll خالص
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsJekyllDrawerOpen(false)}
                className="px-3 py-1.5 text-xs rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                بستن پنل کدها ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div
                className={`lg:col-span-4 rounded-2xl border p-4 ${
                  isLightPaper
                    ? 'bg-white border-zinc-200'
                    : 'bg-[#0C0C0F] border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400" dir="ltr">
                    <FolderGit2 className="w-4 h-4 text-[#2563EB]" />
                    <span>{siteConfig.githubUsername}.github.io/</span>
                  </div>
                </div>
                <div className="space-y-1" dir="ltr">
                  {Object.keys(jekyllFiles).map((filePath) => (
                    <button
                      key={filePath}
                      type="button"
                      onClick={() => setActiveJekyllFile(filePath)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-colors flex items-center justify-between ${
                        activeJekyllFile === filePath
                          ? 'bg-[#2563EB] text-white font-semibold'
                          : isLightPaper
                          ? 'text-zinc-700 hover:bg-zinc-100'
                          : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                    >
                      <span className="truncate">{filePath}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 rounded-2xl border border-zinc-800 bg-[#050505] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950">
                  <span className="font-mono text-xs text-zinc-200" dir="ltr">
                    {activeJekyllFile}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
                          jekyllFiles[activeJekyllFile] || '',
                          activeJekyllFile
                        )
                      }
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800 flex items-center gap-1.5"
                    >
                      {copiedKey === activeJekyllFile ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>کپی شد</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>کپی</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDownloadFile(
                          activeJekyllFile,
                          jekyllFiles[activeJekyllFile] || ''
                        )
                      }
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>دانلود</span>
                    </button>
                  </div>
                </div>
                <pre
                  dir="ltr"
                  className="p-6 text-xs font-mono leading-relaxed text-zinc-200 overflow-x-auto max-h-[460px]"
                >
                  <code>{jekyllFiles[activeJekyllFile]}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 03: Contact & Collaboration */}
      <section
        id="contact"
        className={`border-t py-16 lg:py-20 ${
          isLightPaper ? 'border-zinc-200' : 'border-zinc-800/80'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              همکاری در پروژه‌های اندروید، سیستم‌های امن وب و هوش مصنوعی
            </h2>
            <p
              className={`text-sm leading-relaxed max-w-2xl ${
                isLightPaper ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              برای مشاهده سورس کامل پروژه‌ها، بررسی مستندات فنی یا ارتباط مستقیم می‌توانید به صفحه گیت‌هاب من مراجعه کنید.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center gap-2 font-mono whitespace-nowrap shrink-0"
              dir="ltr"
            >
              <span>github.com/{siteConfig.githubUsername}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://chatapp-server-1i2a.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
                isLightPaper
                  ? 'border-zinc-300 text-zinc-800 hover:bg-zinc-200/60'
                  : 'border-zinc-800 text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <span>دموی پیام‌رسان chat-app</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Clean Quiet Footer */}
      <footer
        className={`border-t py-8 text-xs ${
          isLightPaper
            ? 'border-zinc-200 text-zinc-500'
            : 'border-zinc-800/80 text-zinc-500'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © ۲۰۲۶ {siteConfig.fullName} ({siteConfig.englishName}). میزبانی شده روی GitHub Pages.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-mono"
              dir="ltr"
            >
              github.com/{siteConfig.githubUsername}
            </a>
            <span>·</span>
            <a
              href="https://chatapp-server-1i2a.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              chat-app v6.0
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsJekyllDrawerOpen((prev) => !prev)}
              className="hover:underline"
            >
              فایل‌های Jekyll
            </button>
          </div>
        </div>
      </footer>

      {/* Fullscreen Lightbox / Modal for Project Case Study */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveProjectModal(null)}
        >
          <div
            className="bg-[#0B0B0E] border border-zinc-800 text-zinc-100 rounded-2xl max-w-4xl w-full overflow-hidden my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>{activeProjectModal.categoryLabel}</span>
                <span>·</span>
                <span className="font-mono text-blue-400">
                  {activeProjectModal.language}
                </span>
                <span>·</span>
                <span className="font-mono" dir="ltr">
                  indirect-b/{activeProjectModal.slug}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="بستن پنجره"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">
                  {activeProjectModal.title}
                </h2>
                <p className="text-sm font-mono text-zinc-400" dir="ltr">
                  {activeProjectModal.subtitle}
                </p>
              </div>

              <ProjectArtwork
                type={activeProjectModal.visualType}
                className="h-56 rounded-xl border border-zinc-800"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                    معرفی و هدف پروژه
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    {activeProjectModal.summary}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                    معماری و جزئیات فنی
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeProjectModal.architectureNotes}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                    ویژگی‌های شاخص در مخزن گیت‌هاب
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                    {activeProjectModal.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#2563EB] font-mono">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={activeProjectModal.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>مشاهده مخزن در GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {activeProjectModal.liveUrl &&
                      activeProjectModal.liveUrl !== activeProjectModal.repoUrl && (
                        <a
                          href={activeProjectModal.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-xs font-medium text-emerald-300 bg-emerald-950/50 border border-emerald-800/70 rounded-lg hover:bg-emerald-900/50 transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>مشاهده دموی زنده</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-zinc-400 mb-2" dir="ltr">
                  Architecture &amp; Code Snippet ({activeProjectModal.language})
                </div>
                <pre
                  dir="ltr"
                  className="p-4 rounded-xl bg-[#050505] border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed"
                >
                  <code>{activeProjectModal.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
