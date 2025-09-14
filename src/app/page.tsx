"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/commands/command-palette";
import { type Command } from "@/lib/types";
import { INITIAL_COMMANDS } from "@/lib/data";

export default function Home() {
  const [commands, setCommands] = useState<Command[]>(INITIAL_COMMANDS);

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
