"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Mail, ArrowRight, MapPin, Phone, Globe2 } from "lucide-react"
import { useState } from "react"

// Custom X Logo Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socialLinks = [
  { icon: Instagram, href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/krowdkraft_/", label: "Instagram" },
  { icon: XIcon, href: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/KrowdKraft_", label: "X (Twitter)" },
  { icon: Linkedin, href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/krowdkraft/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:krowdkraft.official@gmail.com", label: "Email" },
]

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Community", href: "/community" },
  // { label: "Events", href: "/events" },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      alert('There was an error subscribing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-black/70 via-black/50 to-black/70 border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Newsletter Section */}
      <section id="newsletter-section" className="py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Stay in the{" "}
              <span className="neon-text bg-clip-text bg-gradient-to-r from-neon to-purple-400">Loop</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of innovators and get exclusive updates on events, 
              collaborations, and opportunities delivered straight to your inbox.
            </p>
            
            {isSubscribed ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-8 max-w-md mx-auto"
              >
                <div className="text-neon text-2xl font-bold mb-4">🎉 Welcome aboard!</div>
                <p className="text-muted-foreground">You'll receive our latest updates soon.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 max-w-lg mx-auto"
              >
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 h-12 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent disabled:opacity-50"
                  />
                  <Button 
                    type="submit" 
                    variant="neon" 
                    size="lg"
                    className="group px-8 h-12" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    <ArrowRight className="ml-2 h-5 w-5 pointer-events-none" />
                  </Button>
                </form>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="py-16 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Link href="/" className="flex items-center space-x-3 mb-8 group">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="w-12 h-12 relative"
                >
                  <Image
                    src="/KrowdKraft_Logo.png"
                    alt="KrowdKraft Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </motion.div>
                <span className="font-bold text-2xl neon-text group-hover:text-neon transition-colors duration-300">
                  KrowdKraft
                </span>
              </Link>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-white">Culture Moves Fast. We Move Faster.</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Bridging brands to Gen Z & Millennials through authentic connections, 
                  creative collaborations, and unforgettable experiences.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-neon" />
                    <span>krowdkraft.official@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe2 className="h-4 w-4 text-neon" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-bold mb-8 text-white">Explore</h4>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block p-3 rounded-xl bg-white/5 hover:bg-neon/10 transition-all duration-300 group border border-white/10 hover:border-neon/30"
                    >
                      <span className="text-muted-foreground group-hover:text-neon transition-colors font-medium">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-bold mb-8 text-white">Connect With Us</h4>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-neon/20 transition-all duration-300 group border border-white/20 hover:border-neon/50"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-neon transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <div className="glass-card p-6">
                <h5 className="font-bold mb-3 text-white">Ready to Go Viral?</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  Let's create something that resonates with the next generation.
                </p>
                <Button 
                  variant="neon" 
                  size="sm" 
                  className="w-full group"
                  asChild
                >
                  <Link href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/krowdkraft-official/30min"} target="_blank">
                    Book a Call
                    <ArrowRight className="ml-2 h-4 w-4 pointer-events-none" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          >
            <div className="text-sm text-muted-foreground">
              © 2026 KrowdKraft. All rights reserved. | Made with 💜 for Gen Z
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-neon transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-neon transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-neon transition-colors">
                Cookies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
