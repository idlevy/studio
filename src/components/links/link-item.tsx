"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { type Link } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LinkItemProps {
  link: Link;
  icon: React.ReactNode;
}

export function LinkItem({ link, icon }: LinkItemProps) {

  const handleOpenLink = () => {
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors animate-in fade-in-0 duration-300">
      <div className="flex items-center overflow-hidden">
        <div className="text-primary">{icon}</div>
        <div className="flex flex-col overflow-hidden">
          <p className="font-medium truncate">{link.label}</p>
          <code className="text-xs text-muted-foreground truncate">{link.url}</code>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-4">
         <Badge variant="outline" className="hidden md:inline-flex">{link.category}</Badge>
         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleOpenLink}>
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open Link</span>
            </Button>
         </div>
      </div>
    </div>
  );
}
