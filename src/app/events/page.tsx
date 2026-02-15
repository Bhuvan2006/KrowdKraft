"use client"

import { useEffect, useState } from "react"
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
                    {/* Upcoming Events Section */}
                    <section id="upcoming" className="py-12 bg-secondary/5">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <ParallaxWrapper speed={0.2}>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl sm:text-4xl font-bold">
                                        Upcoming <span className="neon-text">Events</span>
                                    </h2>
                                </div>

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
                            </ParallaxWrapper>
                        </div>
                    </section>

                    {/* Past Events Section */}
                    <section id="past" className="py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <ParallaxWrapper speed={0.4}>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl sm:text-4xl font-bold">
                                        Past <span className="neon-text">Events</span>
                                    </h2>
                                </div>

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
                            </ParallaxWrapper>
                        </div>
                    </section>
                </>
            )}

            <Footer />
        </main>
    )
}
