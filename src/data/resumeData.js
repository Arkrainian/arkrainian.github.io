export const resumeData = {
    personalInfo: {
        name: "Krish's Domain",
        title: "Full Stack Developer",
        email: "krishsathyan@gmail.com",
        location: "Los Angeles, CA",
        summary: "Highly motivated and results-oriented software developer with deep expertise in Python-based automation and high-performance systems programming using C++. Proven ability to design, develop, and optimize efficient, scalable, and maintainable solutions that improve performance and streamline complex workflows. Strong analytical problem-solver with a passion for low-level systems, performance optimization, and leveraging automation to enhance reliability, productivity, and overall system efficiency.",
        socials: {
            github: "github.com/acrowbatics100",
            linkedin: "linkedin.com/in/acrowbatics100",
            twitter: "@acrowbatics100"
        },
        meAtWork: {
            title: "Where Purpose Meets Practice",
            type: "video", // or "video"
            url: "https://www.youtube.com/embed/rlVMoYQdl0A",
            description: ""
        }
    },
    settings: {
        backgroundSpeed: 0.5, // 1.0 is default, lower is slower (e.g., 0.5 is half speed)
        backgroundElements: {
            words: ["കൃഷ്", "कृष", "クリシュ", "克里什", "كريش", "KRISH", "कृष्ण", "криш"],
            chars: ["0", "1", "<", ">", "/", "{", "}", "[", "]", "*", "&", "^", "%", "$", "#", "@", "!", "~", "ァ", "ィ", "イ", "ゥ", "ウ", "ガ", "カ", "കൃഷ്", "कृष्ण"]
        }
    },
    experience: [
        {
            id: 1,
            role: "Freelance Game Developer",
            company: "Freelance",
            period: "2023 - Present",
            description: [
                "Developed custom Roblox Studio creations for clients, implementing advanced physics-based movement systems and interactive gameplay mechanics using Luau scripting.",
                "Engineered procedural animation systems that dynamically adjust character rigs based on velocity and terrain angles, creating premium, high-fidelity gameplay experiences.",
                "Designed and implemented custom kinematic solvers to override standard movement behaviors, simulating realistic inertia, friction, and momentum-based sliding.",
                "Collaborated with clients to translate creative visions into functional, polished game mechanics that prioritize mechanical depth and player immersion."
            ]
        },
        {
            id: 2,
            role: "AI Development Consultant",
            company: "Freelance",
            period: "2024",
            description: [
                "Collaborated with a peer to develop an intelligent Minecraft PvP bot using Java and artificial intelligence techniques.",
                "Implemented pathfinding algorithms and combat decision-making systems to create autonomous player behavior in competitive scenarios.",
                "Integrated machine learning concepts to optimize bot performance, including pattern recognition for opponent movement prediction.",
                "Designed modular architecture to allow for easy expansion and customization of bot capabilities and strategies."
            ]
        }
    ],
    education: [
        {
            id: 1,
            degree: "Certification in Machine Learning",
            school: "UCI ICS Summer Academy",
            year: "2025",
            status: "completed",
            url: "https://uci.edu/",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/93/UCI_Donald_Bren_Hall.jpg"
        },
        {
            id: 2,
            degree: "Certification in Data Science",
            school: "UCI ICS Summer Academy",
            year: "2025",
            status: "completed",
            url: "https://uci.edu/",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/93/UCI_Donald_Bren_Hall.jpg"
        },
        {
            id: 3,
            degree: "",
            school: "Cerritos High School",
            year: "2025",
            status: "enrolled",
            url: "https://www.cerritoshs.us/",
            image: "https://imagescdn.homes.com/i2/bBU9tEsWS9lVQfEl5ZE0DTOosLQybwLI1LUieSLa_GE/117/cerritos-high-school-cerritos-ca-primaryphoto.jpg?p=1"
        },
        {
            id: 4,
            degree: "CS50: Introduction to Computer Science",
            school: "Harvard University (Self-Study)",
            year: "2023",
            status: "completed",
            url: "https://cs50.harvard.edu/",
            image: "https://www.classcentral.com/report/wp-content/uploads/2022/05/cs50-2023-banner-e1673610020393.png"
        }
    ],
    skills: [
        {
            name: "Python",
            level: 100,
            status: "learned",
            description: "My primary language for automation, AI/ML, and backend development. I have extensive experience with libraries like NumPy, Pandas, TensorFlow, and PyTorch, as well as building complex scripts for data analysis and system orchestration."
        },
        {
            name: "HTML / CSS / JS",
            level: 95,
            status: "learning",
            description: "The core triad of web development. I focus on semantic HTML, modern CSS features (Grid/Flexbox, Animations), and ES6+ JavaScript to build responsive and interactive frontend experiences."
        },
        {
            name: "C++",
            level: 90,
            status: "learning",
            description: "Used for high-performance systems programming and game development. I work with pointers, memory management, and OOP principles to write optimized code for simulations and complex algorithms."
        },
        {
            name: "UI/UX Design",
            level: 85,
            status: "learning",
            description: "Designing intuitive and aesthetically pleasing interfaces. I focus on user flow, accessibility, and visual hierarchy to create engaging digital experiences."
        },
        {
            name: "Node.js",
            level: 80,
            status: "learning",
            description: "Building scalable backend services and RESTful APIs. I use Node.js for server-side logic, real-time applications with WebSockets, and managing database interactions."
        },
        {
            name: "R",
            level: 80,
            status: "learning",
            description: "Utilized for statistical analysis and data visualization. I use R to process large datasets, perform hypothesis testing, and generate insightful plots for research."
        },
        {
            name: "CUDA",
            level: 80,
            status: "learning",
            description: "Parallel computing on GPUs. I'm exploring CUDA to accelerate heavy computational tasks, particularly in machine learning and physics simulations, by leveraging the power of NVIDIA graphics cards."
        },
        {
            name: "Three.js",
            level: 75,
            status: "learning",
            description: "Creating immersive 3D experiences for the web. I use Three.js to render scenes like this portfolio background, working with geometries, materials, shaders, and lighting to bring 3D graphics to the browser."
        },
        {
            name: "TypeScript",
            level: 60,
            status: "learning",
            description: "Enhancing JavaScript with static typing. I use TypeScript to write more robust and maintainable code, catching errors early and improving the development workflow with better IDE support."
        },
        {
            name: "Next.js",
            level: 50,
            status: "learning",
            description: "React framework for production. I'm learning Next.js to build server-side rendered (SSR) and statically generated (SSG) web applications for better performance and SEO."
        },
        {
            name: "Cloud Architecture",
            level: 30,
            status: "learning",
            description: "Designing scalable cloud solutions. I'm starting to explore services like AWS and Google Cloud to understand how to deploy, manage, and scale applications in the cloud."
        }
    ],
    otherSkills: [
        {
            name: "Cooking",
            level: 85,
            status: "learning",
            description: "Cooking is a genuine passion of mine, and I take great pride in exploring a wide range of cuisines, recipes, and cooking techniques to craft meals that are both flavorful and nutritious. I am experienced in preparing a variety of dishes, including perfectly cooked salmon, well-seasoned burgers, fresh and balanced salads, and slow-cooked brisket, which is one of my specialties. In addition to savory dishes, I enjoy making traditional beverages such as Indian tea (chai), Krishna coffee, and classic South Indian filter coffee, paying close attention to authenticity, balance, and presentation. Through cooking, I continuously refine my skills while expressing creativity and care in every meal I prepare."
        }
    ],
    projects: [
        {
            id: 7,
            order: 10,
            title: "Raspberry Pi Secure VPN Gateway",
            description: "Engineered a private, encrypted VPN tunnel using a Raspberry Pi to ensure secure remote access and data privacy.",
            details: "This project involved the deployment of a hardened VPN gateway on Raspberry Pi hardware to facilitate secure, encrypted communication between remote clients and a local network. I utilized the WireGuard protocol for its superior performance and modern cryptographic primitives, implementing a robust peer-to-peer architecture that minimizes latency while maximizing throughput. The setup includes a custom firewall configuration using iptables to enforce strict traffic isolation and prevent DNS leaks.\n\To ensure enterprise-grade security, I implemented automated security audits and two-factor authentication for administrative access. The project also features a real-time monitoring dashboard to track connection status and bandwidth utilization. This implementation serves as a cost-effective, high-performance alternative to commercial VPN solutions, providing full control over data privacy and network sovereignty.",
            tech: ["Linux", "Raspberry Pi", "WireGuard", "Networking"],
            media: {
                type: "image",
                url: "C:/Users/satya/.gemini/antigravity/brain/c022389c-ecb6-45d6-9245-85c99e4afefc/raspberry_pi_vpn_project_1766359152215.png"
            },
            links: {
                code: "https://github.com/acrowbatics100"
            }
        },

        {
            id: 11,
            order: 20,
            title: "Cozmo Voice-Activated Robot System",
            description: "A voice-controlled robotics project utilizing the Anki Cozmo SDK to create an intelligent, speech-responsive robot companion.",
            details: "In 2022, I developed an advanced voice-activated control system for the Anki Cozmo robot, integrating speech recognition technology with the Cozmo SDK to create a seamless human-robot interaction experience. This project combined natural language processing with robotics programming to enable hands-free control and intelligent responses.\\n\\nThe system utilizes Python's speech recognition libraries to capture and process voice commands in real-time, translating spoken instructions into executable robot behaviors. I implemented a custom command parser that maps natural language inputs to Cozmo's extensive API, enabling complex actions such as navigation, facial recognition, object manipulation, and emotional expressions. The robot can respond to commands like 'find your cube,' 'do a trick,' or 'recognize my face,' demonstrating sophisticated behavior coordination.\\n\\nBeyond basic command execution, I integrated contextual awareness, allowing Cozmo to maintain conversation state and respond intelligently to follow-up commands. The project features error handling for misrecognized speech, visual feedback through Cozmo's expressive face display, and adaptive learning to improve recognition accuracy over time. This project showcases the intersection of AI, robotics, and human-computer interaction, demonstrating how voice interfaces can make technology more accessible and engaging.",
            tech: ["Python", "Anki Cozmo SDK", "Speech Recognition", "Robotics", "AI"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/bvgXM9RaL4k"
            },
            links: {
                code: "https://github.com/acrowbatics100",
                video: "https://youtu.be/bvgXM9RaL4k"
            },
            year: "2022"
        },



        {
            id: 9,
            order: 30,
            title: "Minecraft Clone in Python",
            description: "A voxel-based 3D game engine built from scratch using Python, featuring procedural terrain generation and real-time rendering.",
            details: "This ambitious project involved developing a fully functional voxel-based game engine using Python and OpenGL, replicating core Minecraft mechanics from the ground up. I implemented a chunk-based world generation system using Perlin noise algorithms to create realistic, procedurally generated terrain with biomes, caves, and natural formations.\\n\\nThe rendering pipeline utilizes vertex buffer objects (VBOs) and frustum culling to optimize performance, allowing smooth frame rates even with thousands of visible blocks. The engine supports first-person camera controls with collision detection, block placement and destruction with raycasting, and a texture atlas system for efficient GPU memory usage. Additional features include day-night cycles, basic lighting calculations, and support for multiple block types with unique properties. This project demonstrates deep understanding of 3D graphics programming, spatial data structures, and performance optimization techniques in game development.",
            tech: ["Python", "Pygame", "OpenGL", "3D Graphics", "Algorithms"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/NbZIGXhwXYg"
            },
            links: {
                video: "https://www.youtube.com/watch?v=NbZIGXhwXYg"
            }
        },

        {
            id: 8,
            order: 19.9,
            title: "EMP (Elite Media Player)",
            description: "A custom-built media player application designed for seamless playback and intuitive user experience.",
            details: "Elite Media Player (EMP) is a feature-rich media player application I developed to provide a streamlined and powerful media playback experience. The project focuses on creating an intuitive interface while maintaining robust functionality for various media formats.\\n\\nThe application includes custom playback controls, playlist management, and support for multiple audio and video codecs. I implemented a clean, modern UI with responsive design principles, ensuring smooth performance across different screen sizes. The player features advanced controls including playback speed adjustment, volume normalization, and keyboard shortcuts for power users. This project demonstrates my ability to create polished, user-focused applications with attention to both functionality and design aesthetics.",
            tech: ["Media Player", "UI/UX Design", "Application Development"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/OvE5AGsOIJg"
            },
            links: {
                code: "https://github.com/acrowbatics100",
                video: "https://youtu.be/OvE5AGsOIJg"
            }
        },

        {
            id: 2,
            order: 19,
            title: "Glioma Detection Capstone Project",
            description: "This project involved using machine learning to detect glioma in MRI images and CSV data.",
            details: "This research-oriented project focuses on the application of deep learning architectures to the critical challenge of early glioma detection. I engineered a dual-stream neural network capable of concurrently processing high-resolution MRI volumetric data and structured patient clinical records. The image processing stream utilizes a custom-tuned Convolutional Neural Network (CNN) with residual connections to identify subtle micro-structural abnormalities in brain tissue, while the clinical stream employs gradient-boosted decision trees to contextualize imaging findings with metabolic markers.\n\The resulting diagnostic tool demonstrates significant improvements in classification sensitivity compared to traditional radiomic approaches. By fine-tuning the model through extensive hyperparameter optimization and cross-validation techniques, I achieved a robust F1-score that validates the model's reliability in clinical simulation environments. This project underscores the transformative potential of artificial intelligence in neuro-oncology, offering a pathway toward more precise, automated, and timely interventions for brain tumor patients.",
            tech: ["Python", "R"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/dGgaHxOpxM4"
            },
            links: {
                video: "https://www.youtube.com/watch?v=dGgaHxOpxM4",
                presentation: "https://docs.google.com/presentation/d/1pslboVa9bVIkX55sk2et7TP7foXc_t3iaI3u7hCWou4/edit?usp=sharing"
            }
        },
        {
            id: 3,
            order: 19.5,
            title: "Congressional App Challenge Submission",
            description: "This project involved using machine learning to detect glioma in MRI images and CSV data.",
            details: "Developed as a flagship submission for the Congressional App Challenge, this application addresses complex societal challenges through a sophisticated fusion of mobile technology and predictive analytics. The architecture follows a modern microservices pattern, ensuring high availability and scalability while maintaining a lightweight client-side footprint. I spearheaded the end-to-end development cycle, from conducting initial user persona research and wireframing high-fidelity prototypes to implementing the core algorithmic engine and deploying a secure backend infrastructure.\n\Beyond technical implementation, the project emphasizes a human-centric design philosophy, utilizing accessibility standards and intuitive navigation patterns to ensure broad community impact. The integrated machine learning module provides real-time, personalized recommendations based on user interaction history, creating a dynamic and engaging experience. This submission represents a rigorous synthesis of technical skill, social responsibility, and creative problem-solving, aimed at providing tangible digital solutions for modern community needs.",
            tech: ["C++"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/9QV4w0NZG0o"
            },
            links: {
                video: "https://www.youtube.com/watch?v=9QV4w0NZG0o",

            }
        },
        {
            id: 4,
            order: 70,
            title: "Roblox Studio Creations",
            description: "These Roblox Studio creations uses physics to make characters slide realistically across surfaces..",
            details: "This collection of projects pushes the boundaries of real-time physics simulation within the Roblox engine, utilizing the Luau scripting language to create highly nuanced character-environment interactions. I developed a custom kinematic solver that overrides standard movement behaviors to simulate realistic inertia, friction, and momentum-based sliding. By calculating surface normals and applying vector-based force injections, the system achieves a tactile, high-skill movement ceiling that feels distinct from generic game mechanics.\n\In addition to the core physics engine, these creations feature a procedural animation system that dynamically adjusts character rigs based on their velocity and the angle of the terrain. This attention to detail extends to environmental triggers and particle effects that provide visual feedback for physical interactions. The project serves as a masterclass in leveraging limited engine APIs to build premium, high-fidelity gameplay systems that prioritize mechanical depth and player immersion.",
            tech: ["Lua", "Roblox Studio"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/rlVMoYQdl0A"
            },
            links: {
                video: "https://www.youtube.com/watch?v=rlVMoYQdl0A&list=PLSruWmN7nbXRQHflOoKvk_ZqL3Lnd3iVz",

            }
        },
        {
            id: 5,
            order: 19.6,
            title: "IDTech Nvidia ML Class Project",
            details: "Participating in an intensive Machine Learning program at the University of California, Irvine, I explored the cutting edge of GPU-accelerated computing using the NVIDIA software stack. The curriculum involved deep dives into neural network architectures, where I utilized NVIDIA's specialized libraries to optimize the training of computer vision models. By leveraging Google Colab as a cloud-based development environment, I was able to iterate rapidly through complex model architectures, focusing on efficiency and high-throughput data processing.\n\The project portfolio culminated in the development of a suite of ML applications covering image recognition, sentiment analysis, and reinforced learning systems. I gained hands-on experience in gradient descent optimization, backpropagation mechanics, and the practical application of various loss functions. This intensive training provided a solid foundation in the mathematical and engineering principles that drive modern artificial intelligence, preparing me for complex challenges in the field of autonomous systems and data science.",
            description: "I did a two week program at University of California, Irvine for the topic of Machine Learning.",
            tech: ["Python", "Google Collab"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/j-lUg7wPf-w"
            },
            certificate: {
                url: "https://images.credential.net/embed/ybcaihvu_1743533401973_77d057037d63cc318fb58f705f55d51d6f405af356f6b35442087da89c5bdfe9.png",
                caption: "Certificate of Completion - NVIDIA Deep Learning Institute"
            },
            links: {
                video: "https://www.youtube.com/watch?v=j-lUg7wPf-w",
                code: "https://github.com/acrowbatics100"
            }
        },
        {
            id: 13,
            order: 19.1,
            title: "Astrophysics Stellar Classification Capstone Project",
            description: "A machine learning project that classifies stars based on their spectral characteristics using astrophysical data.",
            details: "This capstone project, completed as part of the UCI Data Science Summer Academy, focuses on the automated classification of stars. Utilizing a comprehensive dataset of stellar parameters—including temperature, luminosity, radius, and absolute magnitude—I developed a robust predictive model to categorize stars into their respective spectral classes (O, B, A, F, G, K, M). The project involved extensive data preprocessing, the generation of Hertzsprung-Russell diagrams for visual analysis, and the implementation of advanced classification algorithms. This work demonstrates the intersection of astrophysics and data science, applying computational methods to solve complex astronomical classification challenges.",
            tech: ["Python", "Machine Learning", "Astrophysics", "Data Science"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/KZWtHlS1epw"
            },
            links: {
                video: "https://youtu.be/KZWtHlS1epw"
            }
        },
        {
            id: 6,
            order: -1,
            title: "This Portfolio",
            description: "This is the portfolio I made.",
            details: "My personal developer portfolio, designed to be fast, responsive, and visually stunning. Built with React and Vite for efficiency, it features immersive 3D background animations using Three.js and smooth scrolling effects with GSAP. The code is modular, well-documented, and fully customizable, serving as a hub for all my projects and skills.",
            tech: ["Three.js", "GSAP", "React", "Node.js", "HTML", "CSS", "JS"],
            media: {
                type: "image",
                url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
            },
            links: {
                demo: "https://arkrainian.github.io",
                code: "https://github.com/Arkrainian/arkrainian.github.io"
            }
        },

        {
            id: 10,
            order: 100,
            title: "Scratch Cat's Adventure",
            description: "An interactive platformer game built in Scratch featuring the iconic Scratch Cat character navigating through challenging levels.",
            details: "This project represents one of my earliest forays into game development, created with the dedication and passion that only a kid with a vision can have. I spent countless hours designing and implementing a multi-level platformer, teaching myself the fundamentals of game mechanics through trial, error, and pure determination.\\n\\nThe game features custom sprite animations, collision detection systems I built from scratch, and progressively challenging levels that I meticulously crafted and playtested. Each obstacle, collectible, and enemy behavior was the result of iterative refinement and creative problem-solving. This project wasn't just about building a game—it was about discovering my love for programming and proving to myself that I could bring my ideas to life. The countless late nights and unwavering commitment to making this game work taught me persistence, creativity, and the joy of seeing others play something I created.",
            tech: ["Scratch", "Game Design", "Animation", "Logic"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/YNy_16Ibwbg"
            },
            links: {
                code: "https://scratch.mit.edu/projects/410585863/"
            }
        },
        {
            id: 12,
            order: 0,
            title: "Roblox Studio Plane Physics",
            description: "A high-fidelity flight simulation system built in Roblox Studio using custom aerodynamic calculations.",
            details: "This project focuses on the engineering of a realistic flight model within the Roblox engine. I implemented a custom aerodynamic solver that calculates lift, drag, and thrust based on the plane's velocity and angle of attack. The system features a procedural control surface animation system and a realistic cockpit interface. Developed using Luau, this project demonstrates my ability to translate complex physical principles into interactive, real-time game systems.",
            tech: ["Luau", "Roblox Studio", "Aerodynamics"],
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
            },
            links: {
                video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Placeholder
            }
        },
    ],
    about: {
        backstory: [
            "My coding journey helps answer the question: 'How do things move?' Starting with basic script loops, I quickly became obsessed with the math behind motion. I spent years reverse-engineering movement mechanics, leading me from simple Python scripts to complex C++ simulations.",
            "I specialize in engineering custom physics engines and kinematic solvers. Whether it's calculating surface vectors for realistic character movement or simulating aerodynamic drag for flight models, I love translating the laws of physics into code. I've built systems that handle real-time collision detection, rigid body dynamics, and procedural animation.",
            "Today, I'm diving deeper into high-performance computing, optimizing solvers to run at frame-perfect speeds. If it involves vectors, forces, or momentum, I'm probably writing code for it."
        ],
        timeline: [
            {
                year: "2016",
                title: "Visual Programming with Scratch",
                description: "Ignited my passion for computer science at the age of 7 by building interactive stories and games using Scratch, mastering the fundamentals of logic and loops.",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2018",
                title: "Python Foundations",
                description: "Transitioned to text-based coding with Python, developing a strong foundation in syntax and problem-solving through automation scripts and early data analysis.",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2019",
                title: "Anki SDK & Robotics",
                description: "Advanced into hardware interaction by leveraging the Anki SDK to program complex autonomous behaviors and AI routines for the Cozmo robotics platform.",
                image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2019",
                title: "Systems Programming in C",
                description: "Transitioned to low-level systems programming, mastering memory management, pointers, and data structures to understand the core mechanics of computing.",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2020",
                title: "Computer Science Excellence",
                description: "Dedicated the pandemic period to rigorous self-study through Harvard's CS50, gaining a comprehensive understanding of algorithms, security, and web development.",
                image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2023",
                title: "Game Engine Architecture",
                description: "Began architecting interactive 3D environments and gameplay systems within Unity, utilizing C# to implement high-performance character controllers and physics solvers.",
                image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2024",
                title: "Professional C++ Development",
                description: "Deepened my expertise in Object-Oriented Programming (OOP) by adopting C++, focusing on optimization and efficient resource utilization for complex applications.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2024",
                title: "Computational Physics & Simulations",
                description: "Developed a deep interest in the intersection of math and code, exploring physical laws through custom-built simulations and mathematical models to understand real-world systems.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2024",
                title: "Physics-Driven Game Design",
                description: "Mastered game development within Roblox Studio, utilizing the Luau scripting language to engineer complex environments featuring sophisticated, real-world physics simulations and character interactions.",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2025",
                title: "AI Research & Implementation",
                description: "Collaborated with experts at the UCI Summer Academy to explore neural networks and machine learning models, focusing on data-driven decision-making systems.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
            },
            {
                year: "2025",
                title: "Modern Interactive Interfaces",
                description: "Specializing in premium web experiences by integrating Three.js and custom GLSL shaders to create immersive, 3D-driven user interfaces and animations.",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
            }
        ],
        hobbies: [
            {
                name: "3D Art & Animation",
                description: "I love creating immersive 3D worlds using Blender and Three.js. It's the perfect intersection of art and code.",
                icon: "🎨"
            },
            {
                name: "Space Exploration",
                description: "Deeply interested in astrophysics and the future of human space travel. I often spend nights stargazing.",
                icon: "🚀"
            },
            {
                name: "Game Development",
                description: "Building interactive experiences and exploring game physics in my free time.",
                icon: "🎮"
            }
        ]
    }
};
