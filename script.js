// ===========================
// Matrix Rain Effect
// ===========================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// ===========================
// Interactive Terminal
// ===========================
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const commands = {
    help: `Available commands:
  help        - Show this help message
  whoami      - Display information about me
  ls          - List available sections
  projects    - View my projects
  skills      - Display my skills
  contact     - Show contact information
  clear       - Clear the terminal
  sudo        - Nice try! 😏
  hack        - Initialize hacking sequence
  about       - Learn more about me
  certs       - View certifications
  labs        - Show lab information
  easteregg   - Find the hidden flag`,
    
    whoami: `Alphonse Joseph (@63n713m4n)
Cybersecurity Master's Student | Sweden
Focus: Penetration Testing, IoT Security, Threat Intelligence
Status: Always learning, always hacking`,
    
    ls: `Available sections:
  about/       - About me
  skills/      - My technical skills
  projects/    - Featured projects
  labs/        - CTF & homelab
  certs/       - Certifications
  writing/     - Blogs & articles
  contact/     - Get in touch`,
    
    projects: `Featured Projects:
  [1] IoT Security Analysis - Vulnerability assessment of smart devices
  [2] ISO/SAE 21434 Review - Automotive security standards research
  [3] Network Worm Containment - Azure NSG security implementation
  
Use 'cd projects/' to navigate to projects section`,
    
    skills: `Core Skills:
  [Offensive] Penetration Testing, Web Exploitation, OSINT
  [Defensive] Incident Response, SIEM, Security Architecture
  [Technical] Python, Bash, Network Security, Cloud (AWS/Azure)
  
Proficiency Level: ████████░░ 80%`,
    
    contact: `Contact Information:
  LinkedIn:   https://linkedin.com/in/alphonse-joseph
  GitHub:     https://github.com/63n713m4n
  Medium:     https://medium.com/@63n713m4n
  TryHackMe:  https://tryhackme.com/p/63n713m4n
  
Always open for collaboration!`,
    
    sudo: `[sudo] password for visitor: 
Permission denied. Nice try! 😏
Remember: With great power comes great responsibility.`,
    
    hack: `Initializing hacking sequence...
[████████████████████████████] 100%
Access granted to mainframe...
Just kidding! No illegal activities here. 😄
Try 'help' for actual commands.`,
    
    about: `I'm a Cybersecurity Master's student in Sweden, passionate about:
  • Penetration Testing & Vulnerability Assessment
  • IoT and Automotive Security
  • Threat Intelligence & OSINT
  • CTF Challenges & Practical Labs
  
When I'm not breaking (and fixing) things, I write about security
topics on Medium and practice on TryHackMe. Currently exploring
the intersection of academic research and real-world security.`,
    
    certs: `Certifications:
  ✓ Cisco CyberOps Associate (2025)
    Focus: SOC operations, monitoring, detection
  
  ✓ Google Cybersecurity Professional (2023)
    Focus: Security operations, incident response
  
Status: Always pursuing new certifications and learning opportunities`,
    
    labs: `Lab & CTF Environment:
  [Homelab]
  • Attack simulation & log collection
  • Detection rule development
  • Defender perspective analysis
  
  [TryHackMe Progress]
  • 200+ rooms completed
  • Top 5% global ranking
  • Focus: Web exploitation, privilege escalation, OSINT
  
Visit: tryhackme.com/p/63n713m4n`,
    
    easteregg: `🎉 Congratulations! You found the easter egg!
    
Flag: CTF{y0u_f0und_th3_s3cr3t_c0mm4nd}

You're curious and persistent - essential traits for any good hacker!
Keep exploring, keep learning, and never stop asking questions.

P.S. There might be more secrets hidden in this portfolio... 👀`,
    
    clear: 'CLEAR_TERMINAL'
};

let commandHistory = [];
let historyIndex = -1;

function addOutput(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function typeWriter(text, element, speed = 30) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function processCommand(input) {
    const command = input.trim().toLowerCase();
    
    // Add to history
    if (command && commandHistory[commandHistory.length - 1] !== command) {
        commandHistory.push(command);
    }
    historyIndex = commandHistory.length;
    
    // Display command
    addOutput(`visitor@63n713m4n:~$ ${input}`);
    
    // Process command
    if (command === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }
    
    if (commands[command]) {
        addOutput(commands[command], 'terminal-success');
    } else if (command.startsWith('cd ')) {
        const section = command.substring(3).replace('/', '');
        const element = document.getElementById(section);
        if (element) {
            addOutput(`Navigating to ${section}...`, 'terminal-success');
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else {
            addOutput(`cd: ${section}: No such directory`, 'terminal-error');
        }
    } else if (command === '') {
        // Empty command, just show prompt
    } else {
        addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'terminal-error');
    }
    
    addOutput(''); // Empty line for spacing
}

// Welcome message
window.addEventListener('load', () => {
    setTimeout(() => {
        const welcomeMsg = `Welcome to 63n713m4n's Portfolio Terminal v1.0
Type 'help' to see available commands.
Type 'easteregg' if you're feeling adventurous...`;
        addOutput(welcomeMsg, 'terminal-success');
        addOutput('');
    }, 500);
});

// Terminal input handler
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        processCommand(input);
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
});

// ===========================
// Smooth Scrolling for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Animated Number Counters
// ===========================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (end > 10 ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for stat counters
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateValue(entry.target, 0, target, 2000);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ===========================
// Skills Filter
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCategories = document.querySelectorAll('.skill-category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter skills
        skillCategories.forEach(category => {
            if (filter === 'all') {
                category.style.display = 'block';
            } else {
                const categories = category.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
        });
    });
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .cert-card, .blog-card, .lab-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Navbar Scroll Effect
// ===========================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Contact Form Handler
// ===========================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link (since this is a static site)
    const mailtoLink = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    // Show success message
    alert('Thank you for your message! Your default email client will open to send the message.');
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
});

// ===========================
// Glitch Effect Randomization
// ===========================
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        if (Math.random() > 0.95) {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'glitch 5s infinite';
            }, 10);
        }
    });
}, 3000);

// ===========================
// Typewriter Effect for Hero
// ===========================
const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    typewriterText.style.opacity = '1';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 1000);
}

// ===========================
// Skill Bar Animations
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'fillBar 1.5s ease-out forwards';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(grid => {
    skillObserver.observe(grid);
});

// ===========================
// Easter Egg: Konami Code
// ===========================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            alert('🎮 Konami Code Activated! You are a true gamer! Flag: CTF{k0n4m1_m4st3r}');
            document.body.style.animation = '';
        }, 100);
    }
});

// Add rainbow animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===========================
// Console Easter Egg
// ===========================
console.log('%c🔐 Hello, curious hacker!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cIf you\'re reading this, you\'re the kind of person I want to connect with.', 'color: #00d9ff; font-size: 14px;');
console.log('%cHidden flag: CTF{c0ns0l3_d3t3ct1v3}', 'color: #ff3366; font-size: 12px;');
console.log('%cLet\'s connect: https://linkedin.com/in/alphonse-joseph', 'color: #9ca3bf; font-size: 12px;');

// ===========================
// Performance: Lazy Loading Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Mobile Menu Toggle (if needed)
// ===========================
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('button');
    burger.className = 'mobile-menu-toggle';
    burger.innerHTML = '☰';
    burger.style.cssText = `
        display: none;
        background: transparent;
        border: 1px solid var(--accent-primary);
        color: var(--accent-primary);
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 5px;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.insertBefore(burger, navContainer.lastElementChild);
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    // Show burger on mobile
    const mediaQuery = window.matchMedia('(max-width: 968px)');
    const handleMobile = (e) => {
        if (e.matches) {
            burger.style.display = 'block';
        } else {
            burger.style.display = 'none';
            nav.classList.remove('active');
        }
    };
    
    mediaQuery.addListener(handleMobile);
    handleMobile(mediaQuery);
};

createMobileMenu();

// Add mobile menu styles
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    @media (max-width: 968px) {
        .nav-links {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 70%;
            height: calc(100vh - 70px);
            background: var(--bg-secondary);
            flex-direction: column;
            padding: 2rem;
            transition: right 0.3s ease;
            border-left: 1px solid var(--border-color);
            z-index: 999;
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-links a {
            padding: 1rem 0;
            border-bottom: 1px solid var(--border-color);
        }
    }
`;
document.head.appendChild(mobileStyle);

console.log('Portfolio loaded successfully! 🚀');
