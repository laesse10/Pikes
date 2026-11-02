// Contact form choices and state, shared by the form and its server action.
// The server only accepts these choices.

export const contactReasons = ["Schnuppertraining", "Mitspielen", "Sponsoring", "Allgemeine Frage"];
export const contactPositions = ["Egal / noch offen", "Torhüter", "Verteidigung", "Sturm"];
export const contactLevels = ["Anfänger:in", "Wiedereinsteiger:in", "Fortgeschritten", "Routinier"];

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  reason: string;
  position: string;
  level: string;
  message: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  // The fields come back so a failed send doesn't wipe what was typed.
  | { status: "error"; error: string; fields: ContactFields };
