"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, Copy, Loader2 } from "lucide-react";
import {
  explainCommand,
  ExplainCommandOutput,
} from "@/ai/flows/command-explanation";
import {
  checkCommandSafety,
  CheckCommandSafetyOutput,
} from "@/ai/flows/command-safety-check";
import { type Command } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CommandInfoDialogProps {
  children: React.ReactNode;
  command: Command;
}

export function CommandInfoDialog({ children, command }: CommandInfoDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [safetyCheck, setSafetyCheck] = useState<CheckCommandSafetyOutput | null>(null);
  const [explanation, setExplanation] = useState<ExplainCommandOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open && !safetyCheck && !explanation) {
      const fetchAiData = async () => {
        setIsLoading(true);
        try {
          const [safetyResult, explanationResult] = await Promise.all([
            checkCommandSafety({ command: command.command }),
            explainCommand({ command: command.command }),
          ]);
          setSafetyCheck(safetyResult);
          setExplanation(explanationResult);
        } catch (error) {
          console.error("Failed to get AI analysis:", error);
          toast({
            variant: "destructive",
            title: "AI Analysis Failed",
            description: "Could not get analysis for this command.",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchAiData();
    }
  }, [open, command, toast, safetyCheck, explanation]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Command Analysis</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-muted rounded-md p-3">
            <code className="text-muted-foreground">{command.command}</code>
          </div>

          {isLoading ? (
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p>Analyzing command...</p>
                </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {safetyCheck && (
                <div>
                  <h3 className="font-semibold mb-2">Safety Check</h3>
                  <Alert variant={safetyCheck.isSafe ? "default" : "destructive"} className={safetyCheck.isSafe ? 'border-green-500/50' : ''}>
                    {safetyCheck.isSafe ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle className="flex items-center gap-2">
                      {safetyCheck.isSafe ? "Considered Safe" : "Potential Risk Detected"}
                    </AlertTitle>
                    <AlertDescription>{safetyCheck.reason}</AlertDescription>
                  </Alert>
                </div>
              )}

              {explanation && (
                <div>
                  <h3 className="font-semibold mb-2">Explanation</h3>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
                    {explanation.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy Command
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
