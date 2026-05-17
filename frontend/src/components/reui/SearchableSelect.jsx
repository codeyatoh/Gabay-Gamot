import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchableSelect({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select option", 
  searchPlaceholder = "Search...", 
  disabled = false, 
  loading = false,
  className = "" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search when opening
  useEffect(() => {
    if (isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const selectedOption = options.find(o => o.code === value);

  // Filter options based on search query
  const filteredOptions = options.filter(o => 
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer transition-all active:scale-[0.99] dark:bg-zinc-950 dark:border-white/10 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b6b35] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="truncate">
          {loading 
            ? "Loading..." 
            : selectedOption 
              ? selectedOption.name 
              : placeholder
          }
        </span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {/* Dropdown Menu Panel */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 dark:bg-zinc-950 dark:border-white/10 dark:shadow-slate-950/50 flex flex-col">
          {/* Search Input Box */}
          <div className="flex items-center border-b px-3 dark:border-white/10">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100"
              autoFocus
            />
            {search && (
              <button 
                type="button" 
                onClick={() => setSearch("")}
                className="opacity-50 hover:opacity-100 transition-opacity text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Options Scrollable Container */}
          <div className="overflow-y-auto max-h-48 flex-1 py-1 text-left scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    // Simulate standard target.value structure
                    onChange({ target: { value: option.code } });
                    setIsOpen(false);
                  }}
                  className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm outline-none hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-zinc-900 dark:hover:text-slate-100 transition-colors ${
                    value === option.code 
                      ? "bg-[#0b6b35]/10 text-[#0b6b35] font-semibold dark:bg-[#16a34a]/10 dark:text-[#16a34a]" 
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="truncate">{option.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
