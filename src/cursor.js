// The soft purple mouse trail (the normal system cursor stays).
// Off on touch devices and for people who prefer reduced motion.

export function initCursor() {
    const finePointer = matchMedia('(pointer: fine)').matches;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    initTrail();
}

function initTrail() {
    const canvas = document.getElementById('trail');
    const ctx = canvas.getContext('2d');
    const points = [];
    const MAX_AGE = 28;
    let running = false;


    function resize() {
        const dpr = devicePixelRatio || 1;
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        canvas.style.width = `${innerWidth}px`;
        canvas.style.height = `${innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function loop() {
        running = true;
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (const p of points) p.age++;
        while (points.length && points[0].age > MAX_AGE) points.shift();

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 1; i < points.length; i++) {
            const a = points[i - 1];
            const b = points[i];
            const t = 1 - b.age / MAX_AGE;
            ctx.strokeStyle = `rgba(196, 181, 253, ${t * 0.45})`;
            ctx.lineWidth = t * 5;
            ctx.shadowColor = 'rgba(167, 139, 250, 0.6)';
            ctx.shadowBlur = 18 * t;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;

        if (points.length) requestAnimationFrame(loop);
        else running = false; // idle until the mouse moves again
    }


    addEventListener('mousemove', (e) => {
        points.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (!running) loop();
    }, { passive: true });

    addEventListener('resize', resize);
    resize();
}
