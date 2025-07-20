import React from "react";

/**
 * Belirli bir arama terimini metin içinde vurgular.
 */
export function highlightQuery(text: string, query: string) {
  if (!query) return text;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 text-black rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

/**
 * Uzun metinleri kısaltır, arama terimini vurgular.
 * Artık hem metin uzunluğuna hem de CSS overflow kontrolüne göre çalışır.
 */
export function formatValue(
  value: unknown,
  maxLength: number = 40,
  searchTerm: string = ""
): { display: React.ReactNode; isTruncated: boolean; full: string } {
  const str = value == null ? "" : String(value);
  const isTruncated = str.length > maxLength;
  
  // If text is too long, truncate first
  const displayText = isTruncated ? str.slice(0, maxLength) : str;
  
  const display = isTruncated
    ? (
        <>
          {highlightQuery(displayText, searchTerm)}
          <span className="text-gray-400">...</span>
        </>
      )
    : highlightQuery(displayText, searchTerm);

  return { display, isTruncated, full: str };
} 