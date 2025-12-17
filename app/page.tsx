"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Sun from './components/Sun';
import Planet from './components/Planet';
import { ElectricCard } from './components/ui/electric-card';
import { Card } from './components/ui/card';
import { TopTracks } from './components/TopTracks';
import { TopArtists } from './components/TopArtists';
import StarsBackground from './components/StarsBackground';
import { Timeline } from './components/ui/timeline';
import { Books } from './components/Books';

const timelineData = [
  {
    title: "Sun",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
        <div className="w-[400px] h-[400px] flex-shrink-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
            <Sun />
          </Canvas>
        </div>
        <div className="relative z-20 flex-shrink-0">
          <ElectricCard
            variant="swirl"
            color="#FFD700"
            badge="About Me"
            title="Teni Owojori"
            description="I’m a software engineer who loves turning ideas into tools people actually use. I focus on building products that make life simpler, smoother, and more meaningful."
            showAvatar={true}
          />
        </div>
        </div>
      </div>
    ),
  },
  {
    title: "Mercury",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_mercury.jpg" rotationSpeed={0.15} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#8C7853"
              badge="☿ Mercury"
              title="Projects"
              width="600px"
              aspectRatio="1 / 1"
              titleOffset={-100}
            >
              <div className="flex flex-col gap-3 mt-4">
                <Card
                  title="Crowd App"
                  description="iOS social app built with SwiftUI, Firebase, and MapKit. Developed a real-time event map and chat system for UNT students. Integrated location-based notifications and user-generated event hosting."
                  frameworks={["SwiftUI", "Firebase", "MapKit"]}
                  image="/crowd.png"
                  imageAlt="Crowd App"
                  link="https://apps.apple.com/us/app/crowd/id6754718385"
                />
                <Card
                  title="Essap"
                  description="AI writing assistant that adapts to each student's tone using FastAPI, OpenAI API, and Canvas LMS integration. Designed to streamline academic writing workflows."
                  frameworks={["FastAPI", "OpenAI", "Canvas LMS"]}
                  image="/essap.png"
                  imageAlt="Essap"
                  link="https://essapai.com/"
                />
                <Card
                  title="YScenes"
                  description="Movie recommendation platform that curates films based on user mood and emotional tone. Gained recognition in press coverage (Unilad, 2025) for its novel approach to mood-driven discovery. Attracted over 100 active users within its first launch month. Built with Python, React, and sentiment analysis APIs."
                  frameworks={["Python", "React", "Sentiment Analysis"]}
                  image="/yscenes.png"
                  imageAlt="YScenes"
                  link="https://yscenes.com/"
                />
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Venus",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_venus_surface.jpg" rotationSpeed={0.12} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#FFC649"
              badge="♀ Venus"
              title="Projects"
              width="600px"
              aspectRatio="1 / 1"
              titleOffset={-100}
            >
              <div className="flex flex-col gap-3 mt-4">
                <Card
                  title="DispatchOne"
                  description="AI-powered phone receptionist system using speech recognition and GPT-based call routing. Handles inbound calls, appointment scheduling, and client messaging for small businesses."
                  frameworks={["Speech Recognition", "GPT", "AI"]}
                  image="/dispatch.jpg"
                  imageAlt="DispatchOne"
                  link="https://dispatchone.space/"
                />
                <Card
                  title="YKlipp"
                  description="Built a web-based AI video processing tool that automatically identifies and extracts the most engaging moments from raw video files. Users can upload MP4, MOV, MKV, and other formats, and the platform intelligently generates a collection of best-moment clips without manual scrubbing."
                  frameworks={["AI", "Video Processing", "Web"]}
                  image="/yklipp.png"
                  imageAlt="YKlipp"
                  link="https://yklipp.com/"
                />
                <Card
                  title="Clerk Crawler"
                  description="Automated real-estate intelligence platform that continuously crawls county clerk and public-record data to surface fresh off-market properties and eliminate stale, recycled leads for investors."
                  frameworks={["Web Scraping", "Real Estate", "Data Intelligence"]}
                  image="/clerkcrawler.png"
                  imageAlt="Clerk Crawler"
                  link="https://clerkcrawler.com/"
                />
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Earth",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_earth_daymap.jpg" rotationSpeed={0.1} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#4A90E2"
              badge="🌍 Earth"
              title="Music"
              width="600px"
              aspectRatio="1 / 1"
            >
              <div className="flex gap-6 mt-4">
                <TopTracks />
                <TopArtists />
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Moon",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_moon.jpg" rotationSpeed={0.08} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#C0C0C0"
              badge="☽ Moon"
              title="Books"
              width="600px"
              aspectRatio="1 / 1"
              titleOffset={-80}
            >
              <Books />
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Mars",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_mars.jpg" rotationSpeed={0.11} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#CD5C5C"
              badge="♂ Mars"
              title="Gym"
              width="600px"
              aspectRatio="1 / 1"
              titleOffset={-80}
            >
              <div className="flex flex-col gap-6 mt-4 text-white">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Why I Train</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Training keeps my mind sharp and my life structured. The gym is where I practice discipline, consistency, and pushing past limits. It's the part of my day that strengthens everything else I do.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Routine</h3>
                  <ul className="text-sm opacity-80 space-y-2 list-disc list-inside">
                    <li>5–6 days a week</li>
                    <li>Push / Pull / Legs split / Cardio Daily</li>
                    <li>90 minutes per session</li>
                    <li>Focus on progression, form, and endurance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Progress</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>Bench PR: 205lbs</li>
                    <li>Squat PR: 250lbs</li>
                    <li>Deadlift PR: 315lbs</li>
                  </ul>
                </div>
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Jupiter",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_jupiter.jpg" rotationSpeed={0.2} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#D2691E"
              badge="♃ Jupiter"
              title="Philosophy / Worldview"
              width="600px"
              aspectRatio="1 / 1"
              titleOffset={-25}
            >
              <div className="flex flex-col gap-6 mt-4 text-white">
                <div>
                  <h3 className="text-xl font-semibold mb-3">How I see the world</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>Growth is a responsibility, not an accident.</li>
                    <li>Comfort is the enemy of progress.</li>
                    <li>Small wins compound into big outcomes.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">How I operate</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>Bias toward action.</li>
                    <li>Long-term thinking.</li>
                    <li>Consistency over intensity.</li>
                    <li>Systems over motivation.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">What I believe</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>"How you do anything is how you do everything."</li>
                    <li>Choose the harder path, it builds the stronger version of you.</li>
                    <li>Humans get better when their tools get better.</li>
                  </ul>
                </div>
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Saturn",
    content: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-8 z-10">
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Planet texturePath="/textures/2k_saturn.jpg" rotationSpeed={0.18} />
            </Canvas>
          </div>
          <div className="relative z-20 flex-shrink-0">
            <ElectricCard
              variant="swirl"
              color="#FAD5A5"
              badge="♄ Saturn"
              title="Goals / Ambitions"
              width="600px"
              aspectRatio="1 / 1"
              titleOffset={-80}
            >
              <div className="flex flex-col gap-6 mt-4 text-white">
                <div>
                  <h3 className="text-xl font-semibold mb-3">1-Year Goals</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>Build and launch multiple AI tools + internal agents.</li>
                    <li>Develop a personal AI OS that handles my workflow and learning.</li>
                    <li>Gain industry experience through internships and real-world engineering work.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">5-Year Goals</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>Become a top-tier engineer with deep ML + systems understanding.</li>
                    <li>Build a profitable product or company around AI automation.</li>
                    <li>Develop expertise in BCI and human–computer integration.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Long-Term Ambitions</h3>
                  <ul className="text-sm opacity-80 space-y-2">
                    <li>Create technology that amplifies human intelligence.</li>
                    <li>Build systems that help people think, learn, and create at a higher level.</li>
                    <li>Become the kind of founder who pushes the frontier of what's possible.</li>
                  </ul>
                </div>
              </div>
            </ElectricCard>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
      <StarsBackground />
      <div className="relative z-10">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
}
