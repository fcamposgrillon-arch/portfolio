"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "matrix-notes-content";

function readStoredText(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function MatrixNotes() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(readStoredText);
  const [saved, setSaved] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    const id = requestAnimationFrame(() => textareaRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(id);
    };
  }, [open]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setSaved(false);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // ignore — nothing to persist to
      }
      setSaved(true);
    }, 250);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir bloc de notas"
        className="fixed bottom-6 right-6 z-[60] w-11 h-11 rounded-full flex items-center justify-center font-mono text-sm cursor-pointer transition-transform hover:scale-105"
        style={{
          background: "#000",
          color: "#3ef07a",
          border: "1px solid rgba(62,240,122,0.35)",
          boxShadow: "0 0 12px rgba(62,240,122,0.25)",
        }}
      >
        &gt;_
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-[70] flex flex-col"
            style={{ background: "#000" }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 font-mono text-xs shrink-0"
              style={{ borderBottom: "1px solid rgba(62,240,122,0.25)", color: "#3ef07a" }}
            >
              <span className="opacity-70">{saved ? "guardado" : "guardando..."}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar bloc de notas"
                className="cursor-pointer px-2 hover:opacity-70"
              >
                [X]
              </button>
            </div>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              spellCheck={false}
              placeholder="_"
              className="flex-1 w-full resize-none outline-none p-6 font-mono text-sm md:text-base leading-relaxed"
              style={{
                background: "#000",
                color: "#3ef07a",
                textShadow: "0 0 6px rgba(62,240,122,0.5)",
                caretColor: "#3ef07a",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
