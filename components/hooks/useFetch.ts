import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

export function useFetch<T>(
  url?: string,
  options?: RequestInit,
  transform?: (json: any) => T
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await fetch(url, { 
          ...options, 
          signal: controller.signal 
        });
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const json = await res.json();
        const value = transform ? transform(json) : json.data ?? json;
        setData(value);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Error al cargar datos");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      controller.abort();
    };
  }
  )

  return { data, loading, error };
}