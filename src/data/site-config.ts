export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    postsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Ahmed\'s Blog',
    subtitle: '',
    description: '',
    image: {
        src: '/home-hero.jpg',
        alt: 'Five coffee beans lined on a dark green background'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        }
    ],
    socialLinks: [
        {
            text: 'Email',
            href: 'mailto:ahmed.ehab5010@gmail.com'
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/ahmed-abdul-aziz/'
        },
        {
            text: 'Github',
            href: 'https://github.com/ahmed-e-abdulaziz'
        }
    ],
    hero: {
        title: 'A blog about software development, software architecture and new technologies.',
        text: "I am Ahmed Ehab Abdul-Aziz. I am a Senior Full-Stack Engineer with 8+ YoE mostly in the Spring stack and a Software Engineering enthusiast. I have worked in both startups and enterprises and I love exploring new ideas and engaging in conversations around new technologies.",
        image: {
            src: '/home-hero.jpg',
            alt: 'Five coffee beans lined on a dark green background'
        },
        actions: []
    },
    postsPerPage: 8
};

export default siteConfig;
