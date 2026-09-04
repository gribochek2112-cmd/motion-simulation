// ========================================
// PHYSICS.JS - Физические расчеты
// ========================================

// Равномерное движение
function uniformMotion(v, t, x0 = 0) {
    const s = v * t;
    const x = x0 + s;
    return { s, x, v, t, x0 };
}

// Равноускоренное движение
function acceleratedMotion(v0, a, t) {
    const s = v0 * t + (a * t * t) / 2;
    const v = v0 + a * t;
    const vSquared = v0 * v0 + 2 * a * s;
    return { s, v, vSquared, v0, a, t };
}

// Движение по окружности
function circularMotion(v, r) {
    const ac = (v * v) / r; // центростремительное ускорение
    const omega = v / r; // угловая скорость
    const T = (2 * Math.PI * r) / v; // период
    const nu = 1 / T; // частота
    return { ac, omega, T, nu, v, r };
}

// Баллистическое движение
function projectileMotion(v0, angle, g = 9.8) {
    const angleRad = (angle * Math.PI) / 180;
    const sinAlpha = Math.sin(angleRad);
    const sin2Alpha = Math.sin(2 * angleRad);
    const cosAlpha = Math.cos(angleRad);
    
    const hMax = (v0 * v0 * sinAlpha * sinAlpha) / (2 * g);
    const L = (v0 * v0 * sin2Alpha) / g;
    const tFlight = (2 * v0 * sinAlpha) / g;
    
    return { hMax, L, tFlight, v0, angle, angleRad };
}

// Расчет траектории баллистического движения
function projectileTrajectory(v0, angle, g = 9.8, maxTime = null) {
    const angleRad = (angle * Math.PI) / 180;
    const v0x = v0 * Math.cos(angleRad);
    const v0y = v0 * Math.sin(angleRad);
    
    const tFlight = (2 * v0y) / g;
    const steps = maxTime ? Math.ceil(maxTime * 100) : Math.ceil(tFlight * 100);
    
    const trajectory = [];
    
    for (let i = 0; i <= steps; i++) {
        const t = (i / 100);
        if (t > tFlight) break;
        
        const x = v0x * t;
        const y = v0y * t - (g * t * t) / 2;
        
        if (y >= 0) {
            trajectory.push({ x, y, t });
        }
    }
    
    return trajectory;
}

// Расчет траектории равноускоренного движения
function acceleratedTrajectory(v0, a, maxTime = 10) {
    const trajectory = [];
    const steps = Math.ceil(maxTime * 100);
    
    for (let i = 0; i <= steps; i++) {
        const t = i / 100;
        const s = v0 * t + (a * t * t) / 2;
        const v = v0 + a * t;
        trajectory.push({ t, s, v });
    }
    
    return trajectory;
}

// Расчет траектории равномерного движения
function uniformTrajectory(v, x0, maxTime = 10) {
    const trajectory = [];
    const steps = Math.ceil(maxTime * 100);
    
    for (let i = 0; i <= steps; i++) {
        const t = i / 100;
        const s = v * t;
        const x = x0 + s;
        trajectory.push({ t, s, x });
    }
    
    return trajectory;
}

// Экспорт функций
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        uniformMotion,
        acceleratedMotion,
        circularMotion,
        projectileMotion,
        projectileTrajectory,
        acceleratedTrajectory,
        uniformTrajectory
    };
}
