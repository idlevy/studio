"use client";

import { Terminal, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AddCommandDialog } from "@/components/commands/add-command-dialog";
import { type Command } from "@/lib/types";

interface HeaderProps {
  addCommand: (newCommand: Omit<Command, "id">) => void;
}

export function Header({ addCommand }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-2 md:p-4 border-b">
      <div className="flex items-center gap-2">
        <Terminal className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tighter">Command Pal</h1>
      </div>
      <div className="flex items-center gap-2">
        <AddCommandDialog onAddCommand={addCommand}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Command
          </Button>
        </AddCommandDialog>
        <ThemeToggle />
      </div>
    </header>
  );
}
