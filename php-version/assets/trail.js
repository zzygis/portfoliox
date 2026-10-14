// Cursor trail: a glowing dark-red ribbon plus a few drifting sparks.
// Turns itself off on touch devices and for people who prefer reduced motion.
(() => {
    const canvas = document.getElementById('trail');
    const toggle = document.getElementById('trail-toggle');
    const ctx = canvas.getContext('2d');

    const finePointer = matchMedia('(pointer: fine)').matches;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let enabled = finePointer && !reducedMotion;
    try {
        const saved = localStorage.getItem('trail');
        if (saved !== null && finePointer) enabled = saved === 'on';
    } catch (_) { /* storage blocked — keep default */ }

    const points = [];  // ribbon
    const sparks = [];  // little particles
    const MAX_AGE = 28; // frames a ribbon point lives
    let dpr = 1;
    let running = false;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e) {
        if (!enabled) return;
        points.push({ x: e.clientX, y: e.clientY, age: 0 });

        if (Math.random() < 0.35) {
            sparks.push({
                x: e.clientX,
                y: e.clientY,
                vx: (Math.random() - 0.5) * 1.6,
                vy: (Math.random() - 0.5) * 1.6 + 0.4,
                life: 1,
                size: Math.random() * 2.5 + 1,
            });
        }
        if (!running) loop();
    }

    function loop() {
        running = true;
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (const p of points) p.age++;
        while (points.length && points[0].age > MAX_AGE) points.shift();

        // ribbon: segments get thinner and fainter toward the tail
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 1; i < points.length; i++) {
            const a = points[i - 1];
            const b = points[i];
            const t = 1 - b.age / MAX_AGE;
            ctx.strokeStyle = `rgba(210, 58, 68, ${t * 0.85})`;
            ctx.lineWidth = t * 7;
            ctx.shadowColor = 'rgba(158, 27, 37, 0.9)';
            ctx.shadowBlur = 14 * t;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;

        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.life -= 0.025;
            if (s.life <= 0) { sparks.splice(i, 1); continue; }
            ctx.fillStyle = `rgba(239, 120, 110, ${s.life})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
            ctx.fill();
        }

        if (points.length || sparks.length) {
            requestAnimationFrame(loop);
        } else {
            running = false; // idle until the mouse moves again
        }
    }

    function setEnabled(on) {
        enabled = on;
        toggle.textContent = `cursor trail: ${on ? 'on' : 'off'}`;
        toggle.setAttribute('aria-pressed', String(on));
        if (!on) {
            points.length = 0;
            sparks.length = 0;
            ctx.clearRect(0, 0, innerWidth, innerHeight);
        }
        try { localStorage.setItem('trail', on ? 'on' : 'off'); } catch (_) {}
    }

    if (!finePointer) {
        toggle.hidden = true;
        return;
    }

    toggle.addEventListener('click', () => setEnabled(!enabled));
    setEnabled(enabled);
    resize();
    addEventListener('resize', resize);
    addEventListener('mousemove', onMove, { passive: true });
})();
