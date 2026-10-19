import React from 'react';

interface ArtworkProps {
  type: 'distributed' | 'compiler' | 'vector' | 'persian-nlp' | 'edge-kv' | 'wasm-audio' | 'hero';
  className?: string;
}

export const ProjectArtwork: React.FC<ArtworkProps> = ({ type, className = '' }) => {
  if (type === 'hero') {
    return (
      <div className={`relative w-full h-full min-h-[380px] bg-[#0A0A0C] overflow-hidden flex flex-col justify-between p-6 lg:p-8 border border-zinc-800/90 rounded-2xl ${className}`}>
        {/* Subtle Architectural Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272A" strokeWidth="1" />
            </pattern>
            <radialGradient id="cobalt-glow" cx="70%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
          <rect width="100%" height="100%" fill="url(#cobalt-glow)" />
        </svg>

        {/* Top Directory Path Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-4 text-xs font-mono text-zinc-400" dir="ltr">
          <span>github.com/indirect-b</span>
          <span>Android · Linux · AI · PQ-Crypto</span>
        </div>

        {/* Central Developer Stack & Live Repositories Overview */}
        <div className="relative z-10 my-auto py-5 flex flex-col gap-4" dir="ltr">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="text-[11px] font-mono text-zinc-500 mb-1">NATIVE ANDROID</div>
              <div className="text-xs font-mono text-zinc-100 font-semibold">Kotlin & Compose</div>
              <div className="mt-1.5 text-[11px] font-mono text-blue-400">ACE AI · NoorQuran</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="text-[11px] font-mono text-zinc-500 mb-1">PQ CRYPTO WEB</div>
              <div className="text-xs font-mono text-zinc-100 font-semibold">ML-KEM-768</div>
              <div className="mt-1.5 text-[11px] font-mono text-amber-400">chat-app v6.0</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-blue-600/50">
              <div className="text-[11px] font-mono text-zinc-500 mb-1">GITHUB PAGES</div>
              <div className="text-xs font-mono text-white font-semibold">indirect-b.github.io</div>
              <div className="mt-1.5 text-[11px] font-mono text-emerald-400">Jekyll 4.3 Static</div>
            </div>
          </div>

          {/* Code preview block inside hero visual */}
          <div className="p-4 rounded-xl bg-[#050505]/95 border border-zinc-800 font-mono text-xs leading-relaxed text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">{'# _config.yml — Mohammad Taha Azizi Ahad'}</div>
            <div>
              <span className="text-blue-400">url: </span>
              <span className="text-amber-300">"https://indirect-b.github.io"</span>
            </div>
            <div>
              <span className="text-blue-400">author: </span>
              <span className="text-zinc-100">"Mohammad Taha Azizi Ahad"</span>
            </div>
            <div>
              <span className="text-blue-400">focus: </span>
              <span className="text-zinc-300">["Native Android (Kotlin)", "Post-Quantum Web", "AI Automation"]</span>
            </div>
            <div className="mt-2 text-zinc-500">{'<!-- Liquid Loop over indirect-b Repositories -->'}</div>
            <div>
              <span className="text-blue-400">{'{% for '}</span>
              <span>repo </span>
              <span className="text-blue-400">{'in '}</span>
              <span className="text-emerald-400">site.data.projects</span>
              <span className="text-blue-400">{' %}'}</span>
            </div>
            <div className="pl-4 text-zinc-200">
              {'<a href="{{ repo.repo_url }}">{{ repo.slug }} ({{ repo.language }})</a>'}
            </div>
            <div>
              <span className="text-blue-400">{'{% endfor %}'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Footer */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
          <span>متصل به اطلاعات مخازن گیت‌هاب</span>
          <span className="font-mono text-zinc-300" dir="ltr">indirect-b.github.io</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-[#0B0B0E] border-b border-zinc-800/80 flex items-center justify-center ${className}`}>
      {type === 'distributed' && (
        <svg viewBox="0 0 600 260" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="260" fill="#09090B" />
          <g opacity="0.2" stroke="#27272A" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="260" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
            ))}
          </g>
          {/* Post-Quantum ML-KEM-768 + VOPRF Diagram for chat-app */}
          <path d="M140 130 L300 60 L460 130 L300 200 Z" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="140" y1="130" x2="460" y2="130" stroke="#3F3F46" strokeWidth="1.5" />
          <line x1="300" y1="60" x2="300" y2="200" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="235" y="42" width="130" height="36" rx="8" fill="#18181B" stroke="#2563EB" strokeWidth="2" />
          <text x="300" y="64" textAnchor="middle" fill="#FAFAFA" fontSize="11" fontFamily="JetBrains Mono">ML-KEM-768 + ECDH</text>
          <rect x="75" y="112" width="130" height="36" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
          <text x="140" y="134" textAnchor="middle" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono">VOPRF RFC 9497</text>
          <rect x="395" y="112" width="130" height="36" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
          <text x="460" y="134" textAnchor="middle" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono">AES-GCM 256-BIT</text>
          <rect x="235" y="182" width="130" height="36" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
          <text x="300" y="204" textAnchor="middle" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono">GROUP EPOCH FSM</text>
        </svg>
      )}

      {type === 'compiler' && (
        <svg viewBox="0 0 400 220" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="220" fill="#09090B" />
          <rect x="65" y="45" width="270" height="130" rx="12" fill="#121216" stroke="#27272A" strokeWidth="1.5" />
          <line x1="65" y1="75" x2="335" y2="75" stroke="#27272A" strokeWidth="1.2" />
          <text x="200" y="64" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono">ACE AI STUDIO · JETPACK COMPOSE M3</text>
          <text x="200" y="112" textAnchor="middle" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono">Kotlin + Gemini API</text>
          <text x="200" y="140" textAnchor="middle" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono">Clean + MVVM · Room · OpenXML</text>
        </svg>
      )}

      {type === 'persian-nlp' && (
        <svg viewBox="0 0 400 220" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="220" fill="#09090B" />
          <circle cx="200" cy="110" r="78" stroke="#27272A" strokeWidth="1" />
          <circle cx="200" cy="110" r="54" stroke="#2563EB" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M70 110 H330" stroke="#27272A" strokeWidth="1" />
          <rect x="115" y="86" width="170" height="48" rx="8" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
          <text x="200" y="107" textAnchor="middle" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono">NOOR QURAN ANDROID</text>
          <text x="200" y="124" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono">Pages 1..604 · Audio LMS</text>
        </svg>
      )}

      {type === 'vector' && (
        <svg viewBox="0 0 600 260" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="260" fill="#09090B" />
          <g stroke="#27272A" strokeWidth="1.2">
            <line x1="140" y1="130" x2="300" y2="80" />
            <line x1="300" y1="80" x2="460" y2="130" />
            <line x1="140" y1="130" x2="300" y2="180" />
            <line x1="300" y1="180" x2="460" y2="130" />
          </g>
          <line x1="140" y1="130" x2="460" y2="130" stroke="#2563EB" strokeWidth="2" />
          <circle cx="140" cy="130" r="24" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
          <text x="140" y="134" textAnchor="middle" fill="#E4E4E7" fontSize="10" fontFamily="JetBrains Mono">CLIENT</text>
          <circle cx="300" cy="130" r="32" fill="#18181B" stroke="#2563EB" strokeWidth="2" />
          <text x="300" y="134" textAnchor="middle" fill="#FAFAFA" fontSize="10" fontFamily="JetBrains Mono">VPN TUNNEL</text>
          <circle cx="460" cy="130" r="24" fill="#18181B" stroke="#60A5FA" strokeWidth="1.5" />
          <text x="460" y="134" textAnchor="middle" fill="#E4E4E7" fontSize="10" fontFamily="JetBrains Mono">CA NODE</text>
        </svg>
      )}

      {(type === 'edge-kv' || type === 'wasm-audio') && (
        <svg viewBox="0 0 400 220" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="220" fill="#09090B" />
          <polyline
            points="50,155 115,135 180,142 245,90 310,100 355,62"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
          />
          <line x1="50" y1="175" x2="355" y2="175" stroke="#27272A" strokeWidth="1.5" />
          <circle cx="245" cy="90" r="5" fill="#FAFAFA" />
          <circle cx="355" cy="62" r="5" fill="#2563EB" />
          <text x="200" y="48" textAnchor="middle" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono">
            {type === 'edge-kv' ? 'GITHUB ACTIONS APK CI/CD' : 'OPEN SOURCE ANDROID & AI'}
          </text>
        </svg>
      )}
    </div>
  );
};
