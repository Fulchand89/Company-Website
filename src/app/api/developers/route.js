import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export const revalidate = 60;

const STATIC_DEVELOPERS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Full Stack Developer",
    experience: "Senior (5+ yrs)",
    skills: ["React.js", "Node.js", "MERN Stack"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Mobile App Developer",
    experience: "Mid (2-5 yrs)",
    skills: ["Flutter", "React Native", "Android"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Backend Developer",
    experience: "Senior (5+ yrs)",
    skills: ["Python", "Node.js", ".NET"],
    available: false,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Frontend Developer",
    experience: "Mid (2-5 yrs)",
    skills: ["React.js", "Vue.js", "WordPress"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Laravel Developer",
    experience: "Senior (5+ yrs)",
    skills: ["Laravel", "PHP", "Vue.js"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 6,
    name: "Ananya Mishra",
    role: "iOS Developer",
    experience: "Mid (2-5 yrs)",
    skills: ["iOS", "React Native", "Flutter"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 7,
    name: "Rohan Joshi",
    role: "E-Commerce Developer",
    experience: "Junior (0-2 yrs)",
    skills: ["Shopify", "WordPress", "PHP"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 8,
    name: "Kavya Reddy",
    role: "Full Stack Developer",
    experience: "Senior (5+ yrs)",
    skills: ["MERN Stack", "React.js", "Node.js"],
    available: false,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 9,
    name: "Arjun Nair",
    role: "Java Developer",
    experience: "Mid (2-5 yrs)",
    skills: ["Java", "Android", ".NET"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 10,
    name: "Divya Kapoor",
    role: "Python Developer",
    experience: "Junior (0-2 yrs)",
    skills: ["Python", "React.js", "Node.js"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 11,
    name: "Manish Tiwari",
    role: "WordPress Expert",
    experience: "Senior (5+ yrs)",
    skills: ["WordPress", "PHP", "Shopify"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
  {
    id: 12,
    name: "Nisha Agarwal",
    role: "Vue.js Developer",
    experience: "Mid (2-5 yrs)",
    skills: ["Vue.js", "Laravel", "Node.js"],
    available: true,
    img: "/assets/images/hero/team-demo.png",
  },
];

export async function GET() {
  try {
    try {
      const developers = await executeQuery(
        "SELECT * FROM developers WHERE status = 'active' ORDER BY created_at DESC"
      );

      const formattedDevelopers = (developers || []).map(d => {
        let parsedSkills = [];
        try {
          if (typeof d.skills === 'string') {
            parsedSkills = JSON.parse(d.skills);
          } else if (Array.isArray(d.skills)) {
            parsedSkills = d.skills;
          }
        } catch (_) { 
          if (typeof d.skills === 'string') {
            parsedSkills = d.skills.split(',').map(s => s.trim());
          }
        }

        return {
          id: d.id,
          name: d.name,
          role: d.role,
          experience: d.experience,
          skills: parsedSkills,
          available: d.available === 1 || d.available === true || d.available === 'true' || d.available === 1,
          img: d.img || "/assets/images/hero/team-demo.png",
        };
      });

      const responsePayload = {
        data: formattedDevelopers.length > 0 ? formattedDevelopers : STATIC_DEVELOPERS
      };

      return NextResponse.json(responsePayload, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    } catch (dbError) {
      console.warn("Developers DB query error, using static fallback:", dbError.message);
      return NextResponse.json({ data: STATIC_DEVELOPERS }, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    }
  } catch (error) {
    console.error("GET Developers API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve developers" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, role, experience, skills, available, img } = body;

    if (!name || !role || !experience || !skills) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const skillsJson = JSON.stringify(skills);
    const availableVal = available ? 1 : 0;
    const imgUrl = img || "/assets/images/hero/team-demo.png";

    const result = await executeQuery(
      "INSERT INTO developers (name, role, experience, skills, available, img) VALUES (?, ?, ?, ?, ?, ?)",
      [name, role, experience, skillsJson, availableVal, imgUrl]
    );

    return NextResponse.json(
      { success: true, message: "Developer added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Developers API Error:", error);
    return NextResponse.json(
      { error: "Failed to add developer" },
      { status: 500 }
    );
  }
}
