"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const TerminalLine = ({ text, delay }: { text: string; delay: number }) => (
    <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay }}
        className="font-code text-green-400"
    >
        {text}
    </motion.p>
);

export default function ContactSection() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [scriptLines, setScriptLines] = useState<string[]>([]);
    const form = useRef<HTMLFormElement>(null);

    const scriptOutput = [
        '> Running script: sendMessage.js...',
        '> Initiating contact with host... [OK]',
        '> Encrypting transmission... [OK]',
        '> Dispatching signal through the cosmos... [OK]',
        '>',
        '> Transmission complete. Saurav has been notified.'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'sending') return;

        setStatus('sending');

        if (form.current) {
            // Dynamically import emailjs only on the client side, on demand
            const emailjs = (await import('@emailjs/browser')).default;
            emailjs.sendForm(
                'service_t7wry6a',      // Service ID
                'template_8f40c5k',     // Template ID
                form.current,
                'faw_-j3mMQ6NhTOHa'      // User ID / Public Key
            ).then(
                (result) => {
                    console.log('SUCCESS!', result.text);
                    setStatus('success');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setStatus('error');
                    // Reset status after a delay so user can try again
                    setTimeout(() => setStatus('idle'), 3000);
                }
            );
        }
    };

    // This useEffect handles the "hacker" animation
    useEffect(() => {
        if (status === 'success') {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex < scriptOutput.length) {
                    setScriptLines(prevLines => [...prevLines, scriptOutput[currentIndex]]);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 500); // 500ms delay between lines

            return () => clearInterval(interval); // Cleanup on component unmount
        }
    }, [status]);

    const renderContent = () => {
        if (status === 'success') {
            return (
                <motion.div
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1 min-h-[280px]"
                >
                    {scriptLines.map((line, index) => (
                        <TerminalLine key={index} text={line} delay={0} />
                    ))}
                </motion.div>
            );
        }

        return (
            <motion.form
                key="form"
                ref={form}
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center gap-2">
                    <label htmlFor="name" className="text-green-400">&gt;</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="bg-transparent border-0 focus:ring-0 focus-visible:ring-offset-0 font-code text-base w-full text-gray-300 placeholder-gray-500"
                    />
                    <span className="blinking-cursor text-green-400 font-bold animate-blink">|</span>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="email" className="text-green-400">&gt;</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="bg-transparent border-0 focus:ring-0 focus-visible:ring-offset-0 font-code text-base w-full text-gray-300 placeholder-gray-500"
                    />
                    <span className="blinking-cursor text-green-400 font-bold animate-blink">|</span>
                </div>
                <div className="flex items-start gap-2">
                    <label htmlFor="message" className="text-green-400 pt-2.5">&gt;</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Compose message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="bg-transparent border-0 focus:ring-0 focus-visible:ring-offset-0 font-code text-base w-full text-gray-300 placeholder-gray-500 resize-none"
                    />
                    <span className="blinking-cursor text-green-400 font-bold pt-2.5 animate-blink">|</span>
                </div>
                <button type="submit" disabled={status === 'sending'} className="font-code text-lg bg-green-500/80 text-black border-none py-2 px-6 cursor-pointer transition-all duration-200 w-full text-left hover:enabled:bg-white disabled:bg-gray-600 disabled:cursor-not-allowed">
                    {status === 'sending' ? 'Sending...' : '[ > Execute ]'}
                </button>
                {status === 'error' && <p className="text-red-500 mt-4">> Error: Transmission failed. Please try again.</p>}
            </motion.form>
        );
    }

    return (
        <section id="contact" className="w-full min-h-screen flex items-center justify-center animate-fade-in py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                           Establish Connection
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-2xl font-code text-base bg-black/70 rounded-lg p-6 border border-white/10 backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </div>
                 <div className="flex items-center justify-center gap-6 pt-8">
                    <Link href="https://github.com/Saurav-Astro" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/saurav-kumar-astro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                    <Link href="mailto:0501saurav@gmail.com" aria-label="Email">
                        <Mail className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
