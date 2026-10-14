<?php
declare(strict_types=1);

$site = require __DIR__ . '/data.php';

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($site['name']) ?> — <?= e($site['role']) ?></title>
    <meta name="description" content="<?= e($site['tagline']) ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<canvas id="trail" aria-hidden="true"></canvas>

<header class="nav">
    <a href="#top" class="logo">&lt;?<?= e(strtolower(strtok($site['name'], ' '))) ?></a>
    <nav>
        <a href="#about">about</a>
        <a href="#work">work</a>
        <a href="#contact">contact</a>
    </nav>
</header>

<main id="top">
    <section class="hero">
        <p class="eyebrow"><?= e($site['role']) ?> · <?= e($site['location']) ?></p>
        <h1>Hi, I'm <span class="accent"><?= e($site['name']) ?></span>.</h1>
        <p class="lead"><?= e($site['tagline']) ?></p>
        <div class="cta">
            <a class="btn btn-primary" href="#work">See my work</a>
            <a class="btn" href="mailto:<?= e($site['email']) ?>">Say hello</a>
        </div>
        <p class="hint">psst — wiggle your mouse</p>
    </section>

    <section id="about" class="section">
        <h2><span class="num">01</span> About</h2>
        <div class="about">
            <div class="about-text">
                <?php foreach ($site['about'] as $paragraph): ?>
                    <p><?= e($paragraph) ?></p>
                <?php endforeach; ?>
            </div>
            <div class="skills">
                <?php foreach ($site['skills'] as $group => $items): ?>
                    <div class="skill-group">
                        <h3><?= e($group) ?></h3>
                        <ul>
                            <?php foreach ($items as $item): ?>
                                <li><?= e($item) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="work" class="section">
        <h2><span class="num">02</span> Selected work</h2>
        <div class="projects">
            <?php foreach ($site['projects'] as $project): ?>
                <a class="card" href="<?= e($project['url']) ?>" target="_blank" rel="noopener">
                    <div class="card-head">
                        <h3><?= e($project['title']) ?></h3>
                        <span class="arrow" aria-hidden="true">↗</span>
                    </div>
                    <p><?= e($project['description']) ?></p>
                    <ul class="tags">
                        <?php foreach ($project['tags'] as $tag): ?>
                            <li><?= e($tag) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </a>
            <?php endforeach; ?>
        </div>
    </section>

    <section id="contact" class="section contact">
        <h2><span class="num">03</span> Contact</h2>
        <p class="contact-lead">Looking for a junior dev who cares about clean code? Let's talk.</p>
        <a class="email" href="mailto:<?= e($site['email']) ?>"><?= e($site['email']) ?></a>
        <ul class="links">
            <?php foreach ($site['links'] as $label => $url): ?>
                <li><a href="<?= e($url) ?>" target="_blank" rel="noopener"><?= e($label) ?></a></li>
            <?php endforeach; ?>
        </ul>
    </section>
</main>

<footer class="footer">
    <span>© <?= date('Y') ?> <?= e($site['name']) ?> · built with plain PHP</span>
    <button id="trail-toggle" type="button" aria-pressed="true">cursor trail: on</button>
</footer>

<script src="assets/trail.js"></script>
</body>
</html>
