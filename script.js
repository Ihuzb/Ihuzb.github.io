class SolarSystem {
    constructor() {
        this.canvas = document.getElementById('orbitCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0; // 时间偏移量(秒)
        this.timeSpeed = 1; // 时间倍数
        this.isPaused = false;
        this.animationId = null;
        
        // 设置当前日期时间为基准
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate);
        
        // 初始化缩放级别
        this.scale = 1;
        
        // 初始化播放按钮状态
        this.initPlayPauseButton();
        
        // 行星数据: [名称, 距离(天文单位), 周期(年), 颜色, 半径(像素), 轨道倾角(弧度)]
        // 调整了内行星的轨道比例，使它们更加分散
        this.planets = [
            ['水星', 0.39, 0.24, '#8C7853', 3, 0.12],
            ['金星', 0.72, 0.62, '#FFC649', 5, 0.06],
            ['地球', 1.00, 1.00, '#6699FF', 6, 0],
            ['火星', 1.52, 1.88, '#FF5800', 4, 0.03],
            ['木星', 5.20, 11.86, '#D8CA9D', 12, 0.02],
            ['土星', 9.54, 29.46, '#F0E6A2', 10, 0.09],
            ['天王星', 19.18, 84.01, '#4FD0E7', 8, 0.17],
            ['海王星', 30.06, 164.8, '#4876FF', 8, 0.11]
        ];
        
        // 月球数据: [名称, 距离(地球半径), 周期(天), 颜色, 半径(像素), 轨道倾角(弧度)]
        this.moon = ['月球', 60, 27.3, '#DDDDDD', 2, 0.08];
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.initControls();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initPlayPauseButton() {
        const playPauseBtn = document.getElementById('playPause');
        if (!this.isPaused) {
            playPauseBtn.textContent = '⏸';
        } else {
            playPauseBtn.textContent = '▶';
        }
    }
    
    // 重置时间为当前时间
    resetToCurrentTime() {
        this.startDate = new Date();
        this.time = 0;
        
        // 重置倍数为1
        this.timeSpeed = 1;
        document.getElementById('speed').value = 1;
        
        // 不重置缩放级别，保持当前缩放比例
        
        // 重新初始化播放按钮状态
        this.initPlayPauseButton();
        
        // 如果当前已暂停，重新开始动画
        if (this.isPaused) {
            this.isPaused = false;
            if (!this.animationId) {
                this.animate();
            }
        }
    }
    
    initControls() {
        document.getElementById('rewind').addEventListener('click', () => {
            // 设置为反向，保持当前倍数
            const speed = Math.abs(this.timeSpeed);
            this.timeSpeed = -speed;
        });
        
        document.getElementById('playPause').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('fastForward').addEventListener('click', () => {
            // 设置为正向，保持当前倍数
            const speed = Math.abs(this.timeSpeed);
            this.timeSpeed = speed;
        });
        
        // 添加缩放功能按钮事件处理
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.scale *= 1.2; // 放大20%
        });
        
        document.getElementById('zoomOut').addEventListener('click', () => {
            this.scale /= 1.2; // 缩小20%
            // 限制最小缩放级别
            if (this.scale < 0.1) {
                this.scale = 0.1;
            }
        });
        
        // 添加回到当前时间按钮事件处理
        document.getElementById('resetTime').addEventListener('click', () => {
            this.resetToCurrentTime();
        });
        
        document.getElementById('speed').addEventListener('change', (e) => {
            const speed = parseFloat(e.target.value);
            if (!isNaN(speed)) {
                // 直接设置timeSpeed，保留正负号
                this.timeSpeed = speed;
            }
        });
        
        // 初始化按钮状态
        this.initPlayPauseButton();
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        const playPauseBtn = document.getElementById('playPause');
        
        if (this.isPaused) {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            playPauseBtn.textContent = '▶';
        } else {
            if (!this.animationId) {
                this.animate();
            }
            playPauseBtn.textContent = '⏸';
        }
    }
    
    drawSun() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const sunRadius = 25 * this.scale;
        
        // 绘制太阳核心
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
        const sunGradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, sunRadius
        );
        sunGradient.addColorStop(0, '#FFFF00');
        sunGradient.addColorStop(0.7, '#FFA500');
        sunGradient.addColorStop(1, '#FF4500');
        this.ctx.fillStyle = sunGradient;
        this.ctx.fill();
        
        // 绘制太阳日冕
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, sunRadius + 15 * this.scale, 0, Math.PI * 2);
        const coronaGradient = this.ctx.createRadialGradient(
            centerX, centerY, sunRadius,
            centerX, centerY, sunRadius + 15 * this.scale
        );
        coronaGradient.addColorStop(0, 'rgba(255, 165, 0, 0.5)');
        coronaGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
        this.ctx.fillStyle = coronaGradient;
        this.ctx.fill();
        
        // 移除了太阳耀斑动画效果，保持静态显示
    }
    
    drawOrbits() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const maxOrbit = Math.min(this.canvas.width, this.canvas.height) * 0.45;
        
        // 绘制行星轨道
        for (let i = 0; i < this.planets.length; i++) {
            const planet = this.planets[i];
            // 使用对数缩放来更好地显示内行星的轨道差异
            const orbitRadius = (Math.log(planet[1] + 1) / Math.log(11)) * maxOrbit * this.scale;
            const inclination = planet[5] || 0; // 轨道倾角
            
            this.ctx.beginPath();
            
            // 绘制椭圆轨道
            for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
                const x = orbitRadius * Math.cos(angle);
                const y = orbitRadius * Math.sin(angle) * Math.cos(inclination);
                
                if (angle === 0) {
                    this.ctx.moveTo(centerX + x, centerY + y);
                } else {
                    this.ctx.lineTo(centerX + x, centerY + y);
                }
            }
            
            this.ctx.closePath();
            // 统一轨道颜色和透明度方案
            const baseAlpha = 0.15;
            const alphaIncrement = 0.03;
            this.ctx.strokeStyle = `rgba(100, 150, 255, ${baseAlpha + alphaIncrement * i})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
    
    // 将日期转换为儒略日
    dateToJulian(date) {
        const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 
                                date.getHours(), date.getMinutes(), date.getSeconds());
        return (utcDate / 86400000) + 2440587.5;
    }
    
    // 计算行星在轨道上的位置 (简化版本)
    calculatePlanetPosition(planet, julianDate) {
        // 这里使用简化的计算方法，实际应用中需要更精确的星历表
        // 对于内行星，我们使用简化的轨道力学计算
        const daysSinceEpoch = julianDate - 2451545.0; // J2000.0历元
        
        // 每颗行星的平均角速度 (弧度/天)
        const meanMotions = {
            '水星': 0.01720209895 * 4.15,
            '金星': 0.01720209895 * 1.62,
            '地球': 0.01720209895,
            '火星': 0.01720209895 * 0.53,
            '木星': 0.01720209895 * 0.084,
            '土星': 0.01720209895 * 0.034,
            '天王星': 0.01720209895 * 0.012,
            '海王星': 0.01720209895 * 0.006
        };
        
        const meanMotion = meanMotions[planet[0]] || 0.01720209895;
        const meanAnomaly = (daysSinceEpoch * meanMotion) % (Math.PI * 2);
        
        return meanAnomaly;
    }
    
    // 计算月球在轨道上的位置 (简化版本)
    calculateMoonPosition(earthX, earthY, julianDate) {
        // 这里使用简化的计算方法
        const daysSinceEpoch = julianDate - 2451545.0; // J2000.0历元
        
        // 月球的平均角速度 (弧度/天)
        const meanMotion = 2 * Math.PI / 27.3; // 约27.3天一周
        const meanAnomaly = (daysSinceEpoch * meanMotion) % (Math.PI * 2);
        
        return {
            angle: meanAnomaly,
            x: earthX,
            y: earthY
        };
    }
    
    drawPlanets() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const maxOrbit = Math.min(this.canvas.width, this.canvas.height) * 0.45;
        
        // 计算当前时间对应的儒略日
        const currentDate = new Date(this.startDate.getTime() + this.time * 1000);
        const julianDate = this.dateToJulian(currentDate);
        
        // 保存地球位置用于绘制月球
        let earthX = 0;
        let earthY = 0;
        
        for (let i = 0; i < this.planets.length; i++) {
            const planet = this.planets[i];
            // 使用对数缩放来更好地显示内行星的轨道差异
            const orbitRadius = (Math.log(planet[1] + 1) / Math.log(11)) * maxOrbit * this.scale;
            const inclination = planet[5] || 0;
            
            // 计算行星在轨道上的位置
            const angle = this.calculatePlanetPosition(planet, julianDate);
            
            const x = centerX + orbitRadius * Math.cos(angle);
            const y = centerY + orbitRadius * Math.sin(angle) * Math.cos(inclination);
            
            // 保存地球位置
            if (planet[0] === '地球') {
                earthX = x;
                earthY = y;
            }
            
            // 绘制行星光晕
            const gradient = this.ctx.createRadialGradient(
                x, y, 0,
                x, y, (planet[4] + 5) * this.scale
            );
            gradient.addColorStop(0, planet[3]);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, planet[4] * this.scale + 5, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // 绘制行星
            this.ctx.beginPath();
            this.ctx.arc(x, y, planet[4] * this.scale, 0, Math.PI * 2);
            
            // 为行星创建更真实的渐变效果
            const planetGradient = this.ctx.createRadialGradient(
                x - (planet[4] * this.scale) / 3, y - (planet[4] * this.scale) / 3, 0,
                x, y, planet[4] * this.scale
            );
            
            // 根据行星颜色调整渐变
            if (planet[3] === '#6699FF') { // 地球
                planetGradient.addColorStop(0, '#88bbff');
                planetGradient.addColorStop(1, '#4477dd');
            } else if (planet[3] === '#FF5800') { // 火星
                planetGradient.addColorStop(0, '#ff7733');
                planetGradient.addColorStop(1, '#cc4400');
            } else {
                planetGradient.addColorStop(0, planet[3]);
                const r = parseInt(planet[3].substr(1, 2), 16);
                const g = parseInt(planet[3].substr(3, 2), 16);
                const b = parseInt(planet[3].substr(5, 2), 16);
                const darkerColor = `rgb(${Math.max(0, r-30)}, ${Math.max(0, g-30)}, ${Math.max(0, b-30)})`;
                planetGradient.addColorStop(1, darkerColor);
            }
            
            this.ctx.fillStyle = planetGradient;
            this.ctx.fill();
            
            // 绘制行星名称
            this.ctx.fillStyle = '#00ffff';
            this.ctx.font = '14px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textShadow = '0 0 5px rgba(0, 255, 255, 0.7)';
            this.ctx.fillText(planet[0], x, y - (planet[4] * this.scale) - 15);
            this.ctx.textShadow = 'none';
        }
        
        // 绘制月球和月球轨道（如果地球位置已确定）
        if (earthX !== 0 && earthY !== 0) {
            this.drawMoon(earthX, earthY, julianDate, maxOrbit);
        }
    }
    
    drawMoon(earthX, earthY, julianDate, maxOrbit) {
        // 月球轨道参数
        const moon = this.moon;
        
        // 计算符合整体比例的月球轨道半径
        // 地球到太阳的距离为1 AU，月球到地球的距离约为0.0026 AU
        // 使用与行星相同的对数缩放方式，但保持真实比例关系
        const earthOrbitRadius = (Math.log(1.0 + 1) / Math.log(11)) * maxOrbit * this.scale;
        
        // 根据真实比例计算月球轨道半径
        // 月球轨道半径应该是地球轨道半径的0.0026倍
        // 但为了可视化效果，我们使用一个更合理的比例
        const moonOrbitRadius = earthOrbitRadius * 0.1; // 约为地球轨道半径的10%
        
        // 计算月球在轨道上的位置
        const moonAngle = this.calculateMoonPosition(earthX, earthY, julianDate).angle;
        
        // 月球位置
        const moonX = earthX + moonOrbitRadius * Math.cos(moonAngle);
        const moonY = earthY + moonOrbitRadius * Math.sin(moonAngle);
        
        // 绘制月球轨道（使用与行星轨道相同的椭圆绘制方式）
        this.ctx.beginPath();
        
        // 绘制椭圆轨道
        for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
            const x = moonOrbitRadius * Math.cos(angle);
            const y = moonOrbitRadius * Math.sin(angle) * Math.cos(moon[5] || 0);
            
            if (angle === 0) {
                this.ctx.moveTo(earthX + x, earthY + y);
            } else {
                this.ctx.lineTo(earthX + x, earthY + y);
            }
        }
        
        this.ctx.closePath();
        // 使用与行星轨道相似的颜色和透明度方案
        this.ctx.strokeStyle = 'rgba(100, 150, 255, 0.25)'; // 稍微增加透明度以区分月球轨道
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // 绘制月球
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moon[4] * this.scale, 0, Math.PI * 2);
        this.ctx.fillStyle = moon[3];
        this.ctx.fill();
        
        // 绘制月球光晕
        const moonGradient = this.ctx.createRadialGradient(
            moonX, moonY, 0,
            moonX, moonY, (moon[4] + 3) * this.scale
        );
        moonGradient.addColorStop(0, 'rgba(221, 221, 221, 0.8)');
        moonGradient.addColorStop(1, 'rgba(221, 221, 221, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, (moon[4] + 3) * this.scale, 0, Math.PI * 2);
        this.ctx.fillStyle = moonGradient;
        this.ctx.fill();
    }
    
    updateTimeDisplay() {
        // 将秒数转换为日期
        this.currentDate = new Date(this.startDate.getTime() + this.time * 1000);
        
        // 格式化日期时间显示
        const year = this.currentDate.getFullYear();
        const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(this.currentDate.getDate()).padStart(2, '0');
        const hours = String(this.currentDate.getHours()).padStart(2, '0');
        const minutes = String(this.currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(this.currentDate.getSeconds()).padStart(2, '0');
        
        document.getElementById('time-display').textContent = 
            `时间: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    animate() {
        if (!this.isPaused) {
            // 1倍速下时间正常流逝，不进行加速处理
            // 其他倍数下按立方关系加速
            if (Math.abs(this.timeSpeed) === 1) {
                this.time += this.timeSpeed; // 1倍速下每帧增加或减少1秒
            } else {
                // 保持时间流逝方向
                const direction = this.timeSpeed < 0 ? -1 : 1;
                const delta = direction * Math.pow(Math.abs(this.timeSpeed), 20);
                this.time += delta;
            }
        }
        
        // 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制星空背景
        this.drawStars();
        
        // 绘制轨道和天体
        this.drawOrbits();
        this.drawSun();
        this.drawPlanets();
        
        // 更新时间显示
        this.updateTimeDisplay();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawStars() {
        // 绘制深空星空背景
        if (!this.stars) {
            this.stars = [];
            // 创建更多星星
            for (let i = 0; i < 500; i++) {
                this.stars.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 2,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
            
            // 添加一些星云
            this.nebulas = [];
            for (let i = 0; i < 5; i++) {
                this.nebulas.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: 50 + Math.random() * 100,
                    color: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 150)}, ${Math.random() * 0.05 + 0.02})`
                });
            }
        }
        
        // 绘制星云
        for (let i = 0; i < this.nebulas.length; i++) {
            const nebula = this.nebulas[i];
            const gradient = this.ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.radius
            );
            gradient.addColorStop(0, nebula.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.beginPath();
            this.ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }
        
        // 绘制闪烁的星星
        const time = Date.now() / 1000;
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            // 更新闪烁效果
            const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
            const opacity = star.opacity * twinkle;
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // 为亮星添加光晕
            if (star.opacity > 0.6 && star.size > 1) {
                const haloGradient = this.ctx.createRadialGradient(
                    star.x, star.y, star.size,
                    star.x, star.y, star.size * 3
                );
                haloGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`);
                haloGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = haloGradient;
                this.ctx.fill();
            }
        }
    }
}

// 初始化太阳系
window.addEventListener('load', () => {
    new SolarSystem();
});