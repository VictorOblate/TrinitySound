import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Trinity Sound database...");

  // Create admin users with Sotho names
  const adminUsers = await Promise.all([
    prisma.adminUser.upsert({
      where: { email: "teboho@trinitysound.co.ls" },
      update: {},
      create: {
        email: "teboho@trinitysound.co.ls",
        name: "Teboho Moeketsi",
        password_hash: await bcrypt.hash("TrinitySound@2024", 10),
      },
    }),
    prisma.adminUser.upsert({
      where: { email: "boitumelo@trinitysound.co.ls" },
      update: {},
      create: {
        email: "boitumelo@trinitysound.co.ls",
        name: "Boitumelo Lerata",
        password_hash: await bcrypt.hash("SecurePass@123", 10),
      },
    }),
  ]);

  console.log(`✅ Created ${adminUsers.length} admin users`);

  // Create portfolio items with Sotho-inspired events
  const portfolioItems = await Promise.all([
    prisma.portfolioItem.upsert({
      where: { id: "royal-wedding-2024" },
      update: {},
      create: {
        id: "royal-wedding-2024",
        title: "Royal Garden Wedding - Teboho & Likhasi",
        description:
          "Elegant wedding ceremony sound setup for a celebration of love in the heart of Maseru",
        category: "Weddings",
        image_url:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
        location: "Kampala Gardens, Maseru",
        guests: "200+",
        date: "2024",
        featured: true,
        created_by: adminUsers[0].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "tech-conference-2024" },
      update: {},
      create: {
        id: "tech-conference-2024",
        title: "Lesotho Tech Summit 2024",
        description:
          "Professional audio equipment setup for corporate tech conference with live streaming",
        category: "Corporate",
        image_url:
          "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop",
        location: "Convention Center, Maseru",
        guests: "500+",
        date: "2024",
        featured: false,
        created_by: adminUsers[0].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "birthday-celebration" },
      update: {},
      create: {
        id: "birthday-celebration",
        title: "Ntaoleng's 25th Birthday Bash",
        description:
          "DJ setup and sound system for an unforgettable birthday celebration with friends and family",
        category: "Entertainment",
        image_url:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        location: "Private Venue, Maseru",
        guests: "150+",
        date: "2024",
        featured: false,
        created_by: adminUsers[1].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "summer-festival" },
      update: {},
      create: {
        id: "summer-festival",
        title: "Lesotho Summer Festival 2024",
        description:
          "Large-scale outdoor event sound system with multiple stages and professional mixing",
        category: "Outdoor Events",
        image_url:
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
        location: "City Park, Maseru",
        guests: "1000+",
        date: "2024",
        featured: true,
        created_by: adminUsers[0].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "live-concert" },
      update: {},
      create: {
        id: "live-concert",
        title: "Mosotho Live Concert Series",
        description:
          "Professional concert sound equipment for live music performances by local and international artists",
        category: "Concerts",
        image_url:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
        location: "Music Hall, Maseru",
        guests: "800+",
        date: "2024",
        featured: false,
        created_by: adminUsers[1].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "church-conference" },
      update: {},
      create: {
        id: "church-conference",
        title: "Trinity Church Annual Conference",
        description:
          "Religious event audio setup with crystal clear sound for sermons and worship sessions",
        category: "Religious",
        image_url:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop",
        location: "Trinity Church, Maseru",
        guests: "300+",
        date: "2024",
        featured: false,
        created_by: adminUsers[0].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "graduation-2024" },
      update: {},
      create: {
        id: "graduation-2024",
        title: "National University Graduation Ceremony",
        description:
          "Large-scale graduation event with professional audio for speeches and celebrations",
        category: "Graduations",
        image_url:
          "https://images.unsplash.com/photo-1523580846011-d3982bcd500e?w=600&h=400&fit=crop",
        location: "University Hall, Maseru",
        guests: "600+",
        date: "2024",
        featured: true,
        created_by: adminUsers[1].id,
      },
    }),
    prisma.portfolioItem.upsert({
      where: { id: "product-launch" },
      update: {},
      create: {
        id: "product-launch",
        title: "Innovation Hub Product Launch",
        description:
          "Corporate product launch event with professional audio-visual presentation setup",
        category: "Corporate",
        image_url:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
        location: "Hotel Ballroom, Maseru",
        guests: "400+",
        date: "2024",
        featured: false,
        created_by: adminUsers[0].id,
      },
    }),
  ]);

  console.log(`✅ Created ${portfolioItems.length} portfolio items`);

  // Create upcoming events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { id: "summer-festival-2026" },
      update: {},
      create: {
        id: "summer-festival-2026",
        name: "Lesotho Summer Music Festival 2026",
        description: "Annual outdoor music festival celebrating local and regional artists",
        date: new Date("2026-07-18"),
        location: "City Park, Maseru",
        image_url:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
        cta: "https://www.trinitysound.co.ls/tickets/summer-2026",
        featured: true,
        created_by: adminUsers[0].id,
      },
    }),
    prisma.event.upsert({
      where: { id: "fundraiser-gala-2026" },
      update: {},
      create: {
        id: "fundraiser-gala-2026",
        name: "Charity Gala Evening 2026",
        description:
          "Elegant fundraiser gala supporting local education initiatives in Lesotho",
        date: new Date("2026-05-22"),
        location: "Grand Hotel Ballroom, Maseru",
        image_url:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        cta: "https://www.trinitysound.co.ls/tickets/gala-2026",
        featured: false,
        created_by: adminUsers[1].id,
      },
    }),
    prisma.event.upsert({
      where: { id: "new-year-bash-2026" },
      update: {},
      create: {
        id: "new-year-bash-2026",
        name: "New Year Celebration 2026",
        description: "Ring in the new year with Trinity Sound's biggest party of the season",
        date: new Date("2026-12-31"),
        location: "City Center, Maseru",
        image_url:
          "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",
        cta: "https://www.trinitysound.co.ls/tickets/nye-2026",
        featured: true,
        created_by: adminUsers[0].id,
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} upcoming events`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
