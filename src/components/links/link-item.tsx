"use client";

import React from "react";
import { ExternalLink, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { type Link } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddLinkDialog } from "./add-link-dialog";
import { DeleteConfirmationDialog } from "../delete-confirmation-dialog";

interface LinkItemProps {
  link: Link;
  icon: React.ReactNode;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export function LinkItem({ link, icon, onEdit, onDelete }: LinkItemProps) {

  const handleOpenLink = () => {
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors animate-in fade-in-0 duration-300">
      <div className="flex items-center gap-2 overflow-hidden">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <AddLinkDialog onConfirm={(editedLink) => onEdit(editedLink as Link)} linkToEdit={link}>
                  <button className="w-full">
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </button>
                </AddLinkDialog>
                <DeleteConfirmationDialog 
                  onConfirm={() => onDelete(link.id)}
                  itemName={link.label}
                >
                  <button className="w-full">
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </button>
                </DeleteConfirmationDialog>
              </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
    </div>
  );
}
