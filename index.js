<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vishnu Prasad - Tech Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #00ff41;
            overflow: hidden;
            height: 100vh;
            position: relative;
        }

        /* Floating Code Animation */
        .floating-code {
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: rgba(0, 255, 65, 0.3);
            pointer-events: none;
            white-space: nowrap;
            z-index: 1;
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(50px);
                opacity: 0;
            }
        }

        /* Status Bar */
        .status-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 24px;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            font-size: 12px;
            color: #fff;
            z-index: 1000;
            border-bottom: 1px solid rgba(0, 255, 65, 0.2);
        }

        .status-left {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .status-right {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .signal-bars {
            display: flex;
            gap: 1px;
            align-items: end;
        }

        .signal-bar {
            width: 2px;
            background: #00ff41;
            transition: all 0.3s ease;
        }

        .signal-bar:nth-child(1) { height: 3px; }
        .signal-bar:nth-child(2) { height: 5px; }
        .signal-bar:nth-child(3) { height: 7px; }
        .signal-bar:nth-child(4) { height: 9px; }

        .network-speed {
            font-size: 10px;
            color: #00ff41;
        }

        .battery {
            width: 20px;
            height: 10px;
            border: 1px solid #fff;
            border-radius: 2px;
            position: relative;
        }

        .battery::after {
            content: '';
            position: absolute;
            right: -2px;
            top: 3px;
            width: 1px;
            height: 4px;
            background: #fff;
        }

        .battery-level {
            height: 100%;
            background: #00ff41;
            border-radius: 1px;
            transition: width 0.3s ease;
        }

        /* Main Container */
        .container {
            height: 100vh;
            padding-top: 24px;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 10;
        }

        /* Home Screen */
        .home-screen {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            text-align: center;
        }

        .profile-header {
            margin-bottom: 40px;
            animation: glitchIn 0.8s ease-out;
        }

        .profile-name {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 0 20px #00ff41;
            animation: pulse 2s infinite;
        }

        .profile-subtitle {
            font-size: clamp(1rem, 3vw, 1.5rem);
            color: #0099ff;
            margin-bottom: 20px;
        }

        .alive-counter {
            font-family: 'Courier New', monospace;
            font-size: clamp(0.8rem, 2vw, 1rem);
            color: #ff6b6b;
            background: rgba(0, 0, 0, 0.5);
            padding: 10px 20px;
            border-radius: 20px;
            border: 1px solid #ff6b6b;
        }

        /* App Icons Grid */
        .app-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            max-width: 400px;
            width: 100%;
        }

        .app-icon {
            width: 120px;
            height: 120px;
            background: linear-gradient(145deg, rgba(0, 255, 65, 0.1), rgba(0, 153, 255, 0.1));
            border: 2px solid rgba(0, 255, 65, 0.3);
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }

        .app-icon::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(0, 255, 65, 0.1), transparent);
            transform: rotate(-45deg);
            transition: all 0.6s;
            opacity: 0;
        }

        .app-icon:hover::before {
            animation: shimmer 1.5s ease-in-out;
        }

        .app-icon:hover {
            transform: scale(1.05);
            border-color: #00ff41;
            box-shadow: 0 10px 30px rgba(0, 255, 65, 0.3);
        }

        .app-icon:active {
            transform: scale(0.95);
        }

        .app-icon-symbol {
            font-size: 2.5rem;
            margin-bottom: 8px;
            color: #00ff41;
        }

        .app-icon-label {
            font-size: 0.9rem;
            font-weight: 500;
            color: #fff;
        }

        /* Pages */
        .page {
            position: absolute;
            top: 24px;
            left: 0;
            right: 0;
            bottom: 0;
            background: inherit;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            padding: 20px;
            overflow-y: auto;
        }

        .page.active {
            transform: translateX(0);
        }

        .page-header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(0, 255, 65, 0.3);
        }

        .back-btn {
            background: none;
            border: 2px solid #00ff41;
            color: #00ff41;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            margin-right: 15px;
            transition: all 0.3s ease;
        }

        .back-btn:hover {
            background: #00ff41;
            color: #000;
        }

        .page-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #00ff41;
        }

        .page-content {
            line-height: 1.6;
            max-width: 800px;
        }

        .page-content h3 {
            color: #0099ff;
            margin: 20px 0 10px 0;
            font-size: 1.3rem;
        }

        .page-content p {
            margin-bottom: 15px;
            color: #ccc;
        }

        .skill-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .skill-card {
            background: rgba(0, 255, 65, 0.05);
            border: 1px solid rgba(0, 255, 65, 0.3);
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s ease;
        }

        .skill-card:hover {
            border-color: #00ff41;
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.2);
        }

        .contact-links {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
        }

        .contact-link {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            background: rgba(0, 255, 65, 0.1);
            border: 1px solid rgba(0, 255, 65, 0.3);
            border-radius: 10px;
            color: #00ff41;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .contact-link:hover {
            background: rgba(0, 255, 65, 0.2);
            transform: translateX(5px);
        }

        .contact-icon {
            font-size: 1.5rem;
            margin-right: 15px;
        }

        /* Animations */
        @keyframes glitchIn {
            0% {
                opacity: 0;
                transform: translateY(50px);
                filter: blur(10px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
            }
        }

        @keyframes pulse {
            0%, 100% { text-shadow: 0 0 20px #00ff41; }
            50% { text-shadow: 0 0 40px #00ff41, 0 0 60px #00ff41; }
        }

        @keyframes shimmer {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .app-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }
            
            .app-icon {
                width: 100px;
                height: 100px;
            }
            
            .skill-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Floating Code Background -->
    <div id="floating-code-container"></div>

    <!-- Status Bar -->
    <div class="status-bar">
        <div class="status-left">
            <div class="signal-bars">
                <div class="signal-bar"></div>
                <div class="signal-bar"></div>
                <div class="signal-bar"></div>
                <div class="signal-bar"></div>
            </div>
            <span style="font-size: 10px;">R</span>
            <span style="font-size: 10px;">5G</span>
            <div class="network-speed">↕ 45MB/s</div>
        </div>
        <div class="status-right">
            <span id="current-time">12:30</span>
            <div class="battery">
                <div class="battery-level" id="battery-level"></div>
            </div>
            <span id="battery-percent">85%</span>
        </div>
    </div>

    <div class="container">
        <!-- Home Screen -->
        <div class="home-screen" id="home-screen">
            <div class="profile-header">
                <h1 class="profile-name">VISHNU PRASAD</h1>
                <p class="profile-subtitle">Creative Engineer • Tech Innovator</p>
                <div class="alive-counter" id="alive-counter">
                    Alive Since: 24y 7m 30d 8h 8min 37s
                </div>
            </div>

            <div class="app-grid">
                <div class="app-icon" onclick="openPage('about')">
                    <div class="app-icon-symbol">👨‍💻</div>
                    <div class="app-icon-label">About</div>
                </div>
                <div class="app-icon" onclick="openPage('skills')">
                    <div class="app-icon-symbol">⚡</div>
                    <div class="app-icon-label">Skills</div>
                </div>
                <div class="app-icon" onclick="openPage('reach')">
                    <div class="app-icon-symbol">📱</div>
                    <div class="app-icon-label">Reach Me</div>
                </div>
                <div class="app-icon" onclick="openPage('projects')">
                    <div class="app-icon-symbol">🚀</div>
                    <div class="app-icon-label">Projects</div>
                </div>
            </div>
        </div>

        <!-- About Page -->
        <div class="page" id="about-page">
            <div class="page-header">
                <button class="back-btn" onclick="goHome()">← Back</button>
                <h2 class="page-title">About Me</h2>
            </div>
            <div class="page-content">
                <h3>Engineer • Developer • Creator</h3>
                <p>Hey! I'm <strong>Vishnu Prasad</strong>, a Mechanical Engineering graduate from Carmel Polytechnic College, Alappuzha, originally from Kayamkulam, Kerala, and born in Punalur.</p>
                
                <h3>Experience</h3>
                <p>I've interned at <strong>Suzee Hyundai, Tenkasi</strong>, bringing real-world automotive experience to my technical arsenal.</p>
                
                <h3>Current Journey</h3>
                <p>Currently pursuing <strong>BSc in Computer Science</strong> from IHRD College of Applied Science, Karthikapally, merging my mechanical engineering foundation with cutting-edge digital technologies.</p>
                
                <h3>Passion</h3>
                <p>I'm passionate about exploring new places, listening to music, and diving deep into <strong>coding and web designing</strong> in my free time.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-top: 30px; text-align: center;">
                    <div>
                        <div style="font-size: 2rem; color: #00ff41; font-weight: bold;">2+</div>
                        <div style="color: #ccc;">Years Coding</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; color: #ff6b6b; font-weight: bold;">∞</div>
                        <div style="color: #ccc;">Ideas Created</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; color: #0099ff; font-weight: bold;">24/7</div>
                        <div style="color: #ccc;">Innovation Mode</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; color: #ff9500; font-weight: bold;">100%</div>
                        <div style="color: #ccc;">Passion Driven</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Skills Page -->
        <div class="page" id="skills-page">
            <div class="page-header">
                <button class="back-btn" onclick="goHome()">← Back</button>
                <h2 class="page-title">Skills & Expertise</h2>
            </div>
            <div class="page-content">
                <div class="skill-grid">
                    <div class="skill-card">
                        <h3>💻 Coding</h3>
                        <p>Building innovative solutions with clean, efficient code. Transforming complex problems into elegant digital solutions through creative programming and algorithmic thinking.</p>
                    </div>
                    <div class="skill-card">
                        <h3>🎨 Web Design</h3>
                        <p>Creating stunning, functional websites that blend aesthetics with performance. Crafting user experiences that captivate and engage through modern design principles.</p>
                    </div>
                    <div class="skill-card">
                        <h3>⚙️ Mechanical Engineering</h3>
                        <p>Strong foundation in engineering principles, precision thinking, and systematic problem-solving. Bringing mechanical precision to digital innovation.</p>
                    </div>
                    <div class="skill-card">
                        <h3>🚀 Innovation</h3>
                        <p>Constantly generating breakthrough ideas and approaches. Combining technical expertise with creative vision to push boundaries and create the future.</p>
                    </div>
                    <div class="skill-card">
                        <h3>🌍 Exploration</h3>
                        <p>Passionate about discovering new places, cultures, and perspectives. This wanderlust fuels my creativity and brings fresh insights to every project.</p>
                    </div>
                    <div class="skill-card">
                        <h3>🎵 Creative Flow</h3>
                        <p>Finding inspiration through music and rhythm. This creative energy flows into my work, helping me think outside conventional boundaries and innovate.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reach Me Page -->
        <div class="page" id="reach-page">
            <div class="page-header">
                <button class="back-btn" onclick="goHome()">← Back</button>
                <h2 class="page-title">Reach Me</h2>
            </div>
            <div class="page-content">
                <h3>Let's Connect!</h3>
                <p>Let's connect and explore the possibilities together! Whether you want to collaborate on exciting projects, discuss innovative ideas, or just say hello, I'm always ready to engage with fellow creators and tech enthusiasts.</p>
                
                <div class="contact-links">
                    <a href="https://wa.me/916235989299" class="contact-link">
                        <div class="contact-icon">📱</div>
                        <div>
                            <div>WhatsApp</div>
                            <div style="font-size: 0.9rem; color: #ccc;">+91 6235989299</div>
                        </div>
                    </a>
                    <a href="https://instagram.com/v3shn" class="contact-link">
                        <div class="contact-icon">📷</div>
                        <div>
                            <div>Instagram</div>
                            <div style="font-size: 0.9rem; color: #ccc;">@v3shn</div>
                        </div>
                    </a>
                    <a href="https://threads.net/@v3shn" class="contact-link">
                        <div class="contact-icon">🧵</div>
                        <div>
                            <div>Threads</div>
                            <div style="font-size: 0.9rem; color: #ccc;">@v3shn</div>
                        </div>
                    </a>
                </div>

                <h3 style="margin-top: 30px;">Let's Create Something Amazing</h3>
                <p>I'm always open to discussing new opportunities, interesting projects, or just having a friendly conversation about technology and innovation. Let's build the future together.</p>
                
                <div style="margin-top: 30px; padding: 20px; background: rgba(0, 255, 65, 0.05); border-radius: 10px; border: 1px solid rgba(0, 255, 65, 0.3);">
                    <h3>📍 Location</h3>
                    <p>Kayamkulam, Kerala, India</p>
                    
                    <h3>💼 Experience</h3>
                    <p>Suzee Hyundai, Tenkasi</p>
                    
                    <h3>🎓 Education</h3>
                    <p>IHRD College of Applied Science</p>
                    
                    <h3>🎯 Focus</h3>
                    <p>Engineering × Technology</p>
                </div>
            </div>
        </div>

        <!-- Projects Page -->
        <div class="page" id="projects-page">
            <div class="page-header">
                <button class="back-btn" onclick="goHome()">← Back</button>
                <h2 class="page-title">Projects</h2>
            </div>
            <div class="page-content">
                <h3>Coming Soon...</h3>
                <p>This section will showcase my latest projects and innovations. Stay tuned for exciting updates!</p>
                
                <div style="margin-top: 30px; padding: 40px; text-align: center; background: rgba(0, 255, 65, 0.05); border-radius: 10px; border: 2px dashed rgba(0, 255, 65, 0.3);">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🚧</div>
                    <h3>Under Development</h3>
                    <p>Amazing projects are being crafted with precision and innovation. Check back soon!</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Floating Code Animation
        const codeSnippets = [
            'function hack() { return true; }',
            'console.log("Hello World");',
            'if (innovation) { create(); }',
            'while (learning) { grow(); }',
            'const future = await build();',
            'npm install awesome',
            'git commit -m "Made it better"',
            'sudo rm -rf problems',
            'ping creativity.com',
            'chmod +x dreams.sh',
            './run-innovation.py',
            'docker build -t success .',
            'grep -r "talent" ./skills/',
            'curl -X POST api/inspiration',
            'python3 machine_learning.py',
        ];

        function createFloatingCode() {
            const container = document.getElementById('floating-code-container');
            const code = document.createElement('div');
            code.className = 'floating-code';
            code.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            code.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            code.style.animationDuration = (Math.random() * 10 + 15) + 's';
            code.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
            
            container.appendChild(code);
            
            setTimeout(() => {
                container.removeChild(code);
            }, 25000);
        }

        // Create floating code every 2 seconds
        setInterval(createFloatingCode, 2000);

        // Update time
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Kolkata'
            });
            document.getElementById('current-time').textContent = timeString;
        }

        // Update alive counter
        function updateAliveCounter() {
            const birthDate = new Date('2000-11-18');
            const now = new Date();
            const diff = now - birthDate;
            
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('alive-counter').textContent = 
                `Alive Since: ${years}y ${months}m ${days}d ${hours}h ${minutes}min ${seconds}s`;
        }

        // Animate signal strength
        function updateSignalStrength() {
            const bars = document.querySelectorAll('.signal-bar');
            const strength = Math.floor(Math.random() * 4) + 1;
            
            bars.forEach((bar, index) => {
                if (index < strength) {
                    bar.style.opacity = '1';
                } else {
                    bar.style.opacity = '0.3';
                }
            });
        }

        // Animate battery level
        function updateBattery() {
            const level = Math.floor(Math.random() * 40) + 60; // 60-100%
            document.getElementById('battery-level').style.width = level + '%';
            document.getElementById('battery-percent').textContent = level + '%';
            
            if (level < 20) {
                document.getElementById('battery-level').style.background = '#ff4444';
            } else {
                document.getElementById('battery-level').style.background = '#00ff41';
            }
        }

        // Network speed animation
        function updateNetworkSpeed() {
            const speeds = ['23MB/s', '45MB/s', '67MB/s', '89MB/s', '12MB/s', '34MB/s'];
            const speed = speeds[Math.floor(Math.random() * speeds.length)];
            document.querySelector('.network-speed').textContent = '↕ ' + speed;
        }

        // Page navigation
        function openPage(pageId) {
            document.getElementById('home-screen').style.transform = 'translateX(-100%)';
            document.getElementById(pageId + '-page').classList.add('active');
        }

        function goHome() {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('home-screen').style.transform = 'translateX(0)';
        }

        // Initialize everything
        updateTime();
        updateAliveCounter();
        updateSignalStrength();
        updateBattery();
        updateNetworkSpeed();

        // Update intervals
        setInterval(updateTime, 1000);
        setInterval(updateAliveCounter, 1000);
        setInterval(updateSignalStrength, 3000);
        setInterval(updateBattery, 5000);
        setInterval(updateNetworkSpeed, 4000);

        // Initial floating code
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingCode, i * 1000);
        }
    </script>
</body>
</html>
