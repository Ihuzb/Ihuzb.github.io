// 文本内容库
const texts = {
    cn: {
        easy: [
            "春眠不觉晓，处处闻啼鸟",
            "床前明月光，疑是地上霜",
            "千山鸟飞绝，万径人踪灭",
            "白日依山尽，黄河入海流",
            "谁知盘中餐，粒粒皆辛苦",
            "锄禾日当午，汗滴禾下土",
            "小荷才露尖尖角，早有蜻蜓立上头",
            "爱我中华，振兴中华",
            "学而时习之，不亦说乎",
            "今天天气真不错，适合学习打字",
            "生活就像一杯茶，需要细细品味",
            "读书破万卷，下笔如有神",
            "天下没有免费的午餐",
            "时间就是金钱，效率就是生命",
            "业精于勤，荒于嬉"
        ],
        medium: [
            "人间烟火气，最抚凡人心",
            "风急天高猿啸哀，渚清沙白鸟飞回",
            "欲穷千里目，更上一层楼",
            "海内存知己，天涯若比邻",
            "会当凌绝顶，一览众山小",
            "青山遮不住，毕竟东流去",
            "莫愁前路无知己，天下谁人不识君",
            "不要温和地走进那个良夜",
            "生活不止眼前的苟且，还有诗和远方",
            "岁月不居，时节如流",
            "人生如逆旅，我亦是行人",
            "长风破浪会有时，直挂云帆济沧海",
            "大江东去，浪淘尽，千古风流人物",
            "问君能有几多愁，恰似一江春水向东流",
            "明月几时有，把酒问青天"
        ],
        hard: [
            "纸上得来终觉浅，绝知此事要躬行",
            "学而不思则罔，思而不学则殆",
            "业精于勤，荒于嬉；行成于思，毁于随",
            "君子坦荡荡，小人长戚戚",
            "天生我材必有用，千金散尽还复来",
            "人生自古谁无死，留取丹心照汗青",
            "富贵不能淫，贫贱不能移，威武不能屈",
            "不以物喜，不以己悲，居庙堂之高则忧其民",
            "先天下之忧而忧，后天下之乐而乐",
            "位卑未敢忘忧国，事定犹须待阖棺",
            "人生得意须尽欢，莫使金樽空对月",
            "天下兴亡，匹夫有责",
            "人生如梦，一樽还酹江月",
            "落红不是无情物，化作春泥更护花",
            "大鹏一日同风起，扶摇直上九万里"
        ],
        expert: [
            "沧海月明珠有泪，蓝田日暖玉生烟，此情可待成追忆，只是当时已惘然",
            "众里寻他千百度，蓦然回首，那人却在灯火阑珊处",
            "纤云弄巧，飞星传恨，银汉迢迢暗度。金风玉露一相逢，便胜却人间无数",
            "抽刀断水水更流，举杯消愁愁更愁。人生在世不称意，明朝散发弄扁舟",
            "浮云游子意，落日故人情。挥手自兹去，萧萧班马鸣",
            "人生如逆旅，我亦是行人。苍苍竹林寺，杳杳钟声晚",
            "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪",
            "长风破浪会有时，直挂云帆济沧海。千金散尽还复来，贫贱江湖夜雨时",
            "十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉",
            "明月几时有，把酒问青天。不知天上宫阙，今夕是何年"
        ]
    },
    en: {
        easy: [
            "The quick brown fox jumps over the lazy dog",
            "Hello World! Welcome to typing practice",
            "Practice makes perfect",
            "Time is money",
            "Actions speak louder than words",
            "All good things come to those who wait",
            "Better late than never",
            "Easy come, easy go",
            "Every cloud has a silver lining",
            "First come, first served",
            "Knowledge is power",
            "Life is like a box of chocolates",
            "No pain, no gain",
            "Time and tide wait for no man",
            "Where there's a will, there's a way"
        ],
        medium: [
            "Programming is the art of telling another human what one wants",
            "Life is like riding a bicycle. To keep your balance, you must keep moving",
            "The only way to do great work is to love what you do",
            "Stay hungry, stay foolish",
            "Innovation distinguishes between a leader and a follower",
            "The future belongs to those who believe in the beauty of their dreams",
            "Success is not final, failure is not fatal",
            "Be the change you wish to see in the world",
            "The best way to predict the future is to create it",
            "Quality is not an act, it is a habit",
            "Simplicity is the ultimate sophistication",
            "Think different, think better",
            "The journey of a thousand miles begins with a single step",
            "Do what you love, love what you do",
            "Dream big, work hard, stay focused"
        ],
        hard: [
            "To be, or not to be, that is the question",
            "I think therefore I am",
            "The unexamined life is not worth living",
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit",
            "In three words I can sum up everything I've learned about life: it goes on",
            "Two roads diverged in a wood, and I took the one less traveled by",
            "It is during our darkest moments that we must focus to see the light",
            "The only impossible journey is the one you never begin",
            "Success usually comes to those who are too busy to be looking for it",
            "The best revenge is massive success",
            "Everything you've ever wanted is on the other side of fear",
            "What lies behind us and what lies before us are tiny matters",
            "The future depends on what you do today",
            "Life is what happens while you're busy making other plans",
            "The purpose of our lives is to be happy"
        ],
        expert: [
            "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
            "It does not matter how slowly you go as long as you do not stop. - Confucius",
            "Everything has beauty, but not everyone sees it. - Confucius",
            "The only true wisdom is in knowing you know nothing. - Socrates",
            "Life is really simple, but we insist on making it complicated. - Confucius",
            "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
            "The way to get started is to quit talking and begin doing. - Walt Disney",
            "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
            "If you look at what you have in life, you'll always have more. - Oprah Winfrey",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
        ]
    }
};

class TypingGame {
    constructor() {
        this.currentLanguage = 'cn';
        this.currentDifficulty = 'easy';
        this.startTime = null;
        this.correctChars = 0;
        this.currentTextIndex = 0;
        this.animationFrameId = null;
        this.lastSparkleTime = 0;

        // 缓存DOM元素
        this.textDisplay = document.getElementById('text-display');
        this.typingInput = document.getElementById('typing-input');
        this.speedDisplay = document.getElementById('speed');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.progressDisplay = document.getElementById('progress');
        this.cnBtn = document.getElementById('cnBtn');
        this.enBtn = document.getElementById('enBtn');

        // 防抖优化
        this.updateStatsDebounced = this.debounce(this.updateStats.bind(this), 100);

        this.init();
    }

    init() {
        // 使用事件委托优化事件监听
        this.cnBtn.addEventListener('click', () => this.switchLanguage('cn'));
        this.enBtn.addEventListener('click', () => this.switchLanguage('en'));

        document.getElementById('difficultyLevel').addEventListener('change', (e) => {
            this.currentDifficulty = e.target.value;
            this.loadText();
        });

        this.typingInput.addEventListener('input', this.handleInput.bind(this));

        // 初始加载文本
        this.loadText();
        // 初始设置难度文字
        this.updateDifficultyText(this.currentLanguage);
        // 初始设置难度文字和统计标签
        this.updateDifficultyText(this.currentLanguage);
        this.updateStatsLabels(this.currentLanguage);
    }

    // 添加语言切换方法
    switchLanguage(lang) {
        this.currentLanguage = lang;

        // 更新按钮状态
        this.cnBtn.classList.toggle('active', lang === 'cn');
        this.enBtn.classList.toggle('active', lang === 'en');

        // 更新难度选择的文字
        this.updateDifficultyText(lang);

        // 更新统计信息的标签文字
        this.updateStatsLabels(lang);

        // 重新加载文本
        this.loadText();

        // 重置输入和统计
        this.resetStats();
    }

    // 更新统计信息标签
    updateStatsLabels(lang) {
        // 更新所有统计标签
        document.querySelectorAll('.stat-label').forEach(label => {
            const text = label.getAttribute(`data-${lang}`);
            if (text) {
                label.textContent = text;
            }
        });

        // 更新速度单位
        document.querySelectorAll('.unit').forEach(unit => {
            const text = unit.getAttribute(`data-${lang}`);
            if (text) {
                unit.textContent = text;
            }
        });
    }
    // 添加更新难度选择文字的方法
    updateDifficultyText(lang) {
        const select = document.getElementById('difficultyLevel');
        const options = select.options;

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const text = option.getAttribute(`data-${lang}`);
            if (text) {
                option.textContent = text;
            }
        }
    }
    loadText() {
        const textArray = texts[this.currentLanguage][this.currentDifficulty];
        this.currentTextIndex = Math.floor(Math.random() * textArray.length);
        const text = textArray[this.currentTextIndex];

        // 使用 DocumentFragment 优化DOM操作
        const fragment = document.createDocumentFragment();
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            fragment.appendChild(span);
        });

        this.textDisplay.innerHTML = '';
        this.textDisplay.appendChild(fragment);
        this.resetStats();
    }

    handleInput(e) {
        if (!this.startTime) this.startTime = performance.now();

        const input = e.target.value;
        const text = texts[this.currentLanguage][this.currentDifficulty][this.currentTextIndex];

        // 使用 requestAnimationFrame 优化视觉更新
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = requestAnimationFrame(() => {
            this.updateDisplay(input, text);
            this.updateStatsDebounced(input, text);
        });

        // 检查是否完成并且100%正确
        if (input === text) {
            console.log("Text matched! Triggering completion effects..."); // 调试日志
            this.handleCompletion();
            e.target.value = ''; // 清空输入框
        }
    }

    updateDisplay(input, text) {
        const chars = this.textDisplay.children;
        const inputChars = input.split('');

        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            if (i >= inputChars.length) {
                char.className = 'char';
            } else if (inputChars[i] === text[i]) {
                char.className = 'char correct';
                // 优化特效触发频率
                this.createSparkleThrottled(char);
            } else {
                char.className = 'char incorrect';
            }
        }
    }

    createSparkleThrottled(char) {
        const now = performance.now();
        if (now - this.lastSparkleTime > 100) {
            this.lastSparkleTime = now;
            this.createSparkle(char);
        }
    }

    createSparkle(char) {
        const rect = char.getBoundingClientRect();
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${rect.left}px`;
        sparkle.style.top = `${rect.top}px`;
        sparkle.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);
    }

    // 重置统计
    resetStats() {
        this.startTime = null;
        this.correctChars = 0;

        requestAnimationFrame(() => {
            this.speedDisplay.innerHTML = `0 <span class="unit">${this.currentLanguage === 'cn' ? '字/分' : 'WPM'
                }</span>`;
            this.accuracyDisplay.textContent = '100%';
            this.progressDisplay.textContent = '0%';
        });

        if (this.typingInput) {
            this.typingInput.value = '';
        }

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    updateStats(input, text) {
        const timeElapsed = (performance.now() - this.startTime) / 1000 / 60;

        // 根据语言计算速度
        let speed;
        if (this.currentLanguage === 'cn') {
            // 中文模式：按字数计算
            speed = Math.round(input.length / timeElapsed);
        } else {
            // 英文模式：按单词数计算（假设平均每5个字符为一个单词）
            speed = Math.round((input.length / 5) / timeElapsed);
        }

        // 计算正确率
        let correctCount = 0;
        const inputLength = input.length;
        for (let i = 0; i < inputLength; i++) {
            if (input[i] === text[i]) correctCount++;
        }

        const accuracy = Math.round((correctCount / (inputLength || 1)) * 100);
        const progress = Math.round((inputLength / text.length) * 100);

        // 更新显示
        requestAnimationFrame(() => {
            this.speedDisplay.innerHTML = `${speed} <span class="unit">${this.currentLanguage === 'cn' ? '字/分' : 'WPM'
                }</span>`;
            this.accuracyDisplay.textContent = `${accuracy}%`;
            this.progressDisplay.textContent = `${progress}%`;
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleCompletion() {
        console.log("Handling completion..."); // 调试日志
        // 创建烟花容器
        const fireworksContainer = document.createElement('div');
        fireworksContainer.className = 'fireworks-container';
        document.body.appendChild(fireworksContainer);

        // 启动烟花动画
        this.createMultipleFireworks(fireworksContainer);
        this.showCompletionText();

        // 延迟加载新文本
        setTimeout(() => {
            fireworksContainer.remove();
            this.loadText();
        }, 2000);
    }
    createMultipleFireworks(container) {
        console.log("Creating multiple fireworks..."); // 调试日志
        const positions = [
            { x: 0.2, y: 0.6 },
            { x: 0.5, y: 0.5 },
            { x: 0.8, y: 0.6 },
            { x: 0.35, y: 0.4 },
            { x: 0.65, y: 0.4 }
        ];

        positions.forEach((pos, index) => {
            setTimeout(() => {
                const x = pos.x * window.innerWidth;
                const y = pos.y * window.innerHeight;
                this.createSingleFirework(container, x, y);
            }, index * 200);
        });
    }

    createSingleFirework(container, x, y) {
        console.log(`Creating firework at ${x}, ${y}`); // 调试日志
        const colors = [
            '#ff0',
            '#f0f',
            '#0ff',
            '#0f0',
            '#ff4444',
            '#4444ff',
            '#ff8800',
            '#00ff88'
        ];

        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        container.appendChild(firework);

        // 创建粒子
        for (let i = 0; i < 36; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';

            // 随机颜色
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 6px ${color}`;

            // 计算粒子轨迹
            const angle = (i * 10) * Math.PI / 180;
            const velocity = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            firework.appendChild(particle);
        }

        // 清理烟花
        setTimeout(() => {
            firework.remove();
        }, 1500);
    }
    showCompletionText() {
        const messages = {
            cn: ['太棒了！', '完美！', '厉害！', '真不错！', '继续加油！'],
            en: ['Perfect!', 'Excellent!', 'Amazing!', 'Great job!', 'Keep going!']
        };

        const text = document.createElement('div');
        text.className = 'completion-text';
        text.textContent = messages[this.currentLanguage][
            Math.floor(Math.random() * messages[this.currentLanguage].length)
        ];

        document.body.appendChild(text);

        setTimeout(() => {
            text.remove();
        }, 2000);
    }

}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new TypingGame();
});