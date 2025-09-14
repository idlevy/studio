"use client";

import React, { useState, useMemo, useRef } from "react";
import { Search, GitBranch, Box, Package, Cog, Container } from "lucide-react";
import { Command as CommandType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommandItem } from "./command-item";
import { useHotKey } from "@/hooks/use-hotkey";

interface CommandPaletteProps {
  commands: CommandType[];
}

const categoryIcons: { [key: string]: React.ElementType } = {
  git: GitBranch,
  docker: Box,
  npm: Package,
  system: Cog,
  kubectl: Container,
};

const getCategoryIcon = (category: string) => {
  const Icon = categoryIcons[category.toLowerCase()];
  return Icon ? <Icon className="h-4 w-4 mr-2" /> : <Cog className="h-4 w-4 mr-2" />;
};

export function CommandPalette({ commands }: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useHotKey("k", () => inputRef.current?.focus(), { meta: true });
  useHotKey("k", () => inputRef.current?.focus(), { ctrl: true });

  const filteredAndGroupedCommands = useMemo(() => {
    const filtered = commands.filter(
      (command) =>
        command.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.group?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, command) => {
      const groupName = command.group || "General";
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(command);
      return acc;
    }, {} as Record<string, CommandType[]>);
  }, [commands, searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search commands... (Press Ctrl+K or ⌘K)"
            className="pl-10 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.keys(filteredAndGroupedCommands).length > 0 ? (
            Object.entries(filteredAndGroupedCommands).map(([group, commandsInGroup]) => (
              <div key={group}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  {group}
                </h2>
                <div className="space-y-1">
                  {commandsInGroup.map((command) => (
                    <CommandItem
                      key={command.id}
                      command={command}
                      icon={getCategoryIcon(command.category)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No commands found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
