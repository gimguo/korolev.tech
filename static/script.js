/* ═══════════════════════════════════════════════════════════
   korolev.tech — Terminal Engine
   ═══════════════════════════════════════════════════════════
   Чтобы отредактировать ответы на команды — ищите объект
   COMMANDS ниже и меняйте текст прямо здесь.
   ═══════════════════════════════════════════════════════════ */

// ── Конфигурация команд (РЕДАКТИРУЙТЕ ЗДЕСЬ) ──────────────

const COMMANDS = {

  whoami: () => {
    const card = document.createElement('div');
    card.className = 'whoami-card';

    const photo = document.createElement('div');
    photo.className = 'term-photo';
    photo.onclick = openLightbox;
    photo.innerHTML = '<img src="/img/portrait.png" alt="Andrew Korolev"><span class="term-photo-label">[ click to enlarge ]</span>';

    const info = document.createElement('div');
    info.className = 'whoami-info';
    info.innerHTML =
      '<span class="output-bold">Andrew Korolev</span><br>' +
      '<span class="output-cyan">Principal Engineer / System Architect</span><br>' +
      '<br>' +
      '🏠  Location:   Russia<br>' +
      '💼  Focus:      Distributed Systems, DevOps, Product Engineering<br>' +
      '🧠  Philosophy: "Build systems that outlive the team that built them."';

    card.appendChild(photo);
    card.appendChild(info);

    return { element: card, after: [
      '',
      '  15+ years of building, scaling, and unfucking production systems.',
      '  From bare-metal to Kubernetes, from monoliths to microservices.',
      '',
    ]};
  },

  skills: () => {
    const skills = [
      ['Go / Golang',      9],
      ['PHP / Yii2',       9],
      ['Python',           7],
      ['JavaScript',       8],
      ['PostgreSQL',       9],
      ['Docker / K8s',     9],
      ['Linux / Infra',    10],
      ['System Design',    9],
      ['CI/CD Pipelines',  8],
      ['AI/ML Integration',6],
    ];
    const lines = ['', '<span class="output-bold">  ⚡ Technical Skills</span>', ''];
    skills.forEach(([name, level]) => {
      const filled = '█'.repeat(level);
      const empty  = '░'.repeat(10 - level);
      const pad    = name.padEnd(20);
      lines.push(
        `  <span class="output-cyan">${pad}</span>` +
        `<span class="skill-filled">${filled}</span>` +
        `<span class="skill-empty">${empty}</span>` +
        `  <span class="output-info">${level}/10</span>`
      );
    });
    lines.push('');
    return lines;
  },

  projects: () => [
    '',
    '<span class="output-bold">  📂 Notable Projects</span>',
    '',
    '  <span class="output-cyan">ros-matras.ru</span>        E-commerce platform (mattresses & furniture)',
    '                        Yii2 + PostgreSQL + AI enrichment pipeline',
    '',
    '  <span class="output-cyan">MDM Aggregator</span>       Master Data Management for product catalog',
    '                        Go microservices + DeepSeek AI + Docker',
    '',
    '  <span class="output-cyan">Price Engine</span>         Real-time pricing with 800K+ SKU variants',
    '                        High-perf ETL, staging → normalization → sync',
    '',
    '  <span class="output-cyan">Infrastructure</span>       Full DevOps: Docker Compose, NPM, Let\'s Encrypt,',
    '                        CI/CD pipelines, monitoring, log aggregation',
    '',
    '  <span class="output-info">  Type "contact" to discuss collaboration.</span>',
    '',
  ],

  contact: () => [
    '',
    '<span class="output-bold">  📬 Get in Touch</span>',
    '',
    '  ✉️   Email:     <a class="output-link" href="mailto:andrey@korolev.tech">andrey@korolev.tech</a>',
    '  🔗  GitHub:    <a class="output-link" href="https://github.com/akorolev" target="_blank">github.com/akorolev</a>',
    '  💬  Telegram:  <a class="output-link" href="https://t.me/akorolev" target="_blank">@akorolev</a>',
    '',
    '  <span class="output-info">Open to interesting challenges and collaborations.</span>',
    '',
  ],

  resume: () => {
    window.open('/resume.pdf', '_blank');
    return [
      '',
      '  <span class="output-info">📄 Opening resume in a new tab...</span>',
      '  <span class="output-info">   (If nothing happened, check your popup blocker)</span>',
      '',
    ];
  },

  photo: () => {
    openLightbox();
    return [
      '',
      '  <span class="output-info">📷 Opening portrait in fullscreen...</span>',
      '  <span class="output-info">   Click anywhere or press ESC to close.</span>',
      '',
    ];
  },

  help: () => [
    '',
    '<span class="output-bold">  Available commands:</span>',
    '',
    '  <span class="output-cyan">whoami</span>       — About me (with photo)',
    '  <span class="output-cyan">skills</span>       — Technical skills',
    '  <span class="output-cyan">projects</span>     — Notable projects',
    '  <span class="output-cyan">contact</span>      — Contact information',
    '  <span class="output-cyan">photo</span>        — View portrait fullscreen',
    '  <span class="output-cyan">resume</span>       — Open PDF resume',
    '  <span class="output-cyan">clear</span>        — Clear terminal',
    '  <span class="output-cyan">help</span>         — Show this message',
    '',
    '  <span class="output-info">Hint: use ↑ / ↓ arrows for command history</span>',
    '  <span class="output-info">Hint: try exploring the filesystem... 🐰</span>',
    '',
  ],
};

// ── Пасхалки: файловая система ─────────────────────────────

const FILESYSTEM = {
  '/etc/status': [
    '',
    '<span class="output-highlight">  ┌─────────────────────────────────────────────────────┐</span>',
    '<span class="output-highlight">  │  SYSTEM STATUS REPORT                               │</span>',
    '<span class="output-highlight">  ├─────────────────────────────────────────────────────┤</span>',
    '<span class="output-highlight">  │  Status: Construction in progress (99% done).       │</span>',
    '<span class="output-highlight">  │  Please ignore the exposed wiring,                  │</span>',
    '<span class="output-highlight">  │  it\'s a feature, not a bug.                         │</span>',
    '<span class="output-highlight">  │                                                     │</span>',
    '<span class="output-highlight">  │  ETA: When it\'s done™                               │</span>',
    '<span class="output-highlight">  └─────────────────────────────────────────────────────┘</span>',
    '',
  ],
  '/home/repair': [
    '',
    '<span class="output-text">  # /home/repair — renovation log</span>',
    '',
    '  <span class="output-info">Day 1:</span>   "This will take 2 weeks max."',
    '  <span class="output-info">Day 14:</span>  "We\'re almost there, just the tiles left."',
    '  <span class="output-info">Day 45:</span>  "Found a load-bearing wall where the door should be."',
    '  <span class="output-info">Day 90:</span>  "Negotiating with the wall. It\'s winning."',
    '  <span class="output-info">Day ∞:</span>   <span class="output-error">SEGFAULT: renovation.service exceeded max_lifetime</span>',
    '',
    '  <span class="output-highlight">  Current status: It compiles, ship it.</span>',
    '',
  ],
  '/etc/motd': [
    '',
    '  <span class="output-text">  "Any sufficiently advanced engineer is</span>',
    '  <span class="output-text">   indistinguishable from a wizard."</span>',
    '  <span class="output-info">                        — Not Arthur C. Clarke</span>',
    '',
  ],
  '/proc/coffee': [
    '',
    '  <span class="output-highlight">  ☕ Coffee Level: ██████████░░  83%</span>',
    '  <span class="output-error">  WARNING: approaching critical caffeine threshold</span>',
    '  <span class="output-info">  Recommended action: brew --strength=espresso --count=2</span>',
    '',
  ],
  '/var/log/bugs': [
    '',
    '  <span class="output-info">  [2026-01-15 03:42:00]</span> <span class="output-error">BUG:</span> It works on my machine ¯\\_(ツ)_/¯',
    '  <span class="output-info">  [2026-02-01 14:20:00]</span> <span class="output-error">BUG:</span> DNS. It\'s always DNS.',
    '  <span class="output-info">  [2026-02-14 09:00:00]</span> <span class="output-highlight">FIX:</span> Turned it off and on again. Worked.',
    '  <span class="output-info">  [2026-03-01 23:59:59]</span> <span class="output-error">BUG:</span> The bug was a feature all along.',
    '',
  ],
  '/dev/null': [
    '',
    '  <span class="output-info">  ... (nothing to see here, as expected)</span>',
    '',
  ],
};

// ── ASCII-баннер ───────────────────────────────────────────

const BANNER = `<span class="ascii-art">
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     █████╗ ██╗  ██╗ ██████╗ ██████╗  ██████╗ ██╗     ███████╗║
    ║    ██╔══██╗██║ ██╔╝██╔═══██╗██╔══██╗██╔═══██╗██║     ██╔════╝║
    ║    ███████║█████╔╝ ██║   ██║██████╔╝██║   ██║██║     █████╗  ║
    ║    ██╔══██║██╔═██╗ ██║   ██║██╔══██╗██║   ██║██║     ██╔══╝  ║
    ║    ██║  ██║██║  ██╗╚██████╔╝██║  ██║╚██████╔╝███████╗███████╗║
    ║    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
</span>`;

const WELCOME_LINES = [
  BANNER,
  '',
  '<span class="output-bold">  Welcome to korolev.tech</span>',
  '<span class="output-cyan">  Principal Engineer — System Architect — Builder</span>',
  '',
  '  <span class="output-info">Type <span class="output-cyan">help</span> to see available commands.</span>',
  '',
];

// ── DOM ────────────────────────────────────────────────────

const output   = document.getElementById('output');
const input    = document.getElementById('command-input');
const termBody = document.getElementById('terminal-body');

// ── State ──────────────────────────────────────────────────

let commandHistory = [];
let historyIndex   = -1;
let isTyping       = false;

// ── Lightbox ───────────────────────────────────────────────

function openLightbox() {
  document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

document.getElementById('lightbox').addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ID photo click → lightbox
document.getElementById('id-photo-wrap').addEventListener('click', openLightbox);

// ── Matrix Rain Background ─────────────────────────────────

function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  const ctx    = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 14;
  const columns  = Math.floor(canvas.width / fontSize);
  const drops    = Array(columns).fill(1);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 50);
  window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; });
}

// ── Typing Effect ──────────────────────────────────────────

function typeLines(lines, callback) {
  isTyping = true;
  let i = 0;
  function nextLine() {
    if (i >= lines.length) { isTyping = false; if (callback) callback(); return; }
    appendOutput(lines[i]);
    scrollToBottom();
    i++;
    setTimeout(nextLine, 40 + Math.random() * 30);
  }
  nextLine();
}

// ── Output Helpers ─────────────────────────────────────────

function appendOutput(html) {
  const div = document.createElement('div');
  div.className = 'line';
  div.innerHTML = html;
  output.appendChild(div);
}

function appendElement(el) {
  const div = document.createElement('div');
  div.className = 'line';
  div.appendChild(el);
  output.appendChild(div);
}

function appendPromptAndCommand(cmd) {
  appendOutput(
    '<span class="prompt-text">visitor@korolev.tech:~$</span> ' +
    '<span class="command-text">' + escapeHtml(cmd) + '</span>'
  );
}

function scrollToBottom() {
  termBody.scrollTop = termBody.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── Command Processing ─────────────────────────────────────

function processCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;

  appendPromptAndCommand(trimmed);

  const parts = trimmed.split(/\s+/);
  const cmd   = parts[0].toLowerCase();

  commandHistory.unshift(trimmed);
  if (commandHistory.length > 50) commandHistory.pop();
  historyIndex = -1;

  // clear
  if (cmd === 'clear') {
    output.innerHTML = '';
    WELCOME_LINES.forEach(line => appendOutput(line));
    scrollToBottom();
    return;
  }

  // cat
  if (cmd === 'cat') {
    const path = parts.slice(1).join(' ').trim();
    if (!path) {
      appendOutput('<span class="output-error">  cat: missing operand</span>');
      appendOutput('<span class="output-info">  Try: cat /etc/status</span>');
    } else if (FILESYSTEM[path]) {
      FILESYSTEM[path].forEach(line => appendOutput(line));
    } else {
      appendOutput(`<span class="output-error">  cat: ${escapeHtml(path)}: No such file or directory</span>`);
      appendOutput('<span class="output-info">  Try: ls /</span>');
    }
    appendOutput('');
    scrollToBottom();
    return;
  }

  // ls
  if (cmd === 'ls') {
    const target = parts.slice(1).join(' ').trim() || '/';
    const dirs = {
      '/':        ['<span class="output-cyan">bin/</span>   <span class="output-cyan">dev/</span>   <span class="output-cyan">etc/</span>   <span class="output-cyan">home/</span>   <span class="output-cyan">proc/</span>   <span class="output-cyan">var/</span>'],
      '/etc':     ['<span class="output-text">motd</span>    <span class="output-text">status</span>'],
      '/home':    ['<span class="output-text">repair</span>'],
      '/proc':    ['<span class="output-text">coffee</span>'],
      '/var':     ['<span class="output-cyan">log/</span>'],
      '/var/log': ['<span class="output-text">bugs</span>'],
      '/dev':     ['<span class="output-text">null</span>'],
    };
    const normalized = target.replace(/\/+$/, '') || '/';
    if (dirs[normalized]) {
      appendOutput('');
      dirs[normalized].forEach(line => appendOutput('  ' + line));
    } else {
      appendOutput(`<span class="output-error">  ls: cannot access '${escapeHtml(target)}': No such file or directory</span>`);
    }
    appendOutput('');
    scrollToBottom();
    return;
  }

  // sudo
  if (cmd === 'sudo') {
    appendOutput('');
    appendOutput('<span class="output-error">  [sudo] password for visitor: </span>');
    appendOutput('<span class="output-error">  Nice try. This incident will be reported. 🚨</span>');
    appendOutput('');
    scrollToBottom();
    return;
  }

  // rm
  if (cmd === 'rm') {
    appendOutput('');
    appendOutput('<span class="output-error">  ⚠ Permission denied. You thought I\'d let you do that?</span>');
    appendOutput('<span class="output-info">  This system is rm-proof. You\'re welcome.</span>');
    appendOutput('');
    scrollToBottom();
    return;
  }

  // Registered commands
  if (COMMANDS[cmd]) {
    const result = COMMANDS[cmd]();

    // Handle element + after-text (whoami)
    if (result && result.element) {
      appendOutput('');
      appendElement(result.element);
      if (result.after) result.after.forEach(line => appendOutput(line));
      scrollToBottom();
      return;
    }

    // Handle string arrays
    const lines = Array.isArray(result) ? result : [result];
    lines.forEach(line => appendOutput(line));
    scrollToBottom();
    return;
  }

  // Server commands
  const serverCommands = ['ping', 'uptime', 'date'];
  if (serverCommands.includes(cmd)) {
    fetchServerCommand(cmd, parts.slice(1).join(' '));
    return;
  }

  // Not found
  appendOutput(`<span class="output-error">  bash: ${escapeHtml(cmd)}: command not found</span>`);
  appendOutput('<span class="output-info">  Type <span class="output-cyan">help</span> for available commands.</span>');
  appendOutput('');
  scrollToBottom();
}

// ── Server API ─────────────────────────────────────────────

async function fetchServerCommand(cmd, args) {
  try {
    const resp = await fetch('/api/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: cmd, args: args }),
    });
    const data = await resp.json();
    const cls  = data.type === 'error' ? 'output-error' : 'output-text';
    appendOutput(`<span class="${cls}">  ${escapeHtml(data.output)}</span>`);
  } catch (err) {
    appendOutput('<span class="output-error">  ⚠ Connection to server failed.</span>');
  }
  appendOutput('');
  scrollToBottom();
}

// ── Input Handling ─────────────────────────────────────────

input.addEventListener('keydown', (e) => {
  if (isTyping) { e.preventDefault(); return; }

  if (e.key === 'Enter') {
    const val = input.value;
    input.value = '';
    processCommand(val);
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
    } else {
      historyIndex = -1;
      input.value = '';
    }
    return;
  }

  if (e.key === 'Tab') {
    e.preventDefault();
    const partial = input.value.trim().toLowerCase();
    if (!partial) return;
    const allCmds = [...Object.keys(COMMANDS), 'clear', 'cat', 'ls', 'sudo', 'ping', 'uptime', 'date'];
    const matches = allCmds.filter(c => c.startsWith(partial));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      appendPromptAndCommand(partial);
      appendOutput('<span class="output-info">  ' + matches.join('  ') + '</span>');
      appendOutput('');
      scrollToBottom();
    }
  }
});

// Click → focus
document.getElementById('terminal-body').addEventListener('click', () => input.focus());

// ── Mobile fix ─────────────────────────────────────────────

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    document.getElementById('terminal').style.height = window.visualViewport.height + 'px';
    scrollToBottom();
  });
}

// ── Boot Sequence ──────────────────────────────────────────

function boot() {
  initMatrix();

  const bootLines = [
    '<span class="output-info">[    0.000000] korolev.tech kernel: booting...</span>',
    '<span class="output-info">[    0.031337] Loading personality matrix...</span>',
    '<span class="output-info">[    0.042000] Mounting /dev/skills...</span>',
    '<span class="output-info">[    0.069000] Initializing project database...</span>',
    '<span class="output-info">[    0.080085] Neural interface ready.</span>',
    '<span class="output-info">[    0.100000] System online. Welcome.</span>',
    '',
  ];

  typeLines(bootLines, () => {
    typeLines(WELCOME_LINES, () => {
      input.focus();
    });
  });
}

document.addEventListener('DOMContentLoaded', boot);
