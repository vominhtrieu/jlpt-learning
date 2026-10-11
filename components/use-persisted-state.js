'use client';
import { useEffect, useState } from 'react';
export function usePersistedState(key, initialValue, sanitize) {
  const [value, setValue] = useState(initialValue);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw !== null) setValue(sanitize(JSON.parse(raw))); }
    catch { setStorageError(true); }
    setReady(true);
  }, [key, sanitize]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { setStorageError(true); }
  }, [key, value, ready]);
  return [value, setValue, ready, storageError];
}
