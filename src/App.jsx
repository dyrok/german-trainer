import { useState, useEffect } from "react";
import {
  Brain, Target, Settings, ArrowLeft, Check, X, Plus, Globe, Trophy,
  ChevronRight, Hash, Calendar, Clock, Users, MessageSquare, Smile,
  GraduationCap, User, CheckSquare, FileText, Languages, ArrowLeftRight,
  RotateCcw, Pencil, ClipboardPaste, Loader2, AlertCircle, BookOpen,
  Shuffle, Sparkles, Search, Trash2, RefreshCw, ListChecks, Layers, Moon, Sun,
} from "lucide-react";

/* ═══════════════════════════ DATA ═══════════════════════════ */

const DECKS = {
  selfintro: [
    { de: "Ich heiße Neel.", en: "My name is Neel.", note: "heißen = to be called" },
    { de: "Ich komme aus Indien.", en: "I come from India.", note: "kommen aus = come from" },
    { de: "Ich wohne in Mumbai.", en: "I live in Mumbai.", note: "wohnen in = live in" },
    { de: "Ich bin 19 Jahre alt.", en: "I am 19 years old.", note: "sein + Jahre alt" },
    { de: "Mein Hobby ist Kochen.", en: "My hobby is cooking." },
    { de: "Mein Geburtstag ist im Oktober.", en: "My birthday is in October.", note: "im + month" },
    { de: "Sie heißt Roshni.", en: "Her name is Roshni.", note: "3rd person: heißt" },
    { de: "Sie kommt aus Mumbai.", en: "She comes from Mumbai." },
    { de: "Sie wohnt in Mumbai.", en: "She lives in Mumbai." },
    { de: "Sie ist 19 Jahre alt.", en: "She is 19 years old." },
  ],
  greetings: [
    { de: "Hallo", en: "Hello (casual)", note: "informal, any time of day" },
    { de: "Guten Morgen", en: "Good morning" },
    { de: "Guten Tag", en: "Good day", note: "formal, daytime" },
    { de: "Guten Abend", en: "Good evening" },
    { de: "Gute Nacht", en: "Good night", note: "before sleeping" },
    { de: "Grüß Gott", en: "Hello (S. Germany / Austria)", note: "Bavaria / Austria" },
    { de: "Moin Moin", en: "Hi (N. Germany)", note: "northern Germany" },
  ],
  farewells: [
    { de: "Tschüss", en: "Bye", note: "informal" },
    { de: "Auf Wiedersehen", en: "Goodbye", note: "formal" },
    { de: "Servus", en: "Hi / Bye", note: "southern Germany & Austria" },
    { de: "Bis bald", en: "See you soon" },
    { de: "Bis später", en: "See you later", note: "same day" },
  ],
  mood: [
    { de: "Wie geht es Ihnen?", en: "How are you? (formal)" },
    { de: "Wie geht's?", en: "How's it going? (casual)" },
    { de: "Mir geht es gut.", en: "I'm doing well." },
    { de: "Mir geht es sehr gut.", en: "I'm doing very well." },
    { de: "Es geht.", en: "I'm okay / so-so." },
    { de: "Mir geht es schlecht.", en: "I'm not feeling well." },
    { de: "Ich bin müde.", en: "I'm tired." },
    { de: "Ich bin krank.", en: "I'm sick." },
    { de: "Und dir?", en: "And you? (informal)" },
    { de: "Auch gut, danke.", en: "Also good, thanks." },
  ],
  questions: [
    { de: "Wie heißt du?", en: "What's your name?", note: "formal: Wie heißen Sie?" },
    { de: "Woher kommst du?", en: "Where are you from?", note: "formal: Woher kommen Sie?" },
    { de: "Wo wohnst du?", en: "Where do you live?", note: "formal: Wo wohnen Sie?" },
    { de: "Wie alt bist du?", en: "How old are you?" },
    { de: "Was ist dein Hobby?", en: "What is your hobby?" },
    { de: "Wann hast du Geburtstag?", en: "When is your birthday?" },
    { de: "Wie ist deine Handynummer?", en: "What's your phone number?" },
  ],
  days: [
    { de: "Montag", en: "Monday" }, { de: "Dienstag", en: "Tuesday" },
    { de: "Mittwoch", en: "Wednesday" }, { de: "Donnerstag", en: "Thursday" },
    { de: "Freitag", en: "Friday" }, { de: "Samstag", en: "Saturday" },
    { de: "Sonntag", en: "Sunday" }, { de: "das Wochenende", en: "the weekend", note: "Sa + So" },
  ],
  months: [
    { de: "Januar", en: "January" }, { de: "Februar", en: "February" },
    { de: "März", en: "March" }, { de: "April", en: "April" },
    { de: "Mai", en: "May" }, { de: "Juni", en: "June" },
    { de: "Juli", en: "July" }, { de: "August", en: "August" },
    { de: "September", en: "September" }, { de: "Oktober", en: "October" },
    { de: "November", en: "November" }, { de: "Dezember", en: "December" },
  ],
  family: [
    { de: "der Vater", en: "father" }, { de: "die Mutter", en: "mother" },
    { de: "der Sohn", en: "son" }, { de: "die Tochter", en: "daughter" },
    { de: "der Bruder", en: "brother" }, { de: "die Schwester", en: "sister" },
    { de: "der Großvater", en: "grandfather" }, { de: "die Großmutter", en: "grandmother" },
    { de: "der Ehemann", en: "husband" }, { de: "die Ehefrau", en: "wife" },
    { de: "der Onkel", en: "uncle" }, { de: "die Tante", en: "aunt" },
  ],
  hobbies: [
    { de: "Kochen", en: "cooking" }, { de: "Schwimmen", en: "swimming" },
    { de: "Lesen", en: "reading" }, { de: "Reisen", en: "traveling" },
    { de: "Tanzen", en: "dancing" }, { de: "Musik hören", en: "listening to music" },
    { de: "Fußball spielen", en: "playing football" }, { de: "Singen", en: "singing" },
    { de: "Malen", en: "painting" }, { de: "Laufen", en: "running" },
    { de: "Schreiben", en: "writing" }, { de: "Computerspiele spielen", en: "playing video games" },
  ],
  countries: [
    { de: "Deutschland", lang: "Deutsch", note: "Germany" },
    { de: "Österreich", lang: "Deutsch", note: "Austria" },
    { de: "die Schweiz", lang: "Deutsch, Französisch, Italienisch", note: "Switzerland" },
    { de: "Frankreich", lang: "Französisch", note: "France" },
    { de: "Großbritannien", lang: "Englisch", note: "Great Britain" },
    { de: "Italien", lang: "Italienisch", note: "Italy" },
    { de: "Spanien", lang: "Spanisch", note: "Spain" },
    { de: "Japan", lang: "Japanisch", note: "Japan" },
    { de: "China", lang: "Chinesisch", note: "China" },
    { de: "Polen", lang: "Polnisch", note: "Poland" },
    { de: "Schweden", lang: "Schwedisch", note: "Sweden" },
    { de: "Griechenland", lang: "Griechisch", note: "Greece" },
    { de: "Mexiko", lang: "Spanisch", note: "Mexico" },
  ],
  time: [
    { de: "Viertel nach sechs", en: "quarter past six (6:15)", note: "nach = past" },
    { de: "Viertel vor zehn", en: "quarter to ten (9:45)", note: "vor = to/before" },
    { de: "halb eins", en: "12:30", note: "halb = halfway to NEXT hour" },
    { de: "halb neun", en: "8:30", note: "halfway to 9" },
    { de: "zehn nach drei", en: "3:10", note: "ten past three" },
    { de: "zehn vor sieben", en: "6:50", note: "ten to seven" },
    { de: "Wie spät ist es?", en: "What time is it?" },
    { de: "Wieviel Uhr ist es?", en: "What time is it? (alt.)" },
  ],
  phrases: [
    { de: "Ich verstehe nicht.", en: "I don't understand." },
    { de: "Können Sie das bitte wiederholen?", en: "Can you repeat that, please?" },
    { de: "Wie heißt das auf Deutsch?", en: "What's that in German?" },
    { de: "Was ist das?", en: "What is that?" },
    { de: "Entschuldigung", en: "Sorry / Excuse me" },
    { de: "Vielen Dank!", en: "Thank you very much!" },
    { de: "Darf ich reinkommen?", en: "May I come in?" },
    { de: "Ich weiß es nicht.", en: "I don't know." },
  ],
};

const VERBS = [
  { inf: "heißen", m: "to be called", f: { ich: "heiße", du: "heißt", "er/sie/es": "heißt", "sie/Sie": "heißen" } },
  { inf: "wohnen", m: "to live",      f: { ich: "wohne", du: "wohnst", "er/sie/es": "wohnt", "sie/Sie": "wohnen" } },
  { inf: "kommen", m: "to come",      f: { ich: "komme", du: "kommst", "er/sie/es": "kommt", "sie/Sie": "kommen" } },
  { inf: "haben",  m: "to have",      f: { ich: "habe",  du: "hast",   "er/sie/es": "hat",   "sie/Sie": "haben" } },
  { inf: "sein",   m: "to be (irr.)", f: { ich: "bin",   du: "bist",   "er/sie/es": "ist",   "sie/Sie": "sind" } },
];

// True/False — each has German statement, correct bool, explanation, and English translation
const TF = [
  { t: "Mittwoch bedeutet Wednesday.",                      a: true,  e: "Mittwoch = Wednesday ✓",                  en: "Wednesday means Wednesday." },
  { t: "Donnerstag bedeutet Tuesday.",                      a: false, e: "Donnerstag = Thursday (Dienstag = Tue.)", en: "Thursday means Tuesday. (False — it's Thursday.)" },
  { t: "Die Zahl 7 heißt 'sieben'.",                       a: true,  e: "7 = sieben ✓",                            en: "The number 7 is called 'sieben'." },
  { t: "Die Zahl 9 heißt 'sieben'.",                       a: false, e: "9 = neun, nicht sieben.",                 en: "The number 9 is called 'sieben'. (False — 9 = neun.)" },
  { t: "In Frankreich spricht man Französisch.",            a: true,  e: "France → French ✓",                      en: "In France, people speak French." },
  { t: "In Österreich spricht man Spanisch.",               a: false, e: "Österreich spricht Deutsch.",             en: "In Austria, people speak Spanish. (False — Deutsch.)" },
  { t: "Italien ist ein Nachbarland von Deutschland.",      a: false, e: "Italy does NOT border Germany.",          en: "Italy is a neighbor of Germany. (False!)" },
  { t: "Polen ist ein Nachbarland von Deutschland.",        a: true,  e: "Poland borders Germany ✓",               en: "Poland is a neighboring country of Germany." },
  { t: "'halb eins' bedeutet 12:30 Uhr.",                  a: true,  e: "halb eins = halfway to 1 = 12:30 ✓",     en: "'half one' means 12:30." },
  { t: "'Viertel vor zehn' bedeutet 10:15 Uhr.",           a: false, e: "Viertel vor zehn = 9:45, nicht 10:15.",  en: "'Quarter before ten' means 10:15. (False — it's 9:45.)" },
  { t: "'du kommst' ist die richtige Form von 'kommen'.",  a: true,  e: "du + -st stem ✓",                        en: "'du kommst' is the correct form of 'kommen' (to come)." },
  { t: "'ich bin' ist die richtige Form von 'sein'.",      a: true,  e: "sein is irregular: ich bin ✓",           en: "'ich bin' is the correct form of 'sein' (to be)." },
  { t: "'er habt' ist die richtige Form von 'haben'.",     a: false, e: "Correct: er hat (nicht habt).",          en: "'er habt' is the correct form of 'haben'. (False — 'er hat'.)" },
  { t: "'Guten Morgen' sagt man am Morgen.",               a: true,  e: "Used in the morning ✓",                  en: "One says 'Good morning' in the morning." },
  { t: "'Gute Nacht' sagt man zur Begrüßung am Morgen.",  a: false, e: "Gute Nacht = bedtime, not morning.",     en: "'Good night' is said as a morning greeting. (False — bedtime.)" },
  { t: "'Tschüss' ist informell.",                         a: true,  e: "Tschüss = casual bye ✓",                 en: "'Tschüss' is informal." },
  { t: "'Auf Wiedersehen' ist informell.",                  a: false, e: "Auf Wiedersehen = formal.",              en: "'Auf Wiedersehen' is informal. (False — it's formal.)" },
  { t: "Das Wochenende ist Samstag und Sonntag.",          a: true,  e: "Wochenende = Sa + So ✓",                 en: "The weekend is Saturday and Sunday." },
  { t: "Es gibt 12 Monate im Jahr.",                       a: true,  e: "12 months ✓",                            en: "There are 12 months in the year." },
  { t: "Dezember ist der erste Monat des Jahres.",         a: false, e: "Januar is first.",                       en: "December is the first month of the year. (False — January is.)" },
  { t: "'Vater' bedeutet 'father'.",                       a: true,  e: "Vater = father ✓",                       en: "'Vater' means 'father'." },
  { t: "'Schwester' bedeutet 'brother'.",                  a: false, e: "Schwester = sister (Bruder = brother).", en: "'Schwester' means 'brother'. (False — it means 'sister'.)" },
  { t: "Die Schweiz ist ein Nachbarland von Deutschland.", a: true,  e: "Switzerland borders Germany ✓",          en: "Switzerland is a neighboring country of Germany." },
  { t: "'fünfundzwanzig' bedeutet 52.",                   a: false, e: "fünfundzwanzig = 25.",                   en: "'fünfundzwanzig' means 52. (False — it means 25.)" },
];

const PASSAGES = [
  {
    text: "Das ist Rose Lewis. Sie kommt aus den USA und wohnt in San Francisco. Sie spricht Englisch und Deutsch. Sie lernt Spanisch.",
    en: "This is Rose Lewis. She comes from the USA and lives in San Francisco. She speaks English and German. She is learning Spanish.",
    q: [
      { q: "Woher kommt Rose?", qen: "Where does Rose come from?", a: "den USA", o: ["den USA", "Österreich", "China", "Algerien"] },
      { q: "Wo wohnt Rose?", qen: "Where does Rose live?", a: "San Francisco", o: ["San Francisco", "Salzburg", "Genf", "Shanghai"] },
      { q: "Welche Sprache lernt Rose?", qen: "What language is Rose learning?", a: "Spanisch", o: ["Spanisch", "Arabisch", "Deutsch", "Französisch"] },
    ],
  },
  {
    text: "Das ist Boris Walder. Er kommt aus Österreich und wohnt in Salzburg. Er spricht Deutsch und Englisch. Er lernt Arabisch.",
    en: "This is Boris Walder. He comes from Austria and lives in Salzburg. He speaks German and English. He is learning Arabic.",
    q: [
      { q: "Woher kommt Boris?", qen: "Where does Boris come from?", a: "Österreich", o: ["Österreich", "den USA", "Algerien", "China"] },
      { q: "Wo wohnt Boris?", qen: "Where does Boris live?", a: "Salzburg", o: ["Salzburg", "San Francisco", "Genf", "Shanghai"] },
      { q: "Was lernt Boris?", qen: "What is Boris learning?", a: "Arabisch", o: ["Arabisch", "Spanisch", "Deutsch", "Chinesisch"] },
    ],
  },
  {
    text: "Das ist Kateb Brahim. Er kommt aus Algerien und wohnt in Genf. Er spricht Arabisch und Französisch. Er lernt Deutsch.",
    en: "This is Kateb Brahim. He comes from Algeria and lives in Geneva. He speaks Arabic and French. He is learning German.",
    q: [
      { q: "Woher kommt Kateb?", qen: "Where does Kateb come from?", a: "Algerien", o: ["Algerien", "Österreich", "den USA", "China"] },
      { q: "Wo wohnt Kateb?", qen: "Where does Kateb live?", a: "Genf", o: ["Genf", "Salzburg", "Shanghai", "San Francisco"] },
      { q: "Welche Sprachen spricht Kateb?", qen: "What languages does Kateb speak?", a: "Arabisch und Französisch", o: ["Arabisch und Französisch", "Englisch und Deutsch", "Chinesisch und Deutsch", "Spanisch"] },
    ],
  },
];

const EN2DE = [
  { en: "My name is Neel.", de: "Ich heiße Neel." },
  { en: "I come from India.", de: "Ich komme aus Indien." },
  { en: "I live in Mumbai.", de: "Ich wohne in Mumbai." },
  { en: "I am 19 years old.", de: "Ich bin 19 Jahre alt." },
  { en: "My hobby is cooking.", de: "Mein Hobby ist Kochen." },
  { en: "Good morning", de: "Guten Morgen" },
  { en: "Good evening", de: "Guten Abend" },
  { en: "Good night", de: "Gute Nacht" },
  { en: "Goodbye (formal)", de: "Auf Wiedersehen" },
  { en: "Bye (informal)", de: "Tschüss" },
  { en: "See you soon", de: "Bis bald" },
  { en: "How are you? (formal)", de: "Wie geht es Ihnen?" },
  { en: "I'm doing well.", de: "Mir geht es gut." },
  { en: "And you? (informal)", de: "Und dir?" },
  { en: "I'm tired.", de: "Ich bin müde." },
  { en: "I don't understand.", de: "Ich verstehe nicht." },
  { en: "Thank you very much!", de: "Vielen Dank!" },
  { en: "Excuse me / Sorry", de: "Entschuldigung" },
  { en: "What's your name? (informal)", de: "Wie heißt du?" },
  { en: "Where are you from? (informal)", de: "Woher kommst du?" },
  { en: "How old are you?", de: "Wie alt bist du?" },
  { en: "Where do you live? (informal)", de: "Wo wohnst du?" },
  { en: "What is your hobby?", de: "Was ist dein Hobby?" },
  { en: "Can you repeat that, please?", de: "Können Sie das bitte wiederholen?" },
];

/* ═══════════════════════════ PURE HELPERS ═══════════════════════════ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pad2(n)   { return n < 10 ? "0" + n : "" + n; }
function todayStr(){ return new Date().toISOString().slice(0, 10); }

function n2g(n) {
  if (n === 0) return "null";
  if (n === 100) return "hundert";
  const ones =  ["","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun"];
  const onesC = ["","ein", "zwei","drei","vier","fünf","sechs","sieben","acht","neun"];
  const teens = ["zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"];
  const tens  = {2:"zwanzig",3:"dreißig",4:"vierzig",5:"fünfzig",6:"sechzig",7:"siebzig",8:"achtzig",9:"neunzig"};
  if (n < 10)  return ones[n];
  if (n < 20)  return teens[n - 10];
  const t = Math.floor(n / 10), u = n % 10;
  return u === 0 ? tens[t] : onesC[u] + "und" + tens[t];
}

function nxt12(h) { return h >= 12 ? 1 : h + 1; }

function timeInformal(h, m) {
  const H = n2g(h), N = n2g(nxt12(h));
  if (m === 0)  return H + " Uhr";
  if (m === 15) return "Viertel nach " + H;
  if (m === 30) return "halb " + N;
  if (m === 45) return "Viertel vor " + N;
  return m < 30 ? n2g(m) + " nach " + H : n2g(60 - m) + " vor " + N;
}

// Returns a translate object {items:[{key,val}]} or null, for time expressions
function timeTranslate(h, m) {
  if (m === 0) return null;
  const H = n2g(h), N = n2g(nxt12(h));
  const nh = nxt12(h);
  if (m === 15) return { items: [
    { key: "Expression", val: "Viertel nach " + H },
    { key: "Breakdown", val: "Viertel (quarter) nach (past) " + H + " (" + h + ")" },
  ]};
  if (m === 30) return { items: [
    { key: "Expression", val: "halb " + N },
    { key: "Breakdown", val: "halb = halfway to " + nh + " — NOT 'half past " + h + "'!" },
  ]};
  if (m === 45) return { items: [
    { key: "Expression", val: "Viertel vor " + N },
    { key: "Breakdown", val: "Viertel (quarter) vor (before) " + N + " (" + nh + ")" },
  ]};
  if (m < 30) return { items: [
    { key: "Expression", val: n2g(m) + " nach " + H },
    { key: "Rule", val: "[minutes] nach [hour] = past the hour" },
  ]};
  return { items: [
    { key: "Expression", val: n2g(60 - m) + " vor " + N },
    { key: "Rule", val: "[minutes] vor [hour] = before the next hour" },
  ]};
}

// Breakdown for compound numbers (21–99 non-round)
function numTranslate(n) {
  if (n <= 20 || n % 10 === 0 || n >= 100) return null;
  const u = n % 10, t = Math.floor(n / 10);
  const onesC = ["","ein","zwei","drei","vier","fünf","sechs","sieben","acht","neun"];
  const tens = {2:"zwanzig",3:"dreißig",4:"vierzig",5:"fünfzig",6:"sechzig",7:"siebzig",8:"achtzig",9:"neunzig"};
  return { items: [
    { key: "Breakdown", val: onesC[u] + " (" + u + ") + und + " + tens[t] + " (" + (t * 10) + ") = " + n },
    { key: "Rule", val: "German: units first, then 'und', then tens" },
  ]};
}

/* ═══════════════════════════ SM-2 ENGINE ═══════════════════════════ */

const MIN_EASE = 1.3;
const DAY = 86400000;

function uid() { return "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function r2(x)  { return Math.round(x * 100) / 100; }

function newCard(front, back, deck, note, id) {
  return { id: id || uid(), front, back, deck: deck || "My Notes", note: note || null,
    ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, state: "new", created: Date.now() };
}

function schedule(card, rating) {
  let { ease, interval, reps, lapses } = card;
  if (rating === "again") {
    reps = 0; lapses += 1; ease = Math.max(MIN_EASE, r2(ease - 0.2)); interval = 0;
  } else {
    if (rating === "hard") ease = Math.max(MIN_EASE, r2(ease - 0.15));
    if (rating === "easy") ease = r2(ease + 0.15);
    let next;
    if (reps === 0)      next = rating === "easy" ? 4 : 1;
    else if (reps === 1) next = rating === "hard" ? 3 : rating === "easy" ? 8 : 6;
    else {
      const f = rating === "hard" ? 1.2 : rating === "easy" ? ease * 1.3 : ease;
      next = Math.max(interval + 1, Math.round(interval * f));
    }
    interval = next; reps += 1;
  }
  const state = rating === "again" ? "learning" : reps >= 1 ? "review" : "learning";
  const due   = interval === 0 ? Date.now() : Date.now() + interval * DAY;
  return { ...card, ease: r2(ease), interval, reps, lapses, state, due };
}

function prevInt(card, rating) { return schedule(card, rating).interval; }

function fmtInt(days) {
  if (days <= 0) return "now";
  if (days < 30) return Math.round(days) + "d";
  if (days < 365) return Math.round(days / 30) + "mo";
  return (days / 365).toFixed(1) + "y";
}

function relTime(due) {
  const d = due - Date.now();
  if (d <= 0) return "now";
  const h = d / 3600000;
  if (h < 1) return "in " + Math.max(1, Math.round(d / 60000)) + " min";
  if (h < 24) return "in " + Math.round(h) + " h";
  const days = Math.round(h / 24);
  return days === 1 ? "tomorrow" : "in " + days + " d";
}

/* ═══════════════════════════ PERSISTENCE ═══════════════════════════ */

const KEY = "srs_german_a1_v1";
function hasStore() { return typeof window !== "undefined" && window.storage && typeof window.storage.get === "function"; }

async function loadData() {
  if (!hasStore()) return null;
  try { const r = await window.storage.get(KEY, false); return r ? JSON.parse(r.value) : null; }
  catch { return null; }
}
async function persist(d) {
  if (!hasStore()) return;
  try { await window.storage.set(KEY, JSON.stringify(d), false); } catch {}
}

function seedCards() {
  const out = [];
  let si = 0;
  const add = (front, back, deck, note) => out.push(newCard(front, back, deck, note, "s" + si++));
  // vocab decks
  const groups = [
    ["Self-Intro","selfintro"],["Greetings","greetings"],["Farewells","farewells"],
    ["Wie geht's","mood"],["Questions","questions"],["Days","days"],["Months","months"],
    ["Family","family"],["Hobbies","hobbies"],["Time","time"],["Phrases","phrases"],
  ];
  groups.forEach(([d, k]) => DECKS[k].forEach((c) => add(c.en, c.de, d, c.note)));
  // countries
  DECKS.countries.forEach((c) => add("Language in " + c.de + "?", c.lang, "Languages", c.note));
  // verbs
  VERBS.forEach((v) => Object.entries(v.f).forEach(([p, f]) => add(v.inf + " — " + p, f, "Verbs", v.m)));
  // numbers 1-20 + round tens
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100]
    .forEach((n) => add(String(n), n2g(n), "Numbers"));
  return out;
}

/* ═══════════════════════════ GENERATORS ═══════════════════════════ */

function genTF() {
  const s = pick(TF);
  return {
    section: "True / False", sub: "Richtig oder Falsch?",
    prompt: s.t, options: ["Richtig (true)", "Falsch (false)"],
    answer: s.a ? "Richtig (true)" : "Falsch (false)",
    explain: s.e,
    translate: { items: [{ key: "Translation", val: s.en }] },
  };
}

function genNum(max = 100) {
  const n = 1 + Math.floor(Math.random() * max);
  const ans = n2g(n);
  const pool = new Set([ans]);
  while (pool.size < 4) pool.add(n2g(1 + Math.floor(Math.random() * max)));
  return {
    section: "Numbers", sub: "Spell it in German",
    prompt: String(n), options: shuffle([...pool]), answer: ans,
    translate: numTranslate(n),
  };
}

function genReading() {
  const p = pick(PASSAGES), q = pick(p.q);
  return {
    section: "Reading", passage: p.text,
    sub: "Lies und antworte.", prompt: q.q,
    options: shuffle([...q.o]), answer: q.a,
    translate: { items: [
      { key: "Passage", val: p.en },
      { key: "Question", val: q.qen },
    ]},
  };
}

function genEN2DE() {
  const item = pick(EN2DE);
  const pool = new Set([item.de]);
  const others = EN2DE.filter((x) => x.de !== item.de && x.en !== item.en);
  while (pool.size < 4 && pool.size < others.length + 1) pool.add(pick(others).de);
  return {
    section: "English → German", sub: "Choose the German",
    prompt: item.en, options: shuffle([...pool]), answer: item.de,
    translate: null,
  };
}

function genCountry() {
  const c = pick(DECKS.countries);
  const langs = [...new Set(DECKS.countries.map((x) => x.lang))];
  const pool = new Set([c.lang]);
  while (pool.size < 4) pool.add(pick(langs));
  return {
    section: "Languages", sub: c.note || c.de,
    prompt: "Welche Sprache spricht man in " + c.de + "?",
    options: shuffle([...pool]), answer: c.lang,
    translate: { items: [{ key: "Question", val: "What language is spoken in " + (c.note || c.de) + "?" }] },
  };
}

function genTime() {
  const mins = [0, 5, 10, 15, 20, 30, 40, 45, 50, 55];
  const mk = () => {
    const h = 1 + Math.floor(Math.random() * 12);
    const m = pick(mins);
    return { label: h + ":" + pad2(m), expr: timeInformal(h, m), h, m };
  };
  const target = mk();
  const pool = new Set([target.expr]);
  let g = 0;
  while (pool.size < 4 && g++ < 50) pool.add(mk().expr);
  return {
    section: "Time", sub: "Informell (Uhrzeit)",
    prompt: target.label, options: shuffle([...pool]), answer: target.expr,
    translate: timeTranslate(target.h, target.m),
  };
}

function buildN(gen, n) { return Array.from({ length: n }, gen); }

function buildTest() {
  return [
    ...buildN(genTF, 5), ...buildN(genNum, 5), ...buildN(genReading, 5),
    ...buildN(genEN2DE, 5), ...buildN(genCountry, 5), ...buildN(genTime, 5),
  ];
}

function buildDeckQ(deck) {
  return shuffle(deck).slice(0, Math.min(12, deck.length)).map((card) => {
    const pool = new Set([card.de]);
    const others = deck.filter((c) => c.de !== card.de && c.en !== card.en);
    while (pool.size < 4 && pool.size < others.length + 1) pool.add(pick(others).de);
    return {
      section: "Vocabulary", sub: "Choose the German",
      prompt: card.en, options: shuffle([...pool]), answer: card.de,
      translate: card.note ? { items: [{ key: "Note", val: card.note }] } : null,
    };
  });
}

/* ═══════════════════════════ UI ATOMS ═══════════════════════════ */

function Btn({ children, onClick, kind = "ghost", className = "", disabled }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors px-4 py-2.5 select-none disabled:opacity-40 disabled:pointer-events-none";
  const k = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    ghost:   "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50",
    danger:  "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50",
  };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${k[kind]} ${className}`}>{children}</button>;
}

function Bar({ value, max }) {
  return (
    <div className="h-1 w-full rounded-full bg-stone-200 overflow-hidden">
      <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: max ? (value / max * 100) + "%" : "0%" }} />
    </div>
  );
}

function Keys({ items }) {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-stone-400">
      {items.map(([k, label]) => (
        <span key={k} className="inline-flex items-center gap-1.5">
          <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-mono text-stone-500">{k}</kbd>{label}
        </span>
      ))}
    </div>
  );
}

function RatingBtn({ label, sub, onClick, tone }) {
  const t = {
    again: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    hard:  "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    good:  "bg-teal-600 text-white border-teal-600 hover:bg-teal-700",
    easy:  "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
  };
  return (
    <button onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 rounded-xl border px-2 py-3 transition-colors ${t[tone]}`}>
      <span className="text-sm font-semibold">{label}</span>
      <span className={`text-[11px] ${tone === "good" ? "text-teal-100" : "opacity-60"}`}>{sub}</span>
    </button>
  );
}

// The translate reveal panel — indigo to distinguish from feedback
function TranslatePanel({ t }) {
  return (
    <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2.5 space-y-2 mt-2">
      {t.items.map(({ key, val }) => (
        <div key={key}>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">{key}</div>
          <div className="text-sm text-indigo-900 leading-snug mt-0.5">{val}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════ EXAM (MCQ) ═══════════════════════════ */

function Exam({ make, sectioned, onReview }) {
  const [questions]    = useState(make);
  const [qi, setQi]    = useState(0);
  const [picked, setPk] = useState(null);
  const [history, setH]= useState([]);
  const [showT, setShowT] = useState(false); // translate panel toggle
  const [fresh, setFresh] = useState(false);  // trigger re-generate

  const finished = qi >= questions.length;
  const q = finished ? null : questions[qi];
  const answered = picked !== null;

  function choose(opt) {
    if (picked) return;
    setPk(opt);
    const ok = opt === q.answer;
    setH((h) => [...h, { q, picked: opt, ok }]);
    onReview && onReview(ok);
  }

  function next() { setPk(null); setShowT(false); setQi((n) => n + 1); }

  // keyboard
  useEffect(() => {
    if (finished) return;
    function onKey(e) {
      if (!answered) {
        const idx = parseInt(e.key, 10);
        if (idx >= 1 && idx <= (q.options || []).length) { e.preventDefault(); choose(q.options[idx - 1]); }
      } else {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); }
        if (e.key === "t" || e.key === "T") { e.preventDefault(); if (q.translate) setShowT((v) => !v); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [qi, answered, q, finished]);

  if (finished) {
    const total = questions.length;
    const ok = history.filter((h) => h.ok).length;
    const secs = [...new Set(questions.map((x) => x.section))];
    const missed = history.filter((h) => !h.ok);
    return (
      <div className="text-center">
        <Trophy size={28} className="mx-auto text-teal-600" />
        <div className="text-4xl font-bold mt-2 text-stone-800">{ok}/{total}</div>
        <p className="text-stone-500 mt-1">{Math.round(ok / total * 100)}% · {ok === total ? "perfect 🎉" : ok >= total * 0.8 ? "strong" : "keep going"}</p>
        {sectioned && secs.length > 1 && (
          <div className="mt-4 text-left space-y-1.5">
            {secs.map((sec) => {
              const sh = history.filter((h) => h.q.section === sec);
              const sc = sh.filter((h) => h.ok).length;
              return (
                <div key={sec} className="flex justify-between rounded-lg bg-stone-50 border border-stone-200 px-3 py-1.5 text-sm">
                  <span className="text-stone-500">{sec}</span>
                  <span className={sc === sh.length ? "font-semibold text-emerald-600" : "font-medium text-stone-700"}>{sc}/{sh.length}</span>
                </div>
              );
            })}
          </div>
        )}
        {missed.length > 0 && (
          <div className="mt-4 text-left">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Review {missed.length} missed</div>
            <div className="space-y-1.5 max-h-48 overflow-auto">
              {missed.map((h, i) => (
                <div key={i} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm">
                  <div className="text-stone-600">{h.q.prompt}</div>
                  <div className="mt-0.5 text-xs"><span className="text-rose-400 line-through">{h.picked}</span><span className="text-emerald-600 font-medium"> → {h.q.answer}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-5 flex gap-2.5 justify-center">
          <Btn kind="primary" onClick={() => { setQi(0); setPk(null); setH([]); setShowT(false); }}>
            <RefreshCw size={15} /> New round
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between text-xs text-stone-400 mb-2">
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-500">{q.section}</span>
        <span>{qi + 1}/{questions.length}</span>
      </div>
      <Bar value={qi} max={questions.length} />

      <div className="mt-4">
        {q.passage && (
          <div className="mb-3 rounded-xl bg-stone-50 border border-stone-200 px-4 py-3 text-sm leading-relaxed text-stone-700">{q.passage}</div>
        )}
        <div className="text-xl font-semibold text-stone-800 leading-snug">{q.prompt}</div>
        {q.sub && <div className="mt-1 text-xs text-stone-400">{q.sub}</div>}
      </div>

      <div className="mt-4 grid gap-2">
        {q.options.map((opt, idx) => {
          let cls = "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer";
          if (answered && opt === q.answer) cls = "bg-emerald-50 border-emerald-300 text-emerald-800";
          else if (answered && opt === picked) cls = "bg-rose-50 border-rose-300 text-rose-700";
          else if (answered) cls = "bg-white border-stone-200 text-stone-400";
          return (
            <button key={opt + idx} onClick={() => choose(opt)} disabled={answered}
              className={`flex items-center gap-3 text-left rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${cls}`}>
              <span className="flex items-center justify-center w-5 h-5 rounded border border-current/30 font-mono text-[11px] shrink-0 opacity-50">{idx + 1}</span>
              <span className="flex-1">{opt}</span>
              {answered && opt === q.answer && <Check size={15} className="text-emerald-600 shrink-0" />}
              {answered && opt === picked && opt !== q.answer && <X size={15} className="text-rose-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* post-answer area */}
      {answered && (
        <div className="mt-3 space-y-2">
          {/* translate toggle button */}
          {q.translate && (
            <div>
              <button onClick={() => setShowT((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors py-1">
                <Globe size={13} />
                {showT ? "Hide translation" : "Translate"}
                <kbd className="rounded border border-indigo-200 bg-indigo-50 px-1 font-mono text-indigo-400 ml-0.5">T</kbd>
              </button>
              {showT && <TranslatePanel t={q.translate} />}
            </div>
          )}
          {/* explanation */}
          {q.explain && (
            <div className="rounded-lg bg-stone-50 border border-stone-200 px-3 py-2 text-xs text-stone-500">{q.explain}</div>
          )}
          <Btn kind="primary" className="w-full" onClick={next}>
            Next <ChevronRight size={16} />
          </Btn>
        </div>
      )}

      {!answered && <Keys items={[["1–" + q.options.length, "answer"], ["Esc", "back"]]} />}
      {answered  && <Keys items={[["Enter", "next"], ["T", "translate"], ["Esc", "back"]]} />}
    </div>
  );
}

/* ═══════════════════════════ SRS SESSION ═══════════════════════════ */

function SRSSession({ cards, maxNew = 20, onRate, onEnd }) {
  const now = Date.now();
  const due  = cards.filter((c) => c.state !== "new" && c.due <= now);
  const newC = cards.filter((c) => c.state === "new");
  const initialQ  = shuffle(due.map((c) => c.id)).concat(newC.slice(0, maxNew).map((c) => c.id));

  const [queue,   setQueue]   = useState(initialQ);
  const [flipped, setFlipped] = useState(false);
  const [done,    setDone]    = useState(0);

  const card = cards.find((c) => c.id === queue[0]);

  useEffect(() => {
    function onKey(e) {
      if (!card) return;
      if (!flipped) {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped(true); }
      } else {
        const map = { "1": "again", "2": "hard", "3": "good", "4": "easy" };
        if (map[e.key]) { e.preventDefault(); rate(map[e.key]); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, flipped, queue]);

  function rate(r) {
    onRate(card, r);
    setDone((d) => d + 1);
    setFlipped(false);
    setQueue((q) => {
      const rest = q.slice(1);
      if (r === "again") { const p = Math.min(rest.length, 3); const a = [...rest]; a.splice(p, 0, card.id); return a; }
      return rest;
    });
  }

  if (!card) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-2">🎉</div>
        <div className="text-3xl font-bold text-stone-800">{done}</div>
        <p className="text-stone-500 mt-1">reviews complete</p>
        <div className="mt-6"><Btn kind="primary" onClick={onEnd}>Done</Btn></div>
      </div>
    );
  }

  const state = card.state;
  const stateBadge = { new: "bg-teal-50 text-teal-600", learning: "bg-orange-50 text-orange-600", review: "bg-violet-50 text-violet-600" };

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 font-medium text-[11px] ${stateBadge[state] || ""}`}>{state}</span>
          <span className="text-stone-300">{card.deck}</span>
        </div>
        <span>{done} done · {queue.length} left</span>
      </div>
      <Bar value={done} max={done + queue.length} />

      <div
        onClick={() => !flipped && setFlipped(true)}
        className={`mt-5 min-h-60 rounded-2xl border bg-white px-6 py-8 flex flex-col items-center justify-center text-center transition-colors ${!flipped ? "cursor-pointer hover:border-teal-300 border-stone-200" : "border-stone-200"}`}>
        <div className="text-xs uppercase tracking-wide text-stone-300 mb-3">Front</div>
        <div className="text-2xl font-semibold text-stone-800 leading-snug">{card.front}</div>
        {flipped && (
          <>
            <div className="my-4 h-px w-12 bg-stone-200" />
            <div className="text-2xl font-semibold text-teal-700 leading-snug">{card.back}</div>
            {card.note && <div className="mt-3 text-xs text-stone-400 italic">{card.note}</div>}
          </>
        )}
        {!flipped && <div className="mt-5 text-xs text-stone-400">tap or Space to reveal</div>}
      </div>

      {flipped ? (
        <div className="mt-4 flex gap-2">
          <RatingBtn tone="again" label="Again" sub={fmtInt(prevInt(card, "again"))} onClick={() => rate("again")} />
          <RatingBtn tone="hard"  label="Hard"  sub={fmtInt(prevInt(card, "hard"))}  onClick={() => rate("hard")} />
          <RatingBtn tone="good"  label="Good"  sub={fmtInt(prevInt(card, "good"))}  onClick={() => rate("good")} />
          <RatingBtn tone="easy"  label="Easy"  sub={fmtInt(prevInt(card, "easy"))}  onClick={() => rate("easy")} />
        </div>
      ) : (
        <div className="mt-4"><Btn kind="primary" className="w-full" onClick={() => setFlipped(true)}>Show answer</Btn></div>
      )}

      <Keys items={flipped
        ? [["1","again"],["2","hard"],["3","good"],["4","easy"],["Esc","end"]]
        : [["Space","reveal"],["Esc","end"]]} />
    </div>
  );
}

/* ═══════════════════════════ FLIP DRILL ═══════════════════════════ */

function FlipDrill({ deck, quizMake, onBack }) {
  const [mode,    setMode]    = useState("cards"); // cards | quiz
  const [order,   setOrder]   = useState(() => deck.map((_, i) => i));
  const [pos,     setPos]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState({});
  const [deToEn,  setDeToEn]  = useState(false);

  const total = order.length;

  function mark(ok) {
    const idx = order[pos];
    setResults((r) => ({ ...r, [idx]: ok }));
    setFlipped(false);
    setPos((p) => p + 1);
  }

  useEffect(() => {
    if (mode !== "cards") return;
    function onKey(e) {
      if (pos >= total) return;
      if (!flipped && (e.key === " " || e.key === "Enter")) { e.preventDefault(); setFlipped(true); }
      else if (flipped && e.key === "ArrowRight") { e.preventDefault(); mark(true); }
      else if (flipped && e.key === "ArrowLeft")  { e.preventDefault(); mark(false); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, pos, total, flipped, order]);

  if (mode === "quiz") return (
    <div>
      <div className="mb-4 inline-flex rounded-xl bg-stone-200 p-1 text-sm">
        {[["cards","Cards"],["quiz","Quiz"]].map(([k,l]) => (
          <button key={k} onClick={() => setMode(k)} className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${mode===k?"bg-white text-stone-800 shadow-sm":"text-stone-500"}`}>{l}</button>
        ))}
      </div>
      <Exam make={quizMake || (() => buildDeckQ(deck))} />
    </div>
  );

  if (pos >= total) {
    const ok = Object.values(results).filter(Boolean).length;
    const missed = order.filter((i) => results[i] === false);
    return (
      <div>
        <div className="mb-4 inline-flex rounded-xl bg-stone-200 p-1 text-sm">
          {[["cards","Cards"],["quiz","Quiz"]].map(([k,l]) => (
            <button key={k} onClick={() => setMode(k)} className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${mode===k?"bg-white text-stone-800 shadow-sm":"text-stone-500"}`}>{l}</button>
          ))}
        </div>
        <div className="text-center py-8">
          <div className="text-4xl font-bold text-stone-800">{ok}/{total}</div>
          <p className="mt-1 text-stone-500">known this round</p>
          <div className="mt-5 flex flex-col gap-2.5 items-center">
            {missed.length > 0 && (
              <Btn kind="primary" onClick={() => { setOrder(missed); setPos(0); setResults({}); setFlipped(false); }}>
                <ListChecks size={15} /> Review {missed.length} missed
              </Btn>
            )}
            <Btn onClick={() => { setOrder(shuffle(deck.map((_, i) => i))); setPos(0); setResults({}); setFlipped(false); }}>
              <Shuffle size={15} /> Shuffle & restart
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  const card  = deck[order[pos]];
  const front = deToEn ? card.de : card.en;
  const back  = deToEn ? card.en : card.de;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex rounded-xl bg-stone-200 p-1 text-sm">
          {[["cards","Cards"],["quiz","Quiz"]].map(([k,l]) => (
            <button key={k} onClick={() => setMode(k)} className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${mode===k?"bg-white text-stone-800 shadow-sm":"text-stone-500"}`}>{l}</button>
          ))}
        </div>
        <button onClick={() => setDeToEn((v) => !v)} className="inline-flex items-center gap-1 text-xs text-teal-700 font-medium">
          <ArrowLeftRight size={12} /> {deToEn ? "DE→EN" : "EN→DE"}
        </button>
      </div>
      <div className="flex justify-between text-xs text-stone-400 mb-2">
        <span>Card {pos + 1} of {total}</span>
        <span>{Object.values(results).filter(Boolean).length} known</span>
      </div>
      <Bar value={pos} max={total} />

      <button onClick={() => setFlipped((f) => !f)}
        className="mt-5 w-full min-h-56 rounded-2xl border border-stone-200 bg-white px-6 py-8 flex flex-col items-center justify-center text-center hover:border-teal-300 transition-colors">
        {!flipped ? (
          <>
            <div className="text-2xl font-semibold text-stone-800">{front}</div>
            <div className="mt-4 text-xs text-stone-400">tap or Space to flip</div>
          </>
        ) : (
          <>
            <div className="text-base text-stone-400">{front}</div>
            <div className="mt-2 text-2xl font-semibold text-teal-700">{back}</div>
            {card.note && <div className="mt-3 text-xs text-stone-500 italic">{card.note}</div>}
          </>
        )}
      </button>

      {flipped ? (
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button onClick={() => mark(false)} className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-100">
            <X size={16} /> Again
          </button>
          <button onClick={() => mark(true)} className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-medium text-white hover:bg-teal-700">
            <Check size={16} /> Knew it
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <Btn kind="primary" className="w-full" onClick={() => setFlipped(true)}>Reveal</Btn>
        </div>
      )}
      <Keys items={flipped
        ? [["←","again"],["→","knew it"],["Esc","back"]]
        : [["Space","flip"],["Esc","back"]]} />
    </div>
  );
}

/* ═══════════════════════════ NUMBER TRAINER ═══════════════════════════ */

function NumTrainer() {
  const [max,    setMax]    = useState(20);
  const [n2w,    setN2w]    = useState(true);
  const [q,      setQ]      = useState(() => mkQ(20, true));
  const [picked, setPicked] = useState(null);
  const [score,  setScore]  = useState(0);
  const [count,  setCount]  = useState(0);

  function mkQ(m, dir) {
    const n = 1 + Math.floor(Math.random() * m);
    const pool = new Set([n]);
    while (pool.size < 4) pool.add(1 + Math.floor(Math.random() * m));
    const nums = shuffle([...pool]);
    return dir
      ? { prompt: String(n), answer: n2g(n), options: nums.map(n2g), num: n }
      : { prompt: n2g(n), answer: String(n), options: nums.map(String), num: n };
  }
  function regen(m = max, d = n2w) { setQ(mkQ(m, d)); setPicked(null); }

  useEffect(() => {
    function onKey(e) {
      if (!picked) {
        const i = parseInt(e.key, 10);
        if (i >= 1 && i <= q.options.length) { e.preventDefault(); choose(q.options[i - 1]); }
      } else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); regen(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, picked, max, n2w]);

  function choose(opt) {
    if (picked) return;
    setPicked(opt); setCount((c) => c + 1);
    if (opt === q.answer) setScore((s) => s + 1);
  }

  const nt = numTranslate(q.num);
  const ans = picked !== null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[20, 100].map((r) => (
          <button key={r} onClick={() => { setMax(r); regen(r); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${max===r?"bg-teal-600 text-white border-teal-600":"bg-white text-stone-600 border-stone-200"}`}>1–{r}</button>
        ))}
        <button onClick={() => { const d = !n2w; setN2w(d); regen(max, d); }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-white text-teal-700 border-stone-200 inline-flex items-center gap-1">
          <ArrowLeftRight size={12} /> {n2w ? "Num → word" : "Word → num"}
        </button>
      </div>
      <div className="flex justify-between text-xs text-stone-400 mb-3">
        <span>Answered: {count}</span>
        <span>Correct: {score}{count > 0 ? " (" + Math.round(score/count*100) + "%)" : ""}</span>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white py-10 text-center">
        <div className="text-xs uppercase tracking-wide text-stone-300 mb-2">{n2w ? "Spell in German" : "Which number?"}</div>
        <div className="text-5xl font-bold text-stone-800">{q.prompt}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {q.options.map((opt, i) => {
          let cls = "bg-white border-stone-200 text-stone-700 hover:bg-stone-50";
          if (ans && opt === q.answer) cls = "bg-emerald-50 border-emerald-300 text-emerald-800";
          else if (ans && opt === picked) cls = "bg-rose-50 border-rose-300 text-rose-700";
          else if (ans) cls = "bg-white border-stone-200 text-stone-400";
          return (
            <button key={opt+i} onClick={() => choose(opt)} disabled={ans}
              className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${cls}`}>
              <span className="text-[11px] font-mono opacity-40 w-4">{i+1}</span> {opt}
            </button>
          );
        })}
      </div>

      {ans && (
        <div className="mt-3 space-y-2">
          {nt && (
            <div>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600" onClick={() => {}}>
                {/* auto-show breakdown for numbers */}
              </button>
              <TranslatePanel t={nt} />
            </div>
          )}
          <Btn kind="primary" className="w-full" onClick={() => regen()}>Next <ChevronRight size={15} /></Btn>
        </div>
      )}
      <p className="mt-4 text-center text-xs text-stone-400">
        Rule: units first + <b>und</b> + tens. 47 = sieben<b>und</b>vierzig.
      </p>
      <Keys items={[["1–4","answer"],["Enter","next"]]} />
    </div>
  );
}

/* ═══════════════════════════ ADD CARDS ═══════════════════════════ */

function parsePaste(text) {
  const delims = ["|", "\t", " — ", " - ", " = ", ";"];
  return text.split("\n").map((l) => l.trim()).filter(Boolean).flatMap((l) => {
    for (const d of delims) {
      const i = l.indexOf(d);
      if (i > 0) {
        const front = l.slice(0, i).trim(), back = l.slice(i + d.length).trim();
        if (front && back) return [{ front, back }];
      }
    }
    return [];
  });
}

async function callAI(notes) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6", max_tokens: 1000,
      messages: [{ role: "user", content:
        "Turn these study notes into spaced-repetition flashcards.\n" +
        "Return ONLY a JSON array — no markdown, no backticks.\n" +
        "Each item: {\"front\":\"...\",\"back\":\"...\"}. One atomic fact per card. Max 20 cards.\n\n" +
        "NOTES:\n" + notes
      }],
    }),
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const d = await res.json();
  let txt = d.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  txt = txt.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  return JSON.parse(txt).filter((x) => x.front && x.back);
}

function AddCards({ onAdd }) {
  const [tab,     setTab]     = useState("paste");
  const [deck,    setDeck]    = useState("My Notes");
  const [front,   setFront]   = useState("");
  const [back,    setBack]    = useState("");
  const [bulk,    setBulk]    = useState("");
  const [notes,   setNotes]   = useState("");
  const [aiCards, setAiCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState("");

  const parsed = parsePaste(bulk);

  async function generate() {
    if (!notes.trim()) return;
    setErr(""); setLoading(true); setAiCards([]);
    try { setAiCards(await callAI(notes.trim())); }
    catch { setErr("AI unavailable here — try paste or type instead."); }
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-stone-400 mb-1">Deck name</label>
        <input value={deck} onChange={(e) => setDeck(e.target.value)} maxLength={40}
          className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
      </div>

      <div className="inline-flex rounded-xl bg-stone-200 p-1 text-sm">
        {[["paste", ClipboardPaste, "Paste"], ["ai", Sparkles, "AI"], ["type", Pencil, "Type"]].map(([k, Icon, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${tab===k?"bg-white text-stone-800 shadow-sm":"text-stone-500"}`}>
            <Icon size={13} />{l}
          </button>
        ))}
      </div>

      {tab === "paste" && (
        <div>
          <p className="text-xs text-stone-400 mb-2">One card per line: <code className="bg-stone-100 px-1 rounded">front | back</code> (or - or tab)</p>
          <textarea value={bulk} onChange={(e) => setBulk(e.target.value)} rows={7} placeholder={"Guten Morgen | Good morning\ndanke - thank you\n7 | sieben"}
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono focus:outline-none focus:border-teal-400" />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-stone-400">{parsed.length} card(s)</span>
            <Btn kind="primary" disabled={!parsed.length} onClick={() => { onAdd(parsed, deck); setBulk(""); }}>
              <Plus size={15} /> Add {parsed.length}
            </Btn>
          </div>
        </div>
      )}

      {tab === "ai" && (
        <div>
          <p className="text-xs text-stone-400 mb-2">Paste any notes — AI generates atomic flashcards. Review before adding.</p>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} maxLength={4000}
            placeholder="Paste vocab lists, bullet notes, definitions…"
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
          {err && <div className="mt-2 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><AlertCircle size={13}/>{err}</div>}
          <div className="mt-2">
            <Btn kind="primary" disabled={!notes.trim() || loading} onClick={generate}>
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {loading ? "Generating…" : "Generate cards"}
            </Btn>
          </div>
          {aiCards.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-stone-400 mb-2">{aiCards.length} generated — remove any you don't want</div>
              <div className="space-y-1.5 max-h-64 overflow-auto pr-1">
                {aiCards.map((c, i) => (
                  <div key={i} className="rounded-xl border border-stone-200 bg-white px-3 py-2 flex items-start gap-2">
                    <div className="flex-1 text-sm">
                      <div className="font-medium text-stone-800">{c.front}</div>
                      <div className="text-stone-500">{c.back}</div>
                    </div>
                    <button onClick={() => setAiCards((a) => a.filter((_, k) => k !== i))} className="text-stone-300 hover:text-rose-500"><X size={15}/></button>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <Btn kind="primary" onClick={() => { onAdd(aiCards, deck); setAiCards([]); setNotes(""); }}>
                  <Plus size={15} /> Add all {aiCards.length}
                </Btn>
                <Btn onClick={() => setAiCards([])}>Discard</Btn>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "type" && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-stone-400 mb-1">Front (cue / question)</label>
            <textarea value={front} onChange={(e) => setFront(e.target.value)} rows={2}
              className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
          </div>
          <div>
            <label className="block text-xs text-stone-400 mb-1">Back (answer)</label>
            <textarea value={back} onChange={(e) => setBack(e.target.value)} rows={2}
              className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
          </div>
          <Btn kind="primary" disabled={!front.trim() || !back.trim()}
            onClick={() => { onAdd([{ front: front.trim(), back: back.trim() }], deck); setFront(""); setBack(""); }}>
            <Plus size={15} /> Add card
          </Btn>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ BROWSE ═══════════════════════════ */

function Browse({ cards, settings, onDelete, onSettings, onReset }) {
  const [q, setQ] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const now = Date.now();

  const filtered = cards
    .filter((c) => !q || (c.front + c.back + c.deck).toLowerCase().includes(q.toLowerCase()))
    .slice(0, 200);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3">
        <span className="text-sm text-stone-600">New cards / day</span>
        <div className="inline-flex items-center gap-2">
          <button onClick={() => onSettings(Math.max(5, settings.newPerDay - 5))}
            className="w-7 h-7 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600">–</button>
          <span className="w-8 text-center font-semibold text-stone-800">{settings.newPerDay}</span>
          <button onClick={() => onSettings(settings.newPerDay + 5)}
            className="w-7 h-7 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600">+</button>
        </div>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cards…"
          className="w-full rounded-xl border border-stone-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
      </div>

      <div className="text-xs text-stone-400">{cards.length} cards total</div>

      <div className="space-y-1.5 max-h-80 overflow-auto pr-1">
        {filtered.map((c) => {
          const badge =
            c.state === "new"   ? ["new",  "text-teal-500"] :
            c.due <= now        ? ["due",  "text-orange-500"] :
                                  [relTime(c.due), "text-stone-400"];
          return (
            <div key={c.id} className="rounded-xl border border-stone-200 bg-white px-3 py-2 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-stone-800 truncate">{c.front}</div>
                <div className="text-xs text-stone-400 truncate">{c.back} · <span className="text-stone-300">{c.deck}</span></div>
              </div>
              <span className={`text-[11px] shrink-0 ${badge[1]}`}>{badge[0]}</span>
              <button onClick={() => onDelete(c.id)} className="text-stone-300 hover:text-rose-500 shrink-0"><Trash2 size={14}/></button>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="text-center text-sm text-stone-400 py-4">No cards match.</div>}
      </div>

      <div className="pt-2 border-t border-stone-200">
        {confirmReset ? (
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-stone-500 flex-1">Reset all progress to new?</span>
            <Btn kind="danger" onClick={() => { onReset(); setConfirmReset(false); }}>Reset</Btn>
            <Btn onClick={() => setConfirmReset(false)}>Cancel</Btn>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-rose-500">
            <RotateCcw size={13} /> Reset all progress
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════ APP ═══════════════════════════ */
const DARK_CSS = [
  ".dark { color-scheme: dark; }",
  ".dark .bg-stone-100 { background-color: #0c0a09; }",
  ".dark .bg-white     { background-color: #1c1917; }",
  ".dark .bg-stone-50  { background-color: #292524; }",
  ".dark .bg-stone-200 { background-color: #44403c; }",
  ".dark .text-stone-800 { color: #e7e5e4; }",
  ".dark .text-stone-700 { color: #d6d3d1; }",
  ".dark .text-stone-600 { color: #a8a29e; }",
  ".dark .text-stone-500 { color: #a8a29e; }",
  ".dark .text-stone-400 { color: #78716c; }",
  ".dark .text-stone-300 { color: #57534e; }",
  ".dark .border-stone-200 { border-color: #44403c; }",
  ".dark .border-stone-300 { border-color: #57534e; }",
  ".dark input, .dark textarea { background-color: #1c1917 !important; color: #e7e5e4 !important; border-color: #44403c !important; }",
  ".dark input::placeholder, .dark textarea::placeholder { color: #57534e; }",
  ".dark kbd { background-color: #1c1917; border-color: #57534e; color: #a8a29e; }",
  ".dark .bg-teal-50   { background-color: #042f2e; }",
  ".dark .bg-teal-100  { background-color: #134e4a; }",
  ".dark .text-teal-700 { color: #5eead4; }",
  ".dark .text-teal-600 { color: #2dd4bf; }",
  ".dark .text-teal-500 { color: #14b8a6; }",
  ".dark .border-teal-300 { border-color: #0f766e; }",
  ".dark .border-teal-600 { border-color: #0d9488; }",
  ".dark .bg-emerald-50   { background-color: #052e16; }",
  ".dark .text-emerald-800 { color: #6ee7b7; }",
  ".dark .text-emerald-700 { color: #4ade80; }",
  ".dark .text-emerald-600 { color: #4ade80; }",
  ".dark .border-emerald-300 { border-color: #166534; }",
  ".dark .border-emerald-200 { border-color: #14532d; }",
  ".dark .bg-rose-50    { background-color: #2d0a0a; }",
  ".dark .text-rose-700  { color: #fda4af; }",
  ".dark .text-rose-600  { color: #fb7185; }",
  ".dark .text-rose-500  { color: #f43f5e; }",
  ".dark .border-rose-300 { border-color: #9f1239; }",
  ".dark .border-rose-200 { border-color: #7f1d1d; }",
  ".dark .bg-orange-50  { background-color: #2c1810; }",
  ".dark .text-orange-700 { color: #fdba74; }",
  ".dark .border-orange-200 { border-color: #7c2d12; }",
  ".dark .bg-sky-50     { background-color: #082f49; }",
  ".dark .text-sky-700   { color: #7dd3fc; }",
  ".dark .border-sky-200 { border-color: #0c4a6e; }",
  ".dark .bg-indigo-50  { background-color: #1e1b4b; }",
  ".dark .text-indigo-900 { color: #c7d2fe; }",
  ".dark .text-indigo-600 { color: #818cf8; }",
  ".dark .text-indigo-400 { color: #a5b4fc; }",
  ".dark .border-indigo-100 { border-color: #312e81; }",
  ".dark .border-indigo-200 { border-color: #3730a3; }",
  ".dark .bg-amber-50   { background-color: #2d1f0a; }",
  ".dark .text-amber-700 { color: #fbbf24; }",
  ".dark .text-amber-600 { color: #f59e0b; }",
  ".dark .border-amber-200 { border-color: #78350f; }",
  ".dark .bg-violet-50   { background-color: #2e1065; }",
  ".dark .text-violet-600 { color: #a78bfa; }",
  ".dark ::-webkit-scrollbar { width: 6px; }",
  ".dark ::-webkit-scrollbar-track { background: #1c1917; }",
  ".dark ::-webkit-scrollbar-thumb { background: #44403c; border-radius: 3px; }",
].join("\n");

function DarkToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Light mode" : "Dark mode"}
      style={{
        position: "fixed", top: 14, right: 14, zIndex: 9999,
        width: 36, height: 36, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: dark ? "#292524" : "#ffffff",
        border: "1px solid " + (dark ? "#57534e" : "#e7e5e4"),
        color: dark ? "#e2e8f0" : "#57534e",
        cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,.12)",
        transition: "background .2s, border-color .2s",
      }}
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

const PRACTICE_TILES = [
  { id: "truefalse",  label: "True / False", sub: "Richtig/falsch",  icon: CheckSquare },
  { id: "numbers",    label: "Numbers",       sub: "1–100",           icon: Hash        },
  { id: "reading",    label: "Reading",       sub: "passage + Qs",    icon: FileText    },
  { id: "en2de",      label: "EN → DE",       sub: "translate",       icon: Languages   },
  { id: "countries",  label: "Languages",     sub: "Land → Sprache",  icon: Globe       },
  { id: "time",       label: "Time",          sub: "die Uhrzeit",     icon: Clock       },
];

const DECK_TILES = [
  { id: "deck:selfintro",  label: "Self-Intro",  sub: "Vorstellung", icon: User,         deck: "selfintro"  },
  { id: "deck:greetings",  label: "Greetings",   sub: "Begrüßung",   icon: Smile,        deck: "greetings"  },
  { id: "deck:farewells",  label: "Farewells",   sub: "Abschied",    icon: ArrowLeftRight,deck: "farewells"  },
  { id: "deck:mood",       label: "Wie geht's",  sub: "mood",        icon: MessageSquare,deck: "mood"       },
  { id: "deck:questions",  label: "Questions",   sub: "Fragen",      icon: MessageSquare,deck: "questions"  },
  { id: "deck:days",       label: "Days",        sub: "Wochentage",  icon: Calendar,     deck: "days"       },
  { id: "deck:months",     label: "Months",      sub: "Monate",      icon: Calendar,     deck: "months"     },
  { id: "deck:family",     label: "Family",      sub: "Familie",     icon: Users,        deck: "family"     },
  { id: "deck:hobbies",    label: "Hobbies",     sub: "Hobbys",      icon: BookOpen,     deck: "hobbies"    },
  { id: "deck:time",       label: "Time deck",   sub: "Uhrzeit",     icon: Clock,        deck: "time"       },
  { id: "deck:phrases",    label: "Phrases",     sub: "Sätze",       icon: MessageSquare,deck: "phrases"    },
  { id: "deck:verbs",      label: "Verbs",       sub: "Konjugation", icon: GraduationCap,deck: "verbs"      },
];

export default function App() {
  const [data,     setData]     = useState(null);
  const [tab,      setTab]      = useState("study");   // study | practice | manage
  const [subview,  setSubview]  = useState(null);      // null = home, else string
  const [session,  setSession]  = useState(false);     // SRS session active
  const [flash,    setFlash]    = useState("");
  const [persistent, setPersistent] = useState(true);
  const [dark, setDark] = useState(false);

  // Inject CSS once into <head>
  useEffect(() => {
    const el = document.createElement("style");
    el.id = "srs-dark-css";
    el.textContent = DARK_CSS;
    document.head.appendChild(el);
    return () => { const s = document.getElementById("srs-dark-css"); if (s) s.remove(); };
  }, []);

  // Sync .dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    (async () => {
      let d = await loadData();
      if (!d) d = { v: 1, cards: seedCards(), settings: { newPerDay: 20 }, daily: { day: todayStr(), newDone: 0 } };
      if (d.daily.day !== todayStr()) d = { ...d, daily: { day: todayStr(), newDone: 0 } };
      if (d.settings && d.settings.dark) setDark(d.settings.dark);
      setPersistent(hasStore());
      setData(d);
    })();
  }, []);

  function commit(updater) {
    setData((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      persist(next);
      return next;
    });
  }

  function showFlash(msg) { setFlash(msg); setTimeout(() => setFlash(""), 2500); }

  function addCards(list, deck) {
    const created = list.map((c) => newCard(c.front, c.back, deck));
    commit((d) => ({ ...d, cards: [...d.cards, ...created] }));
    showFlash("Added " + created.length + " card(s) to '" + deck + "'" );
  }

  // global Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (session) { setSession(false); }
        else if (subview) setSubview(null);
        else if (tab !== "study") setTab("study");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [session, subview, tab]);

  if (!data) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <Loader2 className="animate-spin text-teal-600" size={24} />
      </div>
    );
  }

  const { cards, settings } = data;
  const now = Date.now();
  const reviewDue = cards.filter((c) => c.state !== "new" && c.due <= now).length;
  const newAvail  = Math.min(
    Math.max(0, settings.newPerDay - data.daily.newDone),
    cards.filter((c) => c.state === "new").length
  );
  const dueTotal   = reviewDue + newAvail;
  const upcoming   = cards.filter((c) => c.due > now).sort((a, b) => a.due - b.due)[0];
  const inSession  = session || subview;  // hide bottom nav

  // ── SRS session ──
  const toggleDark = () => {
    const nd = !dark;
    setDark(nd);
    commit((d) => ({ ...d, settings: { ...d.settings, dark: nd } }));
  };

  if (session) {
    return (
      <>
        <DarkToggle dark={dark} onToggle={toggleDark} />
        <div className="min-h-screen bg-stone-100">
          <div className="mx-auto max-w-xl px-4 py-6">
            <button onClick={() => setSession(false)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 mb-5">
              <ArrowLeft size={17} /> End session
            </button>
          <SRSSession
            cards={cards}
            maxNew={newAvail}
            onRate={(card, rating) => {
              const updated = schedule(card, rating);
              const wasNew  = card.state === "new";
              commit((d) => ({
                ...d,
                cards: d.cards.map((c) => c.id === updated.id ? updated : c),
                daily: wasNew ? { ...d.daily, newDone: d.daily.newDone + 1 } : d.daily,
              }));
            }}
            onEnd={() => setSession(false)}
          />
          </div>
        </div>
      </>
    );
  }

  // ── Sub-views (practice / deck drills) ──
  if (subview) {
    let title = "", content = null;

    if (subview === "truefalse") { title = "True / False"; content = <Exam make={() => buildN(genTF, 12)} />; }
    else if (subview === "numbers")   { title = "Numbers"; content = <NumTrainer />; }
    else if (subview === "reading")   { title = "Reading"; content = <Exam make={() => buildN(genReading, 8)} />; }
    else if (subview === "en2de")     { title = "EN → DE"; content = <Exam make={() => buildN(genEN2DE, 12)} />; }
    else if (subview === "countries") { title = "Languages"; content = <Exam make={() => buildN(genCountry, 12)} />; }
    else if (subview === "time")      { title = "Time";     content = <Exam make={() => buildN(genTime, 10)} />; }
    else if (subview.startsWith("test:")) {
      const n = subview.split(":")[1];
      title = "Mock Test " + n;
      content = <Exam make={buildTest} sectioned />;
    }
    else if (subview.startsWith("deck:")) {
      const key = subview.slice(5);
      const tile = DECK_TILES.find((t) => t.deck === key);
      title = tile ? tile.label : key;
      if (key === "verbs") {
        const verbDeck = VERBS.flatMap((v) => Object.entries(v.f).map(([p, f]) => ({ en: v.inf + " — " + p, de: f, note: v.m })));
        content = <FlipDrill deck={verbDeck} />;
      } else {
        content = <FlipDrill deck={DECKS[key] || []} />;
      }
    }

    return (
      <>
        <DarkToggle dark={dark} onToggle={toggleDark} />
        <div className="min-h-screen bg-stone-100">
          <div className="mx-auto max-w-xl px-4 py-6">
            <button onClick={() => setSubview(null)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 mb-5">
              <ArrowLeft size={17} /> Back
            </button>
            <h2 className="text-xl font-bold text-stone-800 mb-5">{title}</h2>
            {content}
          </div>
        </div>
      </>
    );
  }

  // ── Tab screens ──
  function Tile({ label, sub, icon: Icon, onClick }) {
    return (
      <button onClick={onClick}
        className="text-left rounded-2xl border border-stone-200 bg-white p-4 hover:border-teal-300 hover:shadow-sm transition-all group">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-50 text-teal-700 mb-3 group-hover:bg-teal-100">
          <Icon size={17} />
        </div>
        <div className="font-semibold text-stone-800 text-sm">{label}</div>
        <div className="text-xs text-stone-400">{sub}</div>
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 pb-20">
      <div className="mx-auto max-w-xl px-4 py-6">
        <DarkToggle dark={dark} onToggle={toggleDark} />
        {/* flash */}
        {flash && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
            <Check size={14} /> {flash}
          </div>
        )}

        {/* ─── STUDY TAB ─── */}
        {tab === "study" && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="font-serif italic text-teal-700">Spaced</span> Repetition
              </h1>
              <p className="text-sm text-stone-400 mt-0.5">Only what's due, only when it matters.</p>
            </div>

            {/* stats + CTA */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="grid grid-cols-3 gap-3 text-center mb-5">
                <div>
                  <div className="text-3xl font-bold text-teal-600">{reviewDue}</div>
                  <div className="text-xs text-stone-400 mt-0.5">due now</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-800">{newAvail}</div>
                  <div className="text-xs text-stone-400 mt-0.5">new today</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stone-300">{cards.length}</div>
                  <div className="text-xs text-stone-400 mt-0.5">total</div>
                </div>
              </div>

              {dueTotal > 0 ? (
                <button onClick={() => setSession(true)}
                  className="w-full rounded-xl bg-teal-600 text-white py-3 text-base font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                  <Brain size={19} /> Study {dueTotal} card{dueTotal !== 1 ? "s" : ""}
                </button>
              ) : (
                <div className="text-center py-1">
                  <div className="text-sm font-medium text-stone-700">All caught up 🎉</div>
                  <div className="text-xs text-stone-400 mt-1">
                    {upcoming ? "Next review " + relTime(upcoming.due) : "Add cards to begin"}
                  </div>
                </div>
              )}
            </div>

            {/* SRS hint */}
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-500 space-y-1 leading-relaxed">
              <div><span className="font-semibold text-stone-700">Again</span> → back in minutes · <span className="font-semibold text-stone-700">Hard</span> → shorter interval · <span className="font-semibold text-stone-700">Good</span> → scheduled normally · <span className="font-semibold text-stone-700">Easy</span> → bigger jump</div>
              <div>Each card's interval grows with every correct recall. That's spaced repetition.</div>
            </div>

            {!persistent && (
              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                <AlertCircle size={13} /> Session only — storage unavailable in this environment
              </div>
            )}
          </div>
        )}

        {/* ─── PRACTICE TAB ─── */}
        {tab === "practice" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="font-serif italic text-teal-700">Practice</span>
            </h1>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Drill formats</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {PRACTICE_TILES.map((t) => (
                  <Tile key={t.id} label={t.label} sub={t.sub} icon={t.icon} onClick={() => setSubview(t.id)} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Vocabulary decks</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {DECK_TILES.map((t) => (
                  <Tile key={t.id} label={t.label} sub={t.sub} icon={t.icon} onClick={() => setSubview("deck:" + t.deck)} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Mock tests</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="space-y-2">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} onClick={() => setSubview("test:" + n)}
                    className="w-full flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 hover:border-teal-300 hover:shadow-sm transition-all text-left">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">{n}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-stone-800 text-sm">Test {n}</div>
                      <div className="text-xs text-stone-400">30 MCQs · 6 sections · randomized</div>
                    </div>
                    <ChevronRight size={16} className="text-stone-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── MANAGE TAB ─── */}
        {tab === "manage" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="font-serif italic text-teal-700">Manage</span>
            </h1>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Add cards</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <AddCards onAdd={addCards} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Browse & settings</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <Browse
                cards={cards}
                settings={settings}
                onDelete={(id) => commit((d) => ({ ...d, cards: d.cards.filter((c) => c.id !== id) }))}
                onSettings={(v) => commit((d) => ({ ...d, settings: { ...d.settings, newPerDay: v } }))}
                onReset={() => commit((d) => ({
                  ...d,
                  cards: d.cards.map((c) => ({ ...c, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, state: "new" })),
                  daily: { day: todayStr(), newDone: 0 },
                }))}
              />
            </div>
          </div>
        )}
      </div>

      {/* ─── BOTTOM NAV ─── */}
      <div className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-sm ${dark ? "border-stone-700 bg-stone-900/95" : "border-stone-200 bg-white/95"}`}>
        <div className="mx-auto max-w-xl flex">
          {[
            { id: "study",    icon: Brain,    label: "Study",    badge: dueTotal > 0 ? dueTotal : null },
            { id: "practice", icon: Target,   label: "Practice", badge: null },
            { id: "manage",   icon: Settings, label: "Manage",   badge: null },
          ].map(({ id, icon: Icon, label, badge }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 relative transition-colors ${tab === id ? "text-teal-600" : "text-stone-400 hover:text-stone-600"}`}>
              <div className="relative">
                <Icon size={22} />
                {badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center px-0.5">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium">{label}</span>
              {tab === id && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-teal-600" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
