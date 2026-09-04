// ========================================
// VISUALIZATION.JS - Визуализация
// ========================================

// Рисование объекта на траектории
function drawObject(ctx, x, y, radius = 8, color = '#667eea') {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Тень
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

// Рисование вектора
function drawVector(ctx, fromX, fromY, toX, toY, color = '#764ba2', width = 2) {
    const headlen = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    
    // Линия вектора
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Стрелка
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
}

// Рисование сетки
function drawGrid(ctx, width, height, gridSize = 50) {
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    
    // Вертикальные линии
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Горизонтальные линии
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Рисование оси координат
function drawAxes(ctx, width, height, originX, originY, labelX = 'x (м)', labelY = 'y (м)') {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    
    // Ось X
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    
    // Ось Y
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();
    
    // Стрелки
    drawVector(ctx, width - 15, originY, width, originY, '#333', 2);
    drawVector(ctx, originX, 15, originX, 0, '#333', 2);
    
    // Метки
    ctx.textAlign = 'center';
    ctx.fillText(labelX, width - 30, originY + 20);
    ctx.textAlign = 'right';
    ctx.fillText(labelY, originX - 10, 15);
}

// Рисование графика зависимости
function drawGraph(ctx, data, xLabel, yLabel, color = '#667eea') {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    if (!data || data.length === 0) return;
    
    // Найти пределы
    let maxX = Math.max(...data.map(d => d.x));
    let minX = Math.min(...data.map(d => d.x));
    let maxY = Math.max(...data.map(d => d.y));
    let minY = Math.min(...data.map(d => d.y));
    
    // Добавить немного места
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
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
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
    for (let i = 0; i < data.length; i += Math.max(1, Math.floor(data.length / 20))) {
        const px = padding + ((data[i].x - minX) / (maxX - minX)) * graphWidth;
        const py = height - padding - ((data[i].y - minY) / (maxY - minY)) * graphHeight;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Подписи осей
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, width - 15, height - 10);
    ctx.textAlign = 'right';
    ctx.fillText(yLabel, 10, 15);
    
    // Значения осей
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    
    // X оси
    for (let i = 0; i <= 5; i++) {
        const x = minX + (maxX - minX) * (i / 5);
        const px = padding + (graphWidth / 5) * i;
        ctx.fillText(x.toFixed(1), px, height - padding + 20);
    }
    
    // Y оси
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const y = maxY - (maxY - minY) * (i / 5);
        const py = height - padding - (graphHeight / 5) * i;
        ctx.fillText(y.toFixed(1), padding - 10, py + 5);
    }
}

// Рисование траектории прямолинейного движения
function drawLinearTrajectory(ctx, x, y, length, color = '#667eea', width = 3) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.stroke();
    
    // Стрелка в конце
    drawVector(ctx, x + length - 20, y, x + length, y, color, width);
}

// Рисование окружности
function drawCircle(ctx, centerX, centerY, radius, color = '#e9ecef') {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Радиус
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.stroke();
    
    // Подпись
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('r', centerX + radius / 2 + 5, centerY - 5);
}

// Экспорт функций
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        drawObject,
        drawVector,
        drawGrid,
        drawAxes,
        drawGraph,
        drawLinearTrajectory,
        drawCircle
    };
}
