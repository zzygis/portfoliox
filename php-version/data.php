<?php
// Everything you'll want to edit lives here — the templates just loop over it.

return [
    'name'     => 'Your Name',
    'role'     => 'Junior PHP Developer',
    'location' => 'Somewhere, Earth',
    'tagline'  => 'I build tidy back-ends, write readable PHP, and occasionally let my cursor have a little fun.',
    'email'    => 'you@example.com',

    'about' => [
        "I'm a junior developer who enjoys turning messy requirements into clean, well-structured PHP. I like small functions, clear names and code that the next person can actually read.",
        "Right now I'm deepening my knowledge of Laravel, testing with PHPUnit, and learning how to design databases that don't come back to haunt me.",
    ],

    'skills' => [
        'Languages' => ['PHP 8', 'SQL', 'JavaScript', 'HTML', 'CSS'],
        'Frameworks' => ['Laravel', 'Symfony (learning)', 'Tailwind'],
        'Tools'      => ['Git', 'Composer', 'PhpStorm', 'Docker', 'MySQL'],
    ],

    'projects' => [
        [
            'title'       => 'Task Tracker API',
            'description' => 'A RESTful API for managing tasks and teams, with token auth, validation and full PHPUnit coverage.',
            'tags'        => ['Laravel', 'MySQL', 'PHPUnit'],
            'url'         => 'https://github.com/yourname/task-tracker',
        ],
        [
            'title'       => 'Tiny MVC',
            'description' => 'A from-scratch MVC micro-framework built to understand routing, DI containers and middleware under the hood.',
            'tags'        => ['PHP 8', 'OOP', 'Composer'],
            'url'         => 'https://github.com/yourname/tiny-mvc',
        ],
        [
            'title'       => 'Recipe Box',
            'description' => 'A small CRUD app for saving recipes, with search, image uploads and a pagination system I am weirdly proud of.',
            'tags'        => ['PHP', 'PDO', 'JavaScript'],
            'url'         => 'https://github.com/yourname/recipe-box',
        ],
    ],

    'links' => [
        'GitHub'   => 'https://github.com/yourname',
        'LinkedIn' => 'https://linkedin.com/in/yourname',
    ],
];
