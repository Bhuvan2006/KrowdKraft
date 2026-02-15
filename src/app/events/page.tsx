"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import UpcomingEvents from "@/components/sections/community/upcoming-events"
import PastEvents from "@/components/sections/community/past-events"
import ParallaxWrapper from "@/components/parallax-wrapper"
import { motion } from "framer-motion"

export default function EventsPage() {
    return (
        <main className="min-h-screen">
            <Navigation />

            <section className="pt-32 pb-4 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Experience <span className="neon-text">KrowdKraft</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 text-balance">
                            Join our vibrant community events, workshops, and gatherings.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section id="upcoming">
                <ParallaxWrapper speed={0.2}>
                    <UpcomingEvents />
                </ParallaxWrapper>
            </section>

            <section id="past">
                <ParallaxWrapper speed={0.4}>
                    <PastEvents />
                </ParallaxWrapper>
            </section>

            <Footer />
        </main>
    )
}
