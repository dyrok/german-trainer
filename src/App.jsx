import { useState, useEffect, useRef } from "react";
import {
  Brain, Target, Settings, ArrowLeft, Check, X, Plus, Globe, Trophy,
  ChevronRight, Hash, Calendar, Clock, Users, MessageSquare, Smile,
  GraduationCap, User, CheckSquare, FileText, Languages, ArrowLeftRight,
  RotateCcw, Pencil, ClipboardPaste, Loader2, AlertCircle, BookOpen,
  Shuffle, Sparkles, Search, Trash2, RefreshCw, ListChecks, Layers, Moon, Sun,
  Lightbulb, Send, Cpu, Atom, ChevronDown, Wand2, MessageCircle, Code,
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

/* ─── REACT subject: MCQ question bank ─── */
const REACT_QUIZ = [
  { q: "What type of components can use React Hooks?", o: ["Class components only", "Plain HTML files linked to JavaScript assets", "Functional components only", "Only layout components inside the public directory"], c: "C" },
  { q: "Why might a React Single Page Application (SPA) show a 404 error when refreshing a sub-route on Netlify?", o: ["The application code is too large for the hosting environment", "The production build automatically deletes sub-route components", "The server tries to look for a physical file matching that path instead of routing to index.html", "Vite doesn't support nested routing links during compilation step"], c: "C" },
  { q: "If you want a child component to send data back up to a parent, what do you pass as a prop?", o: ["The child component's local state hook object", "A modified string parameter", "A callback function defined in the parent component", "A standard link tag pointing upwards"], c: "C" },
  { q: "What does the useState Hook return?", o: ["A single object matching all HTML data properties", "The state value string directly without any extra tools", "A promise that resolves when the page updates", "An array containing the current state value and a setter function"], c: "D" },
  { q: "When deploying a Vite React app, what is the default command to build production-ready optimized static files?", o: ["vite start-app", "npm run build", "npm execute production", "npm run dev"], c: "B" },
  { q: "What feature allows Netlify or Vercel to automatically rebuild your site whenever you push changes to GitHub?", o: ["Continuous Deployment (CD) integration hooks", "Node package manager installation triggers", "Local file watcher background cron scripts", "Browser extension tracking modules"], c: "A" },
  { q: "What does an empty dependency array [] mean inside a useEffect Hook?", o: ["The effect will run on every single re-render block", "The effect will only run once when the component mounts", "The effect is turned off and will never execute at all", "The effect only triggers when state arrays are completely cleared"], c: "B" },
  { q: "Why shouldn't you do 'state = NewValue' directly to update a state variable?", o: ["It will cause an immediate compiler crash in Vite", "It converts the variable into a fixed prop value", "React won't detect the change, and the UI won't update", "It deletes all other variables inside your component folder"], c: "C" },
  { q: "What is the direction of data flow when using props?", o: ["Global (randomly between any component files)", "Bidirectional (back and forth evenly)", "Upwards only (from child to parent component)", "Unidirectional (downwards from parent to child)"], c: "D" },
  { q: "Which of these is an example of imperative programming?", o: ["Using a conditional ternary operator in JSX", "Mapping an array to a list of elements", "Using document.getElementById('title').textContent = 'Hello'", "Returning <h1>Hello</h1> from a React component"], c: "C" },
  { q: "What can a React component return?", o: ["Only standard HTML <div> tags", "Any valid CSS styling sheets", "JSON data objects only", "JSX elements, strings, numbers, or null"], c: "D" },
  { q: "Do React Fragments appear inside the final browser HTML DOM tree?", o: ["Only when the application is running in production mode", "Yes, they render as a <fragment> tag", "Yes, they automatically turn into a <div> tag", "No, they disappear and leave only their child elements"], c: "D" },
  { q: "What does 'declarative programming' mean in React?", o: ["You describe what the UI should look like, and React handles the updates", "You write step-by-step instructions to change the DOM manually", "You have to reload the entire webpage to change data", "You cannot use any JavaScript functions"], c: "A" },
  { q: "What technology does React use to declaratively render UI components?", o: ["Sass scripts", "SQL", "JSX", "Python templates"], c: "C" },
  { q: "Which built-in React Hook is used to track and update local component state?", o: ["useContext", "useRef", "useState", "useEffect"], c: "C" },
  { q: "How do you install components from shadcn/ui into a local project structure?", o: ["Manually writing all accessible element parameters from scratch", "Downloading an immutable npm package that you cannot modify", "Using their specialized CLI command tool to add specific files", "Linking a global CDN script tag into the index.html template"], c: "C" },
  { q: "In React, component names must always start with which type of letter?", o: ["A number symbol", "A lowercase letter", "An underscore character", "A capital letter"], c: "D" },
  { q: "What tool is commonly used to create an optimized, modern React app build environment instead of Create React App?", o: ["Vite", "Babel Core scripts", "Nodemon instance", "Webpack CLI 1"], c: "A" },
  { q: "What can be passed as a prop to a React component?", o: ["Strings, numbers, arrays, objects, and even functions", "Only plain text strings", "Only valid CSS stylesheets", "Only hook state variables"], c: "A" },
  { q: "What happens to a component when its state updates?", o: ["The component crashes and displays an error box", "The entire webpage undergoes a full hard refresh", "The component automatically re-renders to reflect the new state", "The browser clears its local storage cache memory"], c: "C" },
  { q: "How are props passed into a React component?", o: ["As global browser cookies", "Via a database connection string", "Through an import statement at the top of the file", "Like custom attributes on HTML tags"], c: "D" },
  { q: "Can you create your own custom Hooks in React?", o: ["Yes, by writing a function whose name starts with the prefix 'use'", "Only when building a mobile layout using special extensions", "Yes, but they must be registered inside the package.json file", "No, only the built-in React team hooks can ever be run"], c: "A" },
  { q: "What folder does Vite output its production-ready static assets into by default?", o: ["public", "build", "out", "dist"], c: "D" },
  { q: "Which of these best describes component 'state'?", o: ["Like global variables tracked by an analytics server", "Like local variables declared inside a function block", "Like function arguments sent from a different file", "Like HTML tag properties defined in index.html"], c: "B" },
  { q: "If both props and state change at the same time, what does React do?", o: ["It stops rendering entirely until a manual restart happens", "It ignores the props and only updates the state layout", "Schedulers trigger a re-render of the component to display current data", "It throws an overlapping data collision alert box"], c: "C" },
  { q: "What configuration file or rule fixes sub-routing 404 issues for a React app hosted on Netlify?", o: ["Re-installing the vite dependency tool chain using npm", "A _redirects rule file or netlify.toml setup mapping to index.html", "Adding a homepage attribute to the project package.json configuration", "A clean script entry inside the tailwind config utility"], c: "B" },
  { q: "Which tool does shadcn/ui rely on under the hood to handle component styling utilities cleanly?", o: ["Vanilla inline-styles objects", "Bootstrap Framework", "Sass preprocessor modules", "Tailwind CSS"], c: "D" },
  { q: "What file is typically edited to configure path tracking aliases and utilities for Tailwind CSS?", o: ["postcss.config.js", "index.html", "tailwind.config.js", "vite.config.js"], c: "C" },
  { q: "Which of these variables should be handled with 'state' rather than 'props'?", o: ["The styling color scheme passed from a layout root", "A fixed background image URL string", "Whether a user dropdown menu is currently open or closed", "A static application brand name text"], c: "C" },
  { q: "In vanilla JS, adding a class using element.classList.add() is an example of what?", o: ["Imperative programming", "Asynchronous routing", "State management", "Declarative programming"], c: "A" },
];
const LETTER_IDX = { A: 0, B: 1, C: 2, D: 3 };

/* ─── REACT module flashcards (front=question, back=answer), from the course syllabus ─── */
const REACT_MODULE_CARDS = [
  // Intro & setup, modern JS
  ["Intro", "What problem does React solve?", "Building interactive UIs by describing what the UI should look like for a given state; React efficiently updates the DOM when state changes."],
  ["Intro", "What is Create React App (CRA)?", "An older official toolchain to scaffold a React project with zero build config. Modern projects prefer Vite."],
  ["Intro", "What does the React virtual DOM do?", "Keeps an in-memory tree of the UI; on state change React diffs (reconciles) it against the previous tree and applies only the minimal real-DOM updates."],
  ["Modern JS", "What does ES6 destructuring let you do in React?", "Pull values out of props/state/arrays concisely, e.g. const { title } = props or const [v, setV] = useState()."],
  ["Modern JS", "Why are arrow functions common in React?", "They have no own 'this' binding, so callbacks and inline handlers behave predictably inside components."],
  ["Modern JS", "What is the spread operator used for in React?", "Copying/merging arrays and objects immutably, e.g. setState updates like {...obj, key: val} or [...arr, item]."],
  // Components & props
  ["Components", "What is a functional component?", "A JavaScript function that takes props and returns JSX. The modern standard for React components."],
  ["Components", "What are props?", "Read-only inputs passed from a parent to a child component, like attributes on a tag. A child must not mutate them."],
  ["Components", "What is PropTypes used for?", "Runtime validation of a component's prop types (e.g. PropTypes.string.isRequired) to catch bugs during development."],
  ["Components", "How do you pass data from child to parent?", "The parent passes a callback function as a prop; the child calls it with the data."],
  // JSX
  ["JSX", "What is JSX?", "A syntax extension that lets you write HTML-like markup in JavaScript; it compiles to React.createElement calls."],
  ["JSX", "How do you write a conditional in JSX?", "Use a ternary {cond ? <A/> : <B/>} or short-circuit {cond && <A/>}; if/else statements can't go inside JSX directly."],
  ["JSX", "Why does each item in a mapped list need a key?", "Keys give React stable identity for list items so it can update them efficiently and correctly across re-renders."],
  ["JSX", "Why use className instead of class in JSX?", "'class' is a reserved word in JavaScript, so JSX uses className for the HTML class attribute."],
  // Hooks
  ["Hooks", "What does useState return?", "An array: [currentValue, setterFunction]. Calling the setter schedules a re-render with the new value."],
  ["Hooks", "What does useEffect do?", "Runs side effects (data fetching, subscriptions, DOM work) after render, controlled by its dependency array."],
  ["Hooks", "What does an empty useEffect dependency array [] mean?", "The effect runs once after the component mounts (and its cleanup runs on unmount)."],
  ["Hooks", "What is a useEffect cleanup function?", "The function you return from the effect; React runs it before the next effect run and on unmount (e.g. to remove listeners)."],
  ["Hooks", "What is useContext for?", "Reading a value from a React Context without prop-drilling, giving components access to shared/global state."],
  ["Hooks", "When should you use useReducer instead of useState?", "When state logic is complex or the next state depends on the previous one, or multiple sub-values change together."],
  ["Hooks", "What is a custom hook?", "A reusable function whose name starts with 'use' that calls other hooks to share stateful logic between components."],
  ["Hooks", "What is useRef commonly used for?", "Holding a mutable value that persists across renders without causing re-renders, and referencing DOM nodes."],
  ["Hooks", "What does useMemo do?", "Memoizes the result of an expensive calculation, recomputing only when its dependencies change."],
  ["Hooks", "What is the Rules of Hooks?", "Only call hooks at the top level of a component or custom hook, never inside loops/conditions, and only from React functions."],
  // State management / Redux
  ["State Mgmt", "What is the Context API?", "React's built-in way to share state app-wide via a Provider that supplies a value to all consuming components."],
  ["State Mgmt", "What is Redux Toolkit (RTK)?", "The official, opinionated way to write Redux with less boilerplate — configureStore, createSlice, and built-in Immer."],
  ["State Mgmt", "What is a Redux slice?", "A piece of the store created with createSlice, bundling its reducer logic and auto-generated action creators."],
  ["State Mgmt", "What is Redux Thunk?", "Middleware that lets action creators return functions, enabling async logic like API calls before dispatching."],
  ["State Mgmt", "Context API vs Redux — when to use which?", "Context for low-frequency global values (theme, auth); Redux/RTK for large, frequently-updated, complex app state."],
  // Routing
  ["Routing", "What does React Router do?", "Maps URL paths to components for client-side routing in a single-page app, without full page reloads."],
  ["Routing", "How do you read a route parameter in React Router v6?", "Define a path like /user/:id and read it with the useParams() hook."],
  ["Routing", "How do you make a protected route?", "Wrap or guard the route so it renders the page only if authenticated, otherwise redirect (e.g. <Navigate to='/login' />)."],
  ["Routing", "Why does a refreshed SPA sub-route 404 on static hosts?", "The server looks for a real file at that path; you must add a rewrite/redirect rule sending all paths to index.html."],
  // Forms
  ["Forms", "What is a controlled component?", "A form input whose value is driven by React state and updated via onChange, making React the single source of truth."],
  ["Forms", "What is Formik used for?", "Managing form state, validation, and submission in complex React forms with less manual wiring."],
  // Styling
  ["Styling", "What do CSS Modules provide?", "Locally-scoped CSS class names per component, avoiding global style collisions."],
  ["Styling", "What are Styled Components?", "A CSS-in-JS library to define styled React components with tagged template literals and dynamic, prop-based styles."],
  // Performance
  ["Performance", "What does React.memo do?", "Memoizes a component so it skips re-rendering when its props are unchanged (shallow comparison)."],
  ["Performance", "What is lazy loading with React.lazy and Suspense?", "Code-splitting that loads a component only when needed, showing a Suspense fallback while it loads — smaller initial bundle."],
  ["Performance", "What is useCallback for?", "Memoizing a function identity across renders so memoized children/effects don't re-run unnecessarily."],
  // Testing
  ["Testing", "What is Jest?", "A JavaScript testing framework used to run unit/integration tests and make assertions in React projects."],
  ["Testing", "What is React Testing Library (RTL)?", "A library for testing components the way users interact with them — querying by role/text rather than implementation details."],
  ["Testing", "Why mock API calls in tests?", "To test components in isolation deterministically, without real network requests or flaky external dependencies."],
  // API
  ["API", "How do you fetch data with the Fetch API in React?", "Call fetch() inside useEffect, await res.json(), and store the result in state (handle loading and errors)."],
  ["API", "Why use Axios over Fetch?", "Axios adds conveniences: automatic JSON parsing, request/response interceptors, timeouts, and simpler error handling."],
  // Persistence
  ["Persistence", "How do you persist state in localStorage?", "Write state to localStorage.setItem on change (e.g. in an effect) and read it back with getItem on initialization."],
  ["Persistence", "What is Redux Persist?", "A library that saves and rehydrates the Redux store to storage so state survives page reloads/sessions."],
  // Animation
  ["Animation", "What is React Transition Group?", "A small library that manages mount/unmount transition states so you can animate components entering and leaving."],
  ["Animation", "What is Framer Motion?", "A declarative animation library (the 'motion' package) for animations, gestures, and layout transitions in React."],
  // TypeScript
  ["TypeScript", "Why use TypeScript with React?", "Static typing catches errors at compile time and gives autocomplete/safety for props, state, and hooks."],
  ["TypeScript", "How do you type a component's props in TS?", "Define an interface/type for the props and annotate the component, e.g. function Btn({label}: {label: string})."],
  // Next.js
  ["Next.js", "What is Next.js?", "A React framework adding server-side rendering, static generation, file-based routing, and full-stack features."],
  ["Next.js", "What is file-based routing in Next.js?", "Routes are created automatically from files in the app/pages directory — the file path becomes the URL."],
  // Deployment
  ["Deployment", "What does 'npm run build' produce?", "An optimized, minified production bundle of static assets ready to deploy (Vite outputs it to the dist folder)."],
  ["Deployment", "What is Continuous Deployment on Netlify/Vercel?", "Connecting your Git repo so every push triggers an automatic rebuild and redeploy of the site."],
];

/* ─── React flashcards from the professor's notes (links provided in class) ─── */
const REACT_PROF_CARDS = [
  // Imperative vs Declarative
  ["Imperative vs Declarative", "What does imperative coding focus on?", "The step-by-step HOW — you explicitly tell the machine each step (e.g. createElement, textContent, appendChild)."],
  ["Imperative vs Declarative", "What does declarative coding focus on?", "The WHAT / the result you want; the framework handles the implementation. React is declarative — you describe the UI and React updates the DOM."],
  ["Imperative vs Declarative", "Prof's food analogy for the two paradigms?", "Imperative = a recipe's steps ('heat pan, add oil, wait 30s'); declarative = ordering the result ('grilled chicken, medium, with fries')."],
  // useState
  ["Prof · useState", "Why can't a plain JS variable hold React state?", "Plain variables don't trigger a re-render. Only updating state via its setter makes React re-render and show the change."],
  ["Prof · useState", "Why doesn't a const state variable cause an assignment error?", "The setter never mutates the variable — it schedules a future update. React re-runs the component with a fresh value in a new scope."],
  ["Prof · useState", "What is the state value during one render?", "A read-only, frozen snapshot for that render. The setter dispatches a new value for the next render."],
  ["Prof · useState", "How are useState's value and setter named?", "By array destructuring on index position ([value, setter]), so you can name them anything; multiple useState calls stay independent."],
  // useEffect
  ["Prof · useEffect", "What is useEffect's primary purpose?", "To safely run side effects (API calls, timers, DOM work) after the component renders and the DOM updates."],
  ["Prof · useEffect", "What does no dependency array (undefined) do?", "The effect runs after every render — which can cause performance issues or infinite loops."],
  ["Prof · useEffect", "What does a populated dependency array do?", "The effect runs on mount and re-runs only when one of the listed dependencies changes value."],
  ["Prof · useEffect", "What is the returned cleanup function for?", "React runs it before the next effect and on unmount — to remove listeners, cancel timers, and prevent memory leaks."],
  // useRef
  ["Prof · useRef", "What are useRef's two main roles?", "Direct DOM access for imperative tasks, and storing mutable data that persists across renders without triggering a re-render."],
  ["Prof · useRef", "How does useRef differ from useState on re-rendering?", "Changing a ref's .current does NOT cause a re-render; changing state always does."],
  ["Prof · useRef", "What does ref.current hold?", "Either the initial value you passed, or the actual DOM node once the ref is bound to a JSX element."],
  ["Prof · useRef", "Good use cases for useRef?", "Focus control, smooth scrolling, storing timer IDs, integrating DOM libraries, and caching previous values for comparison."],
  // useCallback
  ["Prof · useCallback", "Why are functions recreated each render, and why does it matter?", "Every re-render redefines inner functions; a child sees a 'new' function prop each time, causing unnecessary re-renders."],
  ["Prof · useCallback", "What does useCallback do?", "Memoizes a function so its reference stays stable across renders unless its dependencies change."],
  ["Prof · useCallback", "What must you pair useCallback with to actually prevent child re-renders?", "React.memo on the child — so it skips rendering when props (including the memoized function) are unchanged."],
  // useReducer
  ["Prof · useReducer", "What is useReducer and when is it used?", "The 'Manager' hook for complex state — when the next state depends on the previous, or multiple related values change together."],
  ["Prof · useReducer", "How does useReducer organize update logic?", "All update logic lives in one pure reducer(state, action) function; the component just dispatches actions ({type, payload})."],
  ["Prof · useReducer", "What does useReducer return?", "[state, dispatch] = useReducer(reducer, initialState)."],
  ["Prof · useReducer", "Prof's kitchen analogy?", "useState is a waiter who also cooks (fine for a small menu); useReducer is a professional kitchen — logic is separated from the UI."],
  // State vs Props
  ["Prof · State vs Props", "What is state (personal memory)?", "A component's local, changeable data; when it updates, React automatically re-renders to show the new data."],
  ["Prof · State vs Props", "How do props differ from state?", "Props are configuration passed parent→child and are read-only; state is managed locally inside a component and is changeable."],
  ["Prof · State vs Props", "Common parent/child pattern?", "The parent holds the state and passes it down to the child as a prop; only the parent can update its own state."],
  // ESLint
  ["Prof · ESLint", "What is ESLint?", "A code-quality checker — a 'grammar checker for code' that scans JS for errors, bad practices, and inconsistencies, running on build."],
  ["Prof · ESLint", "ESLint's four error categories?", "Syntax errors, bad practices (unused variables), style issues (naming/spacing), and potential bugs (e.g. == instead of ===)."],
  ["Prof · ESLint", "Why does React warn about mixed exports (only-export-components)?", "Don't export a component and non-components from the same file (breaks Fast Refresh); split constants/helpers into separate files."],
  ["Prof · ESLint", "How to avoid a setState-in-useEffect cascade when reading localStorage?", "Don't setState in an empty-deps effect (infinite loop); use lazy initialization: useState(() => JSON.parse(localStorage.getItem(k)) || [])."],
  // Fragments (link was dead; standard fact)
  ["Components", "What is a React Fragment and why use it?", "<>...</> (or <React.Fragment>) groups multiple children without adding an extra DOM node — return several elements without a wrapper div."],
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
function yesterdayStr(){ return new Date(Date.now() - 86400000).toISOString().slice(0, 10); }
// Advance the daily streak when the user studies; returns the updated streak object.
function bumpStreak(streak) {
  const today = todayStr();
  if (streak && streak.lastDay === today) return streak;          // already counted today
  const count = streak && streak.lastDay === yesterdayStr() ? streak.count + 1 : 1;
  return { count, lastDay: today };
}

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

function newCard(front, back, deck, note, id, subject = "german") {
  return { id: id || uid(), front, back, deck: deck || "My Notes", note: note || null, subject,
    ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, state: "new", created: Date.now() };
}

// Fixed review steps (in ms): Again = now, Hard = 10 min, Good = 1 hr, Easy = 1 day.
const STEP_MS = { again: 0, hard: 10 * 60000, good: 60 * 60000, easy: DAY };

function schedule(card, rating) {
  let { ease, reps, lapses } = card;
  if (rating === "again") { reps = 0; lapses += 1; ease = Math.max(MIN_EASE, r2(ease - 0.2)); }
  else {
    if (rating === "hard") ease = Math.max(MIN_EASE, r2(ease - 0.15));
    if (rating === "easy") ease = r2(ease + 0.15);
    reps += 1;
  }
  const ms = STEP_MS[rating] ?? 0;
  const interval = ms / DAY; // days (fractional for sub-day steps)
  const state = rating === "again" ? "learning" : reps >= 2 ? "review" : "learning";
  const due = Date.now() + ms;
  return { ...card, ease: r2(ease), interval, reps, lapses, state, due };
}

function prevInt(card, rating) { return schedule(card, rating).interval; }

function fmtInt(days) {
  if (days <= 0) return "now";
  const mins = days * 1440;
  if (mins < 60)  return Math.round(mins) + "m";
  const hrs = days * 24;
  if (hrs < 24)   return Math.round(hrs) + "h";
  if (days < 30)  return Math.round(days) + "d";
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
function hasSandboxStore() { return typeof window !== "undefined" && window.storage && typeof window.storage.get === "function"; }
function hasLocalStore() {
  try { return typeof window !== "undefined" && !!window.localStorage; }
  catch { return false; }
}
function hasStore() { return hasSandboxStore() || hasLocalStore(); }

async function loadData() {
  if (hasSandboxStore()) {
    try { const r = await window.storage.get(KEY, false); return r ? JSON.parse(r.value) : null; }
    catch { return null; }
  }
  if (hasLocalStore()) {
    try { const v = window.localStorage.getItem(KEY); return v ? JSON.parse(v) : null; }
    catch { return null; }
  }
  return null;
}
async function persist(d) {
  if (hasSandboxStore()) {
    try { await window.storage.set(KEY, JSON.stringify(d), false); return; } catch {}
  }
  if (hasLocalStore()) {
    try { window.localStorage.setItem(KEY, JSON.stringify(d)); } catch {}
  }
}
async function clearData() {
  if (hasSandboxStore()) {
    try { await window.storage.delete(KEY, false); } catch {}
  }
  if (hasLocalStore()) {
    try { window.localStorage.removeItem(KEY); } catch {}
  }
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

// React flashcards: MCQ-bank basics + the full syllabus module deck
function seedReactCards() {
  const basics = REACT_QUIZ.map((item, i) =>
    newCard(item.q, item.o[LETTER_IDX[item.c]], "React Basics", null, "r" + i, "react"));
  const modules = REACT_MODULE_CARDS.map(([deck, q, a], i) =>
    newCard(q, a, "React · " + deck, null, "rm" + i, "react"));
  const prof = REACT_PROF_CARDS.map(([deck, q, a], i) =>
    newCard(q, a, "React · " + deck, null, "rp" + i, "react"));
  return [...basics, ...modules, ...prof];
}

function seedAll() { return [...seedCards(), ...seedReactCards()]; }

function freshData() {
  return { v: 2, subject: "german", cards: seedAll(),
    settings: { newPerDay: 20 }, daily: { day: todayStr(), newDone: 0 }, streak: { count: 0, lastDay: null }, session: null };
}

// Upgrade older saved data: tag legacy cards german, and merge in any new React seed cards by id.
function migrate(d) {
  if (!d) return freshData();
  let cards = d.cards.map((c) => c.subject ? c : { ...c, subject: "german" });
  const have = new Set(cards.map((c) => c.id));
  const missing = seedReactCards().filter((rc) => !have.has(rc.id));
  if (missing.length) cards = [...cards, ...missing];
  return { ...d, v: 2, subject: d.subject || "german", cards, streak: d.streak || { count: 0, lastDay: null }, session: d.session || null };
}

// Build a randomized React quiz in Exam format (options shuffled each round)
function makeReactQuiz(n = 15) {
  return shuffle(REACT_QUIZ).slice(0, n).map((item) => {
    const answer = item.o[LETTER_IDX[item.c]];
    return { section: "React", prompt: item.q, options: shuffle(item.o), answer };
  });
}

/* ─── Subject registry ─── */
const SUBJECTS = {
  german: { id: "german", label: "German A1", sub: "Deutsch lernen", icon: Languages, accent: "teal" },
  react:  { id: "react",  label: "React",     sub: "Frontend basics", icon: Atom,     accent: "sky"  },
};
const SUBJECT_LIST = Object.values(SUBJECTS);

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

/* ═══════════════════════════ AI EXPLAIN ═══════════════════════════ */

// Reusable "Explain with AI" affordance. `run` is an async fn returning text.
function AIExplain({ run, label = "Explain with AI" }) {
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");

  if (text) {
    return (
      <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-xs text-sky-900 whitespace-pre-wrap leading-relaxed">
        <div className="flex items-center gap-1.5 font-semibold text-sky-700 mb-1"><Sparkles size={12} /> AI explanation</div>
        {text}
      </div>
    );
  }
  return (
    <div>
      <button disabled={loading}
        onClick={async () => {
          setErr(""); setLoading(true);
          try { setText(await run()); } catch (e) { setErr(e?.message || "request failed"); }
          setLoading(false);
        }}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-800 transition-colors py-1 disabled:opacity-50">
        {loading ? <Loader2 size={13} className="animate-spin" /> : <Lightbulb size={13} />}
        {loading ? "Thinking…" : label}
      </button>
      {err && <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-700"><AlertCircle size={12} />{err}</div>}
    </div>
  );
}

/* ═══════════════════════════ EXAM (MCQ) ═══════════════════════════ */

function Exam({ make, sectioned, onReview, subjectLabel = "this subject", timeLimitSec = 0, onAddMissed }) {
  const [questions, setQuestions] = useState(make);
  const [qi, setQi]    = useState(0);
  const [picked, setPk] = useState(null);
  const [history, setH]= useState([]);
  const [showT, setShowT] = useState(false); // translate panel toggle
  const [fresh, setFresh] = useState(false);  // trigger re-generate
  const [timeLeft, setTimeLeft] = useState(timeLimitSec);
  const [added, setAdded] = useState(false);  // missed-to-flashcards done

  const finished = qi >= questions.length;
  const q = finished ? null : questions[qi];
  const answered = picked !== null;

  // countdown timer (timed sprints) — auto-finish when it hits zero
  useEffect(() => {
    if (!timeLimitSec || finished) return;
    if (timeLeft <= 0) { setQi(questions.length); return; }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timeLimitSec, finished, questions.length]);

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
        {timeLimitSec > 0 && timeLeft <= 0 && (
          <p className="mt-2 text-xs text-amber-600">⏱ Time's up — unanswered questions counted as missed.</p>
        )}
        <div className="mt-5 flex flex-wrap gap-2.5 justify-center">
          {missed.length > 0 && (
            <Btn kind="primary" onClick={() => { setQuestions(missed.map((h) => h.q)); setQi(0); setPk(null); setH([]); setShowT(false); setTimeLeft(timeLimitSec); setAdded(false); }}>
              <RotateCcw size={15} /> Retry {missed.length} missed
            </Btn>
          )}
          <Btn kind={missed.length > 0 ? "ghost" : "primary"} onClick={() => { setQuestions(make()); setQi(0); setPk(null); setH([]); setShowT(false); setTimeLeft(timeLimitSec); setAdded(false); }}>
            <RefreshCw size={15} /> New round
          </Btn>
        </div>
        {onAddMissed && missed.length > 0 && (
          <div className="mt-3 flex justify-center">
            <button disabled={added}
              onClick={() => { onAddMissed(missed.map((h) => ({ front: h.q.prompt, back: h.q.answer }))); setAdded(true); }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-800 disabled:text-emerald-600 transition-colors">
              {added ? <><Check size={15} /> Added to flashcards</> : <><Plus size={15} /> Add {missed.length} missed to flashcards</>}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center text-xs text-stone-400 mb-2">
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-500">{q.section}</span>
        <div className="flex items-center gap-2">
          {timeLimitSec > 0 && (
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono font-semibold ${timeLeft <= 30 ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"}`}>
              <Clock size={11} /> {Math.floor(timeLeft / 60)}:{pad2(timeLeft % 60)}
            </span>
          )}
          <span>{qi + 1}/{questions.length}</span>
        </div>
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
          <AIExplain key={"ai" + qi}
            run={() => explainAnswer({ prompt: q.prompt, options: q.options, answer: q.answer, picked }, subjectLabel)} />
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

function SRSSession({ cards, maxNew = 20, cram = false, initialQueue = null, initialDone = 0, onRate, onEnd, onProgress, subjectLabel = "this subject" }) {
  function buildQueue() {
    if (initialQueue) return initialQueue.filter((id) => cards.some((c) => c.id === id));
    if (cram) return shuffle(cards.map((c) => c.id));
    const now = Date.now();
    const due  = cards.filter((c) => c.state !== "new" && c.due <= now);
    const newC = cards.filter((c) => c.state === "new");
    return shuffle(due.map((c) => c.id)).concat(newC.slice(0, maxNew).map((c) => c.id));
  }

  const [queue,   setQueue]   = useState(buildQueue);
  const [flipped, setFlipped] = useState(false);
  const [done,    setDone]    = useState(initialDone);

  // report progress so the session can be saved/resumed
  useEffect(() => { onProgress && onProgress(queue, done, cram); }, [queue, done]);

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
    onRate(card, r, cram);
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
        <p className="text-stone-500 mt-1">{cram ? "cards practiced" : "reviews complete"}</p>
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
        <div className="mt-4 space-y-3">
          <AIExplain key={card.id} label="Explain this card"
            run={() => groqChat(
              [{ role: "user", content:
                `You are a concise ${subjectLabel} tutor. Briefly explain this flashcard in 2-3 sentences so it sticks.\n` +
                `Front: ${card.front}\nBack: ${card.back}` + (card.note ? `\nNote: ${card.note}` : "") +
                "\nPlain text, no markdown headers."
              }],
              { temperature: 0.3, max_tokens: 320 },
            )} />
          <div className="flex gap-2">
            <RatingBtn tone="again" label="Again" sub={fmtInt(prevInt(card, "again"))} onClick={() => rate("again")} />
            <RatingBtn tone="hard"  label="Hard"  sub={fmtInt(prevInt(card, "hard"))}  onClick={() => rate("hard")} />
            <RatingBtn tone="good"  label="Good"  sub={fmtInt(prevInt(card, "good"))}  onClick={() => rate("good")} />
            <RatingBtn tone="easy"  label="Easy"  sub={fmtInt(prevInt(card, "easy"))}  onClick={() => rate("easy")} />
          </div>
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

const GROQ_KEY   = "groq_api_key";
const GROQ_MODEL_KEY = "groq_model";
const GROQ_MODELS = [
  { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B", sub: "smartest · versatile" },
  { id: "llama-3.1-8b-instant",   label: "Llama 3.1 8B",  sub: "fastest · cheap" },
  { id: "openai/gpt-oss-120b",    label: "GPT-OSS 120B",  sub: "strong reasoning" },
  { id: "openai/gpt-oss-20b",     label: "GPT-OSS 20B",   sub: "balanced" },
  { id: "gemma2-9b-it",           label: "Gemma 2 9B",    sub: "lightweight" },
];
const DEFAULT_MODEL = GROQ_MODELS[0].id;

function loadGroqKey() {
  try { return (typeof window !== "undefined" && window.localStorage.getItem(GROQ_KEY)) || ""; }
  catch { return ""; }
}
function saveGroqKey(k) {
  try { if (k) window.localStorage.setItem(GROQ_KEY, k); else window.localStorage.removeItem(GROQ_KEY); }
  catch {}
}
function loadGroqModel() {
  try { return (typeof window !== "undefined" && window.localStorage.getItem(GROQ_MODEL_KEY)) || DEFAULT_MODEL; }
  catch { return DEFAULT_MODEL; }
}
function saveGroqModel(m) { try { window.localStorage.setItem(GROQ_MODEL_KEY, m); } catch {} }

// Low-level Groq chat call. Returns the assistant message text.
async function groqChat(messages, { key, model, json = false, temperature = 0.4, max_tokens = 1024 } = {}) {
  const apiKey = key || loadGroqKey();
  if (!apiKey) throw new Error("Add your Groq API key in Manage → AI settings first.");
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
    body: JSON.stringify({
      model: model || loadGroqModel(),
      temperature, max_tokens,
      ...(json ? { response_format: { type: "json_object" } } : {}),
      messages,
    }),
  });
  if (!res.ok) {
    let msg = "HTTP " + res.status;
    try { const e = await res.json(); if (e?.error?.message) msg = e.error.message; } catch {}
    throw new Error(msg);
  }
  const d = await res.json();
  return (d.choices?.[0]?.message?.content || "").trim();
}

// Tool-calling variant — returns the full assistant message (may contain tool_calls).
async function groqChatRaw(messages, { key, model, tools, temperature = 0.4, max_tokens = 1024 } = {}) {
  const apiKey = key || loadGroqKey();
  if (!apiKey) throw new Error("Add your Groq API key in Manage → AI settings first.");
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
    body: JSON.stringify({
      model: model || loadGroqModel(),
      temperature, max_tokens,
      ...(tools ? { tools, tool_choice: "auto" } : {}),
      messages,
    }),
  });
  if (!res.ok) {
    let msg = "HTTP " + res.status;
    try { const e = await res.json(); if (e?.error?.message) msg = e.error.message; } catch {}
    throw new Error(msg);
  }
  const d = await res.json();
  return d.choices?.[0]?.message || { role: "assistant", content: "" };
}

function stripFences(txt) { return txt.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim(); }

// Notes → flashcards
async function callAI(notes, apiKey) {
  const txt = await groqChat(
    [{ role: "user", content:
      "Turn these study notes into spaced-repetition flashcards.\n" +
      "Return ONLY a JSON object of the form {\"cards\":[{\"front\":\"...\",\"back\":\"...\"}]} — no markdown, no backticks.\n" +
      "One atomic fact per card. Max 20 cards.\n\nNOTES:\n" + notes
    }],
    { key: apiKey, json: true, temperature: 0.3 },
  );
  const parsed = JSON.parse(stripFences(txt));
  const arr = Array.isArray(parsed) ? parsed : (parsed.cards || []);
  return arr.filter((x) => x.front && x.back).map((x) => ({ front: String(x.front), back: String(x.back) }));
}

// Topic/notes → MCQ quiz (for the AI quiz generator). Returns Exam-format questions.
async function callAIQuiz(topic, apiKey, n = 8) {
  const txt = await groqChat(
    [{ role: "user", content:
      "Create a multiple-choice quiz from the topic or notes below.\n" +
      "Return ONLY JSON: {\"questions\":[{\"prompt\":\"...\",\"options\":[\"a\",\"b\",\"c\",\"d\"],\"answer\":\"<exact text of the correct option>\",\"explain\":\"one short sentence\"}]}.\n" +
      "Exactly 4 options each. 'answer' must be identical to one of the options. Max " + n + " questions. No markdown, no backticks.\n\nTOPIC / NOTES:\n" + topic
    }],
    { key: apiKey, json: true, temperature: 0.5, max_tokens: 2048 },
  );
  const parsed = JSON.parse(stripFences(txt));
  const arr = Array.isArray(parsed) ? parsed : (parsed.questions || []);
  return arr
    .filter((x) => x.prompt && Array.isArray(x.options) && x.options.length >= 2 && x.answer)
    .map((x) => ({
      section: "AI Quiz",
      prompt: String(x.prompt),
      options: shuffle(x.options.map(String)),
      answer: String(x.answer),
      explain: x.explain ? String(x.explain) : undefined,
    }))
    .filter((x) => x.options.includes(x.answer));
}

// Explain a single MCQ answer
async function explainAnswer({ prompt, options, answer, picked }, subjectLabel) {
  return groqChat(
    [{ role: "user", content:
      `You are a concise ${subjectLabel} tutor. A student answered a quiz question.\n` +
      `Question: ${prompt}\nOptions: ${options.join(" | ")}\n` +
      `Correct answer: ${answer}\nStudent picked: ${picked}\n` +
      "In 2-3 short sentences, explain why the correct answer is right" +
      (picked && picked !== answer ? " and why the student's choice is wrong." : ".") +
      " Plain text, no markdown headers."
    }],
    { temperature: 0.3, max_tokens: 320 },
  );
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
  const [apiKey,  setApiKey]  = useState(loadGroqKey);

  const parsed = parsePaste(bulk);

  function updateKey(k) { setApiKey(k); saveGroqKey(k.trim()); }

  async function generate() {
    if (!notes.trim()) return;
    if (!apiKey.trim()) { setErr("Add your Groq API key first."); return; }
    setErr(""); setLoading(true); setAiCards([]);
    try {
      const cards = await callAI(notes.trim(), apiKey.trim());
      if (!cards.length) setErr("No cards generated — try different notes.");
      setAiCards(cards);
    }
    catch (e) { setErr("Groq error: " + (e?.message || "request failed")); }
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
          <p className="text-xs text-stone-400 mb-2">Paste any notes — AI generates atomic flashcards via Groq. Review before adding.</p>
          <div className="mb-3">
            <label className="block text-xs text-stone-400 mb-1">
              Groq API key — <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">get one free</a> · stored only in this browser
            </label>
            <input type="password" value={apiKey} onChange={(e) => updateKey(e.target.value)} placeholder="gsk_…" autoComplete="off"
              className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono focus:outline-none focus:border-teal-400" />
          </div>
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

function Browse({ cards, settings, onDelete, onEdit, onSettings, onReset, onResetAll, subjectLabel = "this subject" }) {
  const [q, setQ] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmResetAll, setConfirmResetAll] = useState(false);
  const [apiKey, setApiKey] = useState(loadGroqKey);
  const [model, setModel]   = useState(loadGroqModel);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft]   = useState({ front: "", back: "" });
  const [deck, setDeck]     = useState("__all__");
  const now = Date.now();

  // deck list with counts, sorted by name
  const deckCounts = cards.reduce((m, c) => { m[c.deck] = (m[c.deck] || 0) + 1; return m; }, {});
  const deckNames = Object.keys(deckCounts).sort();
  const deckExists = deck === "__all__" || deckCounts[deck];

  const filtered = cards
    .filter((c) => deck === "__all__" || c.deck === deck)
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

      {/* AI settings */}
      <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 space-y-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700"><Cpu size={14} className="text-sky-500" /> AI settings (Groq)</div>
        <div>
          <label className="block text-xs text-stone-400 mb-1">
            API key — <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">get one free</a> · stored only in this browser
          </label>
          <input type="password" value={apiKey} autoComplete="off" placeholder="gsk_…"
            onChange={(e) => { setApiKey(e.target.value); saveGroqKey(e.target.value.trim()); }}
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono focus:outline-none focus:border-teal-400" />
        </div>
        <div>
          <label className="block text-xs text-stone-400 mb-1">Model</label>
          <div className="relative">
            <select value={model} onChange={(e) => { setModel(e.target.value); saveGroqModel(e.target.value); }}
              className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:border-teal-400">
              {GROQ_MODELS.map((m) => <option key={m.id} value={m.id}>{m.label} — {m.sub}</option>)}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cards…"
            className="w-full rounded-xl border border-stone-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
        </div>
        {deckNames.length > 1 && (
          <div className="relative shrink-0 max-w-[45%]">
            <select value={deckExists ? deck : "__all__"} onChange={(e) => setDeck(e.target.value)}
              className="h-full w-full appearance-none rounded-xl border border-stone-200 bg-white pl-3 pr-7 py-2 text-sm text-stone-600 focus:outline-none focus:border-teal-400">
              <option value="__all__">All decks ({cards.length})</option>
              {deckNames.map((d) => <option key={d} value={d}>{d} ({deckCounts[d]})</option>)}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
        )}
      </div>

      <div className="text-xs text-stone-400">
        {deck === "__all__" ? `${cards.length} cards total` : `${filtered.length} in "${deck}" · ${cards.length} total`}
      </div>

      <div className="space-y-1.5 max-h-80 overflow-auto pr-1">
        {filtered.map((c) => {
          const badge =
            c.state === "new"   ? ["new",  "text-teal-500"] :
            c.due <= now        ? ["due",  "text-orange-500"] :
                                  [relTime(c.due), "text-stone-400"];
          const editing = editingId === c.id;
          return (
            <div key={c.id} className="rounded-xl border border-stone-200 bg-white px-3 py-2">
              {editing ? (
                <div className="space-y-2">
                  <input value={draft.front} onChange={(e) => setDraft((d) => ({ ...d, front: e.target.value }))} placeholder="Front"
                    className="w-full rounded-lg border border-stone-200 px-2 py-1 text-sm focus:outline-none focus:border-teal-400" />
                  <input value={draft.back} onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))} placeholder="Back"
                    className="w-full rounded-lg border border-stone-200 px-2 py-1 text-sm focus:outline-none focus:border-teal-400" />
                  <div className="flex gap-2 justify-end">
                    <Btn onClick={() => setEditingId(null)}>Cancel</Btn>
                    <Btn kind="primary" disabled={!draft.front.trim() || !draft.back.trim()}
                      onClick={() => { onEdit(c.id, { front: draft.front.trim(), back: draft.back.trim() }); setEditingId(null); }}>
                      <Check size={14} /> Save
                    </Btn>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-stone-800 truncate">{c.front}</div>
                    <div className="text-xs text-stone-400 truncate">{c.back} · <span className="text-stone-300">{c.deck}</span></div>
                  </div>
                  <span className={`text-[11px] shrink-0 ${badge[1]}`}>{badge[0]}</span>
                  <button onClick={() => { setEditingId(c.id); setDraft({ front: c.front, back: c.back }); }} className="text-stone-300 hover:text-teal-500 shrink-0"><Pencil size={13}/></button>
                  <button onClick={() => onDelete(c.id)} className="text-stone-300 hover:text-rose-500 shrink-0"><Trash2 size={14}/></button>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <div className="text-center text-sm text-stone-400 py-4">No cards match.</div>}
      </div>

      <div className="pt-2 border-t border-stone-200">
        {confirmReset ? (
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-stone-500 flex-1">Reset all {subjectLabel} progress to new?</span>
            <Btn kind="danger" onClick={() => { onReset(); setConfirmReset(false); }}>Reset</Btn>
            <Btn onClick={() => setConfirmReset(false)}>Cancel</Btn>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-rose-500">
            <RotateCcw size={13} /> Reset {subjectLabel} progress
          </button>
        )}
      </div>

      <div className="pt-2 border-t border-stone-200">
        {confirmResetAll ? (
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-stone-500 flex-1">Delete all cards and restore the default deck? This erases everything.</span>
            <Btn kind="danger" onClick={() => { onResetAll(); setConfirmResetAll(false); }}>Erase</Btn>
            <Btn onClick={() => setConfirmResetAll(false)}>Cancel</Btn>
          </div>
        ) : (
          <button onClick={() => setConfirmResetAll(true)}
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-rose-500">
            <Trash2 size={13} /> Reset app (delete all cards)
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════ AI QUIZ MAKER ═══════════════════════════ */

function AIQuizMaker({ subjectLabel = "this subject", onAddMissed }) {
  const [topic, setTopic]   = useState("");
  const [n, setN]           = useState(8);
  const [loading, setLoading] = useState(false);
  const [err, setErr]       = useState("");
  const [questions, setQuestions] = useState(null);

  async function gen() {
    if (!topic.trim() || loading) return;
    setErr(""); setLoading(true);
    try {
      const qs = await callAIQuiz(topic.trim(), undefined, n);
      if (!qs.length) setErr("No questions generated — try a clearer topic.");
      else setQuestions(qs);
    } catch (e) { setErr("Groq error: " + (e?.message || "request failed")); }
    setLoading(false);
  }

  if (questions) {
    return (
      <div className="space-y-3">
        <button onClick={() => setQuestions(null)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800">
          <ArrowLeft size={15} /> New quiz
        </button>
        <Exam make={() => questions} subjectLabel={subjectLabel} onAddMissed={onAddMissed} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-stone-400">Enter a topic or paste notes — Groq writes a fresh multiple-choice quiz on {subjectLabel}.</p>
      <textarea value={topic} onChange={(e) => setTopic(e.target.value)} rows={5} maxLength={4000}
        placeholder={subjectLabel === "React" ? "e.g. React hooks: useState, useEffect, custom hooks" : "e.g. German articles and plural forms"}
        className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-stone-600">
          Questions
          <div className="inline-flex items-center gap-2">
            <button onClick={() => setN((v) => Math.max(4, v - 2))} className="w-7 h-7 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600">–</button>
            <span className="w-6 text-center font-semibold text-stone-800">{n}</span>
            <button onClick={() => setN((v) => Math.min(15, v + 2))} className="w-7 h-7 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600">+</button>
          </div>
        </label>
        <Btn kind="primary" disabled={!topic.trim() || loading} onClick={gen}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
          {loading ? "Generating…" : "Generate quiz"}
        </Btn>
      </div>
      {err && <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><AlertCircle size={13} />{err}</div>}
    </div>
  );
}

/* ═══════════════════════════ TIMED SPRINT ═══════════════════════════ */

const SECS_PER_Q = 35; // assumed pace for sizing a timed quiz

function sprintCount(min) { return Math.max(5, Math.min(25, Math.round((min * 60) / SECS_PER_Q))); }

function TimedQuiz({ subject, subjectLabel = "this subject", onAddMissed }) {
  const [phase, setPhase]     = useState("setup"); // setup | loading | run
  const [minutes, setMinutes] = useState(10);
  const [built, setBuilt]     = useState(null);    // { questions, timeLimitSec }
  const [note, setNote]       = useState("");

  async function build() {
    setPhase("loading");
    const n = sprintCount(minutes);
    let questions = [], msg = "";
    if (loadGroqKey()) {
      try {
        const topic =
          `Build the highest-yield ${subjectLabel} practice quiz that lets a learner master the essentials in ${minutes} minutes. ` +
          `Prioritize the most important, commonly-tested core concepts, mixing easier recall with a few harder application questions. Exactly ${n} questions.`;
        questions = await callAIQuiz(topic, undefined, n);
        if (questions.length) msg = `AI-curated ${questions.length} high-yield questions for your ${minutes}-minute window.`;
      } catch (e) { msg = "AI unavailable (" + (e?.message || "error") + ") — using the built-in bank."; }
    }
    if (!questions.length) {
      questions = subject === "react" ? makeReactQuiz(n) : buildTest().slice(0, n);
      if (!msg) msg = loadGroqKey()
        ? "Using the built-in question bank."
        : "Built-in question bank. Add a Groq key in Manage → AI settings for AI-curated sprints.";
    }
    setNote(msg);
    setBuilt({ questions: questions.slice(0, n), timeLimitSec: minutes * 60 });
    setPhase("run");
  }

  if (phase === "run" && built) {
    return (
      <div className="space-y-3">
        <button onClick={() => { setPhase("setup"); setBuilt(null); }} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800">
          <ArrowLeft size={15} /> New sprint
        </button>
        {note && <div className="flex items-start gap-1.5 text-xs text-stone-400"><Sparkles size={12} className="mt-0.5 shrink-0 text-sky-400" />{note}</div>}
        <Exam make={() => built.questions} timeLimitSec={built.timeLimitSec} subjectLabel={subjectLabel} onAddMissed={onAddMissed} />
      </div>
    );
  }

  const opts = [5, 10, 15, 20, 30];
  return (
    <div className="space-y-4">
      <p className="text-xs text-stone-400">
        Tell us how long you've got — we build the best {subjectLabel} quiz to fit, sized so you can finish in time, with a live countdown.
      </p>
      <div>
        <div className="text-sm text-stone-600 mb-2">Time budget</div>
        <div className="grid grid-cols-5 gap-2">
          {opts.map((m) => (
            <button key={m} onClick={() => setMinutes(m)} disabled={phase === "loading"}
              className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-colors ${minutes === m ? "bg-teal-600 text-white border-teal-600" : "bg-white border-stone-200 text-stone-600 hover:border-teal-300"}`}>
              {m}m
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-stone-50 border border-stone-200 px-3 py-2 text-xs text-stone-500">
        ≈ {sprintCount(minutes)} questions · {minutes}:00 on the clock · auto-submits when time runs out
      </div>
      <Btn kind="primary" className="w-full" disabled={phase === "loading"} onClick={build}>
        {phase === "loading" ? <Loader2 size={14} className="animate-spin" /> : <Clock size={14} />}
        {phase === "loading" ? "Building your sprint…" : `Start ${minutes}-minute sprint`}
      </Btn>
    </div>
  );
}

/* ═══════════════════════════ AI TUTOR (agentic) ═══════════════════════════ */

function tutorKey(label) { return "tutor_chat_" + label; }
function loadTutor(label) {
  try { return JSON.parse(window.localStorage.getItem(tutorKey(label)) || "[]"); } catch { return []; }
}
function saveTutor(label, msgs) {
  try { window.localStorage.setItem(tutorKey(label), JSON.stringify(msgs.slice(-50))); } catch {}
}

// Tools the agent can call to act inside the app.
const AGENT_TOOLS = [
  { type: "function", function: { name: "get_stats", description: "Get current study stats for the active subject (due count, new available, total cards, streak).", parameters: { type: "object", properties: {} } } },
  { type: "function", function: { name: "list_cards", description: "List/search the user's flashcards for the active subject. Returns ids you can use to edit or delete.", parameters: { type: "object", properties: { query: { type: "string", description: "optional text filter" }, limit: { type: "number", description: "max results, default 20" } } } } },
  { type: "function", function: { name: "add_flashcards", description: "Create new flashcards for the active subject.", parameters: { type: "object", properties: { cards: { type: "array", items: { type: "object", properties: { front: { type: "string" }, back: { type: "string" } }, required: ["front", "back"] } }, deck: { type: "string", description: "optional deck name" } }, required: ["cards"] } } },
  { type: "function", function: { name: "edit_card", description: "Edit a flashcard's front and/or back by id (get the id from list_cards).", parameters: { type: "object", properties: { id: { type: "string" }, front: { type: "string" }, back: { type: "string" } }, required: ["id"] } } },
  { type: "function", function: { name: "delete_card", description: "Delete a flashcard by id.", parameters: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } } },
  { type: "function", function: { name: "set_new_per_day", description: "Set how many new cards are introduced per day.", parameters: { type: "object", properties: { count: { type: "number" } }, required: ["count"] } } },
  { type: "function", function: { name: "switch_subject", description: "Switch the active subject.", parameters: { type: "object", properties: { subject: { type: "string", enum: ["german", "react"] } }, required: ["subject"] } } },
  { type: "function", function: { name: "start_study", description: "Start a study session. mode 'due' studies scheduled cards; mode 'cram' practices all cards (great before a test).", parameters: { type: "object", properties: { mode: { type: "string", enum: ["due", "cram"] } }, required: ["mode"] } } },
  { type: "function", function: { name: "create_quiz", description: "Generate and open a multiple-choice quiz on a topic for the active subject.", parameters: { type: "object", properties: { topic: { type: "string" }, count: { type: "number", description: "number of questions, default 8" } }, required: ["topic"] } } },
  { type: "function", function: { name: "reset_progress", description: "Reset all spaced-repetition progress for the active subject (cards become new again). Use only when the user clearly asks.", parameters: { type: "object", properties: {} } } },
];

function Tutor({ subjectLabel = "this subject", actions }) {
  const [msgs, setMsgs]       = useState(() => loadTutor(subjectLabel));
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { saveTutor(subjectLabel, msgs); }, [msgs, subjectLabel]);

  const suggestions = subjectLabel === "React"
    ? ["Add 5 flashcards about useEffect", "Make me a quiz on React hooks", "Start a cram session before my test"]
    : ["Add 5 flashcards for ordering food", "Quiz me on German articles", "Start studying my due cards"];

  // Execute a tool call against the app; returns a JSON-serializable result.
  // Navigation tools defer via setNav so the chat reply renders before we leave the tab.
  async function execTool(name, args, setNav) {
    const a = actions || {};
    switch (name) {
      case "get_stats":      return a.getStats ? a.getStats() : { error: "unavailable" };
      case "list_cards":     return a.listCards ? a.listCards(args) : { error: "unavailable" };
      case "add_flashcards": return a.addFlashcards ? a.addFlashcards(args) : { error: "unavailable" };
      case "edit_card":      return a.editCard ? a.editCard(args) : { error: "unavailable" };
      case "delete_card":    return a.deleteCard ? a.deleteCard(args) : { error: "unavailable" };
      case "set_new_per_day":return a.setNewPerDay ? a.setNewPerDay(args) : { error: "unavailable" };
      case "reset_progress": return a.resetProgress ? a.resetProgress() : { error: "unavailable" };
      case "switch_subject": setNav(() => a.switchSubject && a.switchSubject(args.subject)); return { ok: true, note: "switching after reply" };
      case "start_study":    setNav(() => a.startStudy && a.startStudy(args.mode)); return { ok: true, note: "starting session after reply" };
      case "create_quiz": {
        const qs = await callAIQuiz(args.topic, undefined, args.count || 8);
        if (!qs.length) return { error: "could not generate a quiz on that topic" };
        setNav(() => a.playQuiz && a.playQuiz(qs));
        return { ok: true, generated: qs.length, note: "opening quiz after reply" };
      }
      default: return { error: "unknown tool" };
    }
  }

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const visible = [...msgs, { role: "user", content: q }];
    setMsgs(visible); setInput(""); setErr(""); setLoading(true);
    let pendingNav = null;
    try {
      const sys = { role: "system", content:
        `You are an agentic in-app assistant for a spaced-repetition study app. The active subject is ${subjectLabel}. ` +
        "You can both answer study questions AND take actions using the provided tools. " +
        "When the user asks you to do something — add/edit/delete cards, start studying or cramming, make a quiz, switch subject, change settings — DO IT with the right tool instead of telling them how. " +
        "Use list_cards to get ids before editing or deleting. When writing flashcards, make clear atomic front/back pairs. " +
        "After acting, confirm what you did in one short sentence. For pure study questions, just answer clearly and concisely." };
      const work = [sys, ...visible];
      for (let step = 0; step < 6; step++) {
        const msg = await groqChatRaw(work, { tools: AGENT_TOOLS, temperature: 0.4, max_tokens: 1200 });
        work.push(msg);
        if (msg.tool_calls && msg.tool_calls.length) {
          for (const call of msg.tool_calls) {
            let parsed = {};
            try { parsed = JSON.parse(call.function.arguments || "{}"); } catch {}
            let result;
            try { result = await execTool(call.function.name, parsed, (fn) => { pendingNav = fn; }); }
            catch (e) { result = { error: e?.message || "tool failed" }; }
            work.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
          }
          continue; // let the model react to tool results
        }
        if (msg.content) setMsgs((m) => [...m, { role: "assistant", content: msg.content }]);
        break;
      }
    } catch (e) { setErr(e?.message || "request failed"); }
    setLoading(false);
    if (pendingNav) setTimeout(pendingNav, 60); // navigate after the reply renders & saves
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white flex flex-col" style={{ height: "60vh" }}>
      {msgs.length > 0 && (
        <div className="flex items-center justify-between border-b border-stone-200 px-3 py-1.5">
          <span className="text-xs text-stone-400">{msgs.length} message{msgs.length !== 1 ? "s" : ""} · saved</span>
          <button onClick={() => setMsgs([])}
            className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-rose-500 transition-colors">
            <Trash2 size={12} /> Clear
          </button>
        </div>
      )}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {msgs.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <MessageCircle size={26} className="text-stone-300 mb-2" />
            <p className="text-sm text-stone-400 mb-3">Ask your {subjectLabel} tutor anything.</p>
            <div className="space-y-1.5 w-full">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="w-full text-left text-xs rounded-lg border border-stone-200 px-3 py-2 text-stone-600 hover:border-teal-300 hover:bg-stone-50">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
              m.role === "user" ? "bg-teal-600 text-white" : "bg-stone-100 text-stone-800 border border-stone-200"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-stone-100 border border-stone-200 px-3.5 py-2 text-sm text-stone-400 inline-flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> thinking…
            </div>
          </div>
        )}
        {err && <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><AlertCircle size={13} />{err}</div>}
        <div ref={endRef} />
      </div>
      <div className="border-t border-stone-200 p-2.5 flex items-end gap-2">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={1}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Type a question…"
          className="flex-1 resize-none rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400 max-h-28" />
        <button onClick={() => send()} disabled={!input.trim() || loading}
          className="shrink-0 w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 disabled:opacity-40 transition-colors">
          <Send size={16} />
        </button>
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
  const [agentQuiz, setAgentQuiz] = useState(null);    // questions the agent generated to play
  const [session,  setSession]  = useState(null);      // null | { cram, resume } when active
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
      let d = migrate(await loadData());
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
    const subj = (data && data.subject) || "german";
    const created = list.map((c) => newCard(c.front, c.back, deck, null, undefined, subj));
    commit((d) => ({ ...d, cards: [...d.cards, ...created] }));
    showFlash("Added " + created.length + " card(s) to '" + deck + "'" );
  }

  // global Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (session) { setSession(null); }
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

  const { settings } = data;
  const subject = data.subject || "german";
  const subjMeta = SUBJECTS[subject] || SUBJECTS.german;
  const cards = data.cards.filter((c) => (c.subject || "german") === subject);
  const now = Date.now();
  const reviewDue = cards.filter((c) => c.state !== "new" && c.due <= now).length;
  const newAvail  = Math.min(
    Math.max(0, settings.newPerDay - data.daily.newDone),
    cards.filter((c) => c.state === "new").length
  );
  const dueTotal   = reviewDue + newAvail;
  const upcoming   = cards.filter((c) => c.due > now).sort((a, b) => a.due - b.due)[0];
  const inSession  = session || subview;  // hide bottom nav

  // daily streak (global across subjects) — alive only if studied today or yesterday
  const rawStreak   = data.streak || { count: 0, lastDay: null };
  const streakAlive = rawStreak.lastDay === todayStr() || rawStreak.lastDay === yesterdayStr();
  const streakCount = streakAlive ? rawStreak.count : 0;
  const studiedToday = rawStreak.lastDay === todayStr();

  function setSubject(s) {
    commit((d) => ({ ...d, subject: s }));
    setTab("study"); setSubview(null); setSession(null);
  }

  // Actions exposed to the agentic Tutor.
  const agentActions = {
    getStats: () => ({ subject: subjMeta.label, due: reviewDue, newAvailable: newAvail, total: cards.length, streak: streakCount }),
    listCards: ({ query, limit = 20 } = {}) => cards
      .filter((c) => !query || (c.front + c.back + c.deck).toLowerCase().includes(String(query).toLowerCase()))
      .slice(0, Math.min(50, limit))
      .map((c) => ({ id: c.id, front: c.front, back: c.back, deck: c.deck, state: c.state })),
    addFlashcards: ({ cards: list = [], deck } = {}) => {
      const clean = list.filter((c) => c && c.front && c.back).map((c) => ({ front: String(c.front), back: String(c.back) }));
      if (!clean.length) return { error: "no valid cards" };
      addCards(clean, deck || "AI Added");
      return { added: clean.length, deck: deck || "AI Added" };
    },
    editCard: ({ id, front, back } = {}) => {
      if (!data.cards.some((c) => c.id === id)) return { error: "card id not found" };
      commit((d) => ({ ...d, cards: d.cards.map((c) => c.id === id ? { ...c, ...(front != null ? { front: String(front) } : {}), ...(back != null ? { back: String(back) } : {}) } : c) }));
      return { ok: true };
    },
    deleteCard: ({ id } = {}) => {
      if (!data.cards.some((c) => c.id === id)) return { error: "card id not found" };
      commit((d) => ({ ...d, cards: d.cards.filter((c) => c.id !== id) }));
      return { ok: true };
    },
    setNewPerDay: ({ count } = {}) => {
      const n = Math.max(1, Math.round(count || 0));
      commit((d) => ({ ...d, settings: { ...d.settings, newPerDay: n } }));
      return { ok: true, newPerDay: n };
    },
    resetProgress: () => {
      commit((d) => ({ ...d, cards: d.cards.map((c) => (c.subject || "german") === subject
        ? { ...c, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, state: "new" } : c), daily: { day: todayStr(), newDone: 0 } }));
      return { ok: true };
    },
    switchSubject: (s) => { if (SUBJECTS[s]) setSubject(s); },
    startStudy: (mode) => { commit((d) => ({ ...d, session: null })); setSession({ cram: mode === "cram" }); },
    playQuiz: (questions) => { setAgentQuiz(questions); setSubview("agentquiz"); },
  };

  // ── SRS session ──
  const toggleDark = () => {
    const nd = !dark;
    setDark(nd);
    commit((d) => ({ ...d, settings: { ...d.settings, dark: nd } }));
  };

  const savedSession = data.session && data.session.subject === subject ? data.session : null;

  if (session) {
    const resuming = session.resume && savedSession;
    return (
      <>
        <DarkToggle dark={dark} onToggle={toggleDark} />
        <div className="min-h-screen bg-stone-100">
          <div className="mx-auto max-w-xl px-4 py-6">
            <button onClick={() => setSession(null)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 mb-5">
              <ArrowLeft size={17} /> Save &amp; exit
            </button>
          <SRSSession
            cards={cards}
            maxNew={newAvail}
            cram={session.cram}
            initialQueue={resuming ? savedSession.queue : null}
            initialDone={resuming ? (savedSession.done || 0) : 0}
            subjectLabel={subjMeta.label}
            onRate={(card, rating, isCram) => {
              commit((d) => {
                const base = { ...d, streak: bumpStreak(d.streak) };
                if (isCram) return base; // scheduling-neutral practice
                const updated = schedule(card, rating);
                const wasNew  = card.state === "new";
                return {
                  ...base,
                  cards: d.cards.map((c) => c.id === updated.id ? updated : c),
                  daily: wasNew ? { ...d.daily, newDone: d.daily.newDone + 1 } : d.daily,
                };
              });
            }}
            onProgress={(queue, done, cram) => {
              commit((d) => ({ ...d, session: queue.length ? { subject, cram, queue, done } : null }));
            }}
            onEnd={() => setSession(null)}
          />
          </div>
        </div>
      </>
    );
  }

  // ── Sub-views (practice / deck drills) ──
  if (subview) {
    let title = "", content = null;
    const addMissed = (cardList) => addCards(cardList, "Review");

    if (subview === "truefalse") { title = "True / False"; content = <Exam make={() => buildN(genTF, 12)} subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "numbers")   { title = "Numbers"; content = <NumTrainer />; }
    else if (subview === "reading")   { title = "Reading"; content = <Exam make={() => buildN(genReading, 8)} subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "en2de")     { title = "EN → DE"; content = <Exam make={() => buildN(genEN2DE, 12)} subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "countries") { title = "Languages"; content = <Exam make={() => buildN(genCountry, 12)} subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "time")      { title = "Time";     content = <Exam make={() => buildN(genTime, 10)} subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "reactquiz") { title = "React Quiz"; content = <Exam make={() => makeReactQuiz(15)} subjectLabel="React" onAddMissed={addMissed} />; }
    else if (subview === "aiquiz")    { title = "AI Quiz Generator"; content = <AIQuizMaker subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "timed")     { title = "Timed Sprint"; content = <TimedQuiz subject={subject} subjectLabel={subjMeta.label} onAddMissed={addMissed} />; }
    else if (subview === "agentquiz") { title = "AI Quiz"; content = agentQuiz && agentQuiz.length
      ? <Exam make={() => agentQuiz} subjectLabel={subjMeta.label} onAddMissed={addMissed} />
      : <div className="text-sm text-stone-400">No quiz to show.</div>; }
    else if (subview.startsWith("test:")) {
      const n = subview.split(":")[1];
      title = "Mock Test " + n;
      content = <Exam make={buildTest} sectioned subjectLabel={subjMeta.label} onAddMissed={addMissed} />;
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

        {/* subject switcher */}
        <div className="mb-5 inline-flex rounded-2xl border border-stone-200 bg-white p-1">
          {SUBJECT_LIST.map((s) => {
            const Icon = s.icon;
            const active = subject === s.id;
            return (
              <button key={s.id} onClick={() => setSubject(s.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${active ? "bg-teal-600 text-white shadow-sm" : "text-stone-500 hover:text-stone-800"}`}>
                <Icon size={15} /> {s.label}
              </button>
            );
          })}
        </div>

        {/* flash */}
        {flash && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
            <Check size={14} /> {flash}
          </div>
        )}

        {/* ─── STUDY TAB ─── */}
        {tab === "study" && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="font-serif italic text-teal-700">Spaced</span> Repetition
                </h1>
                <p className="text-sm text-stone-400 mt-0.5">Only what's due, only when it matters.</p>
              </div>
              {streakCount > 0 && (
                <div className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold ${studiedToday ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-stone-50 border-stone-200 text-stone-500"}`}
                  title={studiedToday ? "Studied today — streak secured" : "Study today to keep your streak alive"}>
                  <span>🔥</span> {streakCount} day{streakCount !== 1 ? "s" : ""}
                </div>
              )}
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

              {savedSession && (
                <button onClick={() => setSession({ cram: savedSession.cram, resume: true })}
                  className="w-full mb-2 rounded-xl bg-violet-600 text-white py-3 text-base font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                  <RotateCcw size={18} /> Resume {savedSession.cram ? "practice" : "session"} · {savedSession.queue.length} left
                </button>
              )}

              {dueTotal > 0 ? (
                <button onClick={() => { commit((d) => ({ ...d, session: null })); setSession({ cram: false }); }}
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

              {cards.length > 0 && (
                <button onClick={() => { commit((d) => ({ ...d, session: null })); setSession({ cram: true }); }}
                  className="w-full mt-2 rounded-xl border border-teal-300 text-teal-700 py-2.5 text-sm font-semibold hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
                  title="Practice all cards now, ignoring the schedule — great before a test">
                  <Layers size={17} /> Study more · cram all {cards.length}
                </button>
              )}
            </div>

            {/* SRS hint */}
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-500 space-y-1 leading-relaxed">
              <div><span className="font-semibold text-stone-700">Again</span> → now · <span className="font-semibold text-stone-700">Hard</span> → 10 min · <span className="font-semibold text-stone-700">Good</span> → 1 hour · <span className="font-semibold text-stone-700">Easy</span> → 1 day</div>
              <div>Cards come back after the time you pick — quick, fixed steps for fast review.</div>
            </div>

            {!persistent && (
              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                <AlertCircle size={13} /> Session only — storage unavailable in this environment
              </div>
            )}
          </div>
        )}

        {/* ─── PRACTICE TAB ─── */}
        {tab === "practice" && subject === "react" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="font-serif italic text-teal-700">Practice</span> · React
            </h1>
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Quizzes</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Tile label="React Quiz" sub={`${REACT_QUIZ.length} MCQs · shuffled`} icon={ListChecks} onClick={() => setSubview("reactquiz")} />
                <Tile label="Timed Sprint" sub="best quiz in your time" icon={Clock} onClick={() => setSubview("timed")} />
                <Tile label="AI Quiz" sub="generate from a topic" icon={Wand2} onClick={() => setSubview("aiquiz")} />
              </div>
            </div>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-500 leading-relaxed">
              After answering any question, tap <span className="font-semibold text-stone-700">Explain with AI</span> for a Groq-powered breakdown. Set your key in Manage → AI settings.
            </div>
          </div>
        )}

        {tab === "practice" && subject === "german" && (
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
                <Tile label="Timed Sprint" sub="best quiz in your time" icon={Clock} onClick={() => setSubview("timed")} />
                <Tile label="AI Quiz" sub="generate from a topic" icon={Wand2} onClick={() => setSubview("aiquiz")} />
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
                onEdit={(id, fields) => commit((d) => ({ ...d, cards: d.cards.map((c) => c.id === id ? { ...c, ...fields } : c) }))}
                onSettings={(v) => commit((d) => ({ ...d, settings: { ...d.settings, newPerDay: v } }))}
                onReset={() => commit((d) => ({
                  ...d,
                  cards: d.cards.map((c) => (c.subject || "german") === subject
                    ? { ...c, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, state: "new" } : c),
                  daily: { day: todayStr(), newDone: 0 },
                }))}
                onResetAll={async () => {
                  await clearData();
                  commit(() => ({ ...freshData(), subject }));
                }}
                subjectLabel={subjMeta.label}
              />
            </div>
          </div>
        )}

        {/* ─── TUTOR TAB ─── */}
        {tab === "tutor" && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="font-serif italic text-teal-700">AI</span> Tutor
              </h1>
              <p className="text-sm text-stone-400 mt-0.5">Ask or tell me to do things in {subjMeta.label} — I can add cards, make quizzes, start studying, and more.</p>
            </div>
            <Tutor subjectLabel={subjMeta.label} actions={agentActions} />
          </div>
        )}
      </div>

      {/* ─── BOTTOM NAV ─── */}
      <div className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-sm ${dark ? "border-stone-700 bg-stone-900/95" : "border-stone-200 bg-white/95"}`}>
        <div className="mx-auto max-w-xl flex">
          {[
            { id: "study",    icon: Brain,        label: "Study",    badge: dueTotal > 0 ? dueTotal : null },
            { id: "practice", icon: Target,       label: "Practice", badge: null },
            { id: "tutor",    icon: MessageCircle, label: "Tutor",    badge: null },
            { id: "manage",   icon: Settings,     label: "Manage",   badge: null },
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
