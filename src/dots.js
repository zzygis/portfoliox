// The dot grid behind the first screen: dots near the mouse light up,
// fast mouse moves push them along and a click sends a shockwave. They spring back.
// Static for people who prefer reduced motion.

const GAP = 30;
const RADIUS = 1.2;
const PROXIMITY = 130;
const SHOCK_RADIUS = 220;
const BASE = [243, 240, 234, 0.16];
const ACTIVE = [255, 91, 46, 1];

export function initDots(canvas) {
    const ctx = canvas.getContext('2d');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999, t: 0 };
    let dots = [];
    let w = 0;
    let h = 0;
    let visible = true;
    let running = false;

    function resize() {
        const dpr = devicePixelRatio || 1;
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        dots = [];
        const cols = Math.floor(w / GAP);
        const rows = Math.floor(h / GAP);
        const startX = (w - (cols - 1) * GAP) / 2;
        const startY = (h - (rows - 1) * GAP) / 2;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                dots.push({ hx: startX + c * GAP, hy: startY + r * GAP, ox: 0, oy: 0, vx: 0, vy: 0 });
            }
        }
        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        let settled = true;

        // Plain dots go into one path, lit ones are drawn one by one
        ctx.beginPath();
        const lit = [];
        for (const d of dots) {
            d.vx = (d.vx - d.ox * 0.08) * 0.82;
            d.vy = (d.vy - d.oy * 0.08) * 0.82;
            d.ox += d.vx;
            d.oy += d.vy;
            if (Math.abs(d.ox) + Math.abs(d.oy) + Math.abs(d.vx) + Math.abs(d.vy) > 0.05) settled = false;
            else d.ox = d.oy = d.vx = d.vy = 0;

            const x = d.hx + d.ox;
            const y = d.hy + d.oy;
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist < PROXIMITY) {
                lit.push([x, y, 1 - dist / PROXIMITY]);
            } else {
                ctx.moveTo(x + RADIUS, y);
                ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
            }
        }
        ctx.fillStyle = `rgba(${BASE.join(',')})`;
        ctx.fill();

        for (const [x, y, t] of lit) {
            const c = BASE.map((b, i) => b + (ACTIVE[i] - b) * t);
            ctx.fillStyle = `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${c[3]})`;
            ctx.beginPath();
            ctx.arc(x, y, RADIUS + t * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
        return settled && !lit.length;
    }

    function loop() {
        running = true;
        const idle = draw();
        if (visible && !idle) requestAnimationFrame(loop);
        else running = false; // stops until the mouse comes back
    }

    const wake = () => { if (!running && visible) loop(); };

    function push(cx, cy, radius, force) {
        for (const d of dots) {
            const dx = d.hx + d.ox - cx;
            const dy = d.hy + d.oy - cy;
            const dist = Math.hypot(dx, dy);
            if (dist > radius || dist < 1) continue;
            const f = force * (1 - dist / radius);
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
        }
    }

    resize();
    new ResizeObserver(resize).observe(canvas);
    if (reducedMotion) return;

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(canvas);

    addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dt = Math.max(e.timeStamp - pointer.t, 1);
        const vx = (x - pointer.x) / dt;
        const vy = (y - pointer.y) / dt;
        const speed = Math.hypot(vx, vy);

        // A fast flick drags the nearby dots along with it
        if (speed > 1 && speed < 20) {
            for (const d of dots) {
                const dist = Math.hypot(d.hx + d.ox - x, d.hy + d.oy - y);
                if (dist > PROXIMITY) continue;
                const f = (1 - dist / PROXIMITY) * 1.6;
                d.vx += Math.max(-6, Math.min(6, vx * f));
                d.vy += Math.max(-6, Math.min(6, vy * f));
            }
        }
        Object.assign(pointer, { x, y, t: e.timeStamp });
        wake();
    }, { passive: true });

    addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        push(e.clientX - rect.left, e.clientY - rect.top, SHOCK_RADIUS, 9);
        wake();
    });
}
