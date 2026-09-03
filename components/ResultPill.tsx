import { resultLabel, type Game } from "@/lib/data";

const map = {
  S: { text: "S", bg: "bg-olive text-cream-soft", full: "Sieg" },
  U: { text: "U", bg: "bg-gold/90 text-navy-900", full: "Unentschieden" },
  N: { text: "N", bg: "bg-navy-800 text-cream/80", full: "Niederlage" },
} as const;

export function ResultPill({ game, withScore = false }: { game: Game; withScore?: boolean }) {
  const r = resultLabel(game);
  if (!r) return null;
  const cfg = map[r];
  return (
    <span className="inline-flex items-center gap-2" title={cfg.full}>
      <span
        className={`grid h-7 w-7 place-items-center rounded-full font-display text-sm font-bold ${cfg.bg}`}
        aria-label={cfg.full}
      >
        {cfg.text}
      </span>
      {withScore && game.result && (
        <span className="font-stat text-lg font-bold tabular">
          {game.result.gf}:{game.result.ga}
        </span>
      )}
    </span>
  );
}
