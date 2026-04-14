# 🛡️ Alphonse Joseph — Cybersecurity Portfolio

> Personal cybersecurity portfolio and live Pi Lab status dashboard, hosted on GitHub Pages and self-hosted on a Raspberry Pi 5.

**Live site:** [63n713m4n.github.io](https://63n713m4n.github.io)

---

## 📋 Overview

This is my personal portfolio website built as a single-page application with no frameworks — pure HTML, CSS, and JavaScript. It features a live status dashboard that fetches real-time data from my Raspberry Pi 5 home security lab via a custom Python API.

---

## ✨ Features

- **Live Pi Lab Status** — real-time CPU, RAM, temperature, disk usage and service health fetched from Pi API
- **Dark / Light mode** — toggle with persistent localStorage preference
- **Animated typing effect** — hero section cycles through dynamic text
- **Custom cursor** — accent-colored cursor with ring follower
- **Scroll reveal animations** — sections animate in as you scroll
- **Active nav highlighting** — nav updates based on scroll position
- **Fully responsive** — works on mobile and desktop
- **SEO optimised** — Open Graph, Twitter Card, canonical URL meta tags
- **Custom 404 page** — terminal-themed with countdown redirect
- **SVG icons** — Lucide-style hand-coded SVG icons, no emoji
- **Contact form** — via FormSubmit, no backend required

---

## 📁 File Structure

```
├── index.html          # Main portfolio page
├── cv.html             # CV / Resume page (web + PDF view)
├── reports.html        # Security research reports
├── 404.html            # Custom 404 error page
├── favicon.svg         # SVG favicon (AJ monogram)
├── cv.pdf              # Downloadable CV
└── reports/
    ├── iot-security-analysis.pdf
    ├── iso-sae-21434-review.pdf
    └── network-worm-containment.pdf
```

---

## 🥧 Pi Lab Integration

The Pi Lab section fetches live data from a custom Python HTTP API running on my Raspberry Pi 5:

```javascript
const API = 'https://mypilab-se.duckdns.org:5000/api/status';
```

The API returns:
```json
{
  "cpu": "0.5",
  "ram_pct": "20",
  "ram_used": "1627",
  "ram_total": "8062",
  "disk": "3%",
  "temp": "43.3",
  "uptime": "up 2 weeks, 2 days",
  "services": {
    "pihole": true,
    "wireguard": true,
    "cowrie": true,
    "grafana": true,
    "prometheus": true,
    "loki": true,
    "portainer": true,
    "heimdall": true,
    "fail2ban": true,
    "unbound": true,
    "crowdsec": true,
    "docker": true
  }
}
```

When the Pi API is unreachable (e.g. viewing on GitHub Pages from outside the network), the dashboard gracefully shows "Pi API unreachable" without breaking the rest of the site.

---

## 🔒 Security Stack (Pi Lab)

| Service | Purpose |
|---|---|
| Pi-hole v6 + Unbound | DNS filtering + recursive resolver |
| WireGuard | VPN server |
| nftables | Stateful firewall |
| Fail2ban | Brute force protection |
| CrowdSec | Collaborative threat intelligence |
| Cowrie | SSH/Telnet honeypot |
| Grafana + Prometheus | Metrics dashboards |
| Loki + Promtail | Log aggregation |
| Docker + Portainer | Container management |
| Heimdall | Service dashboard |
| DuckDNS | Dynamic DNS |

---

## 🛠️ Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JS** — no frameworks or dependencies
- **Google Fonts** — Syne (display) + JetBrains Mono (mono)
- **FormSubmit** — contact form without backend
- **GitHub Pages** — static hosting
- **Nginx** — self-hosted on Raspberry Pi 5 via Docker

---

## 🚀 Self-Hosting (Pi Setup)

The site is also served from my Raspberry Pi 5 using Nginx in Docker:

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: website
    restart: always
    ports:
      - "8090:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
```

Custom Nginx config for 404 handling:
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
    error_page 404 /404.html;
}
```

---

## 📄 Pages

| Page | Description |
|---|---|
| `/` | Main portfolio — About, Skills, Projects, Pi Lab, Stack, Contact |
| `/cv.html` | CV with web view + embedded PDF viewer + download |
| `/reports.html` | Security research reports with filter by category |
| `/404.html` | Custom 404 with terminal animation and auto-redirect |

---

## 📬 Contact

- **Email:** [alphonse.joseph@proton.me](mailto:alphonse.joseph@proton.me)
- **GitHub:** [github.com/63n713m4n](https://github.com/63n713m4n)
- **LinkedIn:** [linkedin.com/in/alphonse-joseph](https://www.linkedin.com/in/alphonse-joseph)
- **Twitter/X:** [@Al_FonZ_](https://twitter.com/Al_FonZ_)

---

## 📜 License

This project is open source. Feel free to use it as inspiration for your own portfolio — just don't copy it directly and claim it as your own work.

---

*Built and hosted on Raspberry Pi 5 · Sweden 🇸🇪*
<!-- Portfolio site for Alphonse Joseph — Cybersecurity Researcher -->
