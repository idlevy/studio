"use client";

import { Terminal, Plus, Link as LinkIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AddCommandDialog } from "@/components/commands/add-command-dialog";
import { AddLinkDialog } from "@/components/links/add-link-dialog";
import { type Command, type Link } from "@/lib/types";

interface HeaderProps {
  addCommand: (newCommand: Omit<Command, "id">) => void;
  addLink: (newLink: Omit<Link, "id">) => void;
  activeTab: string;
}

export function Header({ addCommand, addLink, activeTab }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-2 md:p-4 border-b">
      <div className="flex items-center gap-2">
        <Terminal className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tighter">Command Pal</h1>
      </div>
      <div className="flex items-center gap-2">
        {activeTab === 'commands' ? (
          <AddCommandDialog onConfirm={addCommand}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Command
            </Button>
          </AddCommandDialog>
        ) : (
          <AddLinkDialog onConfirm={addLink}>
            <Button>
              <LinkIcon className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </AddLinkDialog>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
