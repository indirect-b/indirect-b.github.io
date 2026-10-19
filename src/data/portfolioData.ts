export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'android' | 'security-web' | 'ai-tools' | 'devops';
  categoryLabel: string;
  year: string;
  language: string;
  stars: number;
  forks: number;
  sizeKb: number;
  isFork: boolean;
  license: string;
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
  bentoSpan: 'large' | 'standard';
  summary: string;
  architectureNotes: string;
  highlights: string[];
  codeSnippet: string;
  visualType: 'distributed' | 'compiler' | 'vector' | 'persian-nlp' | 'edge-kv' | 'wasm-audio';
}

export interface SiteConfig {
  fullName: string;
  englishName: string;
  roleTitle: string;
  githubUsername: string;
  avatarUrl: string;
  location: string;
  email: string;
  bioHeadline: string;
  bioLead: string;
  englishBio: string;
  themeStyle: 'monograph-dark' | 'editorial-paper';
  jekyllThemeEngine: 'custom-liquid' | 'minima-rtl';
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  fullName: 'محمد طاها عزیزی احد',
  englishName: 'Mohammad Taha Azizi Ahad',
  roleTitle: 'Mobile Developer (Android / Kotlin) & Linux User · AI Automation & Full-Stack',
  githubUsername: 'indirect-b',
  avatarUrl: 'https://avatars.githubusercontent.com/u/251779397?v=4',
  location: 'ایران · Linux / Android Ecosystem',
  email: 'indirect-b@users.noreply.github.com',
  bioHeadline: 'توسعه‌دهنده اپلیکیشن‌های بومی اندروید (Kotlin & Compose)، سیستم‌های رمزنگاری وب و اتوماسیون هوش مصنوعی.',
  bioLead:
    'تمرکز اصلی من بر طراحی و مهندسی نرم‌افزارهای بومی اندروید با معماری Clean + MVVM، بهینه‌سازی مصرف منابع در دستگاه‌های موبایل، پیام‌رسان‌های بلادرنگ با رمزنگاری پسا-کوانتومی و اتوماسیون بیلد در محیط لینوکس و GitHub Actions است.',
  englishBio: 'Mobile Developer & Linux user. Creating native Android apps and exploring AI automation.',
  themeStyle: 'monograph-dark',
  jekyllThemeEngine: 'custom-liquid',
};

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'repo-chat-app',
    slug: 'chat-app',
    title: 'پیام‌رسان بلادرنگ فارسی با رمزنگاری پسا-کوانتومی (chat-app v6.0)',
    subtitle: 'Persian Real-Time Web Messenger — Post-Quantum ML-KEM-768 & VOPRF Edition',
    category: 'security-web',
    categoryLabel: 'امنیت و فول‌استک وب',
    year: '2026',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    sizeKb: 324,
    isFork: false,
    license: 'MIT',
    repoUrl: 'https://github.com/indirect-b/chat-app',
    liveUrl: 'https://chatapp-server-1i2a.onrender.com',
    featured: true,
    bentoSpan: 'large',
    summary:
      'پیام‌رسان وب بلادرنگ سطح سازمانی توسعه یافته با React 19، TypeScript، Express و Socket.IO مجهز به موتور رمزنگاری ترکیبی پسا-کوانتومی (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-bit) و احراز هویت ناشناس مبتنی بر Ristretto255-VOPRF (RFC 9497).',
    architectureNotes:
      'مقاوم در برابر حملات کوانتومی Store Now, Decrypt Later با ترکیب الگوریتم استاندارد NIST CRYSTALS-Kyber و ECDH در زنجیره HKDF-SHA256، مدیریت بسته‌های خارج از نوبت (SkippedMessageKeys) با پاک‌سازی فوری حافظه RAM (Zeroization) و موتور دیتابیس دوگانه (PostgreSQL + ذخیره‌سازی اتمیک دیسک).',
    highlights: [
      'رمزنگاری سرتاسری پسا-کوانتومی ترکیبی (ML-KEM-768 / FIPS 203 + ECDH P-256)',
      'احراز هویت کور شده (Blinded Identity Authentication) بر پایه استاندارد RFC 9497 VOPRF',
      'ماشین وضعیت اتمیک برای مدیریت کلیدهای گروهی (Atomic Group Epoch FSM)',
      'پاک‌سازی آنی کلیدهای موقت در حافظه (zeroizeBuffer) و دیتابیس دوگانه PostgreSQL / Disk Fallback',
    ],
    codeSnippet: `// Post-Quantum Hybrid Key Encapsulation (ML-KEM-768 + ECDH P-256)
export async function deriveHybridRootKey(
  mlKemSharedSecret: Uint8Array,
  ecdhSharedSecret: Uint8Array,
  epochSalt: Uint8Array
): Promise<CryptoKey> {
  const combinedIkM = concatBuffers(mlKemSharedSecret, ecdhSharedSecret);
  const rootKey = await hkdfSha256(combinedIkM, epochSalt, "CHAT_APP_V6_PQ_RATCHET");
  zeroizeBuffer(combinedIkM);
  return rootKey;
}`,
    visualType: 'distributed',
  },
  {
    id: 'repo-ace-code-editor',
    slug: 'ace-code-editor',
    title: 'ویرایشگر کد و دستیار هوشمند اندروید (ACE AI Code Editor)',
    subtitle: 'Native Android AI Studio with Kotlin, Jetpack Compose M3 & Gemini API',
    category: 'ai-tools',
    categoryLabel: 'هوش مصنوعی و موبایل',
    year: '2026',
    language: 'Kotlin',
    stars: 0,
    forks: 0,
    sizeKb: 1039,
    isFork: false,
    license: 'Apache-2.0',
    repoUrl: 'https://github.com/indirect-b/ace-code-editor',
    liveUrl: 'https://github.com/indirect-b/ace-code-editor',
    featured: true,
    bentoSpan: 'standard',
    summary:
      'استودیوی کدنویسی و دستیار هوش مصنوعی بومی اندروید ساخته شده با Kotlin 1.9+، Jetpack Compose (Material 3) و معماری Clean + MVVM همراه با پایگاه داده Room و موتور Google Gemini API.',
    architectureNotes:
      'طراحی شده به عنوان پروژه پژوهشی با تمرکز بر بهینه‌سازی مصرف منابع در دستگاه‌های موبایل، پارسر فوق‌سبک اسناد OpenXML (Word/PDF/Code) بدون کتابخانه‌های سنگین، جستجوی وب زنده با ارجاع به منابع و موتور تقویم سه‌گانه (شمسی، قمری و میلادی).',
    highlights: [
      'معماری بومی اندروید با Kotlin، Jetpack Compose M3، دیتابیس Room و الگوی Clean + MVVM',
      'تحلیل چندفرمتی اسناد (PDF / Word OpenXML / سورس کد) مستقیماً روی موبایل با مصرف حداقل رم',
      'جستجوی زنده وب با ارجاع چندمنبعی به سبک Google AI Overview',
      'موتور محاسبه زمان و تقویم سه‌گانه دقیق (جلالی، هجری قمری و میلادی)',
    ],
    codeSnippet: `@Composable
fun AceCodeEditorScreen(
    viewModel: AceStudioViewModel = hiltViewModel()
) {
    val uiState by viewModel.studioState.collectAsStateWithLifecycle()
    AceMaterial3Theme {
        CodeCanvasWithAiGrounding(
            sourceCode = uiState.activeBuffer,
            citations = uiState.groundedSources,
            onAnalyzeDocument = viewModel::parseOpenXmlStream
        )
    }
}`,
    visualType: 'compiler',
  },
  {
    id: 'repo-noor-quran',
    slug: 'NoorQuran-',
    title: 'سامانه جامع مدیریت کلاس‌های قرآن کریم (نور القرآن)',
    subtitle: 'Native Android LMS & Real-Time Classroom Platform in Kotlin',
    category: 'android',
    categoryLabel: 'اپلیکیشن بومی اندروید',
    year: '2026',
    language: 'Kotlin',
    stars: 0,
    forks: 0,
    sizeKb: 1392,
    isFork: false,
    license: 'MIT',
    repoUrl: 'https://github.com/indirect-b/NoorQuran-',
    liveUrl: 'https://github.com/indirect-b/NoorQuran-',
    featured: true,
    bentoSpan: 'standard',
    summary:
      'اپلیکیشن بومی (Native) اندروید برای مدیریت هوشمند کلاس‌های حفظ، قرائت و مفاهیم قرآن کریم با ارتباط بلادرنگ (Real-time) میان مدیران، اساتید و قرآن‌آموزان.',
    architectureNotes:
      'دارای سیستم کنترل دسترسی مبتنی بر نقش (RBAC) برای سه سطح قرآن‌آموز، استاد و مدیر با کدهای فعال‌سازی داینامیک، سامانه تعریف تکلیف بر اساس صفحات ۱ تا ۶۰۴ مصحف، ضبط و ارسال مستقیم صوت تلاوت و پیام‌رسان داخلی خصوصی و گروهی.',
    highlights: [
      'تفکیک کامل پنل‌های کاربری: قرآن‌آموز (Student)، استاد (Teacher) و مدیر سامانه (Admin)',
      'تعریف تکالیف بر اساس محدوده دقیق صفحات قرآن (۱ تا ۶۰۴) با سوئیچ الزام فایل صوتی',
      'ضبط و پخش صوت قرائت در داخل برنامه همراه با ثبت نمره و بازخورد تجویدی استاد',
      'سیستم پیام‌رسان داخلی دوطرفه و گروه‌های گفتگوی کلاسی بلادرنگ',
    ],
    codeSnippet: `data class QuranAssignment(
    val id: String,
    val startPage: Int, // 1..604
    val endPage: Int,
    val category: AssignmentType, // HIFZ, RECITATION, TAJWEED
    val requireAudioSubmission: Boolean,
    val teacherFeedback: String? = null
) {
    init { require(startPage in 1..604 && endPage >= startPage) }
}`,
    visualType: 'persian-nlp',
  },
  {
    id: 'repo-canada-vpn',
    slug: 'canada-vpn',
    title: 'کلاینت اتصال امن شبکه و مهندسی بسته اندروید (canada-vpn)',
    subtitle: 'Android Network Tunneling Client & Smali/Kotlin Package Architecture',
    category: 'android',
    categoryLabel: 'اپلیکیشن بومی اندروید',
    year: '2026',
    language: 'Smali / Kotlin',
    stars: 0,
    forks: 0,
    sizeKb: 42929,
    isFork: false,
    license: 'GPL-3.0',
    repoUrl: 'https://github.com/indirect-b/canada-vpn',
    liveUrl: 'https://github.com/indirect-b/canada-vpn',
    featured: true,
    bentoSpan: 'large',
    summary:
      'پروژه کلاینت تونلینگ و مدیریت اتصال امن شبکه روی سیستم‌عامل اندروید شامل ساختار کامل منابع، کتابخانه‌های بومی (Native Libs) و کدهای سطح بایت‌کد Smali و Kotlin.',
    architectureNotes:
      'بررسی عمیق ساختار بسته‌های نصبی اندروید (APK)، مدیریت سرویس‌های پس‌زمینه VpnService در AndroidManifest و یکپارچه‌سازی کتابخانه‌های بومی شبکه برای پایداری اتصال.',
    highlights: [
      'ساختار کامل پروژه دیکامپایل و بهینه‌سازی شده با پشتیبانی از چند کلاس DEX (Multi-Dex)',
      'یکپارچه‌سازی لایه‌های Kotlin و کدهای سطح پایین Smali برای مدیریت ترافیک شبکه',
      'تنظیمات اختصاصی AndroidManifest و مدیریت مجوزهای سرویس تونلینگ اندروید',
    ],
    codeSnippet: `<!-- AndroidManifest.xml VPN Service Declaration -->
<service
    android:name=".service.TunnelVpnService"
    android:permission="android.permission.BIND_VPN_SERVICE"
    android:exported="false">
    <intent-filter>
        <action android:name="android.net.VpnService" />
    </intent-filter>
</service>`,
    visualType: 'vector',
  },
  {
    id: 'repo-apk-actions',
    slug: 'apk',
    title: 'اتوماسیون بیلد APK اندروید با GitHub Actions (apk & Apk-generator)',
    subtitle: 'Automated Cloud Android APK CI/CD Build Pipelines on GitHub Actions',
    category: 'devops',
    categoryLabel: 'اتوماسیون و لینوکس',
    year: '2026',
    language: 'GitHub Actions / Shell',
    stars: 0,
    forks: 0,
    sizeKb: 14,
    isFork: true,
    license: 'MIT',
    repoUrl: 'https://github.com/indirect-b/apk',
    liveUrl: 'https://github.com/indirect-b/Apk-generator-',
    featured: false,
    bentoSpan: 'standard',
    summary:
      'مجموعه پایپ‌لاین‌ها و اسکریپت‌های ابری برای کامپایل، بیلد و تولید خودکار فایل‌های نصبی APK از مخازن اندروید با استفاده از زیرساخت لینوکسی GitHub Actions.',
    architectureNotes:
      'راه‌اندازی محیط JDK و Android SDK در کانتینرهای Ubuntu گیت‌هاب، اجرای تسک‌های Gradle و استخراج خودکار آرتیفکت‌های APK بدون نیاز به سیستم محلی سنگین.',
    highlights: [
      'بیلد ابری خودکار پروژه‌های اندرویدی در محیط لینوکس GitHub Actions',
      'مدیریت کش Gradle برای افزایش سرعت کامپایل و تولید خروجی Release/Debug APK',
      'مکمل مخزن Apk-generator برای تولید سریع بسته‌های نصبی اندروید',
    ],
    codeSnippet: `- name: Set up JDK 17 for Android Build
  uses: actions/setup-java@v4
  with:
    distribution: 'temurin'
    java-version: '17'
- name: Build Debug APK via Gradle
  run: chmod +x gradlew && ./gradlew assembleDebug`,
    visualType: 'edge-kv',
  },
  {
    id: 'repo-simpmusic-skills',
    slug: 'SimpMusic',
    title: 'مشارکت‌ها و مخازن فورک شده (SimpMusic & Agent Skills)',
    subtitle: 'Cross-Platform YouTube Music Client & AI Agent Skills Collection',
    category: 'ai-tools',
    categoryLabel: 'هوش مصنوعی و موبایل',
    year: '2026',
    language: 'Kotlin / Markdown',
    stars: 0,
    forks: 0,
    sizeKb: 232413,
    isFork: true,
    license: 'GPL-3.0',
    repoUrl: 'https://github.com/indirect-b/SimpMusic',
    liveUrl: 'https://github.com/indirect-b/skills',
    featured: false,
    bentoSpan: 'standard',
    summary:
      'بررسی و نگهداری فورک‌های متن‌باز شامل کلاینت موسیقی چندسکویی SimpMusic مبتنی بر YouTube Music و مجموعه مهارت‌های ایجنت‌های هوش مصنوعی (Agent Skills).',
    architectureNotes:
      'استفاده از معماری مدرن اندروید برای استریم صوتی در SimpMusic و ساختاردهی ماژولار دستورالعمل‌های ایجنت‌های هوشمند در مخزن skills.',
    highlights: [
      'بررسی معماری پخش‌کننده موسیقی اندروید با پس‌زمینه YouTube Music',
      'گردآوری ساختارهای استاندارد برای اتوماسیون ایجنت‌های هوش مصنوعی در مخزن skills',
    ],
    codeSnippet: `// Repository Reference: github.com/indirect-b
const openSourceForks = [
  { repo: "indirect-b/SimpMusic", domain: "Android Audio Streaming" },
  { repo: "indirect-b/skills", domain: "AI Agent Automation Skills" }
];`,
    visualType: 'wasm-audio',
  },
];

export function generateJekyllFiles(config: SiteConfig, projects: ProjectItem[]): Record<string, string> {
  const configYml = `# ==============================================================================
# Jekyll Configuration for ${config.githubUsername}.github.io
# Owner: ${config.englishName} (${config.fullName})
# ==============================================================================

title: "${config.fullName} | ${config.englishName}"
tagline: "${config.roleTitle}"
description: >-
  ${config.bioLead}
url: "https://${config.githubUsername}.github.io"
baseurl: ""

author:
  name: "${config.fullName}"
  english_name: "${config.englishName}"
  bio: "${config.englishBio}"
  email: "${config.email}"
  github: "${config.githubUsername}"
  avatar: "${config.avatarUrl}"
  location: "${config.location}"

# RTL & Persian Locale Settings
lang: "fa-IR"
direction: "rtl"
timezone: "Asia/Tehran"

# Build settings
markdown: kramdown
highlighter: rouge
permalink: /blog/:year/:month/:day/:title/

# Collections for GitHub Repositories & Projects
collections:
  projects:
    output: true
    permalink: /projects/:name/

defaults:
  - scope:
      path: ""
      type: "projects"
    values:
      layout: "project"
  - scope:
      path: ""
    values:
      layout: "default"

plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
`;

  const projectsDataYml = `# _data/projects.yml
# لیست واقعی پروژه‌های گیت‌هاب ${config.englishName} (github.com/${config.githubUsername})
${projects
  .map(
    (p) => `- slug: "${p.slug}"
  title: "${p.title}"
  subtitle: "${p.subtitle}"
  category: "${p.categoryLabel}"
  year: "${p.year}"
  language: "${p.language}"
  stars: ${p.stars}
  size_kb: ${p.sizeKb}
  is_fork: ${p.isFork}
  license: "${p.license}"
  repo_url: "${p.repoUrl}"
  live_url: "${p.liveUrl}"
  featured: ${p.featured}
  bento_span: "${p.bentoSpan}"
  summary: >-
    ${p.summary}`
  )
  .join('\n\n')}
`;

  const defaultLayoutHtml = `<!DOCTYPE html>
<html lang="{{ site.lang | default: 'fa-IR' }}" dir="{{ site.direction | default: 'rtl' }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% if page.title %}{{ page.title }} · {{ site.title }}{% else %}{{ site.title }}{% endif %}</title>
  {% seo %}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Outfit:wght@600;700&family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>
<body class="theme-${config.themeStyle}">
  <header class="site-header">
    <a href="{{ '/' | relative_url }}" class="brand-wordmark">{{ site.author.name }}</a>
    <nav class="site-nav">
      <a href="#projects">پروژه‌ها</a>
      <a href="#tech-stack">مهارت‌های فنی</a>
      <a href="#jekyll-source">سورس Jekyll</a>
      <a href="#contact">ارتباط</a>
    </nav>
    <a href="https://github.com/{{ site.author.github }}" class="primary-cta" target="_blank" rel="noopener">
      github.com/{{ site.author.github }}
    </a>
  </header>

  <main class="site-main">
    {{ content }}
  </main>

  <footer class="site-footer">
    <div class="footer-container">
      <span>© {{ 'now' | date: "%Y" }} {{ site.author.name }} ({{ site.author.english_name }}). میزبانی شده روی GitHub Pages با Jekyll.</span>
      <a href="https://github.com/{{ site.author.github }}/{{ site.author.github }}.github.io">مخزن گیت‌هاب</a>
    </div>
  </footer>
</body>
</html>`;

  const indexLiquidHtml = `---
layout: default
title: پورتفولیو محمد طاها عزیزی احد | Mobile Developer & Linux User
---

<section class="hero-split">
  <div class="hero-copy">
    <p class="hero-kicker">{{ site.author.english_name }} · @{{ site.author.github }}</p>
    <h1 class="hero-headline">${config.bioHeadline}</h1>
    <p class="hero-lead">{{ site.description }}</p>
    <div class="hero-actions">
      <a href="#projects" class="btn-primary">مشاهده پروژه‌های گیت‌هاب</a>
      <a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener" class="btn-secondary">پروفایل GitHub</a>
    </div>
  </div>
</section>

<section id="projects" class="projects-bento-section">
  <header class="section-header">
    <h2>01. پروژه‌ها و مخازن گیت‌هاب (@{{ site.author.github }})</h2>
    <p>فراخوانی خودکار از فایل <code>_data/projects.yml</code> در Jekyll</p>
  </header>

  <div class="bento-grid">
    {% for project in site.data.projects %}
      <article class="bento-card span-{{ project.bento_span }}">
        <div class="project-meta">
          <span>{{ project.category }}</span>
          <span aria-hidden="true">·</span>
          <span class="mono">{{ project.language }}</span>
          <span aria-hidden="true">·</span>
          <span class="mono">{{ project.year }}</span>
        </div>
        <h3 class="project-title">
          <a href="{{ project.repo_url }}" target="_blank" rel="noopener">{{ project.title }}</a>
        </h3>
        <p class="project-subtitle mono">{{ project.subtitle }}</p>
        <p class="project-summary">{{ project.summary }}</p>
        <div class="project-links">
          <a href="{{ project.repo_url }}" target="_blank" rel="noopener">مشاهده سورس در گیت‌هاب ↗</a>
          {% if project.live_url != project.repo_url %}
            <span aria-hidden="true">·</span>
            <a href="{{ project.live_url }}" target="_blank" rel="noopener">دموی زنده ↗</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>`;

  const firstProj = projects[0] || INITIAL_PROJECTS[0];
  const sampleProjectMarkdown = `---
layout: project
title: "${firstProj.title}"
subtitle: "${firstProj.subtitle}"
category: "${firstProj.categoryLabel}"
year: ${firstProj.year}
language: "${firstProj.language}"
repo_url: "${firstProj.repoUrl}"
live_url: "${firstProj.liveUrl}"
---

## معرفی پروژه (${firstProj.slug})

${firstProj.summary}

## معماری فنی و جزئیات پیاده‌سازی

${firstProj.architectureNotes}

### قابلیت‌های کلیدی

${firstProj.highlights.map((h) => `- ${h}`).join('\n')}

## نمونه کد

\`\`\`typescript
${firstProj.codeSnippet}
\`\`\`
`;

  const githubWorkflowYml = `# .github/workflows/jekyll-gh-pages.yml
name: Deploy ${config.githubUsername}.github.io with Jekyll

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Ruby 3.3
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "\${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const gemfileContent = `source "https://rubygems.org"

gem "jekyll", "~> 4.3.3"
gem "webrick", "~> 1.8"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end
`;

  return {
    '_config.yml': configYml,
    '_data/projects.yml': projectsDataYml,
    '_layouts/default.html': defaultLayoutHtml,
    'index.html': indexLiquidHtml,
    [`_projects/${firstProj.slug}.md`]: sampleProjectMarkdown,
    '.github/workflows/jekyll-gh-pages.yml': githubWorkflowYml,
    Gemfile: gemfileContent,
  };
}
