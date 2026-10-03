// Keyless Google Maps embed for a place search — no API key or usage cost.
export function HospitalMap({ query, title, className = "" }: { query: string; title: string; className?: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query + ", Pune")}&output=embed`;
  return (
    <iframe
      title={`Map — ${title}`}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`block w-full border-0 ${className}`}
    />
  );
}

export function directionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query + ", Pune")}`;
}
