"use client";

import { useEffect } from 'react';

export const useHotKey = (
  key: string,
  callback: (e: KeyboardEvent) => void,
  options: {
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
  } = {}
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrl, meta, shift } = options;
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (ctrl ? event.ctrlKey : true) &&
        (meta ? event.metaKey : true) &&
        (shift ? event.shiftKey : true)
      ) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, options]);
};
