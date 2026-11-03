import { club } from "@/lib/data";

const { lat, lon } = club.homeRinkLocation;

// About 900 × 680 m around the rink; the embed picks the zoom that fits and
// shows the OpenStreetMap attribution itself.
const bbox = [lon - 0.006, lat - 0.003, lon + 0.006, lat + 0.003].map((n) => n.toFixed(5)).join(",");
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
const appleUrl = `https://maps.apple.com/?daddr=${lat},${lon}&q=${encodeURIComponent(club.homeRink)}`;

/** Map of the home rink with public-transport directions and route links. */
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
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-navy/70">
          <li>
            <span className="block text-xs uppercase tracking-[0.12em] text-navy/45">Ab Bahnhof Küsnacht</span>
            Bus 919 bis «Itschnach, Fallacher» (9 Min.), dann rund 3 Min. zu Fuss.
          </li>
          <li>
            <span className="block text-xs uppercase tracking-[0.12em] text-navy/45">Ab Zürich HB</span>
            S6 bis Zürich Tiefenbrunnen, dann Bus 912 bis «Itschnach, Fallacher» – rund 25 Min.
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
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
