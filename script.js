document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 加载完成');

    // 1. 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. 导航栏滚动效果
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('py-2', 'shadow-lg');
                header.classList.remove('py-3', 'shadow-md');
            } else {
                header.classList.add('py-3', 'shadow-md');
                header.classList.remove('py-2', 'shadow-lg');
            }
        });
    }

    // 3. 历史图片滑动导航
    const slider = document.getElementById('history-slider');
    const prevBtn = document.getElementById('prev-history');
    const nextBtn = document.getElementById('next-history');
    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // 4. 锚点平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 5. 图表初始化函数
    function initCharts() {
        try {
            // 战争时长柱状图
            const warDurationCtx = document.getElementById('warDurationChart');
            if (warDurationCtx) {
                new Chart(warDurationCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['阿富汗战争', '伊拉克战争', '越南战争', '二战', '朝鲜战争', '一战', '海湾战争'],
                        datasets: [{
                            label: '持续时间（年）',
                            data: [19, 18, 14, 5, 4, 1, 0.7],
                            backgroundColor: [
                                'rgba(26, 54, 93, 0.8)',
                                'rgba(26, 54, 93, 0.8)',
                                'rgba(26, 54, 93, 0.8)',
                                'rgba(26, 54, 93, 0.8)',
                                'rgba(26, 54, 93, 0.8)',
                                'rgba(26, 54, 93, 0.8)',
                                'rgba(229, 62, 62, 0.8)'
                            ],
                            borderColor: [
                                'rgba(26, 54, 93, 1)',
                                'rgba(26, 54, 93, 1)',
                                'rgba(26, 54, 93, 1)',
                                'rgba(26, 54, 93, 1)',
                                'rgba(26, 54, 93, 1)',
                                'rgba(26, 54, 93, 1)',
                                'rgba(229, 62, 62, 1)'
                            ],
                            borderWidth: 1,
                            borderRadius: 6,
                            barPercentage: 0.6,
                            categoryPercentage: 0.7
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: '年'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                titleFont: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                bodyFont: {
                                    size: 13
                                },
                                padding: 12,
                                cornerRadius: 8
                            }
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeOutQuart'
                        }
                    }
                });
                console.log('战争时长图表初始化成功');
            } else {
                console.error('未找到战争时长图表的canvas元素');
            }

            // 战争成本面积图
            const warCostCtx = document.getElementById('warCostChart');
            if (warCostCtx) {
                new Chart(warCostCtx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2001', '2003', '2005', '2007', '2009', '2011', '2013', '2015', '2017', '2019', '2021', '2023'],
                        datasets: [{
                            label: '阿富汗战争',
                            data: [20, 100, 220, 350, 550, 750, 850, 900, 950, 975, 985, 2.3e3],
                            borderColor: 'rgba(129, 230, 217, 1)',
                            backgroundColor: 'rgba(129, 230, 217, 0.3)',
                            tension: 0.4,
                            fill: true
                        }, {
                            label: '伊拉克战争',
                            data: [0, 50, 150, 300, 500, 700, 800, 850, 875, 890, 900, 2.1e3],
                            borderColor: 'rgba(16, 185, 129, 1)',
                            backgroundColor: 'rgba(16, 185, 129, 0.3)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: '成本（十亿美元）'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return value >= 1000 ? value / 1000 + 'T' : value + 'B';
                                    }
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let value = context.raw;
                                        let suffix = 'B';
                                        if (value >= 1000) {
                                            value = value / 1000;
                                            suffix = 'T';
                                        }
                                        return `${context.dataset.label}: $${value}${suffix}`;
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('战争成本图表初始化成功');
            } else {
                console.error('未找到战争成本图表的canvas元素');
            }

            // 军售收入折线图
            const armsSalesCtx = document.getElementById('armsSalesChart');
            if (armsSalesCtx) {
                new Chart(armsSalesCtx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                        datasets: [{
                            label: '全球军售总额',
                            data: [42.8, 45.6, 48.5, 51.3, 55.9, 58.7, 61.2, 65.8, 70.4, 76.5, 82.3],
                            borderColor: 'rgba(139, 92, 246, 1)',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            tension: 0.3,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: '金额（十亿美元）'
                                }
                            }
                        }
                    }
                });
                console.log('军售收入图表初始化成功');
            } else {
                console.error('未找到军售收入图表的canvas元素');
            }

            // 军事投资与基地数量图
            const investmentBasesCtx = document.getElementById('investmentBasesChart');
            if (investmentBasesCtx) {
                new Chart(investmentBasesCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['美国', '中国', '俄罗斯', '英国', '印度', '法国', '德国', '日本', '韩国', '沙特阿拉伯'],
                        datasets: [{
                            label: '军事投资（十亿美元）',
                            data: [877, 293, 86, 68, 77, 63, 55, 54, 46, 42],
                            backgroundColor: 'rgba(59, 130, 246, 0.7)',
                            yAxisID: 'y'
                        }, {
                            label: '海外军事基地数量',
                            data: [750, 5, 25, 14, 0, 10, 0, 1, 26, 0],
                            backgroundColor: 'rgba(249, 115, 22, 0.7)',
                            yAxisID: 'y1'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: '投资（十亿美元）'
                                },
                                position: 'left'
                            },
                            y1: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: '基地数量'
                                },
                                position: 'right',
                                grid: {
                                    drawOnChartArea: false
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        }
                    }
                });
                console.log('军事投资与基地数量图表初始化成功');
            } else {
                console.error('未找到军事投资与基地数量图表的canvas元素');
            }

            // 基地数量堆叠面积图
            const basesStackedAreaCtx = document.getElementById('basesStackedAreaChart');
            if (basesStackedAreaCtx) {
                new Chart(basesStackedAreaCtx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
                        datasets: [{
                            label: '美国',
                            data: [800, 780, 760, 740, 730, 720, 730, 750],
                            borderColor: 'rgba(59, 130, 246, 1)',
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            tension: 0.3,
                            fill: true
                        }, {
                            label: '俄罗斯',
                            data: [20, 22, 23, 24, 25, 24, 25, 25],
                            borderColor: 'rgba(239, 68, 68, 1)',
                            backgroundColor: 'rgba(239, 68, 68, 0.5)',
                            tension: 0.3,
                            fill: true
                        }, {
                            label: '中国',
                            data: [0, 0, 1, 2, 3, 4, 5, 5],
                            borderColor: 'rgba(16, 185, 129, 1)',
                            backgroundColor: 'rgba(16, 185, 129, 0.5)',
                            tension: 0.3,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                stacked: true,
                                title: {
                                    display: true,
                                    text: '海外基地数量'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        }
                    }
                });
                console.log('基地数量堆叠面积图表初始化成功');
            } else {
                console.error('未找到基地数量堆叠面积图表的canvas元素');
            }

            // 军队信任度折线图
            const militaryTrustCtx = document.getElementById('militaryTrustChart');
            if (militaryTrustCtx) {
                new Chart(militaryTrustCtx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024', '2025'],
                        datasets: [{
                            label: '对军队的信任度（百分比）',
                            data: [78, 76, 74, 72, 69, 64, 60, 57, 55],
                            borderColor: 'rgba(229, 62, 62, 1)',
                            backgroundColor: 'rgba(229, 62, 62, 0.1)',
                            tension: 0.3,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 50,
                                max: 100,
                                title: {
                                    display: true,
                                    text: '信任度百分比 (%)'
                                }
                            }
                        }
                    }
                });
                console.log('军队信任度图表初始化成功');
            } else {
                console.error('未找到军队信任度图表的canvas元素');
            }

            // 军事干预支持率折线图
            const interventionSupportCtx = document.getElementById('interventionSupportChart');
            if (interventionSupportCtx) {
                new Chart(interventionSupportCtx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['2001', '2003', '2005', '2007', '2009', '2011', '2013', '2015', '2017', '2019', '2021', '2023'],
                        datasets: [{
                            label: '军事干预支持率',
                            data: [85, 75, 60, 55, 50, 45, 40, 35, 30, 32, 35, 40],
                            borderColor: 'rgba(249, 115, 22, 1)',
                            backgroundColor: 'rgba(249, 115, 22, 0.1)',
                            tension: 0.3,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 0,
                                max: 100,
                                title: {
                                    display: true,
                                    text: '支持率百分比 (%)'
                                }
                            }
                        }
                    }
                });
                console.log('军事干预支持率图表初始化成功');
            } else {
                console.error('未找到军事干预支持率图表的canvas元素');
            }
        } catch (error) {
            console.error('图表初始化过程中发生错误:', error);
        }
    }

    // 6. 人员伤亡可视化
    function initCasualtyVisualization() {
        try {
            const casualtyData = {
                afghanistan: {
                    "陆军": 1570,
                    "海军": 428,
                    "空军": 460,
                    "海军陆战队": 2358,
                    "海岸警卫队": 14
                },
                iraq: {
                    "陆军": 3500,
                    "海军": 145,
                    "空军": 238,
                    "海军陆战队": 1410,
                    "海岸警卫队": 3
                }
            };

            const services = ["陆军", "海军", "空军", "海军陆战队", "海岸警卫队"];
            const serviceColors = {
                "陆军": "rgba(139, 92, 246, 0.8)",
                "海军": "rgba(59, 130, 246, 0.8)",
                "空军": "rgba(249, 115, 22, 0.8)",
                "海军陆战队": "rgba(239, 68, 68, 0.8)",
                "海岸警卫队": "rgba(16, 185, 129, 0.8)"
            };

            // 生成阿富汗伤亡图标
            const afghanistanContainer = document.getElementById('afghanistan-casualties');
            if (afghanistanContainer) {
                services.forEach(service => {
                    const count = casualtyData.afghanistan[service];
                    const groups = Math.ceil(count / 1000);
                    const serviceContainer = document.createElement('div');
                    serviceContainer.className = 'military-rank';
                    serviceContainer.innerHTML = `
                        <div class="text-center font-medium mb-2 text-sm">${service}</div>
                        <div class="grid grid-cols-5 gap-1">
                            ${Array(groups).fill().map((_, i) => `
                                <div class="personnel-dot bg-white rounded-sm shadow-md h-6 w-6 flex items-center justify-center text-xs text-white" 
                                     style="background-color: ${serviceColors[service]}">
                                    ${i < Math.floor(count / 1000) ? '1000' : count % 1000}
                                </div>
                            `).join('')}
                        </div>
                        <div class="text-center text-xs mt-1">${count}人</div>
                    `;
                    afghanistanContainer.appendChild(serviceContainer);
                });
            } else {
                console.error('未找到阿富汗伤亡图表的容器元素');
            }

            // 生成伊拉克伤亡图标
            const iraqContainer = document.getElementById('iraq-casualties');
            if (iraqContainer) {
                services.forEach(service => {
                    const count = casualtyData.iraq[service];
                    const groups = Math.ceil(count / 1000);
                    const serviceContainer = document.createElement('div');
                    serviceContainer.className = 'military-rank';
                    serviceContainer.innerHTML = `
                        <div class="text-center font-medium mb-2 text-sm">${service}</div>
                        <div class="grid grid-cols-5 gap-1">
                            ${Array(groups).fill().map((_, i) => `
                                <div class="personnel-dot bg-white rounded-sm shadow-md h-6 w-6 flex items-center justify-center text-xs text-white" 
                                     style="background-color: ${serviceColors[service]}">
                                    ${i < Math.floor(count / 1000) ? '1000' : count % 1000}
                                </div>
                            `).join('')}
                        </div>
                        <div class="text-center text-xs mt-1">${count}人</div>
                    `;
                    iraqContainer.appendChild(serviceContainer);
                });
            } else {
                console.error('未找到伊拉克伤亡图表的容器元素');
            }
        } catch (error) {
            console.error('人员伤亡可视化过程中发生错误:', error);
        }
    }

    // 7. 交互式地图模拟
    function initInteractiveMap() {
        try {
            const mapContainer = document.getElementById('arms-map');
            if (mapContainer) {
                setTimeout(() => {
                    mapContainer.innerHTML = `
                        <svg viewBox="0 0 1000 500" class="w-full h-full">
                            <!-- 简化的世界地图轮廓 -->
                            <path d="M200,100 Q400,50 600,100 T1000,200 Q900,300 800,400 T400,450 Q200,350 100,250 T0,150 Q100,50 200,100" 
                                  fill="#E2E8F0" stroke="#CBD5E0" stroke-width="1" />
                            
                            <!-- 美国（军售来源） -->
                            <circle cx="250" cy="200" r="15" fill="#1A365D" stroke="#fff" stroke-width="2" class="arms-source" />
                            <text x="250" y="190" text-anchor="middle" fill="white" font-size="12">美国</text>
                            
                            <!-- 军售目的地 -->
                            <circle cx="700" cy="150" r="10" fill="#3B82F6" stroke="#fff" stroke-width="1.5" class="arms-destination" data-country="沙特阿拉伯" data-value="2023年: $65亿" />
                            <circle cx="800" cy="250" r="8" fill="#3B82F6" stroke="#fff" stroke-width="1.5" class="arms-destination" data-country="印度" data-value="2023年: $42亿" />
                            <circle cx="650" cy="300" r="7" fill="#3B82F6" stroke="#fff" stroke-width="1.5" class="arms-destination" data-country="阿联酋" data-value="2023年: $38亿" />
                            <circle cx="450" cy="250" r="6" fill="#3B82F6" stroke="#fff" stroke-width="1.5" class="arms-destination" data-country="埃及" data-value="2023年: $28亿" />
                            <circle cx="750" cy="350" r="7" fill="#3B82F6" stroke="#fff" stroke-width="1.5" class="arms-destination" data-country="澳大利亚" data-value="2023年: $25亿" />
                            
                            <!-- 军售路线 -->
                            <path d="M250,200 Q450,120 700,150" stroke="#3B82F6" stroke-width="1" fill="none" stroke-dasharray="5,3" />
                            <path d="M250,200 Q550,180 800,250" stroke="#3B82F6" stroke-width="1" fill="none" stroke-dasharray="5,3" />
                            <path d="M250,200 Q450,220 650,300" stroke="#3B82F6" stroke-width="1" fill="none" stroke-dasharray="5,3" />
                            <path d="M250,200 Q350,230 450,250" stroke="#3B82F6" stroke-width="1" fill="none" stroke-dasharray="5,3" />
                            <path d="M250,200 Q550,280 750,350" stroke="#3B82F6" stroke-width="1" fill="none" stroke-dasharray="5,3" />
                        </svg>
                        <div id="map-tooltip" class="hidden absolute bg-white p-2 rounded shadow-lg text-sm z-10 pointer-events-none">
                            <div id="tooltip-country" class="font-bold"></div>
                            <div id="tooltip-value"></div>
                        </div>
                    `;

                    // 地图悬停提示
                    const tooltip = document.getElementById('map-tooltip');
                    if (tooltip) {
                        document.querySelectorAll('.arms-destination').forEach(dot => {
                            dot.addEventListener('mouseover', function(e) {
                                const country = this.getAttribute('data-country');
                                const value = this.getAttribute('data-value');
                                if (tooltip.querySelector('#tooltip-country') && tooltip.querySelector('#tooltip-value')) {
                                    tooltip.querySelector('#tooltip-country').textContent = country;
                                    tooltip.querySelector('#tooltip-value').textContent = value;
                                    tooltip.style.left = (e.pageX + 10) + 'px';
                                    tooltip.style.top = (e.pageY + 10) + 'px';
                                    tooltip.classList.remove('hidden');
                                }
                            });
                            dot.addEventListener('mouseout', function() {
                                tooltip.classList.add('hidden');
                            });
                        });
                    } else {
                        console.error('未找到地图提示框元素');
                    }
                }, 1500); // 模拟加载延迟
            } else {
                console.error('未找到军售地图容器元素');
            }
        } catch (error) {
            console.error('交互式地图初始化过程中发生错误:', error);
        }
    }

    // 8. 滚动动画效果
    function initScrollAnimations() {
        try {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-float');
                        observer.unobserve(entry.target);
                    }
                });
            });

            const timelineItems = document.querySelectorAll('.timeline-item');
            if (timelineItems.length > 0) {
                timelineItems.forEach(item => {
                    observer.observe(item);
                });
            } else {
                console.error('未找到时间线项目元素');
            }
        } catch (error) {
            console.error('滚动动画初始化过程中发生错误:', error);
        }
    }

    // 初始化所有功能
    initCharts();
    initCasualtyVisualization();
    initInteractiveMap();
    initScrollAnimations();

    console.log('所有初始化函数已执行');
});