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
        name: "UI_niverse",
        slug: "ui_niverse",
        icon: "/Uiniverse.png",
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
]