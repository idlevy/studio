"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/commands/command-palette";
import { type Command } from "@/lib/types";
import { INITIAL_COMMANDS } from "@/lib/data";

const COMMANDS_STORAGE_KEY = "command-pal-commands";

export default function Home() {
  const [commands, setCommands] = useState<Command[]>([]);

  useEffect(() => {
    try {
      const storedCommands = localStorage.getItem(COMMANDS_STORAGE_KEY);
      if (storedCommands) {
        setCommands(JSON.parse(storedCommands));
      } else {
        setCommands(INITIAL_COMMANDS);
      }
    } catch (error) {
      console.error("Failed to load commands from localStorage, using initial commands.", error);
      setCommands(INITIAL_COMMANDS);
    }
  }, []);

  useEffect(() => {
    if (commands.length > 0) {
      localStorage.setItem(COMMANDS_STORAGE_KEY, JSON.stringify(commands));
    }
  }, [commands]);

  const addCommand = (newCommand: Omit<Command, "id">) => {
    setCommands((prevCommands) => [
      { ...newCommand, id: String(Date.now()) },
      ...prevCommands,
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header addCommand={addCommand} />
      <main className="flex-1 overflow-hidden">
        <CommandPalette commands={commands} />
      </main>
    </div>
  );
}
