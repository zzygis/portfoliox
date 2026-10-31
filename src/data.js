// Everything you'll want to edit lives here — main.js just renders it.
// Empty fields are simply not shown on the page.

export const site = {
    name: 'Žygimantas Poderis',
    role: '',
    email: 'zygimantaspode@gmail.com',

    // The big line on the first screen. Leave empty to show your name there instead.
    intro: 'Jaunesnysis web programuotojas, kuriantis švarias svetaines.',

    about: {
        // One line each, with an icon: pin, cake, code, briefcase, building
        // e.g. { icon: 'pin', text: 'Vilnius, Lietuva' }, { icon: 'cake', text: '20 metų' }
        facts: [
            { icon: 'pin', text: 'Kaunas, Lietuva' },
            { icon: 'code', text: 'Jaunesnysis web programuotojas' },
            { icon: 'briefcase', text: '3 metai patirties' },
        ],
        text: [    // one string per paragraph
            'Svetaines programuoju jau 3 metus.',
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'Twig', 'Tailwind', 'Python'],
        services: [
            'Full-stack svetainių kūrimas',
            'Front-end kūrimas',
            'Back-end kūrimas',
            'Svetainių greičio optimizavimas',
            'DI chatbotų integracija',
            'Python automatizavimas',
        ],
        // Big numbers along the bottom
        stats: [
            { value: '3+', label: 'Metai patirties' },
            { value: '3', label: 'Projektai' },
        ],
    },

    // Each project shows its name + what you used; clicking it reveals the description and link.
    // icon: logo shown when the project is opened, e.g. '/img/name.png' (goes in public/img/)
    // repo: GitHub link (optional, adds a GitHub button)
    // tech: what you built it with, e.g. ['HTML', 'Tailwind', 'JavaScript']
    projects: [
        { title: 'besha.bg', icon: '/img/besha.svg', tech: ['PHP', 'Twig', 'Tailwind', 'Docker'], description: 'Besha yra laikrodžių įmonės svetainė. Sukurta praktikos metu įmonėje ThinkWeb, Bulgarijoje, naudojant įmonės ThinkCMS sistemą.', url: 'https://www.besha.bg/' },
        { title: 'chativly.xyz', icon: '/img/chativly.png', tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Netlify', 'Claude API'], description: 'Chativly kuria svetaines vietiniam verslui Lietuvoje ir prie jų gali pridėti DI chatbotą, kuris atsako klientams 24/7.', url: 'https://chativly.xyz/', repo: 'https://github.com/zzygis/chativly' },
        { title: 'Valorant LFG botas', tech: ['Python', 'PyAutoGUI','Tkinter'], description: 'Programa, kuri skaito Discord langą ir automatiškai paspaudžia LFG mygtukus keliuose kanaluose. GUI kuriama dabar.', url: '', repo: 'https://github.com/zzygis/Bot-for-val-discord' },
    ],

    // Swap in your own profile links
    github: 'https://github.com/zzygis',
    linkedin: 'https://www.linkedin.com/in/%C5%BEygimantas-poderis-a06853329/',
};
