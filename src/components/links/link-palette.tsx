"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, Book, Code, Brain, Globe } from "lucide-react";
import { Link as LinkType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkItem } from "./link-item";
import { useHotKey } from "@/hooks/use-hotkey";

interface LinkPaletteProps {
  links: LinkType[];
  onEditLink: (link: LinkType) => void;
  onDeleteLink: (id: string) => void;
}

const categoryIcons: { [key: string]: React.ElementType } = {
  documentation: Book,
  frameworks: Code,
  styling: Code,
  ai: Brain,
};

const getCategoryIcon = (category: string) => {
  const Icon = categoryIcons[category.toLowerCase()];
  return Icon ? <Icon className="h-4 w-4 mr-2" /> : <Globe className="h-4 w-4 mr-2" />;
};

export function LinkPalette({ links, onEditLink, onDeleteLink }: LinkPaletteProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useHotKey("k", () => inputRef.current?.focus(), { meta: true });
  useHotKey("k", () => inputRef.current?.focus(), { ctrl: true });

  const filteredAndGroupedLinks = useMemo(() => {
    const filtered = links.filter(
      (link) =>
        link.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.group?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, link) => {
      const groupName = link.group || "General";
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(link);
      return acc;
    }, {} as Record<string, LinkType[]>);
  }, [links, searchTerm]);
  
  useEffect(() => {
    setSearchTerm("");
  }, [links]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search links... (Press Ctrl+K or ⌘K)"
            className="pl-10 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.keys(filteredAndGroupedLinks).length > 0 ? (
            Object.entries(filteredAndGroupedLinks).map(([group, linksInGroup]) => (
              <div key={group}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  {group}
                </h2>
                <div className="space-y-1">
                  {linksInGroup.map((link) => (
                    <LinkItem
                      key={link.id}
                      link={link}
                      icon={getCategoryIcon(link.category)}
                      onEdit={onEditLink}
                      onDelete={onDeleteLink}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No links found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
