// ===============================================
// CUSTOM CURSOR
// ===============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects on hover
document.querySelectorAll('a, button, .tech-icon, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// ===============================================
// MATRIX RAIN BACKGROUND
// ===============================================
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const matrixArray = matrix.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--matrix-color');
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===============================================
// NAVIGATION
// ===============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
let lastScroll = 0;

// Hide/show navbar on scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// THEME TOGGLE
// ===============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// ===============================================
// TYPEWRITER EFFECT
// ===============================================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Cybersecurity Master\'s Student',
    'Penetration Tester',
    'CTF Enthusiast',
    'Security Researcher',
    'IoT Security Analyst'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect
setTimeout(typeWriter, 1000);

// ===============================================
// INTERACTIVE TERMINAL
// ===============================================
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const commands = {
    help: `Available commands:
    
    <span style="color: var(--accent-primary);">help</span>       - Show this help message
    <span style="color: var(--accent-primary);">whoami</span>     - Display user information
    <span style="color: var(--accent-primary);">ls</span>         - List portfolio sections
    <span style="color: var(--accent-primary);">skills</span>     - Show technical skills
    <span style="color: var(--accent-primary);">projects</span>   - Display featured projects
    <span style="color: var(--accent-primary);">contact</span>    - Get contact information
    <span style="color: var(--accent-primary);">clear</span>      - Clear terminal screen
    <span style="color: var(--accent-primary);">social</span>     - Show social media links
    <span style="color: var(--accent-primary);">cat [file]</span> - Read file content (try: about.txt, skills.txt)`,
    
    whoami: `User: 63n713m4n
Role: Cybersecurity Master's Student
Location: Sweden
Specialization: Penetration Testing, IoT Security, OSINT
Status: Currently working on Master Thesis`,
    
    ls: `<span style="color: var(--accent-secondary);">.</span>
<span style="color: var(--accent-secondary);">..</span>
<span style="color: var(--accent-primary);">about.txt</span>
<span style="color: var(--accent-primary);">skills.txt</span>
<span style="color: var(--accent-primary);">projects/</span>
<span style="color: var(--accent-primary);">certifications/</span>
<span style="color: var(--accent-primary);">contact.txt</span>`,
    
    skills: `Technical Skills:
    
▸ Offensive Security
  - Penetration Testing
  - Web Exploitation
  - OSINT & Reconnaissance
  
▸ Defensive Security
  - Incident Response
  - Security Architecture
  - SIEM Tools
  
▸ Programming
  - Python
  - Bash
  - JavaScript
  
▸ Tools & Platforms
  - Burp Suite, Metasploit, Nmap
  - AWS, Azure, Docker
  - Wireshark, Linux`,
    
    projects: `Featured Projects:
    
1. IoT Security Analysis
   15+ devices tested | 12 vulnerabilities found
   
2. ISO/SAE 21434 Review
   Automotive cybersecurity standards research
   
3. Network Worm Containment
   Azure NSG implementation (95% containment rate)
   
Use '<span style="color: var(--accent-primary);">cat projects/[number]</span>' for details`,
    
    contact: `Contact Information:
    
Email: <span style="color: var(--accent-primary);">63n713m4n@protonmail.com</span>
LinkedIn: <span style="color: var(--accent-primary);">linkedin.com/in/alphonse-joseph</span>
GitHub: <span style="color: var(--accent-primary);">github.com/63n713m4n</span>
Medium: <span style="color: var(--accent-primary);">medium.com/@63n713m4n</span>
TryHackMe: <span style="color: var(--accent-primary);">tryhackme.com/p/63n713m4n</span>`,
    
    social: `Social Media:
    
🔗 LinkedIn  → linkedin.com/in/alphonse-joseph
🐙 GitHub    → github.com/63n713m4n
✍️  Medium    → medium.com/@63n713m4n
🎯 TryHackMe → tryhackme.com/p/63n713m4n`,
    
    'cat about.txt': `About Me:

Cybersecurity Master's student in Sweden, mixing academic depth with 
hands-on labs, CTFs, and real-world security projects.

My interests span threat intelligence, penetration testing, OSINT, 
and security architecture, with a growing focus on IoT and automotive 
security.

Outside of hacking and hardening, I love flight simulators, tech 
tinkering, and turning complex security topics into accessible stories.`,
    
    'cat skills.txt': `Skills & Expertise:

▸ Penetration Testing
▸ Web Application Security
▸ Network Security
▸ OSINT & Reconnaissance
▸ Incident Response
▸ Security Architecture
▸ IoT Security Analysis
▸ Threat Modeling
▸ Python & Bash Scripting
▸ Cloud Security (AWS, Azure)`,
    
    'cat contact.txt': `Contact Information:

Email: 63n713m4n@protonmail.com
LinkedIn: linkedin.com/in/alphonse-joseph
GitHub: github.com/63n713m4n

Feel free to reach out for collaboration opportunities or 
cybersecurity discussions!`,
    
    clear: 'CLEAR_TERMINAL'
};

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        if (command) {
            // Display command
            const commandLine = document.createElement('div');
            commandLine.innerHTML = `<span class="prompt">visitor@63n713m4n:~$</span> ${command}`;
            commandLine.style.marginBottom = '0.5rem';
            terminalOutput.appendChild(commandLine);
            
            // Process command
            if (command === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (commands[command]) {
                const output = document.createElement('div');
                output.innerHTML = commands[command];
                output.style.color = 'var(--text-secondary)';
                output.style.marginBottom = '1rem';
                output.style.whiteSpace = 'pre-wrap';
                terminalOutput.appendChild(output);
            } else {
                const error = document.createElement('div');
                error.innerHTML = `Command not found: ${command}. Type 'help' for available commands.`;
                error.style.color = '#ff5f57';
                error.style.marginBottom = '1rem';
                terminalOutput.appendChild(error);
            }
            
            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
        
        terminalInput.value = '';
    }
});

// Focus terminal input on click
document.querySelector('.interactive-terminal').addEventListener('click', () => {
    terminalInput.focus();
});

// ===============================================
// STATS COUNTER ANIMATION
// ===============================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target === 96 ? '+' : '');
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===============================================
// SKILLS TABS & PROGRESS BARS
// ===============================================
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillCategories = document.querySelectorAll('.skill-category');

skillsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-tab');
        
        // Update active tab
        skillsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter skills
        if (category === 'all') {
            skillCategories.forEach(cat => cat.style.display = 'block');
        } else {
            skillCategories.forEach(cat => {
                const type = cat.getAttribute('data-type');
                cat.style.display = type === category ? 'block' : 'none';
            });
        }
    });
});

// Animate skill progress bars on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillsObserver.observe(category);
});

// ===============================================
// SCROLL ANIMATIONS
// ===============================================
const fadeInElements = document.querySelectorAll('.project-card, .lab-card, .cert-card, .blog-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// ===============================================
// SCROLL TO TOP BUTTON
// ===============================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===============================================
// CONTACT FORM
// ===============================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the form data to a server
    // For now, we'll just show a success message
    
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// ===============================================
// GLITCH EFFECT ON HERO TITLE
// ===============================================
const heroTitle = document.querySelector('.hero-title');
let glitchInterval;

heroTitle.addEventListener('mouseenter', () => {
    let iterations = 0;
    const originalText = heroTitle.textContent;
    
    glitchInterval = setInterval(() => {
        heroTitle.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return String.fromCharCode(33 + Math.floor(Math.random() * 94));
            })
            .join('');
        
        iterations += 1/3;
        
        if (iterations >= originalText.length) {
            clearInterval(glitchInterval);
            heroTitle.textContent = originalText;
        }
    }, 30);
});

// ===============================================
// PARALLAX EFFECT
// ===============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .terminal-window');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===============================================
// SECTION REVEAL ANIMATION
// ===============================================
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ===============================================
// ACTIVE SECTION HIGHLIGHT IN NAV
// ===============================================
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===============================================
// EASTER EGGS
// ===============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        alert('🎮 Konami Code Activated! You found the easter egg! 🎉');
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===============================================
// LOADING ANIMATION
// ===============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===============================================
// PREVENT CONTEXT MENU ON CURSOR ELEMENTS
// ===============================================
[cursor, cursorFollower].forEach(el => {
    el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

console.log('%c🛡️ Welcome to 63n713m4n\'s Portfolio!', 'color: #00ff9f; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'color: #00d4ff; font-size: 14px;');
console.log('%cTry the Konami Code for a surprise! ↑↑↓↓←→←→BA', 'color: #9ca3bd; font-size: 12px;');
