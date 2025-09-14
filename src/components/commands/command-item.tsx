"use client";

import React from "react";
import { Copy, Info } from "lucide-react";
import { type Command } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CommandInfoDialog } from "./command-info-dialog";

interface CommandItemProps {
  command: Command;
  icon: React.ReactNode;
}

export function CommandItem({ command, icon }: CommandItemProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    toast({
      title: "Copied to clipboard!",
      description: (
        <code className="bg-muted text-muted-foreground p-1 rounded-sm text-xs">
          {command.command}
        </code>
      ),
    });
  };

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors animate-in fade-in-0 duration-300">
      <div className="flex items-center overflow-hidden">
        <div className="text-primary">{icon}</div>
        <div className="flex flex-col overflow-hidden">
          <p className="font-medium truncate">{command.label}</p>
          <code className="text-xs text-muted-foreground truncate">{command.command}</code>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-4">
         <Badge variant="outline" className="hidden md:inline-flex">{command.category}</Badge>
         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <CommandInfoDialog command={command}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
                <span className="sr-only">Info</span>
              </Button>
            </CommandInfoDialog>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
         </div>
      </div>
    </div>
  );
}
