interface Project {
    name: string;
    slug: string;
    icon: string;
    image:{
        url: string;
        alt: string;
        width: number;
        height: number;
        source?: string;
    };
    urls:{
        githubUrl?: string;
        liveUrl?: string;
        [key:string]: string| undefined;
    };
    description: string;
    tags: string[];
}

export const projects: Project[]=[
  {
    name: "Travelly",
    slug: "travelly",
    icon: "/Icons/travelly.png",
    image: {
      url: "/square-dashboard-button-code.png",
      width: 400,
      height: 200,
      alt: "UI_niverse is a curated collection of modern frontend projects built with React, TypeScript, and TailwindCSS — designed to help students"
    },
    urls: {
      githubUrl: "https://github.com/ArDnath/UI_niverse",
      liveUrl: "https://travelly.aryamn.space/",
    },
    description: "Travel Planner is a web application built with Next.js that allows users to plan their trips, create itineraries, organize destinations, and share travel plans. It includes features like interactive maps, drag-and-drop itinerary management, and integration with third-party services for file uploads and geocoding.",
    tags: [
      "React 19",
      "Next.js 15",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "PostgresSQL",
      "NextAuth.js",
      "ImageKit",
      "Leaflet",
      "Geocoding"
      ]
  },
  {
    name: "Blogify-v.3.0",
    slug: "blogify",
    icon: "/Icons/travelly.png",
    image: {
      url: "/square-dashboard-button-code.png",
      width: 400,
      height: 200,
      alt: "This is a fullstack blog application I built as a personal platform for writing blogs in the future.The frontend is developed with React and Vite, using Yarn as the package manager, while the backend is powered by Hono.js running on Bun."
    },
    urls: {
      githubUrl: "https://github.com/ArDnath/Blogify-v.3.0",
      liveUrl: "https://aryamnblog.vercel.app/",
    },
    description: "🚀 Full-Stack Personal Blog built with Bun + Hono for a blazing-fast backend and Vite + React for a modern, responsive frontend. Features include blog creation, infinite scrolling, rich-text editing, authentication, and persistent caching using React Query.",
    tags: [
      "React 19",
      "Next.js 15",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "PostgresSQL",
      "NextAuth.js",
      "ImageKit",
      "Leaflet",
      "Geocoding"
      ]
  },
    {
        name: "UI_niverse",
        slug: "ui_niverse",
        icon: "/Icons/Uiniverse.png",
        image: {
          url: "/square-dashboard-button-code.png",
          width: 400,
          height: 200,
          alt: "UI_niverse is a curated collection of modern frontend projects built with React, TypeScript, and TailwindCSS — designed to help students"
        },
        urls: {
          githubUrl: "https://github.com/ArDnath/UI_niverse",
          liveUrl: "https://uiniverse.aryamn.space/",
        },
        description: "This is a resource for students to find inspiration and reference frontend projects helping them master the art of frontend development through practice.",
        tags: [
          "React 19",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      
      {
        name: "AlphaGym",
        slug: "alphagym",
        icon: "/Icons/travelly.png",
        image: {
          url: "/square-dashboard-button-code.png",
          width: 400,
          height: 200,
          alt: "UI_niverse is a curated collection of modern frontend projects built with React, TypeScript, and TailwindCSS — designed to help students"
        },
        urls: {
          githubUrl: "https://github.com/ArDnath/AlphaGym",
          liveUrl: "https://4ace0a41.evogym-831.pages.dev/",
        },
        description: "This project is the frontend of an online gymming service, built with React, TypeScript, and Tailwind CSS. The setup utilizes Vite for fast development and build processes.",
        tags: [
          "React 19",
          "Tailwind CSS",
          ]
      },
]