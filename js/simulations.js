// ========================================
// SIMULATIONS.JS - Все симуляции
// ========================================

// ===== РАВНОМЕРНОЕ ДВИЖЕНИЕ =====
function startUniformSimulation() {
    const x0 = parseFloat(document.getElementById('uniform-x0').value);
    const v = parseFloat(document.getElementById('uniform-v').value);
    const t = parseFloat(document.getElementById('uniform-t').value);
    
    // Расчеты
    const s = v * t;
    const finalX = x0 + s;
    
    // Обновить результаты
    document.getElementById('uniform-result-x0').textContent = x0.toFixed(2);
    document.getElementById('uniform-result-v').textContent = v.toFixed(2);
    document.getElementById('uniform-result-t').textContent = t.toFixed(2);
    document.getElementById('uniform-result-s').textContent = s.toFixed(2);
    document.getElementById('uniform-result-x').textContent = finalX.toFixed(2);
    
    // Отрисовка основной симуляции
    const canvas = document.getElementById('uniform-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const startX = 50;
    const startY = canvas.height / 2;
    const scale = (canvas.width - 100) / Math.max(finalX, 100);
    
    // Сетка
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        const x = 50 + i * (canvas.width - 100) / 10;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Ось
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(canvas.width - 30, startY);
    ctx.stroke();
    
    // Стрелка на оси
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(canvas.width - 30, startY);
    ctx.lineTo(canvas.width - 40, startY - 8);
    ctx.lineTo(canvas.width - 40, startY + 8);
    ctx.closePath();
    ctx.fill();
    
    // Подпись оси
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('x (м)', canvas.width - 50, startY + 25);
    
    // Начальная позиция
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(startX, startY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('x₀=' + x0.toFixed(0), startX - 20, startY - 20);
    
    // Конечная позиция
    const endX = startX + finalX * scale;
    ctx.fillStyle = '#764ba2';
    ctx.beginPath();
    ctx.arc(endX, startY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.fillText('x=' + finalX.toFixed(0), endX - 25, startY - 20);
    
    // Вектор перемещения
    ctx.strokeStyle = 'rgba(118, 75, 162, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY + 30);
    ctx.lineTo(endX, startY + 30);
    ctx.stroke();
    
    ctx.fillStyle = '#764ba2';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('s = ' + s.toFixed(0) + ' м', (startX + endX) / 2 - 20, startY + 50);
    
    // Информация
    ctx.fillStyle = '#667eea';
    ctx.font = '11px Arial';
    ctx.fillText('v = ' + v.toFixed(2) + ' м/с,  t = ' + t.toFixed(1) + ' с', 20, 30);
    
    // Графики
    drawUniformGraphs(v, t);
}

function drawUniformGraphs(v, t) {
    // График s(t)
    const canvasS = document.getElementById('uniform-graph-s');
    const ctxS = canvasS.getContext('2d');
    const dataS = [];
    for (let i = 0; i <= t; i += 0.5) {
        dataS.push({ x: i, y: v * i });
    }
    drawGraph(ctxS, dataS, 't (с)', 's (м)', '#667eea');
    
    // График v(t)
    const canvasV = document.getElementById('uniform-graph-v');
    const ctxV = canvasV.getContext('2d');
    const dataV = [];
    for (let i = 0; i <= t; i += 0.5) {
        dataV.push({ x: i, y: v });
    }
    drawGraph(ctxV, dataV, 't (с)', 'v (м/с)', '#764ba2');
    
    // График a(t)
    const canvasA = document.getElementById('uniform-graph-a');
    const ctxA = canvasA.getContext('2d');
    const dataA = [];
    for (let i = 0; i <= t; i += 0.5) {
        dataA.push({ x: i, y: 0 });
    }
    drawGraph(ctxA, dataA, 't (с)', 'a (м/с²)', '#e74c3c');
}

function resetUniform() {
    document.getElementById('uniform-x0').value = 0;
    document.getElementById('uniform-v').value = 5;
    document.getElementById('uniform-t').value = 10;
    document.getElementById('uniform-v-value').textContent = '5.0';
    document.getElementById('uniform-t-value').textContent = '10.0';
    
    const canvas = document.getElementById('uniform-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const canvases = ['uniform-graph-s', 'uniform-graph-v', 'uniform-graph-a'];
    canvases.forEach(id => {
        const c = document.getElementById(id);
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, c.width, c.height);
    });
}

// ===== РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ =====
function startAcceleratedSimulation() {
    const v0 = parseFloat(document.getElementById('accel-v0').value);
    const a = parseFloat(document.getElementById('accel-a').value);
    const t = parseFloat(document.getElementById('accel-t').value);
    
    // Расчеты
    const s = v0 * t + (a * t * t) / 2;
    const v = v0 + a * t;
    const vSquared = v0 * v0 + 2 * a * s;
    
    // Обновить результаты
    document.getElementById('accel-result-v0').textContent = v0.toFixed(2);
    document.getElementById('accel-result-a').textContent = a.toFixed(2);
    document.getElementById('accel-result-t').textContent = t.toFixed(2);
    document.getElementById('accel-result-v').textContent = v.toFixed(2);
    document.getElementById('accel-result-s').textContent = Math.abs(s).toFixed(2);
    
    // Отрисовка
    const canvas = document.getElementById('accel-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const startX = 50;
    const startY = canvas.height / 2;
    const scale = (canvas.width - 100) / Math.max(Math.abs(s), 100);
    
    // Сетка
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        const x = 50 + i * (canvas.width - 100) / 10;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Ось
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(canvas.width - 30, startY);
    ctx.stroke();
    
    // Начало
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(startX, startY, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Конец
    const endX = startX + s * scale;
    ctx.fillStyle = '#764ba2';
    ctx.beginPath();
    ctx.arc(endX, startY, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Вектор
    ctx.strokeStyle = 'rgba(118, 75, 162, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY + 30);
    ctx.lineTo(endX, startY + 30);
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('s = ' + s.toFixed(0) + ' м', (startX + endX) / 2 - 30, startY + 50);
    
    // Информация
    ctx.fillStyle = '#667eea';
    ctx.font = '11px Arial';
    ctx.fillText('v₀ = ' + v0.toFixed(2) + ' м/с,  a = ' + a.toFixed(2) + ' м/с²,  t = ' + t.toFixed(1) + ' с', 20, 30);
    ctx.fillText('v = ' + v.toFixed(2) + ' м/с', 20, 50);
    
    // Графики
    drawAcceleratedGraphs(v0, a, t);
}

function drawAcceleratedGraphs(v0, a, t) {
    // График s(t)
    const canvasS = document.getElementById('accel-graph-s');
    const ctxS = canvasS.getContext('2d');
    const dataS = [];
    for (let i = 0; i <= t; i += 0.3) {
        dataS.push({ x: i, y: v0 * i + (a * i * i) / 2 });
    }
    drawGraph(ctxS, dataS, 't (с)', 's (м)', '#667eea');
    
    // График v(t)
    const canvasV = document.getElementById('accel-graph-v');
    const ctxV = canvasV.getContext('2d');
    const dataV = [];
    for (let i = 0; i <= t; i += 0.3) {
        dataV.push({ x: i, y: v0 + a * i });
    }
    drawGraph(ctxV, dataV, 't (с)', 'v (м/с)', '#764ba2');
    
    // График a(t)
    const canvasA = document.getElementById('accel-graph-a');
    const ctxA = canvasA.getContext('2d');
    const dataA = [];
    for (let i = 0; i <= t; i += 0.3) {
        dataA.push({ x: i, y: a });
    }
    drawGraph(ctxA, dataA, 't (с)', 'a (м/с²)', '#e74c3c');
}

function resetAccelerated() {
    document.getElementById('accel-v0').value = 0;
    document.getElementById('accel-a').value = 2;
    document.getElementById('accel-t').value = 10;
    document.getElementById('accel-v0-value').textContent = '0.0';
    document.getElementById('accel-a-value').textContent = '2.0';
    document.getElementById('accel-t-value').textContent = '10.0';
    
    const canvas = document.getElementById('accel-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const canvases = ['accel-graph-s', 'accel-graph-v', 'accel-graph-a'];
    canvases.forEach(id => {
        const c = document.getElementById(id);
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, c.width, c.height);
    });
}

// ===== ДВИЖЕНИЕ ПО ОКРУЖНОСТИ =====
let circularAnimationId = null;

function startCircularSimulation() {
    if (circularAnimationId) {
        cancelAnimationFrame(circularAnimationId);
    }
    
    const r = parseFloat(document.getElementById('circle-r').value);
    const v = parseFloat(document.getElementById('circle-v').value);
    
    // Расчеты
    const ac = (v * v) / r;
    const w = v / r;
    const T = (2 * Math.PI * r) / v;
    const nu = 1 / T;
    
    // Обновить результаты
    document.getElementById('circle-result-r').textContent = r.toFixed(0);
    document.getElementById('circle-result-v').textContent = v.toFixed(0);
    document.getElementById('circle-result-ac').textContent = ac.toFixed(2);
    document.getElementById('circle-result-w').textContent = w.toFixed(3);
    document.getElementById('circle-result-T').textContent = T.toFixed(2);
    document.getElementById('circle-result-nu').textContent = nu.toFixed(3);
    
    const canvas = document.getElementById('circle-canvas');
    const ctx = canvas.getContext('2d');
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = (Math.min(canvas.width, canvas.height) / 2 - 50) / r;
    
    let angle = 0;
    const speed = w; // радианы в секунду
    const fps = 60;
    const timeStep = 1 / fps;
    
    function animate() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Окружность
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * scale, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Радиус
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + r * scale * Math.cos(angle), centerY + r * scale * Math.sin(angle));
        ctx.stroke();
        
        // Объект
        const x = centerX + r * scale * Math.cos(angle);
        const y = centerY + r * scale * Math.sin(angle);
        ctx.fillStyle = '#764ba2';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Вектор скорости (касательная)
        const vLength = 30;
        const vx = -vLength * Math.sin(angle);
        const vy = vLength * Math.cos(angle);
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx, y + vy);
        ctx.stroke();
        ctx.fillStyle = '#27ae60';
        ctx.font = '10px Arial';
        ctx.fillText('v', x + vx / 2 + 5, y + vy / 2);
        
        // Центростремительное ускорение
        const aLength = 20;
        const ax = aLength * Math.cos(angle);
        const ay = aLength * Math.sin(angle);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + ax, y + ay);
        ctx.stroke();
        ctx.fillStyle = '#e74c3c';
        ctx.fillText('a', x + ax / 2, y + ay / 2 - 5);
        
        // Информация
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('r = ' + r.toFixed(0) + ' м,  v = ' + v.toFixed(1) + ' м/с', 20, 30);
        ctx.fillText('a_c = ' + ac.toFixed(2) + ' м/с²,  T = ' + T.toFixed(2) + ' с', 20, 50);
        
        angle += speed * timeStep;
        if (angle >= 2 * Math.PI) {
            angle = 0;
        }
        
        circularAnimationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function resetCircular() {
    if (circularAnimationId) {
        cancelAnimationFrame(circularAnimationId);
    }
    
    document.getElementById('circle-r').value = 50;
    document.getElementById('circle-v').value = 10;
    document.getElementById('circle-r-value').textContent = '50';
    document.getElementById('circle-v-value').textContent = '10';
    
    const canvas = document.getElementById('circle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ===== БАЛЛИСТИЧЕСКОЕ ДВИЖЕНИЕ =====
function startProjectileSimulation() {
    const v0 = parseFloat(document.getElementById('proj-v0').value);
    const angle = parseFloat(document.getElementById('proj-angle').value);
    const g = 9.8;
    
    const angleRad = (angle * Math.PI) / 180;
    const sinAlpha = Math.sin(angleRad);
    const sin2Alpha = Math.sin(2 * angleRad);
    
    // Расчеты
    const hMax = (v0 * v0 * sinAlpha * sinAlpha) / (2 * g);
    const L = (v0 * v0 * sin2Alpha) / g;
    const tFlight = (2 * v0 * sinAlpha) / g;
    
    // Обновить результаты
    document.getElementById('proj-result-v0').textContent = v0.toFixed(0);
    document.getElementById('proj-result-angle').textContent = angle.toFixed(0);
    document.getElementById('proj-result-h').textContent = hMax.toFixed(2);
    document.getElementById('proj-result-L').textContent = L.toFixed(2);
    document.getElementById('proj-result-t').textContent = tFlight.toFixed(2);
    
    const canvas = document.getElementById('proj-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Масштабирование
    const scaleX = (canvas.width - 60) / Math.max(L, 50);
    const scaleY = (canvas.height - 60) / Math.max(hMax + 20, 50);
    
    // Земля
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(canvas.width - 30, canvas.height - 30);
    ctx.stroke();
    
    // Траектория
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const v0x = v0 * Math.cos(angleRad);
    const v0y = v0 * Math.sin(angleRad);
    const steps = Math.ceil(tFlight * 100);
    
    for (let i = 0; i <= steps; i++) {
        const t = (i / 100);
        if (t > tFlight) break;
        
        const x = 30 + v0x * t * scaleX;
        const y = canvas.height - 30 - (v0y * t - (g * t * t) / 2) * scaleY;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Начальная позиция
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(30, canvas.height - 30, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Максимальная высота
    const maxX = 30 + (L / 2) * scaleX;
    const maxY = canvas.height - 30 - hMax * scaleY;
    ctx.fillStyle = '#764ba2';
    ctx.beginPath();
    ctx.arc(maxX, maxY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Конечная позиция
    const endX = 30 + L * scaleX;
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(endX, canvas.height - 30, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Линии параметров
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Линия высоты
    ctx.beginPath();
    ctx.moveTo(maxX, maxY);
    ctx.lineTo(maxX, canvas.height - 30);
    ctx.stroke();
    
    // Линия дальности
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(endX, canvas.height - 30);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Подписи
    ctx.fillStyle = '#333';
    ctx.font = '11px Arial';
    ctx.fillText('h_max = ' + hMax.toFixed(1) + ' м', maxX - 30, maxY - 15);
    ctx.fillText('L = ' + L.toFixed(1) + ' м', (30 + endX) / 2 - 20, canvas.height - 10);
    
    // Информация
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('v₀ = ' + v0.toFixed(0) + ' м/с,  α = ' + angle.toFixed(0) + '°,  t = ' + tFlight.toFixed(2) + ' с', 20, 30);
}

function resetProjectile() {
    document.getElementById('proj-v0').value = 20;
    document.getElementById('proj-angle').value = 45;
    document.getElementById('proj-v0-value').textContent = '20';
    document.getElementById('proj-angle-value').textContent = '45';
    
    const canvas = document.getElementById('proj-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ===== ГРАФИКИ =====
function drawGraph(ctx, data, xLabel, yLabel, color = '#667eea') {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 35;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    if (!data || data.length === 0) return;
    
    // Найти пределы
    let maxX = Math.max(...data.map(d => d.x));
    let minX = Math.min(...data.map(d => d.x));
    let maxY = Math.max(...data.map(d => d.y));
    let minY = Math.min(...data.map(d => d.y));
    
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    maxX += rangeX * 0.1;
    minX -= rangeX * 0.1;
    maxY += rangeY * 0.1;
    minY -= rangeY * 0.1;
    
    // Очистить
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Сетка
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (graphHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Оси
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // График
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const px = padding + ((data[i].x - minX) / (maxX - minX)) * graphWidth;
        const py = height - padding - ((data[i].y - minY) / (maxY - minY)) * graphHeight;
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.stroke();
    
    // Точки
    ctx.fillStyle = color;
    for (let i = 0; i < data.length; i += Math.max(1, Math.floor(data.length / 15))) {
        const px = padding + ((data[i].x - minX) / (maxX - minX)) * graphWidth;
        const py = height - padding - ((data[i].y - minY) / (maxY - minY)) * graphHeight;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Подписи осей
    ctx.fillStyle = '#333';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, width - 15, height - 12);
    ctx.textAlign = 'right';
    ctx.save();
    ctx.translate(12, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
    
    // Значения на осях
    ctx.font = '9px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    
    for (let i = 0; i <= 4; i++) {
        const x = minX + (maxX - minX) * (i / 4);
        const px = padding + (graphWidth / 4) * i;
        ctx.fillText(x.toFixed(1), px, height - padding + 15);
    }
    
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const y = maxY - (maxY - minY) * (i / 4);
        const py = height - padding - (graphHeight / 4) * i;
        ctx.fillText(y.toFixed(1), padding - 8, py + 4);
    }
}
