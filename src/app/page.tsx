"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { CommandPalette } from "@/components/commands/command-palette";
import { LinkPalette } from "@/components/links/link-palette";
import { type Command, type Link } from "@/lib/types";
import { INITIAL_COMMANDS, INITIAL_LINKS } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const COMMANDS_STORAGE_KEY = "command-pal-commands";
const LINKS_STORAGE_KEY = "command-pal-links";

export default function Home() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [activeTab, setActiveTab] = useState("commands");
  const { toast } = useToast();

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
    try {
      const storedLinks = localStorage.getItem(LINKS_STORAGE_KEY);
      if (storedLinks) {
        setLinks(JSON.parse(storedLinks));
      } else {
        setLinks(INITIAL_LINKS);
      }
    } catch (error) {
      console.error("Failed to load links from localStorage, using initial links.", error);
      setLinks(INITIAL_LINKS);
    }
  }, []);

  useEffect(() => {
    // Only save to localStorage if commands is not empty
    if (commands.length > 0 || localStorage.getItem(COMMANDS_STORAGE_KEY)) {
      localStorage.setItem(COMMANDS_STORAGE_KEY, JSON.stringify(commands));
    }
  }, [commands]);

  useEffect(() => {
    // Only save to localStorage if links is not empty
    if (links.length > 0 || localStorage.getItem(LINKS_STORAGE_KEY)) {
      localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
    }
  }, [links]);

  const addCommand = (newCommand: Omit<Command, "id">) => {
    setCommands((prevCommands) => [
      { ...newCommand, id: String(Date.now()) },
      ...prevCommands,
    ]);
  };
  
  const editCommand = (updatedCommand: Command) => {
    setCommands((prevCommands) =>
      prevCommands.map((c) =>
        c.id === updatedCommand.id ? updatedCommand : c
      )
    );
    toast({
      title: "Success!",
      description: "Your command has been updated.",
    });
  };

  const deleteCommand = (id: string) => {
    setCommands((prevCommands) => prevCommands.filter((c) => c.id !== id));
     toast({
      title: "Command Deleted",
      description: "The command has been removed from your palette.",
    });
  };

  const addLink = (newLink: Omit<Link, "id">) => {
    setLinks((prevLinks) => [
      { ...newLink, id: String(Date.now()) },
      ...prevLinks,
    ]);
  };

  const editLink = (updatedLink: Link) => {
    setLinks((prevLinks) =>
      prevLinks.map((l) =>
        l.id === updatedLink.id ? updatedLink : l
      )
    );
     toast({
      title: "Success!",
      description: "Your link has been updated.",
    });
  };

  const deleteLink = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((l) => l.id !== id));
    toast({
      title: "Link Deleted",
      description: "The link has been removed from your palette.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header addCommand={addCommand} addLink={addLink} activeTab={activeTab} />
      <main className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="p-4 border-b">
            <TabsList>
              <TabsTrigger value="commands">Commands</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="commands" className="flex-1 overflow-hidden">
            <CommandPalette 
              commands={commands}
              onEditCommand={editCommand}
              onDeleteCommand={deleteCommand} 
            />
          </TabsContent>
          <TabsContent value="links" className="flex-1 overflow-hidden">
            <LinkPalette 
              links={links}
              onEditLink={editLink}
              onDeleteLink={deleteLink}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
