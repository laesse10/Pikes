import { club } from "@/lib/data";

const { lat, lon } = club.homeRinkLocation;

// About 900 × 680 m around the rink; the embed picks the zoom that fits and
// shows the OpenStreetMap attribution itself.
const bbox = [lon - 0.006, lat - 0.003, lon + 0.006, lat + 0.003].map((n) => n.toFixed(5)).join(",");
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
const appleUrl = `https://maps.apple.com/?daddr=${lat},${lon}&q=${encodeURIComponent(club.homeRink)}`;

/** Map of the home rink with route links. */
export function RinkMap() {
  return (
    <div className="card overflow-hidden rounded">
      <div className="relative aspect-[4/3] bg-olive/15">
        <iframe
          title={`Karte: ${club.homeRink}`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-bold uppercase text-navy">Anfahrt</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-olive !px-4 !py-2 text-xs">
            Route in Google Maps
          </a>
          <a href={appleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !px-4 !py-2 text-xs">
            Apple Karten
          </a>
        </div>
      </div>
    </div>
  );
}
