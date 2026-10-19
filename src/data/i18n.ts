import { ProjectItem, SiteConfig } from './portfolioData';

export type SupportedLocale = 'fa' | 'en' | 'ja' | 'de' | 'ru' | 'zh' | 'fr' | 'es';

export interface LocaleMeta {
  code: SupportedLocale;
  label: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  htmlLang: string;
}

export const SUPPORTED_LOCALES: LocaleMeta[] = [
  { code: 'fa', label: 'FA', nativeName: 'فارسی', dir: 'rtl', htmlLang: 'fa-IR' },
  { code: 'en', label: 'EN', nativeName: 'English', dir: 'ltr', htmlLang: 'en-US' },
  { code: 'ja', label: 'JA', nativeName: '日本語', dir: 'ltr', htmlLang: 'ja-JP' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch', dir: 'ltr', htmlLang: 'de-DE' },
  { code: 'ru', label: 'RU', nativeName: 'Русский', dir: 'ltr', htmlLang: 'ru-RU' },
  { code: 'zh', label: 'ZH', nativeName: '简体中文', dir: 'ltr', htmlLang: 'zh-CN' },
  { code: 'fr', label: 'FR', nativeName: 'Français', dir: 'ltr', htmlLang: 'fr-FR' },
  { code: 'es', label: 'ES', nativeName: 'Español', dir: 'ltr', htmlLang: 'es-ES' },
];

export interface LocalizedProjectText {
  title: string;
  categoryLabel: string;
  summary: string;
  architectureNotes: string;
  highlights: string[];
}

export interface LocaleDictionary {
  fullName: string;
  roleTitle: string;
  location: string;
  bioHeadline: string;
  bioLead: string;
  navProjects: string;
  navSkills: string;
  navLiveMessenger: string;
  navContact: string;
  ctaViewProjects: string;
  ctaLiveChatApp: string;
  ctaThemeDark: string;
  ctaThemeLight: string;
  ctaJekyllSource: string;
  geoDetectedLabel: string;
  kpiReposValue: string;
  kpiReposDesc: string;
  kpiAndroidDesc: string;
  kpiCryptoDesc: string;
  kpiAiDesc: string;
  section1Title: string;
  section1Desc: string;
  searchPlaceholder: string;
  syncGithubBtn: string;
  syncSuccessMsg: string;
  filterAll: string;
  filterAndroid: string;
  filterSecurityWeb: string;
  filterAiTools: string;
  filterDevops: string;
  showingCount: (shown: number, total: number) => string;
  noProjectsFound: string;
  resetFilters: string;
  cardInspectBtn: string;
  section2Title: string;
  section2Desc: string;
  skill1Title: string;
  skill1Desc: string;
  skill2Title: string;
  skill2Desc: string;
  skill3Title: string;
  skill3Desc: string;
  jekyllDrawerTitle: string;
  jekyllDrawerDesc: string;
  closeBtn: string;
  copyBtn: string;
  copiedBtn: string;
  downloadBtn: string;
  contactTitle: string;
  contactDesc: string;
  footerCopyright: string;
  modalOverviewTitle: string;
  modalArchTitle: string;
  modalHighlightsTitle: string;
  modalViewGithub: string;
  modalViewLive: string;
  projects: Record<string, LocalizedProjectText>;
}

export const TRANSLATIONS: Record<SupportedLocale, LocaleDictionary> = {
  fa: {
    fullName: 'محمد طاها عزیزی احد',
    roleTitle: 'توسعه‌دهنده موبایل (Android / Kotlin) و کاربر لینوکس · اتوماسیون هوش مصنوعی',
    location: 'ایران · اکوسیستم لینوکس و اندروید',
    bioHeadline:
      'توسعه‌دهنده اپلیکیشن‌های بومی اندروید (Kotlin & Compose)، سیستم‌های رمزنگاری وب و اتوماسیون هوش مصنوعی.',
    bioLead:
      'تمرکز اصلی من بر طراحی و مهندسی نرم‌افزارهای بومی اندروید با معماری Clean + MVVM، بهینه‌سازی مصرف منابع در دستگاه‌های موبایل، پیام‌رسان‌های بلادرنگ با رمزنگاری پسا-کوانتومی و اتوماسیون بیلد در محیط لینوکس و GitHub Actions است.',
    navProjects: 'پروژه‌ها',
    navSkills: 'تخصص‌ها',
    navLiveMessenger: 'دموی پیام‌رسان',
    navContact: 'ارتباط با من',
    ctaViewProjects: 'مشاهده پروژه‌ها',
    ctaLiveChatApp: 'اجرای زنده chat-app v6.0',
    ctaThemeDark: 'تم تاریک',
    ctaThemeLight: 'تم روشن',
    ctaJekyllSource: 'سورس Jekyll',
    geoDetectedLabel: 'زبان بر اساس IP تنظیم شد',
    kpiReposValue: '9 مخزن عمومی',
    kpiReposDesc: 'پروژه‌های متن‌باز در حساب github.com/indirect-b',
    kpiAndroidDesc: 'توسعه اپلیکیشن‌های بومی اندروید با معماری Clean + MVVM و Room DB',
    kpiCryptoDesc: 'موتور رمزنگاری ترکیبی پسا-کوانتومی (FIPS 203) و VOPRF در وب',
    kpiAiDesc: 'ایجنت‌های هوشمند کدنویسی و اتوماسیون بیلد ابری در محیط لینوکس',
    section1Title: '01. گزیده پروژه‌ها و مخازن مهندسی نرم‌افزار',
    section1Desc: 'برای مشاهده معماری سیستم، ویژگی‌های فنی و تکه کدهای هر پروژه روی کارت آن کلیک کنید.',
    searchPlaceholder: 'جستجو در پروژه‌ها (مثلاً Kotlin)...',
    syncGithubBtn: 'بروزرسانی از GitHub',
    syncSuccessMsg: 'اطلاعات مخازن با آخرین وضعیت گیت‌هاب همگام‌سازی شد.',
    filterAll: 'همه پروژه‌ها',
    filterAndroid: 'اپلیکیشن بومی اندروید',
    filterSecurityWeb: 'امنیت و فول‌استک وب',
    filterAiTools: 'هوش مصنوعی و موبایل',
    filterDevops: 'اتوماسیون و CI/CD',
    showingCount: (shown, total) => `نمایش ${shown} از ${total} مخزن`,
    noProjectsFound: 'هیچ پروژه‌ای با عبارت جستجو شده یافت نشد.',
    resetFilters: 'بازنشانی فیلترها',
    cardInspectBtn: 'بررسی معماری و کد',
    section2Title: '02. حوزه‌های تخصصی و پشته فنی (Tech Stack)',
    section2Desc: 'معماری‌ها، زبان‌ها و ابزارهای مهندسی مورد استفاده در پروژه‌های من',
    skill1Title: 'توسعه اپلیکیشن‌های بومی اندروید',
    skill1Desc:
      'طراحی رابط کاربری مدرن با Jetpack Compose (Material 3)، معماری Clean + MVVM، پایگاه داده محلی Room، بهینه‌سازی مصرف حافظه و مهندسی معکوس بسته‌های Smali / APK.',
    skill2Title: 'سیستم‌های بلادرنگ و رمزنگاری پیشرفته',
    skill2Desc:
      'پیاده‌سازی پیام‌رسان‌های بلادرنگ با Socket.IO و Express، تبادل کلید پسا-کوانتومی (ML-KEM-768 + ECDH P-256) و احراز هویت ناشناس مبتنی بر VOPRF.',
    skill3Title: 'اتوماسیون هوش مصنوعی و محیط لینوکس',
    skill3Desc:
      'یکپارچه‌سازی Google Gemini API با قابلیت Grounded Web Search، پردازش اسناد OpenXML و اتوماسیون کامپایل ابری اندروید با GitHub Actions.',
    jekyllDrawerTitle: 'فایل‌های قالب Jekyll و پیکربندی GitHub Pages',
    jekyllDrawerDesc: 'کدهای Liquid و YAML معادل این پورتفولیو برای استفاده در پروژه‌های Jekyll',
    closeBtn: 'بستن ✕',
    copyBtn: 'کپی',
    copiedBtn: 'کپی شد',
    downloadBtn: 'دانلود',
    contactTitle: 'همکاری در پروژه‌های اندروید، سیستم‌های امن وب و هوش مصنوعی',
    contactDesc:
      'برای مشاهده سورس کامل پروژه‌ها، بررسی مستندات فنی یا ارتباط مستقیم می‌توانید به صفحه گیت‌هاب من مراجعه کنید.',
    footerCopyright: '© ۲۰۲۶ محمد طاها عزیزی احد (Mohammad Taha Azizi Ahad). میزبانی شده روی GitHub Pages.',
    modalOverviewTitle: 'معرفی و هدف پروژه',
    modalArchTitle: 'معماری و جزئیات فنی',
    modalHighlightsTitle: 'ویژگی‌های شاخص در مخزن گیت‌هاب',
    modalViewGithub: 'مشاهده مخزن در GitHub',
    modalViewLive: 'مشاهده دموی زنده',
    projects: {
      'chat-app': {
        title: 'پیام‌رسان بلادرنگ فارسی با رمزنگاری پسا-کوانتومی (chat-app v6.0)',
        categoryLabel: 'امنیت و فول‌استک وب',
        summary:
          'پیام‌رسان وب بلادرنگ سطح سازمانی توسعه یافته با React 19، TypeScript، Express و Socket.IO مجهز به موتور رمزنگاری ترکیبی پسا-کوانتومی (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-bit) و احراز هویت ناشناس مبتنی بر Ristretto255-VOPRF (RFC 9497).',
        architectureNotes:
          'مقاوم در برابر حملات کوانتومی Store Now, Decrypt Later با ترکیب الگوریتم استاندارد NIST CRYSTALS-Kyber و ECDH در زنجیره HKDF-SHA256، مدیریت بسته‌های خارج از نوبت و پاک‌سازی فوری حافظه RAM (Zeroization).',
        highlights: [
          'رمزنگاری سرتاسری پسا-کوانتومی ترکیبی (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'احراز هویت کور شده (Blinded Identity Authentication) بر پایه استاندارد RFC 9497 VOPRF',
          'ماشین وضعیت اتمیک برای مدیریت کلیدهای گروهی (Atomic Group Epoch FSM)',
          'پاک‌سازی آنی کلیدهای موقت در حافظه (zeroizeBuffer) و دیتابیس دوگانه PostgreSQL / Disk Fallback',
        ],
      },
      'ace-code-editor': {
        title: 'ویرایشگر کد و دستیار هوشمند اندروید (ACE AI Code Editor)',
        categoryLabel: 'هوش مصنوعی و موبایل',
        summary:
          'استودیوی کدنویسی و دستیار هوش مصنوعی بومی اندروید ساخته شده با Kotlin 1.9+، Jetpack Compose (Material 3) و معماری Clean + MVVM همراه با پایگاه داده Room و موتور Google Gemini API.',
        architectureNotes:
          'طراحی شده به عنوان پروژه پژوهشی با تمرکز بر بهینه‌سازی مصرف منابع در دستگاه‌های موبایل، پارسر فوق‌سبک اسناد OpenXML (Word/PDF/Code)، جستجوی وب زنده با ارجاع به منابع و موتور تقویم سه‌گانه.',
        highlights: [
          'معماری بومی اندروید با Kotlin، Jetpack Compose M3، دیتابیس Room و الگوی Clean + MVVM',
          'تحلیل چندفرمتی اسناد (PDF / Word OpenXML / سورس کد) مستقیماً روی موبایل با مصرف حداقل رم',
          'جستجوی زنده وب با ارجاع چندمنبعی به سبک Google AI Overview',
          'موتور محاسبه زمان و تقویم سه‌گانه دقیق (جلالی، هجری قمری و میلادی)',
        ],
      },
      'NoorQuran-': {
        title: 'سامانه جامع مدیریت کلاس‌های قرآن کریم (نور القرآن)',
        categoryLabel: 'اپلیکیشن بومی اندروید',
        summary:
          'اپلیکیشن بومی (Native) اندروید برای مدیریت هوشمند کلاس‌های حفظ، قرائت و مفاهیم قرآن کریم با ارتباط بلادرنگ (Real-time) میان مدیران، اساتید و قرآن‌آموزان.',
        architectureNotes:
          'دارای سیستم کنترل دسترسی مبتنی بر نقش (RBAC) برای سه سطح قرآن‌آموز، استاد و مدیر با کدهای فعال‌سازی داینامیک، سامانه تعریف تکلیف بر اساس صفحات ۱ تا ۶۰۴ مصحف و ارسال مستقیم صوت تلاوت.',
        highlights: [
          'تفکیک کامل پنل‌های کاربری: قرآن‌آموز (Student)، استاد (Teacher) و مدیر سامانه (Admin)',
          'تعریف تکالیف بر اساس محدوده دقیق صفحات قرآن (۱ تا ۶۰۴) با سوئیچ الزام فایل صوتی',
          'ضبط و پخش صوت قرائت در داخل برنامه همراه با ثبت نمره و بازخورد تجویدی استاد',
          'سیستم پیام‌رسان داخلی دوطرفه و گروه‌های گفتگوی کلاسی بلادرنگ',
        ],
      },
      'canada-vpn': {
        title: 'کلاینت اتصال امن شبکه و مهندسی بسته اندروید (canada-vpn)',
        categoryLabel: 'اپلیکیشن بومی اندروید',
        summary:
          'پروژه کلاینت تونلینگ و مدیریت اتصال امن شبکه روی سیستم‌عامل اندروید شامل ساختار کامل منابع، کتابخانه‌های بومی (Native Libs) و کدهای سطح بایت‌کد Smali و Kotlin.',
        architectureNotes:
          'بررسی عمیق ساختار بسته‌های نصبی اندروید (APK)، مدیریت سرویس‌های پس‌زمینه VpnService در AndroidManifest و یکپارچه‌سازی کتابخانه‌های بومی شبکه برای پایداری اتصال.',
        highlights: [
          'ساختار کامل پروژه دیکامپایل و بهینه‌سازی شده با پشتیبانی از چند کلاس DEX (Multi-Dex)',
          'یکپارچه‌سازی لایه‌های Kotlin و کدهای سطح پایین Smali برای مدیریت ترافیک شبکه',
          'تنظیمات اختصاصی AndroidManifest و مدیریت مجوزهای سرویس تونلینگ اندروید',
        ],
      },
      apk: {
        title: 'اتوماسیون بیلد APK اندروید با GitHub Actions (apk & Apk-generator)',
        categoryLabel: 'اتوماسیون و لینوکس',
        summary:
          'مجموعه پایپ‌لاین‌ها و اسکریپت‌های ابری برای کامپایل، بیلد و تولید خودکار فایل‌های نصبی APK از مخازن اندروید با استفاده از زیرساخت لینوکسی GitHub Actions.',
        architectureNotes:
          'راه‌اندازی محیط JDK و Android SDK در کانتینرهای Ubuntu گیت‌هاب، اجرای تسک‌های Gradle و استخراج خودکار آرتیفکت‌های APK بدون نیاز به سیستم محلی سنگین.',
        highlights: [
          'بیلد ابری خودکار پروژه‌های اندرویدی در محیط لینوکس GitHub Actions',
          'مدیریت کش Gradle برای افزایش سرعت کامپایل و تولید خروجی Release/Debug APK',
          'مکمل مخزن Apk-generator برای تولید سریع بسته‌های نصبی اندروید',
        ],
      },
      SimpMusic: {
        title: 'مشارکت‌ها و مخازن فورک شده (SimpMusic & Agent Skills)',
        categoryLabel: 'هوش مصنوعی و موبایل',
        summary:
          'بررسی و نگهداری فورک‌های متن‌باز شامل کلاینت موسیقی چندسکویی SimpMusic مبتنی بر YouTube Music و مجموعه مهارت‌های ایجنت‌های هوش مصنوعی (Agent Skills).',
        architectureNotes:
          'استفاده از معماری مدرن اندروید برای استریم صوتی در SimpMusic و ساختاردهی ماژولار دستورالعمل‌های ایجنت‌های هوشمند در مخزن skills.',
        highlights: [
          'بررسی معماری پخش‌کننده موسیقی اندروید با پس‌زمینه YouTube Music',
          'گردآوری ساختارهای استاندارد برای اتوماسیون ایجنت‌های هوش مصنوعی در مخزن skills',
        ],
      },
    },
  },

  en: {
    fullName: 'Mohammad Taha Azizi Ahad',
    roleTitle: 'Mobile Developer (Android / Kotlin) & Linux User · AI Automation & Full-Stack',
    location: 'Linux & Android Ecosystem',
    bioHeadline:
      'Engineering Native Android Applications (Kotlin & Compose), Post-Quantum Web Systems, and AI Automation.',
    bioLead:
      'I specialize in building resource-efficient native Android apps using Clean Architecture + MVVM, real-time web communication secured by Post-Quantum hybrid cryptography, and automated CI/CD build pipelines on Linux and GitHub Actions.',
    navProjects: 'Projects',
    navSkills: 'Tech Stack',
    navLiveMessenger: 'Live Messenger',
    navContact: 'Contact',
    ctaViewProjects: 'Explore Projects',
    ctaLiveChatApp: 'Launch chat-app v6.0',
    ctaThemeDark: 'Dark Theme',
    ctaThemeLight: 'Light Theme',
    ctaJekyllSource: 'Jekyll Source',
    geoDetectedLabel: 'Language set automatically via IP',
    kpiReposValue: '9 Public Repos',
    kpiReposDesc: 'Open-source repositories on github.com/indirect-b',
    kpiAndroidDesc: 'Native Android engineering with Clean + MVVM & Room persistence',
    kpiCryptoDesc: 'Hybrid Post-Quantum Key Encapsulation (FIPS 203) & VOPRF on Web',
    kpiAiDesc: 'Intelligent coding assistants & automated Linux cloud build workflows',
    section1Title: '01. Selected Software Engineering Repositories',
    section1Desc: 'Click any project card to inspect its system architecture, technical highlights, and core code snippets.',
    searchPlaceholder: 'Search repositories (e.g. Kotlin)...',
    syncGithubBtn: 'Sync with GitHub',
    syncSuccessMsg: 'Repositories synchronized with live GitHub API.',
    filterAll: 'All Projects',
    filterAndroid: 'Native Android',
    filterSecurityWeb: 'Security & Full-Stack',
    filterAiTools: 'AI & Mobile Studio',
    filterDevops: 'CI/CD & Linux',
    showingCount: (shown, total) => `Showing ${shown} of ${total} repositories`,
    noProjectsFound: 'No repositories matched your search criteria.',
    resetFilters: 'Reset Filters',
    cardInspectBtn: 'Inspect Architecture',
    section2Title: '02. Core Technical Stack & Engineering Domains',
    section2Desc: 'Languages, frameworks, and architectural patterns deployed across my repositories',
    skill1Title: 'Native Android Engineering',
    skill1Desc:
      'Crafting responsive UIs with Jetpack Compose (Material 3), Clean Architecture + MVVM, Room SQLite persistence, mobile memory optimization, and Smali/APK bytecode analysis.',
    skill2Title: 'Full-Stack & Post-Quantum Security',
    skill2Desc:
      'Architecting real-time Socket.IO & Express systems featuring hybrid Post-Quantum cryptography (ML-KEM-768 + ECDH P-256 Ratchet) and RFC 9497 VOPRF blinded authentication.',
    skill3Title: 'AI Automation & Linux CI/CD',
    skill3Desc:
      'Integrating Google Gemini API with grounded multi-source web search, lightweight on-device OpenXML parsing, and automated cloud APK compilation via GitHub Actions.',
    jekyllDrawerTitle: 'Jekyll Template & GitHub Pages Configuration',
    jekyllDrawerDesc: 'Equivalent Liquid templates and YAML data files for static Jekyll deployment',
    closeBtn: 'Close ✕',
    copyBtn: 'Copy',
    copiedBtn: 'Copied',
    downloadBtn: 'Download',
    contactTitle: 'Open for Collaboration in Android, Secure Web Systems & AI',
    contactDesc:
      'Visit my GitHub profile to explore full source code, review technical documentation, or connect regarding engineering projects.',
    footerCopyright: '© 2026 Mohammad Taha Azizi Ahad. Hosted on GitHub Pages.',
    modalOverviewTitle: 'Project Overview & Objective',
    modalArchTitle: 'System Architecture & Technical Details',
    modalHighlightsTitle: 'Key Engineering Highlights',
    modalViewGithub: 'View on GitHub',
    modalViewLive: 'Launch Live Demo',
    projects: {
      'chat-app': {
        title: 'Post-Quantum Real-Time Web Messenger (chat-app v6.0)',
        categoryLabel: 'Security & Full-Stack Web',
        summary:
          'Enterprise-grade real-time web messenger built with React 19, TypeScript, Express, and Socket.IO featuring a Post-Quantum Hybrid Cryptographic Engine (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-bit) and Ristretto255-VOPRF (RFC 9497) blinded authentication.',
        architectureNotes:
          'Defends against "Store Now, Decrypt Later" quantum attacks by combining NIST-standardized CRYSTALS-Kyber with ECDH via HKDF-SHA256, out-of-order skipped message key caching, immediate RAM zeroization, and a dual-mode PostgreSQL / atomic disk database engine.',
        highlights: [
          'Hybrid Post-Quantum Key Encapsulation (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'Blinded Identity Authentication powered by Ristretto255-VOPRF (RFC 9497)',
          'Atomic Group Epoch State Machine (Group Epoch FSM) for multi-party sessions',
          'Immediate RAM zeroization (zeroizeBuffer) and dual-mode PostgreSQL + atomic disk persistence',
        ],
      },
      'ace-code-editor': {
        title: 'ACE AI Code Editor & Mobile Studio for Android',
        categoryLabel: 'AI & Mobile Engineering',
        summary:
          'State-of-the-art native Android AI code editor and assistant built with Kotlin 1.9+, Jetpack Compose (Material Design 3), Clean Architecture + MVVM, Room Persistence, and Google Gemini API.',
        architectureNotes:
          'Developed as a research initiative demonstrating mobile resource optimization, featuring an ultra-lightweight custom OpenXML document parser (Word/PDF/Code), grounded web search with multi-source attribution, and a tri-calendar engine.',
        highlights: [
          'Native Android architecture with Kotlin, Jetpack Compose M3, Room DB, and Clean + MVVM',
          'Ultra-lightweight on-device multi-format document analysis (PDF, Word OpenXML, Source Code)',
          'Live grounded web search with Google AI Overview-style multi-source citations',
          'Built-in temporal awareness across Jalali, Lunar Hijri, and Gregorian calendars',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — Native Android Classroom & Recitation LMS',
        categoryLabel: 'Native Android App',
        summary:
          'Comprehensive native Android learning management system designed to streamline Quran memorization, recitation, and Tajweed classes with real-time interaction between administrators, teachers, and students.',
        architectureNotes:
          'Implements strict Role-Based Access Control (Student, Teacher, Admin) with dynamic invitation codes, page-accurate assignment tracking (pages 1–604), in-app voice recording/playback for recitation grading, and real-time direct/group messaging.',
        highlights: [
          'Three distinct role-based workspaces: Student Hub, Teacher Panel, and Admin Console',
          'Page-accurate assignment engine covering Mushaf pages 1 to 604 with mandatory audio toggles',
          'Integrated voice recitation recorder, audio player, grading rubric, and Tajweed feedback',
          'Real-time private and classroom group chat messaging system',
        ],
      },
      'canada-vpn': {
        title: 'Android Network Tunneling Client & APK Architecture (canada-vpn)',
        categoryLabel: 'Native Android App',
        summary:
          'Android secure network tunneling client and package engineering repository containing full resource hierarchies, native shared libraries, and Smali/Kotlin bytecode layers.',
        architectureNotes:
          'Deep-dive package architecture analysis integrating Android VpnService lifecycle management, multi-dex bytecode structures, and native C/C++ networking bridges.',
        highlights: [
          'Multi-Dex Android package architecture combining Kotlin and low-level Smali bytecode',
          'Custom AndroidManifest VpnService permission bindings and background tunnel stability',
          'Integrated native shared libraries for low-latency encrypted packet routing',
        ],
      },
      apk: {
        title: 'Automated Cloud Android APK Build Pipeline (apk & Apk-generator)',
        categoryLabel: 'CI/CD & Linux Automation',
        summary:
          'Cloud-native CI/CD workflows and shell automation scripts for compiling, signing, and generating Android APK binaries directly from GitHub repositories using GitHub Actions.',
        architectureNotes:
          'Provisions JDK 17 and Android SDK toolchains inside Ubuntu Linux runners, executes cached Gradle build tasks, and publishes downloadable APK artifacts automatically.',
        highlights: [
          'Zero-local-setup Android APK compilation on Ubuntu Linux GitHub Actions runners',
          'Automated Gradle dependency caching for rapid Debug and Release APK generation',
          'Paired with Apk-generator utilities for streamlined mobile package delivery',
        ],
      },
      SimpMusic: {
        title: 'Open-Source Forks & Research (SimpMusic & AI Agent Skills)',
        categoryLabel: 'AI & Mobile Engineering',
        summary:
          'Curated open-source forks and research repositories including the cross-platform SimpMusic YouTube Music client and modular AI Agent Skills specifications.',
        architectureNotes:
          'Explores background media playback architecture on Android alongside standardized skill definitions for autonomous AI coding agents.',
        highlights: [
          'Android media streaming architecture powered by YouTube Music backend',
          'Modular AI Agent Skill blueprints for developer workflow automation',
        ],
      },
    },
  },

  ja: {
    fullName: 'モハンマド・ターハー・アジジ・アハド',
    roleTitle: 'モバイル開発者 (Android / Kotlin) & Linux ユーザー · AI自動化・フルスタックエンジニア',
    location: 'Linux & Android エコシステム',
    bioHeadline:
      'ネイティブAndroidアプリ開発 (Kotlin & Compose)、耐量子暗号Webシステム、AI自動化の設計と実装。',
    bioLead:
      'Clean Architecture + MVVM に基づく省リソースなネイティブAndroidアプリケーション開発、耐量子ハイブリッド暗号を用いたリアルタイム通信システム、およびLinux環境・GitHub Actionsを活用したCI/CD自動化を専門としています。',
    navProjects: 'プロジェクト',
    navSkills: '技術スタック',
    navLiveMessenger: 'ライブデモ',
    navContact: 'お問い合わせ',
    ctaViewProjects: 'プロジェクト一覧',
    ctaLiveChatApp: 'chat-app v6.0 ライブ起動',
    ctaThemeDark: 'ダークモード',
    ctaThemeLight: 'ライトモード',
    ctaJekyllSource: 'Jekyll ソース',
    geoDetectedLabel: 'IPアドレスに基づき日本語に設定されました',
    kpiReposValue: '9 公開リポジトリ',
    kpiReposDesc: 'github.com/indirect-b で公開中のオープンソースプロジェクト',
    kpiAndroidDesc: 'Clean + MVVM と Room DB を用いたネイティブAndroid設計',
    kpiCryptoDesc: '耐量子ハイブリッド鍵カプセル化 (FIPS 203) と VOPRF 認証',
    kpiAiDesc: 'Gemini API 統合モバイルスタジオと Linux クラウド自動ビルド',
    section1Title: '01. 主要ソフトウェア工学プロジェクト・リポジトリ',
    section1Desc: '各カードをクリックすると、システムアーキテクチャ、技術的特徴、およびコア実装コードを確認できます。',
    searchPlaceholder: 'プロジェクトを検索 (例: Kotlin)...',
    syncGithubBtn: 'GitHubと同期',
    syncSuccessMsg: 'GitHub API から最新のリポジトリ情報を同期しました。',
    filterAll: 'すべて表示',
    filterAndroid: 'ネイティブAndroid',
    filterSecurityWeb: 'セキュリティ & Web',
    filterAiTools: 'AI & モバイル',
    filterDevops: 'CI/CD & Linux',
    showingCount: (shown, total) => `全 ${total} 件中 ${shown} 件のリポジトリを表示`,
    noProjectsFound: '検索条件に一致するプロジェクトが見つかりませんでした。',
    resetFilters: 'フィルターをリセット',
    cardInspectBtn: 'アーキテクチャとコードを見る',
    section2Title: '02. 専門領域と技術スタック (Tech Stack)',
    section2Desc: '研究・開発プロジェクトで採用している言語、フレームワーク、設計手法',
    skill1Title: 'ネイティブAndroidエンジニアリング',
    skill1Desc:
      'Jetpack Compose (Material 3) によるモダンUI構築、Clean Architecture + MVVM、Room 永続化、モバイル端末のリソース最適化、および Smali / APK バイトコード解析。',
    skill2Title: 'フルスタック開発 & 耐量子暗号セキュリティ',
    skill2Desc:
      'Socket.IO と Express によるリアルタイム通信、耐量子ハイブリッド暗号 (ML-KEM-768 + ECDH P-256)、および RFC 9497 VOPRF ブラインド認証の実装。',
    skill3Title: 'AI自動化 & Linux CI/CD パイプライン',
    skill3Desc:
      'Google Gemini API を用いたグラウンディング検索、軽量なオンデバイス OpenXML 文書解析、および GitHub Actions によるクラウド APK 自動ビルド。',
    jekyllDrawerTitle: 'Jekyll テンプレート & GitHub Pages 構成ファイル',
    jekyllDrawerDesc: '静的サイトジェネレーター Jekyll 用の Liquid テンプレートと YAML データ',
    closeBtn: '閉じる ✕',
    copyBtn: 'コピー',
    copiedBtn: 'コピー完了',
    downloadBtn: 'ダウンロード',
    contactTitle: 'Android開発・高セキュリティWebシステム・AI研究に関する連携',
    contactDesc:
      'ソースコード全体や技術ドキュメントの閲覧、研究・開発プロジェクトに関するご連絡は GitHub プロフィールよりお願いいたします。',
    footerCopyright: '© 2026 Mohammad Taha Azizi Ahad. Hosted on GitHub Pages.',
    modalOverviewTitle: 'プロジェクト概要と目的',
    modalArchTitle: 'システムアーキテクチャと技術詳細',
    modalHighlightsTitle: '主な技術的特徴・研究成果',
    modalViewGithub: 'GitHub でリポジトリを見る',
    modalViewLive: 'ライブデモを開く',
    projects: {
      'chat-app': {
        title: '耐量子暗号リアルタイムWebメッセンジャー (chat-app v6.0)',
        categoryLabel: 'セキュリティ & フルスタックWeb',
        summary:
          'React 19、TypeScript、Express、Socket.IO で構築されたエンタープライズ仕様のリアルタイムWebメッセンジャー。耐量子ハイブリッド暗号エンジン (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-bit) と Ristretto255-VOPRF (RFC 9497) ブラインド認証を搭載。',
        architectureNotes:
          'NIST標準の CRYSTALS-Kyber (ML-KEM-768) と古典的 ECDH P-256 を HKDF-SHA256 で結合し、「今収集し後で解読する (Store Now, Decrypt Later)」量子攻撃を防御。順序外パケットの鍵キャッシュ、RAM即時ゼロ化、PostgreSQLとアトミックディスクのデュアルDBエンジンを備えています。',
        highlights: [
          '耐量子ハイブリッド鍵カプセル化 (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'Ristretto255-VOPRF (RFC 9497) に基づく匿名ブラインド本人認証',
          'グループチャット用のアトミック・エポック状態機械 (Group Epoch FSM)',
          '一時鍵のRAM即時ゼロ消去 (zeroizeBuffer) と PostgreSQL / ディスクのデュアル永続化',
        ],
      },
      'ace-code-editor': {
        title: 'ACE AI コードエディタ & モバイルAIスタジオ (MEXT 研究プロジェクト)',
        categoryLabel: 'AI & モバイル工学',
        summary:
          'Kotlin 1.9+、Jetpack Compose (Material Design 3)、Clean Architecture + MVVM、Room データベース、および Google Gemini API を用いてネイティブ構築された次世代 Android AI コードエディタ。日本の文部科学省 (MEXT) 奨学金選考に向けた研究プロジェクト。',
        architectureNotes:
          'リソース制限のあるモバイル端末におけるメモリ最適化と低遅延AIオーケストレーションを実証。外部の重いライブラリに依存しない超軽量 OpenXML パーサー (Word/PDF/コード解析) や、複数ソース引用付きのライブWeb検索グラウンディングを実装しています。',
        highlights: [
          'Kotlin、Jetpack Compose M3、Room、Clean + MVVM による純粋なネイティブAndroid設計',
          'モバイル端末上で高速動作する超軽量マルチフォーマット文書解析 (PDF / Word OpenXML / コード)',
          'Google AI Overview 形式のマルチソース引用を備えたリアルタイムWeb検索グラウンディング',
          'ジャラーリー暦・ヒジュラ太陰暦・グレゴリオ暦の3暦同時計算エンジン',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — ネイティブAndroid リアルタイム教育・課題管理システム',
        categoryLabel: 'ネイティブAndroidアプリ',
        summary:
          '管理者、講師、受講生間のリアルタイムな双方向コミュニケーションと音声課題提出・採点を実現するネイティブAndroid学習管理システム (LMS)。',
        architectureNotes:
          '受講生・講師・管理者の3ロールに基づく厳格なアクセス制御 (RBAC) と動的招待コード、1〜604ページの精密な課題範囲指定、アプリ内での音声録音・再生・添削フィードバック、および個別・グループチャット機能を搭載。',
        highlights: [
          '受講生ハブ・講師パネル・管理者コンソールの3つの専用ワークスペースを分離実装',
          '1〜604ページ単位の精密な課題設定と音声ファイル提出必須化トグル',
          'アプリ内音声録音・ストリーミング再生・採点評価およびフィードバック機能',
          'リアルタイムな1対1プライベートチャットおよびクラス別グループチャット機能',
        ],
      },
      'canada-vpn': {
        title: 'Android セキュアネットワークトンネリング & APK解析 (canada-vpn)',
        categoryLabel: 'ネイティブAndroidアプリ',
        summary:
          'Android OS 上でのセキュアなネットワークトンネリングクライアントおよび Smali / Kotlin バイトコード・ネイティブライブラリの統合アーキテクチャ。',
        architectureNotes:
          'Android APK パッケージ構造の深層解析、AndroidManifest における VpnService バックグラウンド制御、および Multi-Dex クラス階層の最適化。',
        highlights: [
          'Kotlin レイヤーと低水準 Smali バイトコードを統合した Multi-Dex パッケージ構造',
          'Android VpnService 権限バインディングと安定したバックグラウンド通信制御',
          '低遅延パケットルーティングのためのネイティブ共有ライブラリの統合',
        ],
      },
      apk: {
        title: 'GitHub Actions によるクラウド Android APK 自動ビルド (apk)',
        categoryLabel: 'CI/CD & Linux 自動化',
        summary:
          'GitHub Actions の Linux コンテナ環境を用いて、Android リポジトリから自動的に APK バイナリをコンパイル・生成するクラウド CI/CD パイプライン。',
        architectureNotes:
          'Ubuntu ランナー上に JDK 17 と Android SDK を自動構築し、Gradle キャッシュを活用してローカル環境不要で高速に APK アーティファクトを出力します。',
        highlights: [
          'Ubuntu Linux ランナー上での完全自動化されたクラウド Android APK ビルド',
          'Gradle 依存関係キャッシュによる Debug / Release ビルド時間の短縮',
          'Apk-generator リポジトリと連携した迅速なモバイルパッケージ配布ワークフロー',
        ],
      },
      SimpMusic: {
        title: 'オープンソースフォーク & AIエージェント研究 (SimpMusic & skills)',
        categoryLabel: 'AI & モバイル工学',
        summary:
          'YouTube Music バックエンドを活用したクロスプラットフォーム音楽クライアント SimpMusic と、自律型AIエージェントのスキル定義リポジトリ。',
        architectureNotes:
          'Android におけるバックグラウンド音声ストリーミング設計と、開発ワークフロー自動化のためのモジュラーAIスキル設計の探求。',
        highlights: [
          'YouTube Music をバックエンドとする Android メディアストリーミング構造の検証',
          'AIコーディングエージェント向けの標準化されたスキル定義コレクション',
        ],
      },
    },
  },

  de: {
    fullName: 'Mohammad Taha Azizi Ahad',
    roleTitle: 'Mobile-Entwickler (Android / Kotlin) & Linux-Anwender · KI-Automatisierung & Full-Stack',
    location: 'Linux- & Android-Ökosystem',
    bioHeadline:
      'Entwicklung nativer Android-Applikationen (Kotlin & Compose), post-quantensicherer Websysteme und KI-Automatisierung.',
    bioLead:
      'Mein Schwerpunkt liegt auf der ressourcenschonenden Entwicklung nativer Android-Apps mit Clean Architecture + MVVM, Echtzeit-Webkommunikation mit hybrider Post-Quanten-Kryptographie sowie automatisierten CI/CD-Pipelines unter Linux und GitHub Actions.',
    navProjects: 'Projekte',
    navSkills: 'Kompetenzen',
    navLiveMessenger: 'Live-Messenger',
    navContact: 'Kontakt',
    ctaViewProjects: 'Projekte ansehen',
    ctaLiveChatApp: 'chat-app v6.0 starten',
    ctaThemeDark: 'Dunkles Design',
    ctaThemeLight: 'Helles Design',
    ctaJekyllSource: 'Jekyll-Quellcode',
    geoDetectedLabel: 'Sprache automatisch per IP erkannt',
    kpiReposValue: '9 Repositories',
    kpiReposDesc: 'Öffentliche Open-Source-Projekte auf github.com/indirect-b',
    kpiAndroidDesc: 'Native Android-Entwicklung mit Clean + MVVM & Room-Datenbank',
    kpiCryptoDesc: 'Hybride Post-Quanten-Verschlüsselung (FIPS 203) & VOPRF im Web',
    kpiAiDesc: 'Intelligente KI-Code-Assistenten & Linux-Cloud-Build-Pipelines',
    section1Title: '01. Ausgewählte Software-Engineering-Projekte',
    section1Desc: 'Klicken Sie auf eine Projektkarte, um Systemarchitektur, technische Merkmale und Code-Ausschnitte einzusehen.',
    searchPlaceholder: 'Projekte durchsuchen (z. B. Kotlin)...',
    syncGithubBtn: 'Mit GitHub synchronisieren',
    syncSuccessMsg: 'Repositories erfolgreich über die GitHub-API aktualisiert.',
    filterAll: 'Alle Projekte',
    filterAndroid: 'Natives Android',
    filterSecurityWeb: 'Sicherheit & Web',
    filterAiTools: 'KI & Mobile Studio',
    filterDevops: 'CI/CD & Linux',
    showingCount: (shown, total) => `${shown} von ${total} Repositories werden angezeigt`,
    noProjectsFound: 'Keine passenden Projekte für Ihre Suchanfrage gefunden.',
    resetFilters: 'Filter zurücksetzen',
    cardInspectBtn: 'Architektur & Code prüfen',
    section2Title: '02. Technologie-Stack & Fachgebiete',
    section2Desc: 'Sprachen, Frameworks und Architekturmuster in meinen Softwareprojekten',
    skill1Title: 'Native Android-Entwicklung',
    skill1Desc:
      'Moderne Benutzeroberflächen mit Jetpack Compose (Material 3), Clean Architecture + MVVM, lokale Datenhaltung mit Room, Speicheroptimierung sowie Smali/APK-Bytecode-Analyse.',
    skill2Title: 'Full-Stack & Post-Quanten-Sicherheit',
    skill2Desc:
      'Echtzeit-Kommunikationssysteme mit Socket.IO und Express, geschützt durch hybriden Post-Quanten-Schlüsselaustausch (ML-KEM-768 + ECDH P-256) und VOPRF-Authentifizierung.',
    skill3Title: 'KI-Automatisierung & Linux CI/CD',
    skill3Desc:
      'Integration der Google Gemini API mit quellenbasierter Websuche, leichtgewichtiges OpenXML-Dokumenten-Parsing und automatisierte Cloud-APK-Builds via GitHub Actions.',
    jekyllDrawerTitle: 'Jekyll-Vorlagen & GitHub Pages Konfiguration',
    jekyllDrawerDesc: 'Liquid-Templates und YAML-Datendateien für statische Jekyll-Deployments',
    closeBtn: 'Schließen ✕',
    copyBtn: 'Kopieren',
    copiedBtn: 'Kopiert',
    downloadBtn: 'Herunterladen',
    contactTitle: 'Zusammenarbeit in den Bereichen Android, sichere Websysteme & KI',
    contactDesc:
      'Besuchen Sie mein GitHub-Profil für vollständige Quellcodes, technische Dokumentationen oder direkten Austausch.',
    footerCopyright: '© 2026 Mohammad Taha Azizi Ahad. Gehostet auf GitHub Pages.',
    modalOverviewTitle: 'Projektübersicht & Zielsetzung',
    modalArchTitle: 'Systemarchitektur & Technische Details',
    modalHighlightsTitle: 'Wichtige technische Merkmale',
    modalViewGithub: 'Auf GitHub ansehen',
    modalViewLive: 'Live-Demo öffnen',
    projects: {
      'chat-app': {
        title: 'Post-Quanten Echtzeit-Web-Messenger (chat-app v6.0)',
        categoryLabel: 'Sicherheit & Full-Stack-Web',
        summary:
          'Full-Stack-Echtzeit-Messenger auf Basis von React 19, TypeScript, Express und Socket.IO mit hybrider Post-Quanten-Kryptographie (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-Bit) und blinder Ristretto255-VOPRF-Authentifizierung (RFC 9497).',
        architectureNotes:
          'Schützt vor quantengestützten „Store Now, Decrypt Later“-Angriffen durch die Kombination von CRYSTALS-Kyber und ECDH über HKDF-SHA256, Zwischenspeicherung verzögerter Paketschlüssel, sofortiges Überschreiben des Arbeitsspeichers (RAM Zeroization) und eine duale PostgreSQL-/Disk-Datenbank.',
        highlights: [
          'Hybride Post-Quanten-Schlüsselkapselung (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'Anonyme, blinde Identitätsprüfung mittels Ristretto255-VOPRF (RFC 9497)',
          'Atomare Zustandsmaschine für Gruppenschlüssel (Group Epoch FSM)',
          'Sofortige RAM-Bereinigung (zeroizeBuffer) und duale PostgreSQL-/Disk-Persistenz',
        ],
      },
      'ace-code-editor': {
        title: 'ACE KI-Code-Editor & Mobile Studio für Android',
        categoryLabel: 'KI & Mobile Engineering',
        summary:
          'Nativer Android-Code-Editor und KI-Assistent, entwickelt mit Kotlin 1.9+, Jetpack Compose (Material Design 3), Clean Architecture + MVVM, Room-Persistenz und der Google Gemini API.',
        architectureNotes:
          'Konzipiert als Forschungsprojekt zur Ressourcenoptimierung auf Mobilgeräten mit einem extrem leichtgewichtigen OpenXML-Parser (Word/PDF/Code), quellenbasierter Echtzeit-Websuche und einem Dreifach-Kalendersystem.',
        highlights: [
          'Saubere Android-Architektur mit Kotlin, Jetpack Compose M3, Room DB und Clean + MVVM',
          'Speichereffiziente Dokumentenanalyse direkt auf dem Gerät (PDF, Word OpenXML, Quellcode)',
          'Echtzeit-Websuche mit verifizierten Quellenangaben nach dem Vorbild von Google AI Overview',
          'Integrierte Kalender-Engine für den persischen, islamischen und gregorianischen Kalender',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — Natives Android-Lernmanagementsystem (LMS)',
        categoryLabel: 'Native Android-App',
        summary:
          'Umfassende native Android-Anwendung zur Verwaltung von Unterrichtsklassen, Hausaufgaben und Sprachaufnahmen mit Echtzeit-Kommunikation zwischen Administratoren, Lehrkräften und Schülern.',
        architectureNotes:
          'Implementiert rollenbasierte Zugriffskontrolle (Schüler, Lehrer, Admin) mit dynamischen Einladungscodes, seitengenauer Aufgabenverwaltung (Seiten 1–604), integrierter Audioaufnahme und Echtzeit-Gruppenchats.',
        highlights: [
          'Drei getrennte Arbeitsbereiche für Schüler, Lehrkräfte und Systemadministratoren',
          'Seitengenaue Aufgabenstellung (Seiten 1 bis 604) mit optionaler Pflicht zur Audioabgabe',
          'Integrierter Sprachrekorder, Audio-Player sowie Benotungs- und Feedbacksystem',
          'Interner Echtzeit-Messenger für Einzel- und Klassengruppenchats',
        ],
      },
      'canada-vpn': {
        title: 'Android-Netzwerktunnel-Client & APK-Architektur (canada-vpn)',
        categoryLabel: 'Native Android-App',
        summary:
          'Netzwerktunnel-Client für Android inklusive vollständiger Ressourcenstruktur, nativer Bibliotheken und Smali-/Kotlin-Bytecode-Schichten.',
        architectureNotes:
          'Tiefgehende Analyse von Android-APK-Paketen, Hintergrundverwaltung des Android VpnService und Integration nativer Netzwerktreiber.',
        highlights: [
          'Multi-Dex-Paketarchitektur mit einer Kombination aus Kotlin und Smali-Bytecode',
          'Spezifische VpnService-Deklarationen im AndroidManifest für stabile Tunnelverbindungen',
          'Einbindung nativer Shared Libraries für schnelle Paketweiterleitung',
        ],
      },
      apk: {
        title: 'Automatisierte Cloud-APK-Build-Pipeline mit GitHub Actions (apk)',
        categoryLabel: 'CI/CD & Linux-Automatisierung',
        summary:
          'Cloud-basierte CI/CD-Workflows zur vollautomatischen Kompilierung und Bereitstellung von Android-APK-Dateien direkt aus GitHub-Repositories über Linux-Runner.',
        architectureNotes:
          'Richtet JDK 17 und das Android SDK in Ubuntu-Containern ein, nutzt Gradle-Caching und erstellt automatisch herunterladbare APK-Artefakte.',
        highlights: [
          'Vollautomatische Android-APK-Erstellung auf Ubuntu-Linux-Runnern ohne lokales Setup',
          'Gradle-Abhängigkeitscaching für schnelle Debug- und Release-Builds',
          'Kombiniert mit Apk-generator zur schnellen Bereitstellung mobiler Pakete',
        ],
      },
      SimpMusic: {
        title: 'Open-Source-Forks & KI-Agenten-Skills (SimpMusic & skills)',
        categoryLabel: 'KI & Mobile Engineering',
        summary:
          'Gepflegte Open-Source-Forks, darunter der plattformübergreifende YouTube-Music-Client SimpMusic sowie modulare Skill-Definitionen für autonome KI-Agenten.',
        architectureNotes:
          'Untersucht moderne Audio-Streaming-Architekturen unter Android sowie standardisierte Befehlssätze für KI-gestützte Entwicklungsprozesse.',
        highlights: [
          'Analyse von Android-Hintergrund-Streaming mit YouTube-Music-Anbindung',
          'Strukturierte Sammlung von Automatisierungs-Skills für KI-Agenten',
        ],
      },
    },
  },

  ru: {
    fullName: 'Мохаммад Таха Азизи Ахад',
    roleTitle: 'Мобильный разработчик (Android / Kotlin) и пользователь Linux · ИИ-автоматизация и Full-Stack',
    location: 'Экосистема Linux и Android',
    bioHeadline:
      'Разработка нативных Android-приложений (Kotlin & Compose), защищённых постквантовых веб-систем и автоматизация на базе ИИ.',
    bioLead:
      'Я специализируюсь на создании энергоэффективных нативных Android-приложений с архитектурой Clean + MVVM, систем обмена сообщениями в реальном времени с гибридной постквантовой криптографией, а также на автоматизации сборки CI/CD в среде Linux и GitHub Actions.',
    navProjects: 'Проекты',
    navSkills: 'Стек технологий',
    navLiveMessenger: 'Демо мессенджера',
    navContact: 'Контакты',
    ctaViewProjects: 'Смотреть проекты',
    ctaLiveChatApp: 'Запустить chat-app v6.0',
    ctaThemeDark: 'Тёмная тема',
    ctaThemeLight: 'Светлая тема',
    ctaJekyllSource: 'Исходники Jekyll',
    geoDetectedLabel: 'Язык определён автоматически по IP',
    kpiReposValue: '9 репозиториев',
    kpiReposDesc: 'Открытые проекты в профиле github.com/indirect-b',
    kpiAndroidDesc: 'Нативная разработка под Android на базе Clean + MVVM и Room DB',
    kpiCryptoDesc: 'Гибридное постквантовое шифрование (FIPS 203) и протокол VOPRF',
    kpiAiDesc: 'Интеллектуальные ИИ-ассистенты и облачная сборка APK в Linux',
    section1Title: '01. Избранные инженерные проекты и репозитории',
    section1Desc: 'Нажмите на карточку любого проекта, чтобы изучить архитектуру системы, технические особенности и примеры кода.',
    searchPlaceholder: 'Поиск по проектам (например, Kotlin)...',
    syncGithubBtn: 'Синхронизировать с GitHub',
    syncSuccessMsg: 'Данные репозиториев успешно обновлены через GitHub API.',
    filterAll: 'Все проекты',
    filterAndroid: 'Нативный Android',
    filterSecurityWeb: 'Безопасность и Веб',
    filterAiTools: 'ИИ и Мобильная среда',
    filterDevops: 'CI/CD и Linux',
    showingCount: (shown, total) => `Показано ${shown} из ${total} репозиториев`,
    noProjectsFound: 'По вашему запросу проектов не найдено.',
    resetFilters: 'Сбросить фильтры',
    cardInspectBtn: 'Архитектура и код',
    section2Title: '02. Технический стек и ключевые компетенции',
    section2Desc: 'Языки программирования, фреймворки и архитектурные паттерны, применяемые в моих разработках',
    skill1Title: 'Нативная разработка под Android',
    skill1Desc:
      'Проектирование современного интерфейса на Jetpack Compose (Material 3), архитектура Clean + MVVM, локальная СУБД Room, оптимизация памяти и анализ байт-кода Smali / APK.',
    skill2Title: 'Full-Stack и постквантовая криптография',
    skill2Desc:
      'Разработка мессенджеров реального времени на Socket.IO и Express с гибридным постквантовым обменом ключами (ML-KEM-768 + ECDH P-256) и слепой аутентификацией VOPRF.',
    skill3Title: 'ИИ-автоматизация и Linux CI/CD',
    skill3Desc:
      'Интеграция Google Gemini API с веб-поиском и проверкой источников, легковесный парсинг документов OpenXML и автоматическая облачная сборка APK через GitHub Actions.',
    jekyllDrawerTitle: 'Шаблоны Jekyll и конфигурация GitHub Pages',
    jekyllDrawerDesc: 'Шаблоны Liquid и YAML-файлы данных для статического развёртывания на Jekyll',
    closeBtn: 'Закрыть ✕',
    copyBtn: 'Копировать',
    copiedBtn: 'Скопировано',
    downloadBtn: 'Скачать',
    contactTitle: 'Открыт к сотрудничеству в сфере Android, защищённых веб-систем и ИИ',
    contactDesc:
      'Перейдите в мой профиль GitHub для просмотра полного исходного кода, технической документации или прямой связи.',
    footerCopyright: '© 2026 Мохаммад Таха Азизи Ахад (Mohammad Taha Azizi Ahad). Размещено на GitHub Pages.',
    modalOverviewTitle: 'Описание и цель проекта',
    modalArchTitle: 'Системная архитектура и технические детали',
    modalHighlightsTitle: 'Ключевые инженерные особенности',
    modalViewGithub: 'Открыть на GitHub',
    modalViewLive: 'Открыть живое демо',
    projects: {
      'chat-app': {
        title: 'Веб-мессенджер с постквантовым шифрованием (chat-app v6.0)',
        categoryLabel: 'Безопасность и Full-Stack Веб',
        summary:
          'Полнофункциональный веб-мессенджер реального времени на React 19, TypeScript, Express и Socket.IO, оснащённый гибридным постквантовым криптографическим движком (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-bit) и слепой аутентификацией Ristretto255-VOPRF (RFC 9497).',
        architectureNotes:
          'Защищает от квантовых атак типа «сохрани сейчас — расшифруй потом» за счёт объединения алгоритма CRYSTALS-Kyber и классического ECDH через HKDF-SHA256, кэширования ключей при нарушении порядка пакетов, мгновенного зануления ключей в ОЗУ и двухрежимной БД (PostgreSQL + атомарный диск).',
        highlights: [
          'Гибридная постквантовая инкапсуляция ключей (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'Анонимная слепая аутентификация на базе стандарта Ristretto255-VOPRF (RFC 9497)',
          'Атомарный конечный автомат управления групповыми эпохами ключей (Group Epoch FSM)',
          'Мгновенная очистка ключей в оперативной памяти (zeroizeBuffer) и отказоустойчивая БД',
        ],
      },
      'ace-code-editor': {
        title: 'ACE AI Code Editor — Мобильная ИИ-студия кода для Android',
        categoryLabel: 'ИИ и Мобильная разработка',
        summary:
          'Современный нативный редактор кода и ИИ-ассистент для Android, созданный на Kotlin 1.9+, Jetpack Compose (Material Design 3), Clean Architecture + MVVM, СУБД Room и Google Gemini API.',
        architectureNotes:
          'Исследовательский проект, демонстрирующий оптимизацию ресурсов мобильных устройств: включает сверхлёгкий парсер документов OpenXML (Word/PDF/код), живой веб-поиск с указанием источников и движок трёх календарей.',
        highlights: [
          'Нативная архитектура Android на базе Kotlin, Jetpack Compose M3, Room и Clean + MVVM',
          'Сверхлёгкий анализ документов (PDF, Word OpenXML, исходный код) прямо на устройстве',
          'Живой веб-поиск с мульти-источниковым цитированием в стиле Google AI Overview',
          'Встроенная поддержка солнечного джалали, лунного хиджри и григорианского календарей',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — Нативная Android-платформа управления обучением (LMS)',
        categoryLabel: 'Нативное Android-приложение',
        summary:
          'Комплексное нативное Android-приложение для управления учебными классами, проверки домашних заданий и аудиозаписей чтения с взаимодействием в реальном времени между администраторами, преподавателями и учениками.',
        architectureNotes:
          'Реализует ролевую модель доступа (Ученик, Преподаватель, Администратор) с динамическими кодами активации, привязку заданий к страницам (1–604), запись и воспроизведение голоса внутри приложения, а также личные и групповые чаты.',
        highlights: [
          'Три специализированные рабочие панели: кабинет ученика, панель учителя и консоль админа',
          'Назначение заданий по точному диапазону страниц (от 1 до 604) с контролем аудио-ответа',
          'Встроенный диктофон, аудиоплеер, система выставления оценок и текстовых комментариев',
          'Внутренний мессенджер для личных сообщений и групповых чатов учебных классов',
        ],
      },
      'canada-vpn': {
        title: 'Клиент сетевого туннелирования Android и архитектура APK (canada-vpn)',
        categoryLabel: 'Нативное Android-приложение',
        summary:
          'Клиент защищённого сетевого туннелирования для ОС Android, включающий полную иерархию ресурсов, нативные библиотеки и слои байт-кода Smali и Kotlin.',
        architectureNotes:
          'Глубокая проработка структуры пакетов Android APK, управление фоновым сервисом VpnService в AndroidManifest и интеграция нативных сетевых библиотек.',
        highlights: [
          'Архитектура Multi-Dex пакета, сочетающая код Kotlin и низкоуровневый байт-код Smali',
          'Конфигурация разрешений Android VpnService для стабильного удержания соединения',
          'Интеграция нативных библиотек для высокоскоростной маршрутизации трафика',
        ],
      },
      apk: {
        title: 'Облачная автоматизация сборки Android APK в GitHub Actions (apk)',
        categoryLabel: 'CI/CD и автоматизация Linux',
        summary:
          'Конвейеры CI/CD и скрипты автоматизации для облачной компиляции и сборки установочных APK-файлов напрямую из Android-репозиториев с помощью GitHub Actions.',
        architectureNotes:
          'Автоматически разворачивает JDK 17 и Android SDK в контейнерах Ubuntu Linux, кэширует зависимости Gradle и публикует готовые артефакты APK.',
        highlights: [
          'Облачная сборка Android APK на Linux-раннерах GitHub Actions без локальной настройки',
          'Кэширование Gradle для ускорения генерации Debug и Release сборок',
          'Интеграция с инструментами Apk-generator для быстрой доставки пакетов',
        ],
      },
      SimpMusic: {
        title: 'Открытые форки и навыки ИИ-агентов (SimpMusic & skills)',
        categoryLabel: 'ИИ и Мобильная разработка',
        summary:
          'Поддержка открытых репозиториев, включая кроссплатформенный музыкальный клиент SimpMusic на базе YouTube Music и коллекцию модульных навыков для ИИ-агентов (Agent Skills).',
        architectureNotes:
          'Исследование архитектуры фонового аудио-стриминга в Android и стандартизированных инструкций для автономных ИИ-помощников разработчика.',
        highlights: [
          'Изучение архитектуры потокового воспроизведения аудио на базе YouTube Music',
          'Модульные шаблоны навыков для автоматизации задач с помощью ИИ-агентов',
        ],
      },
    },
  },

  zh: {
    fullName: '穆罕默德·塔哈·阿齐兹·阿哈德',
    roleTitle: '移动应用开发者 (Android / Kotlin) & Linux 用户 · AI 自动化与全栈工程',
    location: 'Linux 与 Android 生态系统',
    bioHeadline: '专注于原生 Android 应用开发 (Kotlin & Compose)、后量子加密 Web 系统与 AI 自动化工程。',
    bioLead:
      '我致力于采用 Clean Architecture + MVVM 架构开发低资源占用的原生 Android 应用、构建基于混合后量子密码学的实时 Web 通信系统，以及基于 Linux 与 GitHub Actions 的云端 CI/CD 自动构建流水线。',
    navProjects: '开源项目',
    navSkills: '技术栈',
    navLiveMessenger: '在线演示',
    navContact: '联系合作',
    ctaViewProjects: '浏览项目',
    ctaLiveChatApp: '启动 chat-app v6.0',
    ctaThemeDark: '深色模式',
    ctaThemeLight: '浅色模式',
    ctaJekyllSource: 'Jekyll 源码',
    geoDetectedLabel: '已根据 IP 自动切换为简体中文',
    kpiReposValue: '9 个公开仓库',
    kpiReposDesc: '托管于 github.com/indirect-b 的开源工程项目',
    kpiAndroidDesc: '基于 Clean + MVVM 与 Room 数据库的原生 Android 架构',
    kpiCryptoDesc: '混合后量子密钥封装 (FIPS 203) 与 VOPRF 盲签名认证',
    kpiAiDesc: '集成 Gemini API 的移动端智能编程助手与 Linux 云端编译',
    section1Title: '01. 精选软件工程项目与开源仓库',
    section1Desc: '点击任意项目卡片即可查看完整的系统架构、关键技术指标与核心代码片段。',
    searchPlaceholder: '搜索项目或编程语言 (如 Kotlin)...',
    syncGithubBtn: '同步 GitHub 数据',
    syncSuccessMsg: '已通过 GitHub API 同步最新仓库状态。',
    filterAll: '全部项目',
    filterAndroid: '原生 Android',
    filterSecurityWeb: '安全与全栈 Web',
    filterAiTools: 'AI 与移动工具',
    filterDevops: 'CI/CD 与 Linux',
    showingCount: (shown, total) => `正在显示 ${shown} / ${total} 个仓库`,
    noProjectsFound: '未找到符合搜索条件的项目。',
    resetFilters: '重置筛选',
    cardInspectBtn: '查看架构与代码',
    section2Title: '02. 核心技术栈与工程领域 (Tech Stack)',
    section2Desc: '在我的开源仓库中广泛应用的编程语言、框架与系统架构模式',
    skill1Title: '原生 Android 软件工程',
    skill1Desc:
      '使用 Jetpack Compose (Material 3) 构建现代响应式界面，践行 Clean + MVVM 架构与 Room 本地持久化，专注于移动端内存优化与 Smali / APK 字节码分析。',
    skill2Title: '全栈开发与后量子密码安全',
    skill2Desc:
      '基于 Socket.IO 与 Express 构建实时通信引擎，结合混合后量子密钥交换 (ML-KEM-768 + ECDH P-256) 与 RFC 9497 VOPRF 匿名身份认证。',
    skill3Title: 'AI 自动化与 Linux CI/CD',
    skill3Desc:
      '深度集成 Google Gemini API 实时联网搜索溯源、轻量级设备端 OpenXML 文档解析，以及基于 GitHub Actions 的云端 APK 自动化构建。',
    jekyllDrawerTitle: 'Jekyll 模板源码与 GitHub Pages 配置文件',
    jekyllDrawerDesc: '用于静态部署的 Liquid 模板文件与 YAML 项目数据结构',
    closeBtn: '关闭 ✕',
    copyBtn: '复制',
    copiedBtn: '已复制',
    downloadBtn: '下载',
    contactTitle: '欢迎在原生 Android 开发、高安全 Web 系统与 AI 领域展开合作',
    contactDesc: '欢迎访问我的 GitHub 主页查看完整源代码、技术文档或直接与我取得联系。',
    footerCopyright: '© 2026 Mohammad Taha Azizi Ahad. 托管于 GitHub Pages。',
    modalOverviewTitle: '项目背景与核心目标',
    modalArchTitle: '系统架构与技术细节',
    modalHighlightsTitle: '核心工程亮点',
    modalViewGithub: '在 GitHub 上查看',
    modalViewLive: '打开在线演示',
    projects: {
      'chat-app': {
        title: '后量子加密实时 Web 即时通讯系统 (chat-app v6.0)',
        categoryLabel: '安全与全栈 Web',
        summary:
          '基于 React 19、TypeScript、Express 与 Socket.IO 构建的企业级实时通讯系统，内置混合后量子加密引擎 (ML-KEM-768 + ECDH P-256 棘轮 + AES-GCM 256-bit) 与 Ristretto255-VOPRF (RFC 9497) 盲化身份认证。',
        architectureNotes:
          '通过将 NIST 标准 CRYSTALS-Kyber 与传统 ECDH 在 HKDF-SHA256 链中结合，有效抵御量子计算“先窃取后解密”攻击；支持乱序数据包密钥缓存、内存密钥即时归零 (RAM Zeroization) 以及 PostgreSQL + 原子磁盘双模数据库。',
        highlights: [
          '混合后量子密钥封装机制 (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          '基于 Ristretto255-VOPRF (RFC 9497) 标准的零知识盲化身份认证',
          '用于群组会话密钥安全演进的原子群组纪元状态机 (Group Epoch FSM)',
          '临时密钥内存即时清零 (zeroizeBuffer) 与 PostgreSQL / 磁盘双模持久化',
        ],
      },
      'ace-code-editor': {
        title: 'ACE AI 代码编辑器与移动端智能开发工作室',
        categoryLabel: 'AI 与移动工程',
        summary:
          '使用 Kotlin 1.9+、Jetpack Compose (Material Design 3)、Clean Architecture + MVVM、Room 数据库以及 Google Gemini API 原生构建的 Android AI 代码编辑器与助手。',
        architectureNotes:
          '作为针对移动受限设备资源优化的研究项目，内置无需笨重第三方库的超轻量级 OpenXML 文档解析器 (支持 Word/PDF/源码)、带多源引用的实时联网搜索，以及三历法时间引擎。',
        highlights: [
          '采用 Kotlin、Jetpack Compose M3、Room 与 Clean + MVVM 的纯正原生 Android 架构',
          '低内存占用的设备端多格式文档直接解析 (PDF / Word OpenXML / 源代码)',
          '具备 Google AI Overview 风格多信源溯源能力的实时联网搜索',
          '内置精准的波斯历、伊斯兰阴历与公历三历法转换引擎',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — 原生 Android 实时课堂与语音作业管理系统',
        categoryLabel: '原生 Android 应用',
        summary:
          '专为背诵、诵读教学打造的原生 Android 学习管理系统 (LMS)，实现管理员、教师与学生之间的实时互动与语音作业批改。',
        architectureNotes:
          '实现了严格的三级基于角色的访问控制 (学生、教师、管理员) 与动态邀请码验证，支持精确到第 1 至 604 页的作业布置、应用内直接录音与播放评分，以及实时私聊与班级群聊。',
        highlights: [
          '学生中心、教师工作台与管理员控制台三大角色工作区完全解耦',
          '精确涵盖第 1 至 604 页的作业布置系统，支持必交音频附件开关',
          '应用内原生音频录制、流式回放、打分评级与语音纠正反馈',
          '内置实时一对一私信与班级群组即时通讯系统',
        ],
      },
      'canada-vpn': {
        title: 'Android 安全网络隧道客户端与 APK 架构工程 (canada-vpn)',
        categoryLabel: '原生 Android 应用',
        summary:
          'Android 平台安全网络隧道客户端项目，包含完整的资源目录结构、原生动态链接库 (Native Libs) 以及 Smali 与 Kotlin 字节码层。',
        architectureNotes:
          '深入剖析 Android APK 安装包结构、AndroidManifest 中的 VpnService 后台服务生命周期管理以及底层网络库集成。',
        highlights: [
          '融合 Kotlin 逻辑层与底层 Smali 字节码的 Multi-Dex 包架构设计',
          '定制化 AndroidManifest VpnService 权限绑定与高稳定性后台连接保持',
          '集成原生 C/C++ 动态库以实现低延迟加密数据包路由',
        ],
      },
      apk: {
        title: '基于 GitHub Actions 的云端 Android APK 自动编译流水线 (apk)',
        categoryLabel: 'CI/CD 与 Linux 自动化',
        summary:
          '利用 GitHub Actions 的 Linux 容器环境，直接从 Android 代码仓库自动编译、打包并生成 APK 安装包的云端 CI/CD 流水线。',
        architectureNotes:
          '在 Ubuntu 虚拟机中自动配置 JDK 17 与 Android SDK，启用 Gradle 缓存加速，无需本地高配硬件即可快速输出 APK 构建产物。',
        highlights: [
          '在 Ubuntu Linux 云端运行器上实现零本地配置的 Android APK 自动编译',
          '利用 Gradle 依赖缓存大幅缩短 Debug 与 Release 版本构建时间',
          '配合 Apk-generator 仓库实现高效的移动端应用打包分发',
        ],
      },
      SimpMusic: {
        title: '开源维护与 AI 智能体技能研究 (SimpMusic & skills)',
        categoryLabel: 'AI 与移动工程',
        summary:
          '维护开源分支项目，包括基于 YouTube Music 后端的跨平台音乐客户端 SimpMusic 以及模块化 AI 智能体技能库 (Agent Skills)。',
        architectureNotes:
          '探索 Android 后台媒体流播放架构，以及面向自动化编程智能体的标准化技能指令结构。',
        highlights: [
          '基于 YouTube Music 后端的 Android 音频流媒体架构研究',
          '面向研发工作流自动化的模块化 AI 智能体技能定义集合',
        ],
      },
    },
  },

  fr: {
    fullName: 'Mohammad Taha Azizi Ahad',
    roleTitle: 'Développeur Mobile (Android / Kotlin) & Utilisateur Linux · Automatisation IA & Full-Stack',
    location: 'Écosystème Linux & Android',
    bioHeadline:
      'Conception d’applications Android natives (Kotlin & Compose), de systèmes Web post-quantiques et d’automatisation IA.',
    bioLead:
      'Je me spécialise dans le développement d’applications Android natives optimisées avec Clean Architecture + MVVM, les systèmes de messagerie temps réel sécurisés par cryptographie hybride post-quantique, et l’intégration continue CI/CD sous Linux et GitHub Actions.',
    navProjects: 'Projets',
    navSkills: 'Compétences',
    navLiveMessenger: 'Démo Messagerie',
    navContact: 'Contact',
    ctaViewProjects: 'Voir les projets',
    ctaLiveChatApp: 'Lancer chat-app v6.0',
    ctaThemeDark: 'Thème Sombre',
    ctaThemeLight: 'Thème Clair',
    ctaJekyllSource: 'Source Jekyll',
    geoDetectedLabel: 'Langue définie automatiquement via IP',
    kpiReposValue: '9 Dépôts Publics',
    kpiReposDesc: 'Projets open-source publiés sur github.com/indirect-b',
    kpiAndroidDesc: 'Ingénierie Android native avec Clean + MVVM et base Room',
    kpiCryptoDesc: 'Cryptographie hybride post-quantique (FIPS 203) & VOPRF Web',
    kpiAiDesc: 'Assistants de code IA & compilation cloud automatisée sous Linux',
    section1Title: '01. Sélection de Projets et Dépôts d’Ingénierie Logicielle',
    section1Desc:
      'Cliquez sur une carte de projet pour examiner son architecture système, ses points forts techniques et ses extraits de code.',
    searchPlaceholder: 'Rechercher un projet (ex: Kotlin)...',
    syncGithubBtn: 'Synchroniser GitHub',
    syncSuccessMsg: 'Dépôts synchronisés avec succès via l’API GitHub.',
    filterAll: 'Tous les projets',
    filterAndroid: 'Android Natif',
    filterSecurityWeb: 'Sécurité & Web',
    filterAiTools: 'IA & Studio Mobile',
    filterDevops: 'CI/CD & Linux',
    showingCount: (shown, total) => `Affichage de ${shown} sur ${total} dépôts`,
    noProjectsFound: 'Aucun projet ne correspond à votre recherche.',
    resetFilters: 'Réinitialiser les filtres',
    cardInspectBtn: 'Architecture & Code',
    section2Title: '02. Stack Technique & Domaines d’Expertise',
    section2Desc: 'Langages, frameworks et architectures logicielles mis en œuvre dans mes projets',
    skill1Title: 'Ingénierie Android Native',
    skill1Desc:
      'Interfaces modernes avec Jetpack Compose (Material 3), Clean Architecture + MVVM, persistance locale Room, optimisation mémoire mobile et analyse de bytecode Smali / APK.',
    skill2Title: 'Full-Stack & Sécurité Post-Quantique',
    skill2Desc:
      'Systèmes temps réel avec Socket.IO et Express intégrant un échange de clés hybride post-quantique (ML-KEM-768 + ECDH P-256) et l’authentification aveugle VOPRF.',
    skill3Title: 'Automatisation IA & CI/CD Linux',
    skill3Desc:
      'Intégration de l’API Google Gemini avec recherche Web sourcées, analyse légère de documents OpenXML sur mobile et compilation cloud d’APK via GitHub Actions.',
    jekyllDrawerTitle: 'Modèles Jekyll & Configuration GitHub Pages',
    jekyllDrawerDesc: 'Templates Liquid et fichiers YAML équivalents pour le déploiement statique Jekyll',
    closeBtn: 'Fermer ✕',
    copyBtn: 'Copier',
    copiedBtn: 'Copié',
    downloadBtn: 'Télécharger',
    contactTitle: 'Ouvert aux collaborations en Android, Systèmes Web Sécurisés & IA',
    contactDesc:
      'Consultez mon profil GitHub pour explorer le code source complet, lire la documentation technique ou échanger directement.',
    footerCopyright: '© 2026 Mohammad Taha Azizi Ahad. Hébergé sur GitHub Pages.',
    modalOverviewTitle: 'Présentation et Objectif du Projet',
    modalArchTitle: 'Architecture Système & Détails Techniques',
    modalHighlightsTitle: 'Points Techniques Clés',
    modalViewGithub: 'Voir sur GitHub',
    modalViewLive: 'Voir la démo live',
    projects: {
      'chat-app': {
        title: 'Messagerie Web Temps Réel Post-Quantique (chat-app v6.0)',
        categoryLabel: 'Sécurité & Web Full-Stack',
        summary:
          'Messagerie Web temps réel de classe entreprise bâtie avec React 19, TypeScript, Express et Socket.IO, dotée d’un moteur cryptographique hybride post-quantique (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256 bits) et d’une authentification aveugle Ristretto255-VOPRF (RFC 9497).',
        architectureNotes:
          'Protège contre les attaques quantiques « Store Now, Decrypt Later » en combinant CRYSTALS-Kyber et ECDH via HKDF-SHA256, avec gestion des paquets désordonnés, effacement immédiat de la RAM (zeroization) et base de données bimode PostgreSQL / disque atomique.',
        highlights: [
          'Encapsulation de clés hybride post-quantique (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'Authentification d’identité aveugle basée sur Ristretto255-VOPRF (RFC 9497)',
          'Machine à états finis atomique pour les clés de groupe (Group Epoch FSM)',
          'Effacement immédiat des clés en mémoire vive (zeroizeBuffer) et persistance PostgreSQL / disque',
        ],
      },
      'ace-code-editor': {
        title: 'ACE AI Code Editor & Studio Mobile pour Android',
        categoryLabel: 'IA & Ingénierie Mobile',
        summary:
          'Éditeur de code et assistant IA natif pour Android conçu avec Kotlin 1.9+, Jetpack Compose (Material Design 3), Clean Architecture + MVVM, Room Persistence et l’API Google Gemini.',
        architectureNotes:
          'Développé comme projet de recherche sur l’optimisation des ressources mobiles, intégrant un analyseur OpenXML ultra-léger (Word/PDF/Code), une recherche Web en direct avec citations de sources et un moteur de triple calendrier.',
        highlights: [
          'Architecture Android native avec Kotlin, Jetpack Compose M3, Room DB et Clean + MVVM',
          'Analyse multi-formats ultra-légère directement sur l’appareil (PDF, Word OpenXML, Code)',
          'Recherche Web en direct avec attribution multi-sources inspirée de Google AI Overview',
          'Moteur temporel prenant en charge les calendriers persan, hégirien lunaire et grégorien',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — Plateforme LMS Android Native en Temps Réel',
        categoryLabel: 'Application Android Native',
        summary:
          'Système complet de gestion de l’apprentissage (LMS) natif sur Android permettant la gestion des cours, le suivi des devoirs et l’évaluation vocale en temps réel entre administrateurs, enseignants et étudiants.',
        architectureNotes:
          'Implémente un contrôle d’accès basé sur les rôles (Étudiant, Enseignant, Admin) avec codes d’invitation dynamiques, suivi précis des pages (1 à 604), enregistrement/lecture audio intégré et messagerie instantanée privée ou de groupe.',
        highlights: [
          'Trois espaces de travail distincts : Portail Étudiant, Panneau Enseignant et Console Admin',
          'Attribution de devoirs précise de la page 1 à 604 avec option de soumission audio obligatoire',
          'Enregistreur vocal intégré, lecteur audio, notation et retours pédagogiques',
          'Système de chat interne en temps réel pour discussions privées et groupes de classe',
        ],
      },
      'canada-vpn': {
        title: 'Client de Tunnelisation Réseau Android & Architecture APK (canada-vpn)',
        categoryLabel: 'Application Android Native',
        summary:
          'Client de tunnelisation réseau sécurisé pour Android comprenant la hiérarchie complète des ressources, les bibliothèques natives et les couches de bytecode Smali et Kotlin.',
        architectureNotes:
          'Analyse approfondie de la structure des paquets APK Android, gestion du service d’arrière-plan VpnService dans AndroidManifest et intégration de bibliothèques réseau natives.',
        highlights: [
          'Architecture de paquet Multi-Dex combinant Kotlin et bytecode Smali de bas niveau',
          'Configuration dédiée des permissions Android VpnService pour la stabilité du tunnel',
          'Intégration de bibliothèques natives partagées pour un routage à faible latence',
        ],
      },
      apk: {
        title: 'Pipeline Cloud de Compilation Automatisée d’APK via GitHub Actions (apk)',
        categoryLabel: 'CI/CD & Automatisation Linux',
        summary:
          'Workflows CI/CD cloud et scripts d’automatisation permettant de compiler et générer automatiquement des fichiers APK Android depuis GitHub grâce à GitHub Actions.',
        architectureNotes:
          'Déploie JDK 17 et le SDK Android dans des conteneurs Ubuntu Linux, exploite le cache Gradle et publie automatiquement les artefacts APK sans configuration locale.',
        highlights: [
          'Compilation cloud d’APK Android entièrement automatisée sur exécuteurs Ubuntu Linux',
          'Mise en cache des dépendances Gradle pour accélérer les builds Debug et Release',
          'Couplé au dépôt Apk-generator pour une distribution rapide des paquets mobiles',
        ],
      },
      SimpMusic: {
        title: 'Forks Open-Source & Compétences d’Agents IA (SimpMusic & skills)',
        categoryLabel: 'IA & Ingénierie Mobile',
        summary:
          'Maintenance de dépôts open-source incluant le client musical multiplateforme SimpMusic basé sur YouTube Music et une collection de compétences modulaires pour agents IA.',
        architectureNotes:
          'Exploration de l’architecture de streaming audio en arrière-plan sur Android et de la structuration modulaire des instructions pour agents IA.',
        highlights: [
          'Étude de l’architecture de streaming média Android propulsée par YouTube Music',
          'Modèles standardisés de compétences pour l’automatisation par agents IA',
        ],
      },
    },
  },

  es: {
    fullName: 'Mohammad Taha Azizi Ahad',
    roleTitle: 'Desarrollador Móvil (Android / Kotlin) y Usuario de Linux · Automatización IA y Full-Stack',
    location: 'Ecosistema Linux y Android',
    bioHeadline:
      'Ingeniería de aplicaciones nativas para Android (Kotlin y Compose), sistemas Web poscuánticos y automatización con IA.',
    bioLead:
      'Me especializo en el desarrollo de aplicaciones Android nativas de bajo consumo con Clean Architecture + MVVM, sistemas de mensajería en tiempo real protegidos mediante criptografía híbrida poscuántica y flujos de integración continua CI/CD en Linux y GitHub Actions.',
    navProjects: 'Proyectos',
    navSkills: 'Tecnologías',
    navLiveMessenger: 'Demo Mensajería',
    navContact: 'Contacto',
    ctaViewProjects: 'Ver Proyectos',
    ctaLiveChatApp: 'Abrir chat-app v6.0',
    ctaThemeDark: 'Tema Oscuro',
    ctaThemeLight: 'Tema Claro',
    ctaJekyllSource: 'Código Jekyll',
    geoDetectedLabel: 'Idioma configurado automáticamente por IP',
    kpiReposValue: '9 Repositorios',
    kpiReposDesc: 'Proyectos de código abierto en github.com/indirect-b',
    kpiAndroidDesc: 'Desarrollo Android nativo con Clean + MVVM y base de datos Room',
    kpiCryptoDesc: 'Cifrado híbrido poscuántico (FIPS 203) y autenticación VOPRF',
    kpiAiDesc: 'Asistentes de código con IA y compilación en la nube sobre Linux',
    section1Title: '01. Proyectos Destacados de Ingeniería de Software',
    section1Desc:
      'Haz clic en cualquier tarjeta de proyecto para explorar su arquitectura de sistema, detalles técnicos y fragmentos de código.',
    searchPlaceholder: 'Buscar proyectos (ej. Kotlin)...',
    syncGithubBtn: 'Sincronizar con GitHub',
    syncSuccessMsg: 'Repositorios actualizados desde la API de GitHub.',
    filterAll: 'Todos',
    filterAndroid: 'Android Nativo',
    filterSecurityWeb: 'Seguridad y Web',
    filterAiTools: 'IA y Estudio Móvil',
    filterDevops: 'CI/CD y Linux',
    showingCount: (shown, total) => `Mostrando ${shown} de ${total} repositorios`,
    noProjectsFound: 'No se encontraron proyectos que coincidan con tu búsqueda.',
    resetFilters: 'Restablecer filtros',
    cardInspectBtn: 'Ver Arquitectura y Código',
    section2Title: '02. Stack Tecnológico y Áreas de Especialización',
    section2Desc: 'Lenguajes, frameworks y patrones de arquitectura implementados en mis repositorios',
    skill1Title: 'Ingeniería Android Nativa',
    skill1Desc:
      'Diseño de interfaces modernas con Jetpack Compose (Material 3), Clean Architecture + MVVM, persistencia local con Room, optimización de memoria móvil y análisis de bytecode Smali / APK.',
    skill2Title: 'Full-Stack y Seguridad Poscuántica',
    skill2Desc:
      'Sistemas en tiempo real con Socket.IO y Express que integran intercambio de claves híbrido poscuántico (ML-KEM-768 + ECDH P-256) y autenticación ciega VOPRF.',
    skill3Title: 'Automatización con IA y CI/CD en Linux',
    skill3Desc:
      'Integración de Google Gemini API con búsqueda web fundamentada en fuentes, análisis ligero de documentos OpenXML en el dispositivo y compilación automática de APK con GitHub Actions.',
    jekyllDrawerTitle: 'Plantillas Jekyll y Configuración de GitHub Pages',
    jekyllDrawerDesc: 'Plantillas Liquid y archivos YAML equivalentes para despliegue estático con Jekyll',
    closeBtn: 'Cerrar ✕',
    copyBtn: 'Copiar',
    copiedBtn: 'Copiado',
    downloadBtn: 'Descargar',
    contactTitle: 'Disponible para colaboración en Android, Sistemas Web Seguros e IA',
    contactDesc:
      'Visita mi perfil de GitHub para revisar el código fuente completo, la documentación técnica o ponerte en contacto directo.',
    footerCopyright: '© 2026 Mohammad Taha Azizi Ahad. Alojado en GitHub Pages.',
    modalOverviewTitle: 'Descripción y Objetivo del Proyecto',
    modalArchTitle: 'Arquitectura del Sistema y Detalles Técnicos',
    modalHighlightsTitle: 'Características Técnicas Clave',
    modalViewGithub: 'Ver en GitHub',
    modalViewLive: 'Ver Demo en Vivo',
    projects: {
      'chat-app': {
        title: 'Mensajero Web en Tiempo Real con Criptografía Poscuántica (chat-app v6.0)',
        categoryLabel: 'Seguridad y Web Full-Stack',
        summary:
          'Mensajero web empresarial en tiempo real desarrollado con React 19, TypeScript, Express y Socket.IO, equipado con un motor criptográfico híbrido poscuántico (ML-KEM-768 + ECDH P-256 Ratchet + AES-GCM 256-bit) y autenticación ciega Ristretto255-VOPRF (RFC 9497).',
        architectureNotes:
          'Protege contra ataques cuánticos de tipo «Almacenar ahora, descifrar después» combinando CRYSTALS-Kyber y ECDH mediante HKDF-SHA256, con caché de claves para paquetes fuera de orden, borrado inmediato en RAM (zeroization) y motor de base de datos dual PostgreSQL / disco atómico.',
        highlights: [
          'Encapsulamiento de claves híbrido poscuántico (ML-KEM-768 / FIPS 203 + ECDH P-256)',
          'Autenticación de identidad ciega basada en el estándar Ristretto255-VOPRF (RFC 9497)',
          'Máquina de estados atómica para la gestión de claves grupales (Group Epoch FSM)',
          'Limpieza inmediata de claves efímeras en memoria RAM (zeroizeBuffer) y persistencia dual',
        ],
      },
      'ace-code-editor': {
        title: 'ACE AI Code Editor y Estudio Móvil para Android',
        categoryLabel: 'IA e Ingeniería Móvil',
        summary:
          'Editor de código y asistente de IA nativo para Android construido con Kotlin 1.9+, Jetpack Compose (Material Design 3), Clean Architecture + MVVM, Room Persistence y la API de Google Gemini.',
        architectureNotes:
          'Desarrollado como proyecto de investigación sobre optimización de recursos móviles, con un analizador OpenXML ultraligero (Word/PDF/Código), búsqueda web en vivo con atribución de múltiples fuentes y motor de triple calendario.',
        highlights: [
          'Arquitectura Android nativa con Kotlin, Jetpack Compose M3, Room DB y Clean + MVVM',
          'Análisis de documentos multiformato ultraligero en el dispositivo (PDF, Word OpenXML, Código)',
          'Búsqueda web en tiempo real con citas verificadas al estilo de Google AI Overview',
          'Motor de calendario integrado compatible con los sistemas persa, islámico lunar y gregoriano',
        ],
      },
      'NoorQuran-': {
        title: 'NoorAlQuran — Plataforma LMS Android Nativa en Tiempo Real',
        categoryLabel: 'Aplicación Android Nativa',
        summary:
          'Sistema integral de gestión de aprendizaje (LMS) nativo en Android diseñado para coordinar clases, seguimiento de tareas y evaluación de recitaciones en tiempo real entre administradores, profesores y alumnos.',
        architectureNotes:
          'Implementa control de acceso basado en roles (Alumno, Profesor, Administrador) con códigos de activación dinámicos, asignación precisa por páginas (1 a 604), grabación/reproducción de voz integrada y mensajería directa o grupal.',
        highlights: [
          'Tres paneles de trabajo independientes: Portal del Alumno, Panel del Profesor y Consola Admin',
          'Asignación de tareas precisa de la página 1 a la 604 con interruptor de audio obligatorio',
          'Grabadora de voz integrada, reproductor de audio, calificaciones y retroalimentación',
          'Sistema de chat interno en tiempo real para mensajes privados y grupos de clase',
        ],
      },
      'canada-vpn': {
        title: 'Cliente de Tunelización de Red Android y Arquitectura APK (canada-vpn)',
        categoryLabel: 'Aplicación Android Nativa',
        summary:
          'Cliente de tunelización de red segura para Android que incluye jerarquía completa de recursos, bibliotecas nativas y capas de bytecode Smali y Kotlin.',
        architectureNotes:
          'Análisis profundo de la estructura de paquetes APK de Android, gestión del servicio en segundo plano VpnService en AndroidManifest e integración de bibliotecas de red nativas.',
        highlights: [
          'Arquitectura de paquete Multi-Dex que combina código Kotlin y bytecode Smali de bajo nivel',
          'Declaración personalizada de permisos VpnService en AndroidManifest para conexiones estables',
          'Integración de bibliotecas compartidas nativas para enrutamiento de paquetes de baja latencia',
        ],
      },
      apk: {
        title: 'Automatización en la Nube de Compilación de APK con GitHub Actions (apk)',
        categoryLabel: 'CI/CD y Automatización Linux',
        summary:
          'Flujos de trabajo CI/CD en la nube y scripts para compilar y generar automáticamente archivos instalables APK desde repositorios de Android mediante GitHub Actions.',
        architectureNotes:
          'Configura JDK 17 y el SDK de Android dentro de contenedores Ubuntu Linux, aprovecha la caché de Gradle y publica artefactos APK listos para descargar sin requerir hardware local.',
        highlights: [
          'Compilación automática de APK de Android en la nube sobre ejecutores Ubuntu Linux',
          'Caché de dependencias de Gradle para acelerar las compilaciones Debug y Release',
          'Integrado con el repositorio Apk-generator para la entrega ágil de paquetes móviles',
        ],
      },
      SimpMusic: {
        title: 'Forks de Código Abierto y Habilidades de Agentes IA (SimpMusic & skills)',
        categoryLabel: 'IA e Ingeniería Móvil',
        summary:
          'Mantenimiento de repositorios abiertos, incluyendo el cliente musical multiplataforma SimpMusic basado en YouTube Music y una colección modular de habilidades para agentes de IA.',
        architectureNotes:
          'Exploración de arquitecturas de transmisión de audio en segundo plano para Android y definiciones estandarizadas para agentes autónomos de desarrollo.',
        highlights: [
          'Estudio de arquitectura de streaming multimedia en Android conectada a YouTube Music',
          'Colección estructurada de habilidades para la automatización de flujos de trabajo con IA',
        ],
      },
    },
  },
};

const COUNTRY_TO_LOCALE: Record<string, SupportedLocale> = {
  // Persian
  IR: 'fa',
  AF: 'fa',
  TJ: 'fa',
  // Japanese
  JP: 'ja',
  // German
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
  LU: 'de',
  // Russian
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',
  // Chinese
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  MO: 'zh',
  SG: 'zh',
  // French
  FR: 'fr',
  BE: 'fr',
  MC: 'fr',
  SN: 'fr',
  CI: 'fr',
  MA: 'fr',
  DZ: 'fr',
  TN: 'fr',
  // Spanish
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
};

export function mapCountryToLocale(countryCode?: string | null): SupportedLocale {
  if (!countryCode) return 'en';
  const upper = countryCode.trim().toUpperCase();
  return COUNTRY_TO_LOCALE[upper] || 'en';
}

export function detectFallbackLocaleFromEnvironment(): {
  locale: SupportedLocale;
  countryHint: string;
} {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Tehran') || tz.includes('Kabul')) return { locale: 'fa', countryHint: 'IR' };
    if (tz.includes('Tokyo')) return { locale: 'ja', countryHint: 'JP' };
    if (tz.includes('Berlin') || tz.includes('Vienna') || tz.includes('Zurich'))
      return { locale: 'de', countryHint: 'DE' };
    if (tz.includes('Moscow') || tz.includes('Minsk') || tz.includes('Almaty'))
      return { locale: 'ru', countryHint: 'RU' };
    if (
      tz.includes('Shanghai') ||
      tz.includes('Chongqing') ||
      tz.includes('Taipei') ||
      tz.includes('Hong_Kong')
    )
      return { locale: 'zh', countryHint: 'CN' };
    if (tz.includes('Paris') || tz.includes('Brussels'))
      return { locale: 'fr', countryHint: 'FR' };
    if (
      tz.includes('Madrid') ||
      tz.includes('Mexico') ||
      tz.includes('Buenos_Aires') ||
      tz.includes('Bogota') ||
      tz.includes('Santiago')
    )
      return { locale: 'es', countryHint: 'ES' };

    const navLang = (navigator.language || '').toLowerCase();
    if (navLang.startsWith('fa')) return { locale: 'fa', countryHint: 'IR' };
    if (navLang.startsWith('ja')) return { locale: 'ja', countryHint: 'JP' };
    if (navLang.startsWith('de')) return { locale: 'de', countryHint: 'DE' };
    if (navLang.startsWith('ru')) return { locale: 'ru', countryHint: 'RU' };
    if (navLang.startsWith('zh')) return { locale: 'zh', countryHint: 'CN' };
    if (navLang.startsWith('fr')) return { locale: 'fr', countryHint: 'FR' };
    if (navLang.startsWith('es')) return { locale: 'es', countryHint: 'ES' };
  } catch {
    // ignore
  }
  return { locale: 'en', countryHint: 'US' };
}

export async function detectLocaleByIp(): Promise<{
  locale: SupportedLocale;
  countryCode: string;
  source: 'ip' | 'timezone';
}> {
  // 1. Try ipwho.is (fast, CORS-friendly, no API key needed)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        return {
          locale: mapCountryToLocale(data.country_code),
          countryCode: String(data.country_code).toUpperCase(),
          source: 'ip',
        };
      }
    }
  } catch {
    // Proceed to backup Geo-IP endpoint
  }

  // 2. Try ipapi.co/json/ as backup
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        return {
          locale: mapCountryToLocale(data.country_code),
          countryCode: String(data.country_code).toUpperCase(),
          source: 'ip',
        };
      }
    }
  } catch {
    // Proceed to timezone/navigator fallback
  }

  const fb = detectFallbackLocaleFromEnvironment();
  return {
    locale: fb.locale,
    countryCode: fb.countryHint,
    source: 'timezone',
  };
}

export function getLocalizedProject(
  project: ProjectItem,
  locale: SupportedLocale
): ProjectItem {
  const dict = TRANSLATIONS[locale];
  const localized = dict.projects[project.slug];
  if (!localized) return project;
  return {
    ...project,
    title: localized.title,
    categoryLabel: localized.categoryLabel,
    summary: localized.summary,
    architectureNotes: localized.architectureNotes,
    highlights: localized.highlights,
  };
}

export function getLocalizedSiteConfig(
  baseConfig: SiteConfig,
  locale: SupportedLocale
): SiteConfig {
  const dict = TRANSLATIONS[locale];
  return {
    ...baseConfig,
    fullName: dict.fullName,
    roleTitle: dict.roleTitle,
    location: dict.location,
    bioHeadline: dict.bioHeadline,
    bioLead: dict.bioLead,
  };
}
