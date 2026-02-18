"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/sections/footer"
import { supabase } from "@/lib/supabase"
import { Event } from "@/types/supabase"
import { EventCard } from "@/components/events/event-card"
import ParallaxWrapper from "@/components/parallax-wrapper"

export default function EventsPage() {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
    const [pastEvents, setPastEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

    useEffect(() => {
        async function getEvents() {
            try {
                const { data: events, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('registration_deadline', { ascending: true })

                if (error) {
                    console.error('Error fetching events:', error)
                    return
                }

                const eventList = (events as Event[]) || []
                const now = new Date()

                setUpcomingEvents(eventList.filter(event => new Date(event.registration_deadline || '') > now))
                setPastEvents(eventList.filter(event => new Date(event.registration_deadline || '') <= now))
            } catch (err) {
                console.error("Unexpected error fetching events:", err)
            } finally {
                setLoading(false)
            }
        }

        getEvents()
    }, [])

    return (
        <main className="min-h-screen">
            <Navigation />

            <section className="pt-32 pb-4 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Experience <span className="neon-text">KrowdKraft</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 text-balance">
                            Join our vibrant community events, workshops, and gatherings.
                        </p>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon"></div>
                </div>
            ) : (
                <>
                    <section className="py-12 min-h-[600px]">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                            {/* Toggle Switch */}
                            <div className="flex justify-center mb-16">
                                <div className="bg-secondary/30 p-1.5 rounded-full flex relative border border-white/5 backdrop-blur-sm">
                                    <button
                                        onClick={() => setActiveTab('upcoming')}
                                        className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === 'upcoming'
                                            ? 'text-black'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        Upcoming
                                        {activeTab === 'upcoming' && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-neon rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('past')}
                                        className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === 'past'
                                            ? 'text-black'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        Past
                                        {activeTab === 'past' && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-neon rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <ParallaxWrapper speed={0.2}>
                                <AnimatePresence mode="wait">
                                    {activeTab === 'upcoming' ? (
                                        <motion.div
                                            key="upcoming"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {upcomingEvents.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                    {upcomingEvents.map((event, index) => (
                                                        <EventCard key={event.id} event={event} index={index} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12">
                                                    <p className="text-xl text-muted-foreground">No upcoming events at the moment. Stay tuned!</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="past"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {pastEvents.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                    {pastEvents.map((event, index) => (
                                                        <EventCard key={event.id} event={event} index={index} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12">
                                                    <p className="text-xl text-muted-foreground">No past events found.</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </ParallaxWrapper>
                        </div>
                    </section>
                </>
            )}

            <Footer />
        </main>
    )
}
