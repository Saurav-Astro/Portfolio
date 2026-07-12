"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([
    { command: "init", output: "System initialized. Type 'help' for available commands." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Listen for 'help' typed anywhere on the document body
  useEffect(() => {
    let keyBuffer = "";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      keyBuffer += e.key;
      
      // Keep buffer short
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }
      
      if (keyBuffer.endsWith("help")) {
        setIsOpen(true);
        keyBuffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p className="text-[#00D9FF]">help<span className="text-muted-foreground ml-4">- Show this message</span></p>
            <p className="text-[#00D9FF]">whoami<span className="text-muted-foreground ml-4">- Display user identity</span></p>
            <p className="text-[#00D9FF]">skills<span className="text-muted-foreground ml-4">- List technical skills</span></p>
            <p className="text-[#00D9FF]">contact<span className="text-muted-foreground ml-4">- Show contact information</span></p>
            <p className="text-[#00D9FF]">clear<span className="text-muted-foreground ml-4">- Clear terminal history</span></p>
            <p className="text-[#00FF9C] mt-2">sudo hire astro<span className="text-muted-foreground ml-4">- Execute highly privileged action</span></p>
          </div>
        );
        break;
      case "whoami":
        output = "astro (Saurav Kumar) - Security Engineer & Full-Stack Developer. UID: 0, GID: 0 (root).";
        break;
      case "skills":
        output = "Python, TypeScript, React, Next.js, Node.js, C++, Burp Suite, Nmap, Docker.";
        break;
      case "contact":
        output = "Email: 0501saurav@gmail.com | LinkedIn: /in/saurav-kumar-astro";
        break;
      case "sudo hire astro":
        output = (
          <span className="text-[#00FF9C] font-bold">
            [OK] Privileges verified. Initiating interview sequence... Please send an email to 0501saurav@gmail.com to proceed.
          </span>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = <span className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</span>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[90vw] md:w-[500px] h-[400px] bg-[#0F172A] border border-[#00D9FF]/30 rounded-lg shadow-2xl overflow-hidden flex flex-col font-code text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-[#00D9FF]/20">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TerminalIcon className="w-4 h-4" />
              <span>astro@portfolio:~</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4"
          >
            {history.map((entry, i) => (
              <div key={i} className="space-y-1">
                {entry.command !== "init" && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF9C]">astro@portfolio:~$</span>
                    <span className="text-white">{entry.command}</span>
                  </div>
                )}
                <div className="text-muted-foreground">
                  {entry.output}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/20 border-t border-white/5">
            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <span className="text-[#00FF9C]">astro@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white font-code"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
