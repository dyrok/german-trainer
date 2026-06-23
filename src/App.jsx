import { useState, useEffect, useRef } from "react";
import {
  Brain, Target, Settings, ArrowLeft, Check, X, Plus, Globe, Trophy,
  ChevronRight, Hash, Calendar, Clock, Users, MessageSquare, Smile,
  GraduationCap, User, CheckSquare, FileText, Languages, ArrowLeftRight,
  RotateCcw, Pencil, ClipboardPaste, Loader2, AlertCircle, BookOpen,
  Shuffle, Sparkles, Search, Trash2, RefreshCw, ListChecks, Layers, Moon, Sun,
  Lightbulb, Send, Cpu, Atom, ChevronDown, Wand2, MessageCircle, Code,
  Download, Upload, Database, HelpCircle, Binary, Play, Pause, SkipForward, BookText, GitBranch,
  Network, LineChart, Calculator,
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

/* ═══════════════════════════ DSA SUBJECT ═══════════════════════════ */
// Professor's MCQ bank (deduplicated). { q, o:[4 options], c: correct letter }
const DSA_QUIZ = [
  { q: "What type of algorithmic strategy does Merge Sort use?", o: ["Divide and Conquer", "Dynamic Programming", "Brute Force", "Greedy Approach"], c: "A" },
  { q: "What is the worst-case time complexity of Bubble Sort?", o: ["O(n)", "O(n^2)", "O(1)", "O(n log n)"], c: "B" },
  { q: "Which sorting algorithm is generally stable and guarantees O(n log n) time complexity in all cases?", o: ["Quick Sort", "Bubble Sort", "Selection Sort", "Merge Sort"], c: "D" },
  { q: "If an In-order traversal of a BST reads [3, 5, 7, 10, 12], what is definitely true about node 3?", o: ["It is at the bottom-right of the layout", "It is the smallest element in the BST", "It is the root of the tree", "It has the most child references"], c: "B" },
  { q: "What happens during a single complete pass of Bubble Sort over an unsorted array?", o: ["The array is split into two equal halves", "The largest remaining element 'bubbles up' to its correct final position at the end", "The smallest element is placed at index 0", "Elements are sorted using a temporary stack"], c: "B" },
  { q: "How does Insertion Sort build the final sorted array?", o: ["By picking a pivot and partitioning around it", "By swapping adjacent elements only", "One item at a time, inserting each element into its proper place", "By splitting the array into halves and merging"], c: "C" },
  { q: "What is the best-case time complexity of Insertion Sort when the input is already sorted?", o: ["O(n)", "O(1)", "O(n log n)", "O(n^2)"], c: "A" },
  { q: "In a full binary tree where every non-leaf node has exactly 2 children, how are leaf nodes distributed?", o: ["They reside at the lowest levels of the hierarchy", "They cannot have siblings", "They are placed adjacent to the root", "They are limited to the left subtree"], c: "A" },
  { q: "What do we call a node in a tree that has no children?", o: ["Internal node", "Leaf node", "Root node", "Sibling node"], c: "B" },
  { q: "In a valid Binary Search Tree, where is the node with the maximum value?", o: ["The shallowest leaf", "The leftmost node", "The root node", "The rightmost node"], c: "D" },
  { q: "In Selection Sort, how many total swaps occur in the worst case for an array of size n?", o: ["O(n)", "O(n^2)", "O(1)", "O(n log n)"], c: "A" },
  { q: "Which sorting algorithm is highly efficient for small datasets or nearly-sorted arrays?", o: ["Insertion Sort", "Merge Sort", "Heap Sort", "Selection Sort"], c: "A" },
  { q: "What is the space complexity of an In-order traversal on a balanced tree of n nodes (recursion stack)?", o: ["O(1)", "O(log n)", "O(n^2)", "O(n)"], c: "B" },
  { q: "Performing an In-order traversal on a valid BST produces output in what order?", o: ["Random order", "Sorted ascending order", "Sorted descending order", "The original insertion order"], c: "B" },
  { q: "A BST contains keys [15, 10, 20, 8, 12]. Where is 12 placed relative to 10?", o: ["As a sibling of 20", "As the right child of 10", "As the left child of 10", "As the parent of 15"], c: "B" },
  { q: "Pre-order, post-order, and in-order traversals are all categories of what generic strategy?", o: ["Divide and conquer", "Breadth First Search (BFS)", "Depth First Search (DFS)", "Binary searching"], c: "C" },
  { q: "What is the main space disadvantage of standard Merge Sort vs Bubble/Insertion Sort?", o: ["It modifies the input directly", "It takes O(n^2) auxiliary space", "It requires O(n) extra auxiliary memory for merging", "It runs out of stack from infinite loops"], c: "C" },
  { q: "What is the maximum number of children a node can have in a Binary Tree?", o: ["2", "Unlimited", "1", "3"], c: "A" },
  { q: "Why do we track 'visited' nodes during a DFS traversal on a general graph?", o: ["To prevent infinite loops caused by cycles", "To sort values automatically", "To compute tree height instantly", "To clear memory after visiting"], c: "A" },
  { q: "What is the definition of the height of a tree?", o: ["The number of direct children of the root", "The maximum value stored in the leaves", "The number of edges on the longest path from root to a leaf", "The total count of all nodes"], c: "C" },
  { q: "In an In-order traversal, when is the current node processed (printed)?", o: ["After fully exploring the left subtree", "Before exploring the left subtree", "After fully exploring the right subtree", "Only when recursion returns to the root"], c: "A" },
  { q: "Which sorting algorithm repeatedly finds the minimum from the unsorted part and puts it at the beginning?", o: ["Merge Sort", "Selection Sort", "Bubble Sort", "Insertion Sort"], c: "B" },
  { q: "Which node serves as the top origin point of a tree hierarchy?", o: ["Leaf node", "Ancestor node", "Parent node", "Root node"], c: "D" },
  { q: "What strategy best describes Depth First Search (DFS)?", o: ["Visits nodes in random order", "Visits leaves before the root", "Goes as deep as possible along each branch before backtracking", "Visits nodes level by level"], c: "C" },
  { q: "Which of these is a common application of Depth First Search (DFS)?", o: ["Caching queues for servers", "Shortest path in an unweighted grid", "Level-order printing of a chart", "Detecting cycles in a graph"], c: "D" },
  { q: "Given a binary tree with root 'A', left child 'B', right child 'C', what is the In-order traversal?", o: ["B → C → A", "A → B → C", "B → A → C", "C → B → A"], c: "C" },
  { q: "What is the correct order of steps in an In-order traversal?", o: ["Traverse left, visit root, traverse right", "Visit root, traverse right, traverse left", "Visit root, traverse left, traverse right", "Traverse left, traverse right, visit root"], c: "A" },
  { q: "Which binary tree traversal does NOT use a Depth First (DFS) approach?", o: ["Post-order", "Pre-order", "In-order", "Level-order"], c: "D" },
  { q: "Which data structure is used to implement Depth First Search (DFS) iteratively?", o: ["Linked List", "Stack", "Queue", "Hash Table"], c: "B" },
  { q: "In a BST, what must be true for every node's left subtree?", o: ["All values are less than the node's value", "It has the same height as the right subtree", "All values are greater than the node's value", "It must be empty"], c: "A" },
  { q: "What is the ideal average-case time complexity for searching a key in a balanced BST?", o: ["O(log n)", "O(n^2)", "O(1)", "O(n)"], c: "A" },
];

// DSA flashcards by module (from the professor's notes + standard DSA). [deck, front, back]
const DSA_MODULE_CARDS = [
  ["Time Complexity", "What is time complexity?", "A measure of how an algorithm's running time grows as the input size n grows, written with Big-O notation (worst case)."],
  ["Time Complexity", "What does Big-O notation describe?", "The upper bound / worst-case growth rate of an algorithm, ignoring constants and lower-order terms (e.g. O(n), O(n^2), O(log n))."],
  ["Time Complexity", "Order these from fastest to slowest growth: O(n²), O(1), O(n log n), O(log n), O(n).", "O(1) < O(log n) < O(n) < O(n log n) < O(n²)."],
  ["Time Complexity", "Why ignore constants in Big-O (e.g. O(2n) → O(n))?", "Big-O describes growth as n → ∞; constant factors don't change the growth rate, so they're dropped."],
  ["Space Complexity", "What is space complexity?", "A measure of the extra (auxiliary) memory an algorithm needs as the input grows, also expressed in Big-O."],
  ["Space Complexity", "What is the space complexity of Merge Sort?", "O(n) — it needs an auxiliary array to merge the halves."],
  ["Space Complexity", "What is auxiliary space vs total space?", "Auxiliary space is the extra memory beyond the input; total space includes the input itself."],
  ["Space Complexity", "Why can recursion add space cost?", "Each recursive call adds a frame to the call stack; depth d uses O(d) stack space (e.g. O(log n) for a balanced tree)."],
  ["Pseudocode", "What is pseudocode and why use it?", "A plain, language-agnostic outline of an algorithm's logic. It lets you think through the approach before writing real code."],
  ["Pseudocode", "Why 'think first' before coding?", "Planning the steps/edge cases in pseudocode avoids bugs and rewrites — you solve the problem on paper, then translate to code."],
  ["Strings", "What is a string in DSA?", "An ordered sequence of characters, typically stored like an array of chars; many problems involve searching, reversing, or comparing substrings."],
  ["Strings", "Why are strings often immutable?", "In many languages (Java, JS, Python) strings can't be changed in place; operations create new strings, which affects time/space cost."],
  ["Arrays", "What is an array?", "A contiguous block of memory storing elements of the same type, accessed by index in O(1) time."],
  ["Arrays", "Why is array access O(1) but insertion O(n)?", "Index access is direct address math; inserting/deleting in the middle requires shifting subsequent elements."],
  ["Sorting", "What is a stable sort?", "A sort that preserves the relative order of elements with equal keys (e.g. Merge Sort is stable; Quick/Selection are not)."],
  ["Sorting", "How does Bubble Sort work?", "Repeatedly steps through the list swapping adjacent out-of-order elements; each pass 'bubbles' the largest remaining value to the end. O(n²)."],
  ["Sorting", "How does Selection Sort work?", "Repeatedly finds the minimum of the unsorted part and places it at the front. O(n²) comparisons, O(n) swaps."],
  ["Sorting", "How does Insertion Sort work?", "Builds the sorted array one element at a time, inserting each into its correct position among the already-sorted prefix. Great for nearly-sorted data."],
  ["Sorting", "How does Merge Sort work?", "Divide and conquer: split the array in half, recursively sort each half, then merge the two sorted halves. O(n log n), stable, O(n) space."],
  ["Linear Search", "How does linear search work and its complexity?", "Check each element one by one until the target is found or the list ends. O(n) time, works on unsorted data."],
  ["Binary Search", "How does binary search work?", "On a SORTED array, repeatedly compare the target to the middle element and discard half each step. O(log n) time."],
  ["Binary Search", "What is the key precondition for binary search?", "The array must be sorted; otherwise the 'discard half' logic is invalid."],
  ["Stack", "What is a stack?", "A LIFO (Last In, First Out) structure. Main ops: push (add to top), pop (remove top), peek (read top) — all O(1)."],
  ["Stack", "Give a use of a stack.", "Function call stack, undo history, expression evaluation, and iterative DFS."],
  ["Queue", "What is a queue?", "A FIFO (First In, First Out) structure. Main ops: enqueue (add to back), dequeue (remove from front) — O(1)."],
  ["Queue", "Give a use of a queue.", "Task scheduling, buffering, and breadth-first search (BFS)."],
  ["Linked List", "What is a linked list?", "A linear structure of nodes where each node holds data and a pointer to the next node. O(1) insert/delete at known positions, O(n) search."],
  ["Linked List", "Linked list vs array — key difference?", "Arrays are contiguous with O(1) indexed access; linked lists are scattered nodes with O(n) access but cheap insertion/deletion."],
  ["Trees", "What is a binary tree?", "A hierarchical structure where each node has at most 2 children (left and right)."],
  ["Trees", "What is a Binary Search Tree (BST)?", "A binary tree where every node's left subtree holds smaller values and right subtree holds larger values, enabling O(log n) search when balanced."],
  ["Trees", "What are the three DFS traversals?", "Pre-order (root, left, right), In-order (left, root, right), and Post-order (left, right, root). In-order on a BST gives sorted output."],
  ["Trees", "What is the height of a tree?", "The number of edges on the longest path from the root to a leaf."],
  ["Trees", "BFS vs DFS on a tree?", "BFS (level-order) visits level by level using a queue; DFS goes deep along a branch before backtracking, using a stack/recursion."],
];

// DSA flashcards distilled from the professor's notes (Medium / GeeksforGeeks). [deck, front, back]
const DSA_PROF_CARDS = [
  ["Time Complexity", "Big-O in one line?", "A 'speed label' for an algorithm — how its performance changes as input size n grows."],
  ["Time Complexity", "What does O(1) mean?", "Constant time — runtime is the same regardless of input size (e.g. returning a single value)."],
  ["Time Complexity", "Why is O(log n) so fast?", "The problem is halved each step — 10,000 elements need only ~14 steps (e.g. binary search)."],
  ["Time Complexity", "When do you get O(n²)?", "Typically with nested loops where both iterations depend on n."],
  ["Time Complexity", "What is O(n log n)?", "Linearithmic — split work into halves and process each level; slower than O(n), far faster than O(n²) (e.g. merge sort)."],
  ["Space Complexity", "Space complexity in plain English?", "How much extra memory your code uses while running — measured in Big-O, like time."],
  ["Space Complexity", "What does O(1) space mean?", "A fixed amount of extra memory regardless of input size."],
  ["Space Complexity", "What does O(n) space mean?", "Extra memory grows proportionally with input size (e.g. storing n elements)."],
  ["Pseudocode", "Why do beginners get stuck jumping into code?", "Usually a planning gap, not a syntax gap — they have no plan for the next step."],
  ["Pseudocode", "Two rules for good pseudocode?", "One clear step per line; use indentation and action verbs for readability."],
  ["Pseudocode", "Two 'boring but powerful' planning tools?", "Pseudocode and flowcharts — both structure your thinking before real code."],
  ["Strings", "How is a C-style string stored?", "A sequence of characters in consecutive memory cells, ending with a null terminator '\\0'."],
  ["Strings", "Time complexity of common string operations?", "Index access and length are O(1); searching is O(n·m); concatenation is O(n)."],
  ["Strings", "Why prefer std::string over char arrays (C++)?", "It manages memory automatically and has built-in methods — safer than manual char arrays."],
  ["Linear Search", "Space complexity of linear search?", "O(1) — only a couple of extra variables (a counter and the target)."],
  ["Linear Search", "When is linear search the right choice?", "Small or unsorted data where sorting first isn't worth it; works on any collection."],
  ["Binary Search", "Time complexity of binary search?", "O(log n) average/worst, O(1) best — it halves the search space each step."],
  ["Binary Search", "Iterative vs recursive binary search — space cost?", "Iterative uses O(1) space; recursive uses O(log n) for the call stack."],
  ["Binary Search", "A real-world use of binary search?", "Database B-tree indexing, and 'git bisect' to find a faulty commit."],
  ["Linked List", "What two parts make up a linked-list node?", "Data and a link (pointer) to the next node; the first node is the head."],
  ["Linked List", "Three main types of linked list?", "Singly (forward only), doubly (both directions), and circular (last links back to the first)."],
  ["Linked List", "Why are linked lists good at insertion/deletion?", "Nodes aren't contiguous, so you just relink pointers — no shifting elements like an array needs."],
];

// Glossary: term → definition. Terms appearing in card text get linked to these.
const GLOSSARY = [
  ["Big-O", "Notation for the worst-case growth rate of an algorithm's time or space as input size n grows, ignoring constants."],
  ["Time complexity", "How an algorithm's running time scales with input size n, expressed in Big-O."],
  ["Space complexity", "How much extra (auxiliary) memory an algorithm needs as input size grows."],
  ["Divide and Conquer", "A strategy that splits a problem into smaller subproblems, solves them recursively, and combines the results (e.g. Merge Sort)."],
  ["Stable sort", "A sort that keeps the relative order of equal-keyed elements unchanged."],
  ["Pivot", "An element chosen in Quick Sort to partition the array into smaller and larger parts."],
  ["Array", "A contiguous, index-addressable collection of same-type elements with O(1) access."],
  ["Stack", "A LIFO (Last In, First Out) structure with push/pop/peek operations."],
  ["Queue", "A FIFO (First In, First Out) structure with enqueue/dequeue operations."],
  ["Linked List", "A chain of nodes where each node points to the next; cheap insert/delete, O(n) access."],
  ["Binary Tree", "A tree where each node has at most two children (left and right)."],
  ["Binary Search Tree", "A binary tree where left descendants are smaller and right descendants are larger than each node."],
  ["BST", "Binary Search Tree — left subtree < node < right subtree; in-order traversal yields sorted order."],
  ["Leaf node", "A tree node with no children."],
  ["Root node", "The single top node of a tree, with no parent."],
  ["Height", "The number of edges on the longest path from the root to a leaf."],
  ["DFS", "Depth First Search — explore as deep as possible along a branch before backtracking; uses a stack/recursion."],
  ["BFS", "Breadth First Search — explore level by level; uses a queue."],
  ["In-order", "DFS traversal visiting left subtree, then the node, then the right subtree; yields sorted order on a BST."],
  ["Pre-order", "DFS traversal visiting the node, then left subtree, then right subtree."],
  ["Post-order", "DFS traversal visiting left subtree, then right subtree, then the node."],
  ["Binary Search", "Searching a sorted array by halving the search range each step; O(log n)."],
  ["Linear Search", "Checking each element in turn until the target is found; O(n)."],
  ["Pseudocode", "A plain, language-agnostic sketch of an algorithm's logic before writing real code."],
  ["Bubble Sort", "Repeatedly swaps adjacent out-of-order elements; each pass bubbles the largest to the end. O(n²)."],
  ["Selection Sort", "Repeatedly selects the minimum of the unsorted part and moves it to the front. O(n²)."],
  ["Insertion Sort", "Builds the sorted array one element at a time by inserting each into place. O(n²), great for nearly-sorted data."],
  ["Merge Sort", "Divide-and-conquer: split, recursively sort halves, then merge. O(n log n), stable, O(n) space."],
  ["Quick Sort", "Divide-and-conquer using a pivot to partition; O(n log n) average, O(n²) worst, not stable."],
  ["Node", "A single unit of a linked list or tree, holding data and link(s) to other nodes."],
  ["Head", "The first node of a linked list, the entry point for traversal."],
  ["Null terminator", "The '\\0' character marking the end of a C-style string."],
  ["O(log n)", "Logarithmic time — the problem is halved each step (e.g. binary search)."],
  ["O(n log n)", "Linearithmic time — typical of efficient comparison sorts like Merge Sort."],
];

/* ═══════════════════════════ APTITUDE SUBJECT ═══════════════════════════ */
// Quantitative aptitude (from class notes). Exams: Aptitude-I DILR (MCQ + Theory).
const APTITUDE_QUIZ = [
  { q: "56% of y is 182. Find y.", o: ["325", "318", "296", "340"], c: "A" },
  { q: "What percent is 42 of 336?", o: ["12.5%", "14%", "8%", "16%"], c: "A" },
  { q: "Rice costs 30% less than wheat. Wheat is how much % more than rice?", o: ["42.85%", "30%", "70%", "33.33%"], c: "A" },
  { q: "A price is increased 10% then decreased 10%. Net change?", o: ["1% loss", "No change", "1% gain", "10% loss"], c: "A" },
  { q: "Sugar price rises 25%. By how much must consumption drop to keep spend the same?", o: ["20%", "25%", "15%", "33.33%"], c: "A" },
  { q: "Passing needs 40%. A student scores 20 marks and fails by 40. Max marks?", o: ["150", "120", "100", "200"], c: "A" },
  { q: "In a 2-way election the loser got 40% and lost by 1000 votes. Total votes?", o: ["5000", "2500", "10000", "4000"], c: "A" },
  { q: "A's salary is 50% more than B's. B's salary is how much % less than A's?", o: ["33.33%", "50%", "66.67%", "25%"], c: "A" },
  { q: "Selling at ₹2880 gives a 20% loss. What is the cost price?", o: ["₹3600", "₹3456", "₹2400", "₹3000"], c: "A" },
  { q: "Two numbers sum to 36 and multiply to 248. Sum of their reciprocals?", o: ["9/62", "1/8", "62/9", "9/31"], c: "A" },
  { q: "A farm has 84 heads and 282 legs (hens & goats). How many hens?", o: ["27", "57", "42", "30"], c: "A" },
  { q: "Ratio of two numbers is 3:8; adding 5 to both makes it 2:5. The smaller number is?", o: ["45", "120", "15", "40"], c: "A" },
  { q: "If A:B = 3:7 and B:C = 9:5, then A:B:C =", o: ["27:63:35", "3:7:5", "27:35:63", "21:63:45"], c: "A" },
  { q: "The fourth proportional of 9, 13, 153 is?", o: ["221", "117", "153", "199"], c: "A" },
  { q: "The mean proportional of 7 and 63 is?", o: ["21", "35", "441", "70"], c: "A" },
  { q: "How many terms are in the expansion of (a+b)^5?", o: ["6", "5", "7", "4"], c: "A" },
  { q: "The 3rd term of (a+b)^5 is?", o: ["10a³b²", "5a⁴b", "10a²b³", "a³b²"], c: "A" },
  { q: "ⁿPᵣ when r = n equals?", o: ["n!", "n", "1", "0"], c: "A" },
  { q: "How many 3-digit numbers can be formed from 2,3,4,5,6 without repetition?", o: ["60", "125", "100", "120"], c: "A" },
  { q: "Arrangements of HISTORY with Y and T always together?", o: ["1440", "720", "5040", "2880"], c: "A" },
  { q: "Solve (n+1)!/(n−1)! = 42 for n.", o: ["6", "7", "5", "21"], c: "A" },
  { q: "Mean of 7, 6, 5, 4, 8, 3, 9?", o: ["6", "5", "7", "42"], c: "A" },
  { q: "Central angle of a pie slice for a value v out of total T?", o: ["(v/T)×360°", "(v/T)×100", "(v/T)×180°", "v/360"], c: "A" },
  { q: "Team of 6 from 9 men & 6 women with at least 3 women — number of selections?", o: ["2275", "1680", "924", "540"], c: "A" },
];

const APTITUDE_MODULE_CARDS = [
  ["Percentage", "How do you find x% of y?", "(x/100) × y."],
  ["Percentage", "If A is p% more than B, how much % less is B than A?", "p/(100+p) × 100. e.g. +50% ⇒ B is 33.33% less."],
  ["Percentage", "Net effect of increasing then decreasing by the same x%?", "A net loss of (x²/100)% — e.g. ±10% ⇒ 1% loss."],
  ["Percentage", "If a price rises r%, how much to cut consumption to keep spend fixed?", "r/(100+r) × 100. e.g. +25% ⇒ cut 20%."],
  ["Percentage", "Cost price from a loss% sale: SP = ₹2880 at 20% loss ⇒ CP?", "CP = SP × 100/(100−loss%) = 2880 × 100/80 = ₹3600."],
  ["Ratio & Proportion", "Fourth proportional of a, b, c?", "x where a:b = c:x, so x = b·c/a."],
  ["Ratio & Proportion", "Mean proportional of a and b?", "√(a·b)."],
  ["Ratio & Proportion", "How to combine A:B and B:C into A:B:C?", "Scale both so B matches, then read across — e.g. 3:7 & 9:5 ⇒ 27:63:35."],
  ["Ratio & Proportion", "Theorem of equal ratios: if a/p = b/q = c/r = k, then k = ?", "(a+b+c)/(p+q+r)."],
  ["Linear Equations", "Sum of reciprocals of x and y?", "(x+y)/(xy)."],
  ["Linear Equations", "Heads-and-legs (hens & goats) — how to set it up?", "x + y = heads; 2x + 4y = legs; solve the two equations."],
  ["Linear Equations", "Sum of n consecutive integers centred at x?", "n·x (the terms are symmetric about the middle one)."],
  ["Statistics", "Mean of a grouped frequency distribution?", "x̄ = Σ(fᵢxᵢ) / Σfᵢ, using class midpoints for xᵢ."],
  ["Statistics", "Median of grouped data?", "L + [ (n/2 − cf) / f_m ] × c, where L = lower limit of the median class."],
  ["Statistics", "Mode of grouped data?", "L + [ (f_m − f₁) / (2f_m − f₁ − f₂) ] × c."],
  ["Statistics", "Central angle of a pie slice?", "(value / total) × 360°."],
  ["Statistics", "Median of raw data with even n?", "Average of the (n/2)th and (n/2 + 1)th ordered values."],
  ["Binomial", "How many terms in the expansion of (a+b)ⁿ?", "n + 1 (one more than the power)."],
  ["Binomial", "General term T(r+1) of (a+b)ⁿ?", "ⁿCᵣ · a^(n−r) · b^r — note r is one less than the term number."],
  ["Binomial", "Middle term(s) of (a+b)ⁿ?", "If n is even: the (n/2 + 1)th term. If n is odd: the ((n+1)/2)th and ((n+3)/2)th terms."],
  ["Permutations & Combinations", "Permutations ⁿPᵣ — formula and when?", "n!/(n−r)! — use when order matters."],
  ["Permutations & Combinations", "Combinations ⁿCᵣ — formula and when?", "n!/(r!(n−r)!) — use when order doesn't matter."],
  ["Permutations & Combinations", "Useful symmetry of combinations?", "ⁿCᵣ = ⁿC₍ₙ₋ᵣ₎."],
  ["Permutations & Combinations", "Arrangements of a word with a repeated letter?", "n! / (count of each repeat)! — e.g. TAMIM = 5!/2! = 60."],
  ["Permutations & Combinations", "Count arrangements with two specific letters always together?", "Treat them as one block: (n−1)! × 2!."],
  ["Permutations & Combinations", "Arrange so that no two vowels are together?", "Place the consonants first, then slot vowels into the gaps between them."],
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
// Shrink the font for long flashcard text so it doesn't overflow the card.
function fitText(s, big = true) {
  const n = (s || "").length;
  if (n > 140) return "text-sm";
  if (n > 90)  return "text-base";
  if (n > 50)  return "text-lg";
  if (n > 26)  return "text-xl";
  return big ? "text-2xl" : "text-xl";
}
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

// Durable localStorage is the source of truth (survives app updates/redeploys).
// The sandbox/preview store (window.storage) is ephemeral — it's only a fallback,
// and we mirror writes to it so the preview stays in sync.
async function loadData() {
  if (hasLocalStore()) {
    try { const v = window.localStorage.getItem(KEY); if (v) return JSON.parse(v); } catch {}
  }
  if (hasSandboxStore()) {
    try { const r = await window.storage.get(KEY, false); if (r) return JSON.parse(r.value); } catch {}
  }
  return null;
}
async function persist(d) {
  const json = JSON.stringify(d);
  if (hasLocalStore())   { try { window.localStorage.setItem(KEY, json); } catch {} }
  if (hasSandboxStore()) { try { await window.storage.set(KEY, json, false); } catch {} }
}
async function clearData() {
  if (hasLocalStore())   { try { window.localStorage.removeItem(KEY); } catch {} }
  if (hasSandboxStore()) { try { await window.storage.delete(KEY, false); } catch {} }
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

function seedDsaCards() {
  const basics = DSA_QUIZ.map((item, i) =>
    newCard(item.q, item.o[LETTER_IDX[item.c]], "DSA Basics", null, "d" + i, "dsa"));
  const modules = DSA_MODULE_CARDS.map(([deck, q, a], i) =>
    newCard(q, a, "DSA · " + deck, null, "dm" + i, "dsa"));
  const prof = DSA_PROF_CARDS.map(([deck, q, a], i) =>
    newCard(q, a, "DSA · " + deck, null, "dp" + i, "dsa"));
  return [...basics, ...modules, ...prof];
}

function seedAptitudeCards() {
  const basics = APTITUDE_QUIZ.map((item, i) =>
    newCard(item.q, item.o[LETTER_IDX[item.c]], "Aptitude Basics", null, "a" + i, "aptitude"));
  const modules = APTITUDE_MODULE_CARDS.map(([deck, q, a], i) =>
    newCard(q, a, "Aptitude · " + deck, null, "am" + i, "aptitude"));
  return [...basics, ...modules];
}

function seedAll() { return [...seedCards(), ...seedReactCards(), ...seedDsaCards(), ...seedAptitudeCards()]; }

/* ─── Gamification core ─── */
function defaultGame() {
  return {
    xp: 0, coins: 0,
    achievements: {},                 // id -> ISO date unlocked
    daily: { day: todayStr(), reviewed: 0, quizzes: 0, modules: 0, claimed: false },
    history: {},                      // "YYYY-MM-DD" -> reviews that day
    longestStreak: 0,
    stats: { reviews: 0, quizzes: 0, perfect: 0, correct: 0, bestQuizPct: 0, mostReviewsDay: 0 },
    cosmetics: { owned: [], equipped: { theme: "", cardBack: "", title: "" } },
    flags: {},                        // misc one-time flags (subjects used, tutor used, etc.)
    sound: true,
  };
}
// Level curve: XP within level L = 100 + (L-1)*50 (L1→2 needs 100, L2→3 needs 150, …).
function levelInfo(xp) {
  let L = 1, prev = 0, need = 100;
  while (xp >= prev + need) { prev += need; L++; need = 100 + (L - 1) * 50; }
  return { level: L, into: xp - prev, span: need };
}
const XP_REVIEW = { again: 2, hard: 4, good: 6, easy: 8 };
const XP_QUIZ_CORRECT = 10, XP_PERFECT_BONUS = 50, COINS_PER_LEVEL = 25;

// Achievements — { id, name, desc, icon(emoji), tier, xp, coins, test(g, data) }
const ACHIEVEMENTS = [
  { id: "first_review", name: "First Step", desc: "Review your first card", tier: "bronze", icon: "👣", xp: 10, coins: 10, test: (g) => g.stats.reviews >= 1 },
  { id: "rev_50", name: "Getting Warm", desc: "Review 50 cards", tier: "bronze", icon: "🔥", xp: 25, coins: 20, test: (g) => g.stats.reviews >= 50 },
  { id: "rev_250", name: "Committed", desc: "Review 250 cards", tier: "silver", icon: "💪", xp: 60, coins: 50, test: (g) => g.stats.reviews >= 250 },
  { id: "rev_1000", name: "Card Crusher", desc: "Review 1000 cards", tier: "gold", icon: "🏆", xp: 200, coins: 150, test: (g) => g.stats.reviews >= 1000 },
  { id: "streak_3", name: "On a Roll", desc: "3-day streak", tier: "bronze", icon: "🔥", xp: 20, coins: 15, test: (g) => (g.longestStreak || 0) >= 3 },
  { id: "streak_7", name: "Week Warrior", desc: "7-day streak", tier: "silver", icon: "📅", xp: 50, coins: 40, test: (g) => (g.longestStreak || 0) >= 7 },
  { id: "streak_30", name: "Unstoppable", desc: "30-day streak", tier: "gold", icon: "⚡", xp: 150, coins: 120, test: (g) => (g.longestStreak || 0) >= 30 },
  { id: "quiz_1", name: "Quiz Rookie", desc: "Finish a quiz", tier: "bronze", icon: "📝", xp: 15, coins: 10, test: (g) => g.stats.quizzes >= 1 },
  { id: "quiz_perfect", name: "Flawless", desc: "Score 100% on a quiz", tier: "silver", icon: "💯", xp: 50, coins: 40, test: (g) => g.stats.perfect >= 1 },
  { id: "quiz_10", name: "Quiz Master", desc: "Finish 10 quizzes", tier: "silver", icon: "🎯", xp: 60, coins: 50, test: (g) => g.stats.quizzes >= 10 },
  { id: "lvl_5", name: "Level 5", desc: "Reach level 5", tier: "bronze", icon: "⭐", xp: 0, coins: 30, test: (g) => levelInfo(g.xp).level >= 5 },
  { id: "lvl_10", name: "Level 10", desc: "Reach level 10", tier: "silver", icon: "🌟", xp: 0, coins: 60, test: (g) => levelInfo(g.xp).level >= 10 },
  { id: "lvl_25", name: "Level 25", desc: "Reach level 25", tier: "gold", icon: "💫", xp: 0, coins: 200, test: (g) => levelInfo(g.xp).level >= 25 },
  { id: "polyglot", name: "Polyglot", desc: "Study all three subjects", tier: "silver", icon: "🌍", xp: 40, coins: 30, test: (g, data) => new Set((data.cards || []).filter((c) => c.reps > 0).map((c) => c.subject)).size >= 3 },
  { id: "tutor", name: "Curious", desc: "Use the AI tutor", tier: "bronze", icon: "🤖", xp: 15, coins: 10, test: (g) => !!g.flags.tutor },
  { id: "viz", name: "Visual Learner", desc: "Open a DSA visualizer", tier: "bronze", icon: "📊", xp: 15, coins: 10, test: (g) => !!g.flags.viz },
  { id: "rich", name: "Coin Hoarder", desc: "Bank 300 coins", tier: "silver", icon: "💰", xp: 0, coins: 0, test: (g) => g.coins >= 300 },
];
function checkAchievements(g, data) {
  return ACHIEVEMENTS.filter((a) => !g.achievements[a.id] && a.test(g, data));
}

// Coin shop — cosmetics. { id, type:'avatar'|'title', value, name, cost }
const SHOP_ITEMS = [
  { id: "av_owl",   type: "avatar", value: "🦉", name: "Owl",        cost: 80 },
  { id: "av_rocket",type: "avatar", value: "🚀", name: "Rocket",     cost: 120 },
  { id: "av_dragon",type: "avatar", value: "🐉", name: "Dragon",     cost: 200 },
  { id: "av_crown", type: "avatar", value: "👑", name: "Crown",      cost: 400 },
  { id: "ti_scholar",  type: "title", value: "Scholar",      name: "Title: Scholar",      cost: 100 },
  { id: "ti_sensei",   type: "title", value: "Sensei",       name: "Title: Sensei",       cost: 250 },
  { id: "ti_grandmaster", type: "title", value: "Grandmaster", name: "Title: Grandmaster", cost: 500 },
];
const DEFAULT_AVATAR = "🧠";
const TIER_COL = { bronze: "text-amber-700 bg-amber-50 border-amber-200", silver: "text-stone-600 bg-stone-100 border-stone-300", gold: "text-yellow-700 bg-yellow-50 border-yellow-300" };

function Confetti() {
  const cols = ["#0d9488", "#f59e0b", "#f43f5e", "#0ea5e9", "#10b981", "#a78bfa"];
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {Array.from({ length: 90 }, (_, i) => {
        const size = 6 + Math.random() * 7;
        return <span key={i} style={{ position: "absolute", top: "-12px", left: Math.random() * 100 + "%", width: size, height: size * 0.55,
          background: cols[i % cols.length], borderRadius: 1,
          animation: `gt-confetti ${1.2 + Math.random() * 1.4}s ${Math.random() * 0.4}s ease-in forwards`,
          transform: `rotate(${Math.random() * 360}deg)` }} />;
      })}
    </div>
  );
}

// Renders the first queued celebration (level-up / achievement) over a confetti burst.
function CelebrationModal({ item, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4200); return () => clearTimeout(t); }, [item, onClose]);
  const isLevel = item.kind === "level";
  return (
    <>
      <Confetti />
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
        <div className="w-full max-w-xs rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-xl" onClick={(e) => e.stopPropagation()}>
          {isLevel ? (
            <>
              <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold">{item.level}</div>
              <h2 className="mt-3 text-xl font-bold text-stone-800">Level up!</h2>
              <p className="text-sm text-stone-500 mt-1">You reached level {item.level} and earned coins. Keep it going! 🎉</p>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl">{item.a.icon}</div>
              <div className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TIER_COL[item.a.tier] || ""}`}>{item.a.tier}</div>
              <h2 className="mt-1 text-lg font-bold text-stone-800">{item.a.name}</h2>
              <p className="text-sm text-stone-500 mt-1">{item.a.desc}</p>
              <p className="text-xs text-teal-600 font-semibold mt-2">+{item.a.xp} XP{item.a.coins ? ` · +${item.a.coins} 🪙` : ""}</p>
            </>
          )}
          <button onClick={onClose} className="mt-4 w-full rounded-xl bg-teal-600 text-white py-2.5 text-sm font-semibold hover:bg-teal-700">Nice!</button>
        </div>
      </div>
    </>
  );
}

// Compact level + XP bar + coins strip (Study tab header).
function XpStrip({ game, onProfile }) {
  const { level, into, span } = levelInfo(game.xp);
  return (
    <button onClick={onProfile} className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 flex items-center gap-3 hover:border-teal-300 transition-colors">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-teal-600 text-white flex flex-col items-center justify-center leading-none">
        <span className="text-[8px] uppercase opacity-80">Lv</span><span className="text-sm font-bold">{level}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-[11px] text-stone-400 mb-1"><span>Level {level}</span><span>{into}/{span} XP</span></div>
        <div className="h-2 rounded-full bg-stone-200 overflow-hidden"><div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${Math.round((into / span) * 100)}%` }} /></div>
      </div>
      <div className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-amber-600">🪙 {game.coins}</div>
    </button>
  );
}

// Tiny Web Audio chime (no assets). type: correct | levelup | unlock | wrong
let _actx = null;
function playSfx(type) {
  try {
    _actx = _actx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _actx, now = ctx.currentTime;
    const notes = { correct: [660, 880], levelup: [523, 659, 784, 1047], unlock: [784, 1047], wrong: [330, 247] }[type] || [660];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator(), gn = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      const t0 = now + i * 0.09;
      gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
      o.connect(gn); gn.connect(ctx.destination); o.start(t0); o.stop(t0 + 0.24);
    });
    if (navigator.vibrate && (type === "levelup" || type === "unlock")) navigator.vibrate(type === "levelup" ? [20, 40, 30] : 25);
  } catch {}
}

function freshData() {
  return { v: 2, subject: "german", cards: seedAll(),
    settings: { newPerDay: 20 }, daily: { day: todayStr(), newDone: 0 }, streak: { count: 0, lastDay: null }, session: null,
    game: defaultGame(), profile: { name: "", email: "" } };
}

// Upgrade older saved data: tag legacy cards german, merge new seed cards, ensure game/profile.
function migrate(d) {
  if (!d) return freshData();
  let cards = d.cards.map((c) => c.subject ? c : { ...c, subject: "german" });
  const have = new Set(cards.map((c) => c.id));
  const missing = [...seedReactCards(), ...seedDsaCards(), ...seedAptitudeCards()].filter((rc) => !have.has(rc.id));
  if (missing.length) cards = [...cards, ...missing];
  const dg = defaultGame();
  const game = d.game
    ? { ...dg, ...d.game, daily: { ...dg.daily, ...(d.game.daily || {}) }, stats: { ...dg.stats, ...(d.game.stats || {}) },
        cosmetics: { ...dg.cosmetics, ...(d.game.cosmetics || {}), equipped: { ...dg.cosmetics.equipped, ...((d.game.cosmetics || {}).equipped || {}) } },
        flags: { ...(d.game.flags || {}) } }
    : dg;
  return { ...d, v: 2, subject: d.subject || "german", cards, streak: d.streak || { count: 0, lastDay: null }, session: d.session || null,
    game, profile: d.profile || { name: "", email: "" } };
}

// Build a randomized quiz in Exam format from a {q,o,c} bank (options shuffled each round)
function makeBankQuiz(bank, section, n = 15) {
  return shuffle(bank).slice(0, n).map((item) => ({
    section, prompt: item.q, options: shuffle(item.o), answer: item.o[LETTER_IDX[item.c]],
  }));
}
function makeReactQuiz(n = 15) { return makeBankQuiz(REACT_QUIZ, "React", n); }
function makeDsaQuiz(n = 15)   { return makeBankQuiz(DSA_QUIZ, "DSA", n); }
function makeAptitudeQuiz(n = 15) { return makeBankQuiz(APTITUDE_QUIZ, "Aptitude", n); }

/* ─── Subject registry ─── */
const SUBJECTS = {
  german: { id: "german", label: "German A1", sub: "Deutsch lernen", icon: Languages, accent: "teal" },
  react:  { id: "react",  label: "React",     sub: "Frontend basics", icon: Atom,     accent: "sky"  },
  dsa:    { id: "dsa",     label: "DSA",       sub: "Data structures & algorithms", icon: Binary, accent: "orange" },
  aptitude: { id: "aptitude", label: "Aptitude", sub: "Quant · DILR", icon: Calculator, accent: "rose" },
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

/* ═══════════════════════════ MARKDOWN ═══════════════════════════ */

// Inline markdown: `code`, **bold**, *italic* / _italic_. Returns React nodes.
function mdInline(text, kp) {
  const out = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("`")) out.push(<code key={kp + i} className="px-1 py-0.5 rounded bg-black/10 font-mono text-[0.9em]">{t.slice(1, -1)}</code>);
    else if (t.startsWith("**") || t.startsWith("__")) out.push(<strong key={kp + i}>{t.slice(2, -2)}</strong>);
    else out.push(<em key={kp + i}>{t.slice(1, -1)}</em>);
    last = m.index + t.length; i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Lightweight markdown block renderer (no dependency): paragraphs, headings,
// bullet/ordered lists, and fenced code blocks.
function Markdown({ text, className = "" }) {
  const lines = String(text || "").split("\n");
  const blocks = [];
  let i = 0;
  const isItem = (l) => /^\s*([-*+]|\d+\.)\s+/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      const buf = []; i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { buf.push(lines[i]); i++; }
      i++;
      blocks.push(<pre key={blocks.length} className="my-1.5 overflow-auto rounded-lg bg-black/10 p-2 text-[0.85em] font-mono whitespace-pre">{buf.join("\n")}</pre>);
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { blocks.push(<div key={blocks.length} className="font-semibold mt-1.5 mb-0.5">{mdInline(h[2], blocks.length + "-")}</div>); i++; continue; }
    if (isItem(line)) {
      const ordered = /^\s*\d+\./.test(line); const items = [];
      while (i < lines.length && isItem(lines[i])) {
        items.push(<li key={items.length}>{mdInline(lines[i].replace(/^\s*([-*+]|\d+\.)\s+/, ""), blocks.length + "-" + items.length + "-")}</li>);
        i++;
      }
      blocks.push(ordered
        ? <ol key={blocks.length} className="list-decimal pl-5 my-1 space-y-0.5">{items}</ol>
        : <ul key={blocks.length} className="list-disc pl-5 my-1 space-y-0.5">{items}</ul>);
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    const buf = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].trim().startsWith("```") && !/^#{1,6}\s/.test(lines[i]) && !isItem(lines[i])) { buf.push(lines[i]); i++; }
    blocks.push(<p key={blocks.length} className="my-1 first:mt-0 last:mb-0">{mdInline(buf.join(" "), blocks.length + "-")}</p>);
  }
  return <div className={className}>{blocks}</div>;
}

/* ═══════════════════════════ AI EXPLAIN ═══════════════════════════ */

// Reusable "Explain with AI" affordance. `run` is an async fn returning text.
// When `chatContext` is provided, also offers a "Chat about this" popup.
function AIExplain({ run, label = "Explain with AI", subjectLabel = "this subject", chatContext }) {
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const chatBtn = chatContext ? (
    <button onClick={() => setChatOpen(true)}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-600 hover:text-teal-800 transition-colors py-1">
      <MessageCircle size={13} /> Chat about this
    </button>
  ) : null;

  return (
    <div>
      {text ? (
        <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-xs text-sky-900 leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-sky-700 mb-1"><Sparkles size={12} /> AI explanation</div>
          <Markdown text={text} />
          {chatBtn && <div className="mt-1.5 pt-1.5 border-t border-sky-200">{chatBtn}</div>}
        </div>
      ) : (
        <div className="flex items-center gap-3">
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
          {chatBtn}
        </div>
      )}
      {err && <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-700"><AlertCircle size={12} />{err}</div>}
      {chatOpen && <ChatPopup subjectLabel={subjectLabel} context={chatContext} onClose={() => setChatOpen(false)} />}
    </div>
  );
}

// "Edit with AI" affordance for a flashcard: describe a change, AI rewrites it.
function AICardEdit({ card, subjectLabel = "this subject", onEdit }) {
  const [open, setOpen]       = useState(false);
  const [instr, setInstr]     = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors py-1">
        <Wand2 size={13} /> Edit with AI
      </button>
    );
  }
  return (
    <div className="rounded-lg bg-violet-50 border border-violet-200 px-3 py-2 space-y-2">
      <input value={instr} onChange={(e) => setInstr(e.target.value)} autoFocus
        placeholder="Describe your edit (e.g. add an example, make the back shorter)…"
        onKeyDown={(e) => { if (e.key === "Enter" && instr.trim()) e.currentTarget.blur(); }}
        className="w-full rounded-lg border border-stone-200 px-2 py-1.5 text-sm focus:outline-none focus:border-violet-400" />
      <div className="flex gap-2">
        <Btn kind="primary" disabled={!instr.trim() || loading}
          onClick={async () => {
            setErr(""); setLoading(true);
            try { const fields = await aiEditCard(card, instr.trim(), subjectLabel); onEdit(fields); setOpen(false); setInstr(""); }
            catch (e) { setErr(e?.message || "edit failed"); }
            setLoading(false);
          }}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />} {loading ? "Editing…" : "Apply"}
        </Btn>
        <Btn onClick={() => { setOpen(false); setInstr(""); setErr(""); }}>Cancel</Btn>
      </div>
      {err && <div className="flex items-center gap-1.5 text-xs text-amber-700"><AlertCircle size={12} />{err}</div>}
    </div>
  );
}

/* ═══════════════════════════ EXAM (MCQ) ═══════════════════════════ */

function Exam({ make, sectioned, onReview, subjectLabel = "this subject", timeLimitSec = 0, onAddMissed, onGame }) {
  const [questions, setQuestions] = useState(make);
  const [qi, setQi]    = useState(0);
  const [picked, setPk] = useState(null);
  const [history, setH]= useState([]);
  const [showT, setShowT] = useState(false); // translate panel toggle
  const [fresh, setFresh] = useState(false);  // trigger re-generate
  const [timeLeft, setTimeLeft] = useState(timeLimitSec);
  const [added, setAdded] = useState(false);  // missed-to-flashcards done
  const [combo, setCombo] = useState(0);       // consecutive-correct streak
  const finishedFired = useRef(false);

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

  // award XP for the whole quiz once, when it finishes
  useEffect(() => {
    if (finished && !finishedFired.current) {
      finishedFired.current = true;
      const ok = history.filter((h) => h.ok).length;
      onGame && onGame("quizDone", { pct: questions.length ? Math.round((ok / questions.length) * 100) : 0 });
    }
    if (!finished) finishedFired.current = false;
  }, [finished]);

  function choose(opt) {
    if (picked) return;
    setPk(opt);
    const ok = opt === q.answer;
    setH((h) => [...h, { q, picked: opt, ok }]);
    onReview && onReview(ok);
    if (ok) { onGame && onGame("quizAnswer", { ok: true, mult: 1 + Math.min(combo, 5) * 0.1 }); setCombo((c) => c + 1); }
    else { onGame && onGame("quizAnswer", { ok: false }); setCombo(0); }
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
          {combo >= 2 && <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-600 px-2 py-0.5 font-semibold">🔥 {combo} combo</span>}
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
          <AIExplain key={"ai" + qi} subjectLabel={subjectLabel}
            chatContext={`Quiz question: "${q.prompt}" — correct answer: "${q.answer}"` + (picked && picked !== q.answer ? `; I answered: "${picked}"` : "")}
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

const STUDY_TOUR_KEY = "gt_study_tour_v1";
function studyTourDone() { try { return !!window.localStorage.getItem(STUDY_TOUR_KEY); } catch { return false; } }
function markStudyTourDone() { try { window.localStorage.setItem(STUDY_TOUR_KEY, "1"); } catch {} }

// One-time in-session coachmark explaining the four rating buttons (in the user's words).
const RATING_GUIDE = [
  { tone: "again", label: "Again", desc: "Didn't know it / got it wrong 🙈" },
  { tone: "hard",  label: "Hard",  desc: "Knew it, but it was hard to recall" },
  { tone: "good",  label: "Good",  desc: "Recalled it — okay-ish 👍" },
  { tone: "easy",  label: "Easy",  desc: "Halwa question 🍮 — too easy" },
];
const GUIDE_DOT = { again: "bg-rose-500", hard: "bg-orange-500", good: "bg-teal-600", easy: "bg-sky-500" };
function RatingGuide({ onDismiss }) {
  return (
    <div className="rounded-xl border border-teal-300 bg-teal-50 p-3 text-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-teal-800 inline-flex items-center gap-1.5"><Lightbulb size={15} /> How to rate</span>
        <button onClick={onDismiss} className="text-xs text-teal-700 hover:text-teal-900 font-medium">Got it ✕</button>
      </div>
      <p className="text-xs text-stone-600 mb-2">You answered it in your head — now tell the app how it went. It schedules the card based on your honesty:</p>
      <div className="space-y-1.5">
        {RATING_GUIDE.map((r) => (
          <div key={r.tone} className="flex items-start gap-2">
            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${GUIDE_DOT[r.tone]}`} />
            <div className="text-xs text-stone-700"><span className="font-semibold">{r.label}</span> — {r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SRSSession({ cards, maxNew = 20, cram = false, studyAll = false, initialQueue = null, initialDone = 0, onRate, onEnd, onProgress, onEditCard, onUndo, subjectLabel = "this subject" }) {
  function buildQueue() {
    if (initialQueue) return initialQueue.filter((id) => cards.some((c) => c.id === id));
    if (cram || studyAll) return shuffle(cards.map((c) => c.id));
    const now = Date.now();
    const due  = cards.filter((c) => c.state !== "new" && c.due <= now);
    const newC = cards.filter((c) => c.state === "new");
    return shuffle(due.map((c) => c.id)).concat(newC.slice(0, maxNew).map((c) => c.id));
  }

  const [queue,   setQueue]   = useState(buildQueue);
  const [flipped, setFlipped] = useState(false);
  const [done,    setDone]    = useState(initialDone);
  const [lastAction, setLastAction] = useState(null); // snapshot for undo
  const [showGuide, setShowGuide] = useState(() => !studyTourDone()); // first-run rating walkthrough

  // report progress so the session can be saved/resumed
  useEffect(() => { onProgress && onProgress(queue, done, cram); }, [queue, done]);

  const card = cards.find((c) => c.id === queue[0]);

  useEffect(() => {
    function onKey(e) {
      if ((e.key === "u" || e.key === "U" || ((e.metaKey || e.ctrlKey) && e.key === "z")) && lastAction) { e.preventDefault(); undo(); return; }
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
  }, [card, flipped, queue, lastAction]);

  function rate(r) {
    // snapshot the pre-rating state so it can be undone (Anki-style)
    setLastAction({ prevCard: card, wasNew: card.state === "new", prevQueue: queue, prevDone: done });
    onRate(card, r, cram);
    setDone((d) => d + 1);
    setFlipped(false);
    setQueue((q) => {
      const rest = q.slice(1);
      if (r === "again") { const p = Math.min(rest.length, 3); const a = [...rest]; a.splice(p, 0, card.id); return a; }
      return rest;
    });
  }

  function undo() {
    if (!lastAction) return;
    onUndo && onUndo(lastAction.prevCard, lastAction.wasNew); // restore card scheduling + daily count
    setQueue(lastAction.prevQueue);
    setDone(lastAction.prevDone);
    setFlipped(true);
    setLastAction(null);
  }

  if (!card) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-2">🎉</div>
        <div className="text-3xl font-bold text-stone-800">{done}</div>
        <p className="text-stone-500 mt-1">{cram ? "cards practiced" : "reviews complete"}</p>
        <div className="mt-6 flex gap-2.5 justify-center">
          {lastAction && <Btn onClick={undo}><RotateCcw size={15} /> Undo last</Btn>}
          <Btn kind="primary" onClick={onEnd}>Done</Btn>
        </div>
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
        <div className="flex items-center gap-2.5">
          {lastAction && (
            <button onClick={undo} title="Undo last rating (U)" className="inline-flex items-center gap-1 text-stone-400 hover:text-teal-600 transition-colors">
              <RotateCcw size={12} /> Undo
            </button>
          )}
          <span>{done} done · {queue.length} left</span>
        </div>
      </div>
      <Bar value={done} max={done + queue.length} />

      <div
        onClick={() => !flipped && setFlipped(true)}
        className={`mt-5 min-h-60 rounded-2xl border bg-white px-6 py-8 flex flex-col items-center justify-center text-center transition-colors ${!flipped ? "cursor-pointer hover:border-teal-300 border-stone-200" : "border-stone-200"}`}>
        <div className="text-xs uppercase tracking-wide text-stone-300 mb-3">Front</div>
        <div className={`${fitText(card.front)} font-semibold text-stone-800 leading-snug break-words [overflow-wrap:anywhere] max-w-full`}>{subjectLabel === "DSA" ? <GlossaryText text={card.front} /> : card.front}</div>
        {flipped && (
          <>
            <div className="my-4 h-px w-12 bg-stone-200" />
            <div className={`${fitText(card.back)} font-semibold text-teal-700 leading-snug break-words [overflow-wrap:anywhere] max-w-full`}>{subjectLabel === "DSA" ? <GlossaryText text={card.back} /> : card.back}</div>
            {card.note && <div className="mt-3 text-xs text-stone-400 italic break-words">{card.note}</div>}
          </>
        )}
        {!flipped && <div className="mt-5 text-xs text-stone-400">tap or Space to reveal</div>}
      </div>

      {flipped ? (
        <div className="mt-4 space-y-3">
          <AIExplain key={card.id} label="Explain this card" subjectLabel={subjectLabel}
            chatContext={`Flashcard — front: "${card.front}"; back: "${card.back}"`}
            run={() => groqChat(
              [{ role: "user", content:
                `You are a concise ${subjectLabel} tutor. Briefly explain this flashcard in 2-3 sentences so it sticks.\n` +
                `Front: ${card.front}\nBack: ${card.back}` + (card.note ? `\nNote: ${card.note}` : "") +
                "\nAlways write the explanation in English (you may quote German words/phrases). Plain text, no markdown headers."
              }],
              { temperature: 0.3, max_tokens: 320 },
            )} />
          {onEditCard && (
            <AICardEdit key={"edit" + card.id} card={card} subjectLabel={subjectLabel}
              onEdit={(fields) => onEditCard(card.id, fields)} />
          )}
          {showGuide && <RatingGuide onDismiss={() => { setShowGuide(false); markStudyTourDone(); }} />}
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
        ? [["1","again"],["2","hard"],["3","good"],["4","easy"],["U","undo"],["Esc","end"]]
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
            <div className={`${fitText(front)} font-semibold text-stone-800 break-words [overflow-wrap:anywhere] max-w-full`}>{front}</div>
            <div className="mt-4 text-xs text-stone-400">tap or Space to flip</div>
          </>
        ) : (
          <>
            <div className="text-base text-stone-400 break-words [overflow-wrap:anywhere] max-w-full">{front}</div>
            <div className={`mt-2 ${fitText(back)} font-semibold text-teal-700 break-words [overflow-wrap:anywhere] max-w-full`}>{back}</div>
            {card.note && <div className="mt-3 text-xs text-stone-500 italic break-words">{card.note}</div>}
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

/* ═══════════════════════════ MODULE VIEW + OVERVIEW ═══════════════════════════ */

// Editable two-column grid of every card in a module. Click a card to edit it.
function ModuleOverview({ cards, subjectLabel = "this subject", onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [draft, setDraft]   = useState({ front: "", back: "" });
  const [q, setQ]           = useState("");
  const shown = cards.filter((c) => !q || (c.front + " " + c.back).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-2">
      {cards.length > 6 && (
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${cards.length} cards…`}
            className="w-full rounded-xl border border-stone-200 px-9 py-2 text-sm focus:outline-none focus:border-teal-400" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
      {shown.map((c) => {
        const editing = editId === c.id;
        if (editing) {
          return (
            <div key={c.id} className="col-span-2 rounded-xl border border-teal-300 bg-white p-3 space-y-2">
              <textarea value={draft.front} onChange={(e) => setDraft((d) => ({ ...d, front: e.target.value }))} rows={2} placeholder="Front"
                className="w-full rounded-lg border border-stone-200 px-2 py-1.5 text-sm focus:outline-none focus:border-teal-400" />
              <textarea value={draft.back} onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))} rows={2} placeholder="Back"
                className="w-full rounded-lg border border-stone-200 px-2 py-1.5 text-sm focus:outline-none focus:border-teal-400" />
              <AICardEdit key={"ai" + c.id} card={c} subjectLabel={subjectLabel}
                onEdit={(fields) => { onEdit(c.id, fields); setDraft(fields); }} />
              <div className="flex items-center gap-2">
                <Btn kind="primary" disabled={!draft.front.trim() || !draft.back.trim()}
                  onClick={() => { onEdit(c.id, { front: draft.front.trim(), back: draft.back.trim() }); setEditId(null); }}>
                  <Check size={14} /> Save
                </Btn>
                <Btn onClick={() => setEditId(null)}>Cancel</Btn>
                <button onClick={() => { onDelete(c.id); setEditId(null); }} className="ml-auto text-stone-300 hover:text-rose-500"><Trash2 size={15} /></button>
              </div>
            </div>
          );
        }
        return (
          <button key={c.id} onClick={() => { setEditId(c.id); setDraft({ front: c.front, back: c.back }); }}
            className="text-left rounded-xl border border-stone-200 bg-white p-3 hover:border-teal-300 hover:shadow-sm transition-all min-w-0">
            <div className="text-sm font-medium text-stone-800 break-words [overflow-wrap:anywhere] line-clamp-3">{subjectLabel === "DSA" ? <GlossaryText text={c.front} /> : c.front}</div>
            <div className="mt-1 text-xs text-stone-400 break-words [overflow-wrap:anywhere] line-clamp-2">{subjectLabel === "DSA" ? <GlossaryText text={c.back} /> : c.back}</div>
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-stone-300"><Pencil size={10} /> tap to edit</div>
          </button>
        );
      })}
      </div>
      {shown.length === 0 && <div className="text-center text-sm text-stone-400 py-4">No cards match.</div>}
    </div>
  );
}

// A module's page: study/resume controls + a Flashcards (flip) / Overview toggle.
function ModuleView({ deckName, cardObjs, savedMod, subjectLabel, onStudy, onResume, onEdit, onDelete }) {
  const [mode, setMode] = useState("flip"); // flip | overview
  const deckCards = cardObjs.map((c) => ({ en: c.front, de: c.back, note: c.note }));
  return (
    <div className="space-y-4">
      {savedMod && (
        <button onClick={onResume}
          className="w-full rounded-xl bg-violet-600 text-white py-3 text-sm font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <RotateCcw size={17} /> Resume study · {savedMod.queue.length} left
        </button>
      )}
      <button onClick={onStudy}
        className="w-full rounded-xl bg-teal-600 text-white py-3 text-sm font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
        <Brain size={17} /> {savedMod ? "Restart module study" : "Study this module"} · {cardObjs.length} card{cardObjs.length !== 1 ? "s" : ""}
      </button>

      <div className="inline-flex rounded-xl bg-stone-200 p-1 text-sm">
        {[["flip", "Flashcards"], ["overview", "Overview"]].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k)}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${mode === k ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"}`}>{l}</button>
        ))}
      </div>

      {mode === "flip"
        ? <FlipDrill deck={deckCards} />
        : <ModuleOverview cards={cardObjs} subjectLabel={subjectLabel} onEdit={onEdit} onDelete={onDelete} />}
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
  { id: "openai/gpt-oss-120b",    label: "GPT-OSS 120B",  sub: "OpenAI open model · default" },
  { id: "openai/gpt-oss-20b",     label: "GPT-OSS 20B",   sub: "OpenAI open model · fast" },
  { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B", sub: "versatile" },
  { id: "llama-3.1-8b-instant",   label: "Llama 3.1 8B",  sub: "fastest · cheap" },
  { id: "gemma2-9b-it",           label: "Gemma 2 9B",    sub: "lightweight" },
];
const DEFAULT_MODEL = "openai/gpt-oss-120b"; // ChatGPT's open-source model

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

// Auto-assign each card to a module/deck. Returns the cards with a .deck field set.
async function categorizeCards(cards, existingDecks, subjectLabel, apiKey) {
  const list = cards.map((c, i) => `${i}: ${c.front} => ${c.back}`).join("\n");
  const txt = await groqChat(
    [{ role: "user", content:
      `Group these ${subjectLabel} flashcards into modules. Prefer reusing an existing module when it fits; otherwise invent a short, clear module name (2-4 words).\n` +
      `Existing modules: ${existingDecks.length ? existingDecks.join(", ") : "(none yet)"}\n` +
      `Return ONLY JSON {"decks":["module for card 0","module for card 1", ...]} — one module name per card, in the same order. No markdown.\n\nCARDS:\n${list}`
    }],
    { key: apiKey, json: true, temperature: 0.2, max_tokens: 1024 },
  );
  const parsed = JSON.parse(stripFences(txt));
  const decks = Array.isArray(parsed) ? parsed : (parsed.decks || []);
  return cards.map((c, i) => ({ ...c, deck: decks[i] ? String(decks[i]).slice(0, 40) : undefined }));
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
      " Always write the explanation in English (you may quote German words/phrases). Plain text, no markdown headers."
    }],
    { temperature: 0.3, max_tokens: 320 },
  );
}

// Edit a flashcard per a natural-language instruction; returns { front, back }.
async function aiEditCard(card, instruction, subjectLabel) {
  const txt = await groqChat(
    [{ role: "user", content:
      `Edit this ${subjectLabel} flashcard according to the instruction. ` +
      `Return ONLY JSON {"front":"...","back":"..."} with the full updated card (keep whatever the instruction doesn't change). No markdown.\n` +
      `Current front: ${card.front}\nCurrent back: ${card.back}\nInstruction: ${instruction}`
    }],
    { json: true, temperature: 0.2, max_tokens: 400 },
  );
  const p = JSON.parse(stripFences(txt));
  return { front: String(p.front || card.front), back: String(p.back || card.back) };
}

function AddCards({ onAdd, decks = [], subjectLabel = "this subject" }) {
  const [tab,     setTab]     = useState("paste");
  const [deck,    setDeck]    = useState(decks[0] || "My Notes");
  const [newDeck, setNewDeck] = useState("");
  const [creatingDeck, setCreatingDeck] = useState(decks.length === 0);
  const [autoCat, setAutoCat] = useState(false);
  const [front,   setFront]   = useState("");
  const [back,    setBack]    = useState("");
  const [bulk,    setBulk]    = useState("");
  const [notes,   setNotes]   = useState("");
  const [aiCards, setAiCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding,  setAdding]  = useState(false);
  const [err,     setErr]     = useState("");
  const [apiKey,  setApiKey]  = useState(loadGroqKey);

  const parsed = parsePaste(bulk);
  const deckValue = (creatingDeck ? newDeck.trim() : deck) || "My Notes";

  function updateKey(k) { setApiKey(k); saveGroqKey(k.trim()); }

  // Shared add path: optionally AI-categorize into modules, then hand off.
  async function doAdd(list, after) {
    if (!list.length) return;
    if (autoCat) {
      if (!apiKey.trim()) { setErr("Add your Groq key to auto-categorize."); return; }
      setErr(""); setAdding(true);
      try { list = await categorizeCards(list, decks, subjectLabel, apiKey.trim()); }
      catch (e) { setErr("Auto-categorize failed: " + (e?.message || "error")); setAdding(false); return; }
      setAdding(false);
    }
    onAdd(list, deckValue);
    after && after();
  }

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
        <label className="block text-xs text-stone-400 mb-1">Module / deck</label>
        {autoCat ? (
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-700 inline-flex items-center gap-1.5">
            <Sparkles size={13} /> AI will sort each card into the best module
          </div>
        ) : creatingDeck ? (
          <div className="flex gap-2">
            <input value={newDeck} onChange={(e) => setNewDeck(e.target.value)} maxLength={40} placeholder="New module name"
              className="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
            {decks.length > 0 && (
              <button onClick={() => setCreatingDeck(false)} className="shrink-0 rounded-xl border border-stone-200 px-3 text-sm text-stone-500 hover:bg-stone-50">Pick existing</button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <select value={deck} onChange={(e) => setDeck(e.target.value)}
                className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:border-teal-400">
                {decks.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
            <button onClick={() => { setCreatingDeck(true); setNewDeck(""); }} className="shrink-0 inline-flex items-center gap-1 rounded-xl border border-stone-200 px-3 text-sm text-teal-700 hover:bg-stone-50"><Plus size={14} /> New</button>
          </div>
        )}
        <label className="mt-2 flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
          <input type="checkbox" checked={autoCat} onChange={(e) => setAutoCat(e.target.checked)} className="accent-teal-600" />
          <Wand2 size={12} className="text-sky-500" /> AI auto-categorize into modules
        </label>
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
            <Btn kind="primary" disabled={!parsed.length || adding} onClick={() => doAdd(parsed, () => setBulk(""))}>
              {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} {adding ? "Sorting…" : "Add " + parsed.length}
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
                <Btn kind="primary" disabled={adding} onClick={() => doAdd(aiCards, () => { setAiCards([]); setNotes(""); })}>
                  {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} {adding ? "Sorting…" : "Add all " + aiCards.length}
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
          {err && <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"><AlertCircle size={13}/>{err}</div>}
          <Btn kind="primary" disabled={!front.trim() || !back.trim() || adding}
            onClick={() => doAdd([{ front: front.trim(), back: back.trim() }], () => { setFront(""); setBack(""); })}>
            {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} {adding ? "Sorting…" : "Add card"}
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

function AIQuizMaker({ subjectLabel = "this subject", onAddMissed, onGame }) {
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
        <Exam make={() => questions} subjectLabel={subjectLabel} onAddMissed={onAddMissed} onGame={onGame} />
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

function TimedQuiz({ subject, subjectLabel = "this subject", onAddMissed, onGame }) {
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
      questions = subject === "react" ? makeReactQuiz(n) : subject === "dsa" ? makeDsaQuiz(n) : subject === "aptitude" ? makeAptitudeQuiz(n) : buildTest().slice(0, n);
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
        <Exam make={() => built.questions} timeLimitSec={built.timeLimitSec} subjectLabel={subjectLabel} onAddMissed={onAddMissed} onGame={onGame} />
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

// Multi-thread chat storage, per subject. A thread = { id, title, context, messages, created }.
function chatKey(label) { return "tutor_threads_" + label; }
function newThread(title, context, messages) {
  return { id: uid(), title: title || "New chat", context: context || "", messages: messages || [], created: Date.now() };
}
function deriveTitle(messages, context) {
  const firstUser = (messages || []).find((m) => m.role === "user");
  const base = (firstUser && firstUser.content) || context || "New chat";
  return base.length > 42 ? base.slice(0, 42) + "…" : base;
}
function loadThreads(label) {
  try {
    const raw = window.localStorage.getItem(chatKey(label));
    if (raw) { const arr = JSON.parse(raw); if (Array.isArray(arr)) return arr; }
  } catch {}
  // migrate legacy single-chat storage into one thread
  try {
    const old = window.localStorage.getItem("tutor_chat_" + label);
    if (old) { const msgs = JSON.parse(old); if (Array.isArray(msgs) && msgs.length) return [newThread("Previous chat", "", msgs)]; }
  } catch {}
  return [];
}
function saveThreads(label, threads) {
  try { window.localStorage.setItem(chatKey(label), JSON.stringify(threads.map((t) => ({ ...t, messages: (t.messages || []).slice(-60) })))); } catch {}
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

// Reusable chat engine. Operates on messages/setMessages owned by the parent.
// Agentic (tools) when `actions` is provided; otherwise a plain focused chat.
function AgentChat({ subjectLabel = "this subject", actions, messages, setMessages, context, suggestions = [] }) {
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

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
    const visible = [...messages, { role: "user", content: q }];
    setMessages(visible); setInput(""); setErr(""); setLoading(true);
    let pendingNav = null;
    try {
      const sys = { role: "system", content:
        `You are a friendly, concise ${subjectLabel} tutor inside a study app.` +
        (actions ? " You can also take actions with the provided tools — when asked to add/edit/delete cards, start studying or cramming, make a quiz, switch subject, or change settings, DO IT with the right tool. Use list_cards for ids before editing/deleting." : "") +
        (context ? `\nThis chat is about: ${context}\nKeep your help focused on that.` : "") +
        " Answer clearly and use markdown when helpful. Always reply in English." };
      const work = [sys, ...visible];
      for (let step = 0; step < 6; step++) {
        const msg = await groqChatRaw(work, { tools: actions ? AGENT_TOOLS : undefined, temperature: 0.4, max_tokens: 1200 });
        work.push(msg);
        if (actions && msg.tool_calls && msg.tool_calls.length) {
          for (const call of msg.tool_calls) {
            let parsed = {};
            try { parsed = JSON.parse(call.function.arguments || "{}"); } catch {}
            let result;
            try { result = await execTool(call.function.name, parsed, (fn) => { pendingNav = fn; }); }
            catch (e) { result = { error: e?.message || "tool failed" }; }
            work.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
          }
          continue;
        }
        if (msg.content) setMessages((m) => [...m, { role: "assistant", content: msg.content }]);
        break;
      }
    } catch (e) { setErr(e?.message || "request failed"); }
    setLoading(false);
    if (pendingNav) setTimeout(pendingNav, 60);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {messages.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <MessageCircle size={26} className="text-stone-300 mb-2" />
            <p className="text-sm text-stone-400 mb-3">{context ? "Ask anything about this." : "Ask your " + subjectLabel + " tutor anything."}</p>
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
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
              m.role === "user" ? "bg-teal-600 text-white whitespace-pre-wrap" : "bg-stone-100 text-stone-800 border border-stone-200"}`}>
              {m.role === "user" ? m.content : <Markdown text={m.content} />}
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

// Modal overlay (Escape closes; stops other window Escape handlers from firing).
function Modal({ onClose, title, children }) {
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); } }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40" onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-stone-200 bg-white shadow-xl flex flex-col" style={{ height: "78vh" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-2.5 shrink-0">
          <div className="text-sm font-semibold text-stone-700 truncate pr-2">{title}</div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Popup chat seeded with a context (e.g. a quiz question or card). Saved into the
// subject's chat threads so it shows up in the Tutor tab.
function ChatPopup({ subjectLabel = "this subject", context, onClose }) {
  const [thread, setThread] = useState(() => newThread("About: " + (context || "this").slice(0, 36), context, []));
  // Persist into the subject's thread list once the chat has content.
  useEffect(() => {
    if (!thread.messages.length) return;
    const all = loadThreads(subjectLabel);
    const idx = all.findIndex((t) => t.id === thread.id);
    const titled = { ...thread, title: deriveTitle(thread.messages, thread.context) };
    saveThreads(subjectLabel, idx >= 0 ? all.map((t) => t.id === thread.id ? titled : t) : [titled, ...all]);
  }, [thread, subjectLabel]);
  const setMessages = (upd) => setThread((t) => ({ ...t, messages: typeof upd === "function" ? upd(t.messages) : upd }));
  return (
    <Modal title={"Chat · " + subjectLabel} onClose={onClose}>
      {context && <div className="px-4 py-2 text-xs text-stone-500 border-b border-stone-200 shrink-0"><span className="text-stone-400">About:</span> {context}</div>}
      <AgentChat subjectLabel={subjectLabel} context={context} messages={thread.messages} setMessages={setMessages} />
      <div className="px-4 py-1.5 text-[11px] text-stone-400 border-t border-stone-200 shrink-0">Saved to your {subjectLabel} chats →</div>
    </Modal>
  );
}

function Tutor({ subjectLabel = "this subject", actions }) {
  const [threads, setThreads] = useState(() => { const t = loadThreads(subjectLabel); return t.length ? t : [newThread("New chat", "", [])]; });
  const [activeId, setActiveId] = useState(() => threads[0].id);
  const [editingCtx, setEditingCtx] = useState(false);
  const [draftCtx, setDraftCtx] = useState("");

  useEffect(() => { saveThreads(subjectLabel, threads); }, [threads, subjectLabel]);

  const active = threads.find((t) => t.id === activeId) || threads[0];

  function setMessages(upd) {
    setThreads((ts) => ts.map((t) => {
      if (t.id !== active.id) return t;
      const msgs = typeof upd === "function" ? upd(t.messages) : upd;
      return { ...t, messages: msgs, title: deriveTitle(msgs, t.context) };
    }));
  }
  function newChat() { const t = newThread("New chat", "", []); setThreads((ts) => [t, ...ts]); setActiveId(t.id); }
  function deleteActive() {
    setThreads((ts) => { const rest = ts.filter((t) => t.id !== active.id); const next = rest.length ? rest : [newThread("New chat", "", [])]; setActiveId(next[0].id); return next; });
  }
  function saveCtx() { setThreads((ts) => ts.map((t) => t.id === active.id ? { ...t, context: draftCtx.trim() } : t)); setEditingCtx(false); }

  const suggestions = subjectLabel === "React"
    ? ["Add 5 flashcards about useEffect", "Make me a quiz on React hooks", "Start a cram session before my test"]
    : ["Add 5 flashcards for ordering food", "Quiz me on German articles", "Start studying my due cards"];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white flex flex-col" style={{ height: "64vh" }}>
      {/* thread switcher */}
      <div className="flex items-center gap-2 border-b border-stone-200 px-2.5 py-2 shrink-0">
        <div className="relative flex-1 min-w-0">
          <select value={active.id} onChange={(e) => setActiveId(e.target.value)}
            className="w-full appearance-none rounded-lg border border-stone-200 bg-white pl-2.5 pr-7 py-1.5 text-xs text-stone-700 focus:outline-none focus:border-teal-400 truncate">
            {threads.map((t) => <option key={t.id} value={t.id}>{t.title || "New chat"}{t.messages.length ? ` (${t.messages.length})` : ""}</option>)}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400" />
        </div>
        <button onClick={newChat} title="New chat" className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs text-teal-700 hover:bg-stone-50"><Plus size={13} /> New</button>
        <button onClick={deleteActive} title="Delete this chat" className="shrink-0 rounded-lg border border-stone-200 px-2 py-1.5 text-stone-400 hover:text-rose-500"><Trash2 size={13} /></button>
      </div>

      {/* context row (change the context) */}
      <div className="flex items-center gap-2 border-b border-stone-200 px-3 py-1.5 shrink-0">
        <span className="text-[11px] uppercase tracking-wide text-stone-400 shrink-0">Focus</span>
        {editingCtx ? (
          <>
            <input value={draftCtx} onChange={(e) => setDraftCtx(e.target.value)} autoFocus placeholder="What should this chat focus on?"
              onKeyDown={(e) => { if (e.key === "Enter") saveCtx(); }}
              className="flex-1 rounded-lg border border-stone-200 px-2 py-1 text-xs focus:outline-none focus:border-teal-400" />
            <button onClick={saveCtx} className="text-teal-600 hover:text-teal-800"><Check size={14} /></button>
          </>
        ) : (
          <>
            <span className="flex-1 min-w-0 truncate text-xs text-stone-500">{active.context || "general"}</span>
            <button onClick={() => { setDraftCtx(active.context || ""); setEditingCtx(true); }} className="text-stone-300 hover:text-teal-600"><Pencil size={12} /></button>
          </>
        )}
      </div>

      <AgentChat key={active.id} subjectLabel={subjectLabel} actions={actions} context={active.context}
        messages={active.messages} setMessages={setMessages} suggestions={suggestions} />
    </div>
  );
}

/* ═══════════════════════════ GLOSSARY ═══════════════════════════ */

// Wrap known glossary terms in card/answer text with a subtle underline + tooltip.
function GlossaryText({ text }) {
  if (!text) return null;
  // longest-first so multi-word terms match before sub-words
  const terms = GLOSSARY.map((g) => g[0]).sort((a, b) => b.length - a.length);
  const defOf = (t) => (GLOSSARY.find((g) => g[0].toLowerCase() === t.toLowerCase()) || [])[1];
  const re = new RegExp("\\b(" + terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "gi");
  const parts = [];
  let last = 0, m, seen = new Set();
  while ((m = re.exec(text))) {
    const term = m[0];
    if (seen.has(term.toLowerCase())) continue; // link each term once
    seen.add(term.toLowerCase());
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<abbr key={m.index} title={defOf(term)} className="underline decoration-dotted decoration-teal-400 cursor-help">{term}</abbr>);
    last = m.index + term.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Glossary() {
  const [q, setQ] = useState("");
  const shown = GLOSSARY.filter(([t, d]) => !q || (t + " " + d).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${GLOSSARY.length} terms…`}
          className="w-full rounded-xl border border-stone-200 px-9 py-2 text-sm focus:outline-none focus:border-teal-400" />
      </div>
      <div className="space-y-1.5">
        {shown.map(([t, d]) => (
          <div key={t} className="rounded-xl border border-stone-200 bg-white px-3 py-2">
            <div className="text-sm font-semibold text-stone-800">{t}</div>
            <div className="text-xs text-stone-500 leading-relaxed mt-0.5">{d}</div>
          </div>
        ))}
        {shown.length === 0 && <div className="text-center text-sm text-stone-400 py-4">No terms match.</div>}
      </div>
    </div>
  );
}

// Global search across every card (all subjects), modules, and glossary terms.
// Token-rank scoring: exact substring boosts, per-word matches add up.
function searchEverything(allCards, query) {
  const q = query.toLowerCase().trim();
  if (!q) return { cards: [], glossary: [] };
  const words = q.split(/\s+/).filter(Boolean);
  const score = (text) => {
    const t = (text || "").toLowerCase(); let s = 0;
    if (t.includes(q)) s += 10;
    words.forEach((w) => { if (t.includes(w)) s += 2; });
    return s;
  };
  const cards = allCards
    .map((c) => ({ c, s: score(c.front + " " + c.back + " " + c.deck + " " + ((SUBJECTS[c.subject] || {}).label || "")) }))
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 40);
  const glossary = GLOSSARY
    .map(([t, d]) => ({ t, d, s: score(t + " " + d) }))
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 12);
  return { cards, glossary };
}

/* ═══════════════════════════ DSA VISUALIZERS ═══════════════════════════ */

const VIZ_COL = {
  base: "bg-stone-300 dark:bg-stone-600", compare: "bg-amber-400", swap: "bg-rose-400",
  sorted: "bg-emerald-400", key: "bg-teal-500", place: "bg-teal-500",
};

function VizControls({ playing, onPlay, onStep, onReset, atEnd, info }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onPlay} disabled={atEnd}
        className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 text-white px-3 py-2 text-sm font-semibold hover:bg-teal-700 disabled:opacity-40">
        {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Play"}
      </button>
      <button onClick={onStep} disabled={atEnd} className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40"><SkipForward size={15} /> Step</button>
      <button onClick={onReset} className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-600 hover:bg-stone-50"><RotateCcw size={15} /> Reset</button>
      {info != null && <span className="ml-auto text-xs text-stone-400">{info}</span>}
    </div>
  );
}

// Frame-based autoplay used by sorting & search labs.
function useFrames(buildFrames, deps) {
  const [frames, setFrames] = useState(buildFrames);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { setFrames(buildFrames()); setI(0); setPlaying(false); }, deps);
  useEffect(() => {
    if (!playing) return;
    if (i >= frames.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setI((x) => Math.min(frames.length - 1, x + 1)), 650);
    return () => clearTimeout(t);
  }, [playing, i, frames]);
  const atEnd = i >= frames.length - 1;
  return { frames, i, setI, playing, setPlaying, atEnd, reset: () => { setFrames(buildFrames()); setI(0); setPlaying(false); } };
}

function randArr(n = 8, max = 60) { return Array.from({ length: n }, () => 6 + Math.floor(Math.random() * max)); }

// Token-based frames: each value keeps a stable id so bars can be tracked and
// physically slid to their new positions across frames (like the canvas example).
function genSortFrames(algo, src) {
  let toks = src.map((v, i) => ({ v, id: "t" + i }));
  const f = [], n = toks.length, sorted = new Set();
  const snap = (marks) => f.push({ tokens: toks.map((t) => ({ ...t })), sorted: [...sorted], ...marks });
  snap({ msg: "Start" });
  if (algo === "bubble") {
    for (let i = 0; i < n; i++) { for (let j = 0; j < n - 1 - i; j++) { snap({ compare: [j, j + 1], msg: `Compare ${toks[j].v} & ${toks[j + 1].v}` });
      if (toks[j].v > toks[j + 1].v) { [toks[j], toks[j + 1]] = [toks[j + 1], toks[j]]; snap({ swap: [j, j + 1], msg: "Swap — slide them past each other" }); } } sorted.add(n - 1 - i); } sorted.add(0);
  } else if (algo === "selection") {
    for (let i = 0; i < n; i++) { let mi = i; for (let j = i + 1; j < n; j++) { snap({ compare: [mi, j], msg: "Scan for the minimum" }); if (toks[j].v < toks[mi].v) mi = j; }
      if (mi !== i) { [toks[i], toks[mi]] = [toks[mi], toks[i]]; snap({ swap: [i, mi], msg: "Swap min into place" }); } sorted.add(i); }
  } else if (algo === "insertion") {
    sorted.add(0); for (let i = 1; i < n; i++) { let j = i; snap({ key: i, msg: `Insert ${toks[i].v}` });
      while (j > 0 && toks[j - 1].v > toks[j].v) { snap({ compare: [j - 1, j] }); [toks[j - 1], toks[j]] = [toks[j], toks[j - 1]]; snap({ swap: [j - 1, j], msg: "Shift right" }); j--; }
      for (let k = 0; k <= i; k++) sorted.add(k); }
  } else if (algo === "merge") {
    (function ms(lo, hi) { if (lo >= hi) return; const mid = (lo + hi) >> 1; ms(lo, mid); ms(mid + 1, hi);
      const left = toks.slice(lo, mid + 1), right = toks.slice(mid + 1, hi + 1), merged = []; let i = 0, j = 0;
      snap({ range: [lo, hi], msg: "Merge two sorted halves" });
      while (i < left.length && j < right.length) { merged.push(left[i].v <= right[j].v ? left[i++] : right[j++]); }
      while (i < left.length) merged.push(left[i++]);
      while (j < right.length) merged.push(right[j++]);
      for (let k = 0; k < merged.length; k++) toks[lo + k] = merged[k];
      snap({ range: [lo, hi], place: merged.map((_, k) => lo + k), msg: "Slide into merged order" }); })(0, n - 1);
    for (let k = 0; k < n; k++) sorted.add(k);
  }
  snap({ sorted: [...Array(n).keys()], msg: "Sorted!" });
  return f;
}

const SORT_ALGOS = [["bubble", "Bubble"], ["selection", "Selection"], ["insertion", "Insertion"], ["merge", "Merge"]];
const SORT_STEP = 42, SORT_BARW = 32, SORT_H = 200;

function SortingViz() {
  const [algo, setAlgo] = useState("bubble");
  const [src, setSrc] = useState(() => randArr(8));
  const { frames, i, setI, playing, setPlaying, atEnd } = useFrames(() => genSortFrames(algo, src), [algo, src]);
  const f = frames[i] || { tokens: src.map((v, k) => ({ v, id: "t" + k })), sorted: [] };
  const toks = f.tokens;
  const n = toks.length;
  const ids = (frames[0] ? frames[0].tokens : toks).map((t) => t.id);
  const max = Math.max(...toks.map((t) => t.v), 1);
  const idxOf = (id) => toks.findIndex((t) => t.id === id);
  const colorOf = (idx) => {
    if (f.sorted && f.sorted.includes(idx)) return "bg-emerald-400";
    if (f.swap && f.swap.includes(idx)) return "bg-rose-400";
    if (f.compare && f.compare.includes(idx)) return "bg-amber-400";
    if (f.place && f.place.includes(idx)) return "bg-teal-500";
    if (f.key === idx) return "bg-teal-500";
    return "bg-stone-300";
  };
  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-xl bg-stone-200 p-1 text-sm">
        {SORT_ALGOS.map(([k, l]) => (
          <button key={k} onClick={() => setAlgo(k)} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${algo === k ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"}`}>{l}</button>
        ))}
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-4 overflow-x-auto">
        <div className="relative mx-auto" style={{ width: n * SORT_STEP, height: SORT_H }}>
          {ids.map((id) => {
            const idx = idxOf(id);
            const tok = toks[idx];
            const dim = f.range && (idx < f.range[0] || idx > f.range[1]);
            return (
              <div key={id} className="absolute bottom-0 h-full flex flex-col justify-end items-center"
                style={{ width: SORT_BARW, transform: `translateX(${idx * SORT_STEP}px)`, transition: "transform .35s cubic-bezier(.4,0,.2,1)" }}>
                <div className={`w-full rounded-t-md transition-[height,background-color] duration-300 ${colorOf(idx)} ${dim ? "opacity-40" : ""}`}
                  style={{ height: 18 + (tok.v / max) * (SORT_H - 46) }} />
                <div className="mt-1 text-[10px] font-mono text-stone-500">{tok.v}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-center text-xs text-stone-500 h-4">{f.msg || ""}</div>
      </div>
      <VizControls playing={playing} atEnd={atEnd}
        onPlay={() => setPlaying((p) => !p)} onStep={() => setI((x) => Math.min(frames.length - 1, x + 1))}
        onReset={() => setSrc(randArr(8))} info={`Step ${i + 1}/${frames.length}`} />
      <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-500 flex flex-wrap gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400" /> comparing</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-400" /> swapping</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400" /> sorted</span>
      </div>
    </div>
  );
}

function genSearchFrames(arr, target) {
  const f = []; let lo = 0, hi = arr.length - 1;
  f.push({ lo, hi, msg: `Search for ${target} in a sorted array` });
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    f.push({ lo, hi, mid, msg: `Check middle (index ${mid}) = ${arr[mid]}` });
    if (arr[mid] === target) { f.push({ lo, hi, mid, found: mid, msg: `Found ${target}!` }); return f; }
    if (arr[mid] < target) { lo = mid + 1; f.push({ lo, hi, mid, discardL: true, msg: `${arr[mid]} < ${target} → search right half` }); }
    else { hi = mid - 1; f.push({ lo, hi, mid, discardR: true, msg: `${arr[mid]} > ${target} → search left half` }); }
  }
  f.push({ lo, hi, msg: `${target} not found` });
  return f;
}

function SearchViz() {
  const [data, setData] = useState(() => { const a = randArr(10, 40).sort((x, y) => x - y); return { arr: a, target: a[Math.floor(Math.random() * a.length)] }; });
  const { frames, i, setI, playing, setPlaying, atEnd } = useFrames(() => genSearchFrames(data.arr, data.target), [data]);
  const f = frames[i] || {};
  return (
    <div className="space-y-3">
      <div className="text-sm text-stone-600">Target: <span className="font-mono font-bold text-teal-700">{data.target}</span></div>
      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-end justify-center gap-1.5 flex-wrap">
          {data.arr.map((v, idx) => {
            const inRange = f.lo != null && idx >= f.lo && idx <= f.hi;
            const isMid = f.mid === idx;
            const isFound = f.found === idx;
            let cls = "bg-stone-100 text-stone-400 border-stone-200";
            if (inRange) cls = "bg-white text-stone-700 border-stone-300";
            if (isMid) cls = "bg-amber-100 text-amber-800 border-amber-400";
            if (isFound) cls = "bg-emerald-100 text-emerald-800 border-emerald-400";
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center text-sm font-mono font-semibold transition-colors ${cls}`}>{v}</div>
                <div className="text-[9px] text-stone-300 font-mono">{idx}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-center text-xs text-stone-500 h-4">{f.msg || ""}</div>
      </div>
      <VizControls playing={playing} atEnd={atEnd}
        onPlay={() => setPlaying((p) => !p)} onStep={() => setI((x) => Math.min(frames.length - 1, x + 1))}
        onReset={() => { const a = randArr(10, 40).sort((x, y) => x - y); setData({ arr: a, target: a[Math.floor(Math.random() * a.length)] }); }}
        info={`Step ${i + 1}/${frames.length}`} />
    </div>
  );
}

// ── BST explorer ──
function bstInsert(root, key) {
  if (!root) return { key, left: null, right: null };
  if (key < root.key) root.left = bstInsert(root.left, key);
  else if (key > root.key) root.right = bstInsert(root.right, key);
  return root;
}
function bstTraverse(root, order) {
  const out = [];
  (function go(n) { if (!n) return;
    if (order === "pre") out.push(n.key);
    go(n.left);
    if (order === "in") out.push(n.key);
    go(n.right);
    if (order === "post") out.push(n.key);
  })(root);
  return out;
}
function layoutBST(root) {
  const nodes = []; const edges = []; let x = 0;
  (function go(n, depth) { if (!n) return; go(n.left, depth + 1); const px = x++; n._x = px; n._y = depth;
    nodes.push({ key: n.key, x: px, y: depth }); if (n.left) edges.push([px, n._depthLeft]); go(n.right, depth + 1); })(root, 0);
  // recompute edges by linking parent/child via positions
  edges.length = 0;
  (function link(n) { if (!n) return; if (n.left) edges.push([n._x, n._y, n.left._x, n.left._y]); if (n.right) edges.push([n._x, n._y, n.right._x, n.right._y]); link(n.left); link(n.right); })(root);
  return { nodes, edges, width: x };
}

function BSTViz() {
  const [root, setRoot] = useState(() => { let r = null; [50, 30, 70, 20, 40, 60, 80].forEach((k) => { r = bstInsert(r, k); }); return r; });
  const [input, setInput] = useState("");
  const [highlight, setHighlight] = useState([]);
  const [output, setOutput] = useState([]);
  const insertKey = () => { const k = parseInt(input, 10); if (isNaN(k)) return; setRoot((r) => bstInsert(r ? { ...r } : null, k)); setInput(""); setHighlight([]); setOutput([]); };
  const traverse = (order) => {
    const seq = bstTraverse(root, order);
    setOutput([]); setHighlight([]);
    seq.forEach((key, idx) => setTimeout(() => { setHighlight([key]); setOutput((o) => [...o, key]); }, idx * 600));
  };
  const { nodes, edges, width } = layoutBST(root);
  const W = Math.max(width, 1) * 46 + 20, levels = Math.max(...nodes.map((n) => n.y), 0) + 1, H = levels * 60 + 20;
  const px = (x) => 20 + x * 46, py = (y) => 30 + y * 60;
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} type="number" placeholder="value"
          onKeyDown={(e) => { if (e.key === "Enter") insertKey(); }}
          className="w-24 rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-teal-400" />
        <Btn kind="primary" onClick={insertKey}><Plus size={15} /> Insert</Btn>
        <Btn onClick={() => { setRoot(null); setOutput([]); setHighlight([]); }}>Clear</Btn>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-2 overflow-auto">
        {root ? (
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ minWidth: W, maxHeight: 300 }}>
            {edges.map(([x1, y1, x2, y2], k) => <line key={k} x1={px(x1)} y1={py(y1)} x2={px(x2)} y2={py(y2)} stroke="#d6d3d1" strokeWidth="2" />)}
            {nodes.map((n) => {
              const on = highlight.includes(n.key);
              return (
                <g key={n.key}>
                  <circle cx={px(n.x)} cy={py(n.y)} r="16" fill={on ? "#0d9488" : "#f0fdfa"} stroke={on ? "#0d9488" : "#5eead4"} strokeWidth="2" />
                  <text x={px(n.x)} y={py(n.y) + 4} textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="700" fill={on ? "#fff" : "#0f766e"}>{n.key}</text>
                </g>
              );
            })}
          </svg>
        ) : <div className="text-center text-sm text-stone-400 py-8">Empty tree — insert a value.</div>}
      </div>
      <div className="flex flex-wrap gap-2">
        {[["in", "In-order"], ["pre", "Pre-order"], ["post", "Post-order"]].map(([o, l]) => (
          <Btn key={o} onClick={() => traverse(o)} disabled={!root}>{l}</Btn>
        ))}
      </div>
      {output.length > 0 && (
        <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-sm font-mono text-teal-700">{output.join(" → ")}</div>
      )}
      <p className="text-xs text-stone-400">In-order traversal of a BST visits keys in sorted ascending order.</p>
    </div>
  );
}

// ── Stack & Queue ──
function StackQueueViz() {
  const [mode, setMode] = useState("stack");
  const [items, setItems] = useState([7, 3, 9]);
  const [n, setN] = useState(10);
  const push = () => { setItems((s) => [...s, n]); setN(Math.floor(Math.random() * 90) + 10); };
  const pop = () => setItems((s) => s.slice(0, -1));        // stack: remove top (end)
  const dequeue = () => setItems((s) => s.slice(1));         // queue: remove front (start)
  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-xl bg-stone-200 p-1 text-sm">
        {[["stack", "Stack (LIFO)"], ["queue", "Queue (FIFO)"]].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setItems([7, 3, 9]); }} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${mode === k ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"}`}>{l}</button>
        ))}
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-4 min-h-[180px] flex items-center justify-center">
        {mode === "stack" ? (
          <div className="flex flex-col-reverse items-center gap-1.5">
            {items.length === 0 && <div className="text-sm text-stone-400">empty stack</div>}
            {items.map((v, idx) => (
              <div key={idx} className={`w-24 py-2 rounded-lg border text-center font-mono text-sm transition-all ${idx === items.length - 1 ? "bg-teal-50 border-teal-400 text-teal-800" : "bg-white border-stone-200 text-stone-600"}`}>
                {v}{idx === items.length - 1 && <span className="ml-1 text-[10px] text-teal-500">← top</span>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {items.length === 0 && <div className="text-sm text-stone-400">empty queue</div>}
            {items.map((v, idx) => (
              <div key={idx} className={`px-3 py-3 rounded-lg border text-center font-mono text-sm ${idx === 0 ? "bg-amber-50 border-amber-400 text-amber-800" : idx === items.length - 1 ? "bg-teal-50 border-teal-400 text-teal-800" : "bg-white border-stone-200 text-stone-600"}`}>
                {v}
                {idx === 0 && <div className="text-[9px] text-amber-500">front</div>}
                {idx === items.length - 1 && idx !== 0 && <div className="text-[9px] text-teal-500">rear</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Btn kind="primary" onClick={push}><Plus size={15} /> {mode === "stack" ? "Push" : "Enqueue"} {n}</Btn>
        <Btn onClick={mode === "stack" ? pop : dequeue} disabled={!items.length}>{mode === "stack" ? "Pop (top)" : "Dequeue (front)"}</Btn>
      </div>
      <p className="text-xs text-stone-400">{mode === "stack" ? "LIFO — the last item pushed is the first popped." : "FIFO — the first item enqueued is the first dequeued."}</p>
    </div>
  );
}

// ── Linked list ──
function LinkedListViz() {
  const [nodes, setNodes] = useState([{ id: 1, v: 10 }, { id: 2, v: 25 }, { id: 3, v: 40 }]);
  const nextId = useRef(4);
  const rand = () => Math.floor(Math.random() * 90) + 10;
  const mk = () => ({ id: nextId.current++, v: rand() });
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 overflow-x-auto min-h-[120px] flex items-center">
        <div className="flex items-center gap-1">
          {nodes.length === 0 && <span className="text-sm text-stone-400">empty list (head → null)</span>}
          {nodes.map((nd, idx) => (
            <div key={nd.id} className="flex items-center gap-1">
              <div className="relative flex flex-col items-center">
                {idx === 0 && <span className="absolute -top-5 text-[10px] font-semibold text-teal-600">head</span>}
                <div className="flex items-stretch rounded-lg border border-teal-300 overflow-hidden transition-all">
                  <div className="px-3 py-2 font-mono text-sm text-stone-800 bg-teal-50">{nd.v}</div>
                  <div className="px-2 py-2 flex items-center bg-white border-l border-teal-200 text-teal-500"><ArrowRightShort /></div>
                </div>
              </div>
              {idx < nodes.length - 1 && <div className="w-4 h-px bg-stone-300" />}
            </div>
          ))}
          {nodes.length > 0 && <span className="ml-2 text-xs font-mono text-stone-400">→ null</span>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Btn kind="primary" onClick={() => setNodes((ns) => [mk(), ...ns])}><Plus size={14} /> Insert head</Btn>
        <Btn onClick={() => setNodes((ns) => [...ns, mk()])}><Plus size={14} /> Insert tail</Btn>
        <Btn onClick={() => setNodes((ns) => ns.slice(1))} disabled={!nodes.length}>Delete head</Btn>
        <Btn onClick={() => setNodes((ns) => ns.slice(0, -1))} disabled={!nodes.length}>Delete tail</Btn>
      </div>
      <p className="text-xs text-stone-400">Each node stores a value and a pointer to the next. Insert/delete at the head is O(1) — just relink pointers, no shifting like an array.</p>
    </div>
  );
}
function ArrowRightShort() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }

// ── Big-O growth chart (interactive) ──
const BIGO_CLASSES = [
  { k: "O(1)", f: () => 1, col: "#10b981" },
  { k: "O(log n)", f: (n) => Math.log2(n), col: "#0ea5e9" },
  { k: "O(n)", f: (n) => n, col: "#14b8a6" },
  { k: "O(n log n)", f: (n) => n * Math.log2(n), col: "#f59e0b" },
  { k: "O(n²)", f: (n) => n * n, col: "#f43f5e" },
];
function ComplexityViz() {
  const [n, setN] = useState(16);
  const MAXX = 32, W = 320, H = 200, pad = 8;
  const maxY = Math.log2(MAXX * MAXX + 1); // log-scale by the largest curve (n²)
  const sx = (x) => pad + (x / MAXX) * (W - 2 * pad);
  const sy = (val) => H - pad - (Math.log2(val + 1) / maxY) * (H - 2 * pad);
  const path = (f) => { let d = ""; for (let x = 1; x <= MAXX; x++) d += (x === 1 ? "M" : "L") + sx(x).toFixed(1) + " " + sy(f(x)).toFixed(1) + " "; return d; };
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-stone-200 bg-white p-3">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 220 }}>
          <line x1={sx(n)} y1={pad} x2={sx(n)} y2={H - pad} stroke="#e7e5e4" strokeWidth="1.5" strokeDasharray="4 3" />
          {BIGO_CLASSES.map((c) => <path key={c.k} d={path(c.f)} fill="none" stroke={c.col} strokeWidth="2.5" />)}
          {BIGO_CLASSES.map((c) => <circle key={c.k} cx={sx(n)} cy={sy(c.f(n))} r="3.5" fill={c.col} />)}
        </svg>
      </div>
      <div>
        <div className="flex items-center justify-between text-sm text-stone-600 mb-1">
          <span>Input size n</span><span className="font-mono font-bold text-teal-700">{n}</span>
        </div>
        <input type="range" min="2" max={MAXX} value={n} onChange={(e) => setN(+e.target.value)} className="w-full accent-teal-600" />
      </div>
      <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 space-y-1">
        {BIGO_CLASSES.map((c) => (
          <div key={c.k} className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: c.col }} /> {c.k}</span>
            <span className="font-mono text-stone-600">≈ {Math.max(1, Math.round(c.f(n)))} ops</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-stone-400">Drag n and watch how each complexity class grows. O(n²) explodes; O(log n) barely moves.</p>
    </div>
  );
}

/* ═══════════════════════════ APP ═══════════════════════════ */
const DARK_CSS = [
  "@keyframes gt-confetti { to { transform: translateY(110vh) rotate(720deg); opacity: .15; } }",
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
  ".dark .text-sky-800   { color: #7dd3fc; }",
  ".dark .text-sky-900   { color: #bae6fd; }",
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

const ONBOARDED_KEY = "gt_onboarded_v1";
function isOnboarded() { try { return !!window.localStorage.getItem(ONBOARDED_KEY); } catch { return true; } }
function markOnboarded() { try { window.localStorage.setItem(ONBOARDED_KEY, "1"); } catch {} }

// First-run welcome: brief intro + optional Groq key & model.
const ACCENTS = {
  sky:     "bg-sky-50 text-sky-700",
  teal:    "bg-teal-50 text-teal-700",
  orange:  "bg-orange-50 text-orange-700",
  emerald: "bg-emerald-50 text-emerald-700",
  rose:    "bg-rose-50 text-rose-700",
};

const HOW_TO_STEPS = [
  { icon: ArrowLeftRight, accent: "sky",     title: "Pick a subject", text: "Switch between German and React anytime with the toggle at the top." },
  { icon: Brain,          accent: "teal",    title: "Study what's due", text: "On Study, flip each card, then rate how well you knew it — Again (now), Hard (10m), Good (1h), Easy (1d). Hard cards come back sooner. Misclick? Hit Undo." },
  { icon: Target,         accent: "orange",  title: "Practice & quiz", text: "Practice has quizzes, Timed Sprints (great before a test), and every flashcard module. Open a module to flip it, see the Overview, or 'Study this module'." },
  { icon: Plus,           accent: "emerald", title: "Add your own cards", text: "In Manage, paste/type cards or let AI generate and auto-sort them into modules. Back up your progress there too." },
  { icon: MessageCircle,  accent: "rose",    title: "Ask the AI tutor", text: "Tap 'Chat about this' on any card or quiz answer, or use the Tutor tab — it can even add cards, make quizzes, and start study for you." },
];

// Friendly study illustration (inline SVG — no assets needed).
function StudyHeroArt({ className = "" }) {
  return (
    <svg viewBox="0 0 220 130" className={className} role="img" aria-label="Flashcards illustration">
      <rect x="34" y="34" width="96" height="68" rx="12" fill="#ccfbf1" transform="rotate(-7 82 68)" />
      <rect x="60" y="30" width="100" height="70" rx="12" fill="#ffffff" stroke="#0d9488" strokeWidth="2.5" />
      <text x="110" y="60" fontSize="22" textAnchor="middle" fill="#0f766e" fontFamily="Georgia, serif" fontStyle="italic">Hallo</text>
      <line x1="80" y1="72" x2="140" y2="72" stroke="#e7e5e4" strokeWidth="2" />
      <text x="110" y="88" fontSize="12" textAnchor="middle" fill="#78716c">hello</text>
      <g fill="#38bdf8">
        <path d="M178 30 l3.5 8 8 3.5 -8 3.5 -3.5 8 -3.5 -8 -8 -3.5 8 -3.5z" />
        <path d="M196 60 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2z" />
      </g>
      <circle cx="54" cy="98" r="14" fill="#0d9488" />
      <path d="M47 98 l5 5 9 -10" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Reusable illustrated how-to guide (onboarding + in-app Help).
function HowToGuide() {
  return (
    <div className="space-y-2.5">
      {HOW_TO_STEPS.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} className="flex gap-3 rounded-xl bg-stone-50 border border-stone-200 p-3">
            <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${ACCENTS[s.accent]}`}><Icon size={17} /></div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-stone-800">{i + 1}. {s.title}</div>
              <div className="text-xs text-stone-500 leading-relaxed mt-0.5">{s.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Onboarding({ onDone }) {
  const [step, setStep]   = useState(0);
  const [key, setKey]     = useState(loadGroqKey);
  const [model, setModel] = useState(loadGroqModel);
  function finish() { saveGroqKey(key.trim()); saveGroqModel(model); markOnboarded(); onDone(); }
  function skip()   { saveGroqModel(model); markOnboarded(); onDone(); }
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 space-y-4 max-h-[92vh] overflow-auto">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center"><Brain size={24} /></div>
        </div>

        {step === 0 ? (
          <>
            <StudyHeroArt className="w-44 h-auto mx-auto" />
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome 👋</h1>
              <p className="text-sm text-stone-500 mt-1">A spaced-repetition trainer for <span className="font-medium text-stone-700">German</span> &amp; <span className="font-medium text-stone-700">React</span>. Here's how to study:</p>
            </div>
            <HowToGuide />
            <button onClick={() => setStep(1)} className="w-full rounded-xl bg-teal-600 text-white py-3 font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
              Next <ChevronRight size={17} />
            </button>
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">Turn on AI</h1>
              <p className="text-sm text-stone-500 mt-1">Optional — powers explanations, quizzes, auto-categorize, and the tutor. You can add this later in Manage.</p>
            </div>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 space-y-3">
              <div>
                <label className="block text-xs text-stone-400 mb-1">
                  Groq API key — <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">get one free</a> · stored only on this device
                </label>
                <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="gsk_…" autoComplete="off"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-mono focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">AI model</label>
                <div className="relative">
                  <select value={model} onChange={(e) => setModel(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:border-teal-400">
                    {GROQ_MODELS.map((m) => <option key={m.id} value={m.id}>{m.label} — {m.sub}</option>)}
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>
              </div>
            </div>
            <button onClick={finish} className="w-full rounded-xl bg-teal-600 text-white py-3 font-semibold hover:bg-teal-700 transition-colors">Get started</button>
            <div className="flex items-center justify-between text-xs">
              <button onClick={() => setStep(0)} className="text-stone-400 hover:text-stone-600 inline-flex items-center gap-1"><ArrowLeft size={13} /> Back</button>
              <button onClick={skip} className="text-stone-400 hover:text-stone-600">Skip — add a key later</button>
            </div>
          </>
        )}

        <div className="flex justify-center gap-1.5 pt-1">
          {[0, 1].map((i) => <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? "w-5 bg-teal-600" : "w-1.5 bg-stone-300"}`} />)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [data,     setData]     = useState(null);
  const [tab,      setTab]      = useState("study");   // study | practice | manage
  const [subview,  setSubview]  = useState(null);      // null = home, else string
  const [agentQuiz, setAgentQuiz] = useState(null);    // questions the agent generated to play
  const [session,  setSession]  = useState(null);      // null | { cram, resume } when active
  const [flash,    setFlash]    = useState("");
  const [persistent, setPersistent] = useState(true);
  const [dark, setDark] = useState(false);
  const [onboarded, setOnboarded] = useState(isOnboarded);
  const [installPrompt, setInstallPrompt] = useState(null); // captured beforeinstallprompt event
  const [search, setSearch] = useState(""); // global study-tab search
  const [celebrate, setCelebrate] = useState([]); // queue of {kind:'level'|'achievement', ...}

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

  function buyItem(item) {
    const g = data.game || defaultGame();
    if ((g.cosmetics.owned || []).includes(item.id) || g.coins < item.cost) return;
    commit((d) => ({ ...d, game: { ...d.game, coins: d.game.coins - item.cost,
      cosmetics: { ...d.game.cosmetics, owned: [...(d.game.cosmetics.owned || []), item.id],
        equipped: { ...d.game.cosmetics.equipped, [item.type]: item.value } } } }));
    if (g.sound) playSfx("unlock"); showFlash("Unlocked " + item.name);
  }
  function equipItem(item) {
    commit((d) => ({ ...d, game: { ...d.game, cosmetics: { ...d.game.cosmetics,
      equipped: { ...d.game.cosmetics.equipped, [item.type]: d.game.cosmetics.equipped[item.type] === item.value ? "" : item.value } } } }));
  }

  // Central gamification event: award XP/coins, track stats/daily/history, detect level-ups & achievements.
  function gameEvent(type, payload = {}) {
    const today = todayStr();
    const cur = data.game || defaultGame();
    let g = cur.daily.day !== today
      ? { ...cur, daily: { day: today, reviewed: 0, quizzes: 0, modules: 0, claimed: false } }
      : { ...cur };
    g = { ...g, stats: { ...g.stats }, daily: { ...g.daily }, history: { ...g.history }, flags: { ...g.flags }, achievements: { ...g.achievements } };
    let addXp = 0;
    if (type === "review") {
      addXp = XP_REVIEW[payload.rating] || 4;
      g.stats.reviews++; g.daily.reviewed++;
      g.history[today] = (g.history[today] || 0) + 1;
      g.stats.mostReviewsDay = Math.max(g.stats.mostReviewsDay || 0, g.history[today]);
    } else if (type === "quizAnswer") {
      if (payload.ok) { addXp = Math.round(XP_QUIZ_CORRECT * (payload.mult || 1)); g.stats.correct++; }
    } else if (type === "quizDone") {
      g.stats.quizzes++; g.daily.quizzes++;
      g.stats.bestQuizPct = Math.max(g.stats.bestQuizPct || 0, payload.pct || 0);
      if (payload.pct === 100) { g.stats.perfect++; addXp += XP_PERFECT_BONUS; }
    } else if (type === "module") { g.daily.modules++; }
    else if (type === "flag") { g.flags[payload.flag] = true; }
    g.xp += addXp;
    const sc = (data.streak && data.streak.lastDay) ? data.streak.count : 0;
    g.longestStreak = Math.max(g.longestStreak || 0, sc);
    // achievements
    const unlocked = checkAchievements(g, data);
    unlocked.forEach((a) => { g.achievements[a.id] = today; g.xp += a.xp || 0; g.coins += a.coins || 0; });
    // level-up (after achievement XP too)
    const before = levelInfo(cur.xp).level, after = levelInfo(g.xp).level;
    if (after > before) g.coins += (after - before) * COINS_PER_LEVEL;
    g.stats.level = after;
    commit((d) => ({ ...d, game: g }));
    if (after > before) setCelebrate((c) => [...c, { kind: "level", level: after }]);
    unlocked.forEach((a) => setCelebrate((c) => [...c, { kind: "achievement", a }]));
    if (g.sound) { if (after > before) playSfx("levelup"); else if (unlocked.length) playSfx("unlock"); else if (addXp > 0 && type !== "review") playSfx("correct"); }
  }

  function addCards(list, deck) {
    const subj = (data && data.subject) || "german";
    const created = list.map((c) => newCard(c.front, c.back, c.deck || deck, null, undefined, subj));
    commit((d) => ({ ...d, cards: [...d.cards, ...created] }));
    const decksUsed = [...new Set(created.map((c) => c.deck))];
    showFlash("Added " + created.length + " card(s)" + (decksUsed.length === 1 ? " to '" + decksUsed[0] + "'" : " across " + decksUsed.length + " modules"));
  }

  // Backup / restore — guards progress against any reset.
  function exportData() {
    try {
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "german-trainer-backup-" + todayStr() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showFlash("Progress exported");
    } catch { showFlash("Export failed"); }
  }
  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || !Array.isArray(parsed.cards)) { showFlash("Invalid backup file"); return; }
        const migrated = migrate(parsed);
        setSession(null); setSubview(null); setTab("study");
        commit(() => migrated);
        if (migrated.settings && migrated.settings.dark != null) setDark(migrated.settings.dark);
        showFlash("Restored " + migrated.cards.length + " cards");
      } catch { showFlash("Could not read that backup file"); }
    };
    reader.readAsText(file);
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

  // Capture the install prompt so we can offer an in-app "Install app" button.
  useEffect(() => {
    function onPrompt(e) { e.preventDefault(); setInstallPrompt(e); }
    function onInstalled() { setInstallPrompt(null); }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => { window.removeEventListener("beforeinstallprompt", onPrompt); window.removeEventListener("appinstalled", onInstalled); };
  }, []);

  async function installApp() {
    if (!installPrompt) return;
    installPrompt.prompt();
    try { await installPrompt.userChoice; } catch {}
    setInstallPrompt(null);
  }

  // Browser/hardware Back button: unwind in-app navigation instead of leaving the site.
  useEffect(() => {
    const deep = !!(session || subview || tab !== "study");
    // Arm a history "trap" whenever we're in a deep view, so Back fires popstate.
    if (deep && !(window.history.state && window.history.state.trap)) {
      window.history.pushState({ trap: true }, "");
    }
    function onPop() {
      // Back was pressed — step back one in-app level and re-arm the trap.
      if (session)            { setSession(null); window.history.pushState({ trap: true }, ""); }
      else if (subview)       { setSubview(null); window.history.pushState({ trap: true }, ""); }
      else if (tab !== "study") { setTab("study"); window.history.pushState({ trap: true }, ""); }
      // else: at home — let the browser navigate away normally.
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [session, subview, tab]);

  // Award explorer achievements when the tutor or a visualizer is first opened.
  useEffect(() => {
    if (!data) return;
    const g = data.game || {};
    if (tab === "tutor" && !(g.flags && g.flags.tutor)) gameEvent("flag", { flag: "tutor" });
    if (subview && subview.startsWith("viz:") && !(g.flags && g.flags.viz)) gameEvent("flag", { flag: "viz" });
  }, [tab, subview]);

  if (!onboarded) {
    return <Onboarding onDone={() => setOnboarded(true)} />;
  }

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
  // decks (modules) present in this subject, with counts, sorted
  const deckCounts = cards.reduce((m, c) => { m[c.deck] = (m[c.deck] || 0) + 1; return m; }, {});
  const subjectDecks = Object.keys(deckCounts).sort();
  const now = Date.now();
  // cards "to study" per deck = new (unlearned) or due for review
  const deckToStudy = cards.reduce((m, c) => {
    if (c.state === "new" || c.due <= now) m[c.deck] = (m[c.deck] || 0) + 1;
    return m;
  }, {});
  const moduleSub = (d) => {
    const total = deckCounts[d], todo = deckToStudy[d] || 0;
    return todo > 0
      ? <span><span className="text-teal-600 font-semibold">{todo} to study</span> · {total}</span>
      : <span>{total} cards · <span className="text-emerald-600">done</span></span>;
  };
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

  // Study one module via SRS (all its cards; ratings count).
  function studyModule(deckName) {
    commit((d) => ({ ...d, session: null }));
    setSession({ studyAll: true, deck: deckName });
    gameEvent("module");
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
  const game = data.game || defaultGame();
  const celebrationOverlay = celebrate.length > 0
    ? <CelebrationModal item={celebrate[0]} onClose={() => setCelebrate((c) => c.slice(1))} />
    : null;

  if (session) {
    const resuming = session.resume && savedSession;
    const sessionCards = (!resuming && session.deck) ? cards.filter((c) => c.deck === session.deck) : cards;
    const moduleLabel = session.deck ? session.deck.replace(/^React · /, "") : null;
    return (
      <>
        <DarkToggle dark={dark} onToggle={toggleDark} />
        {celebrationOverlay}
        <div className="min-h-screen bg-stone-100">
          <div className="mx-auto max-w-xl px-4 py-6">
            <button onClick={() => setSession(null)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 mb-5">
              <ArrowLeft size={17} /> Save &amp; exit
            </button>
            {moduleLabel && <h2 className="text-lg font-bold text-stone-800 mb-3">Studying · {moduleLabel}</h2>}
          <SRSSession
            cards={sessionCards}
            maxNew={newAvail}
            cram={session.cram}
            studyAll={session.studyAll}
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
              gameEvent("review", { rating });
            }}
            onProgress={(queue, done, cram) => {
              commit((d) => ({ ...d, session: queue.length ? { subject, cram, deck: session.deck || null, queue, done } : null }));
            }}
            onEditCard={(id, fields) => commit((d) => ({ ...d, cards: d.cards.map((c) => c.id === id ? { ...c, ...fields } : c) }))}
            onUndo={(prevCard, wasNew) => commit((d) => ({
              ...d,
              cards: d.cards.map((c) => c.id === prevCard.id ? prevCard : c),
              daily: wasNew ? { ...d.daily, newDone: Math.max(0, d.daily.newDone - 1) } : d.daily,
            }))}
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

    if (subview === "truefalse") { title = "True / False"; content = <Exam make={() => buildN(genTF, 12)} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "numbers")   { title = "Numbers"; content = <NumTrainer />; }
    else if (subview === "reading")   { title = "Reading"; content = <Exam make={() => buildN(genReading, 8)} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "en2de")     { title = "EN → DE"; content = <Exam make={() => buildN(genEN2DE, 12)} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "countries") { title = "Languages"; content = <Exam make={() => buildN(genCountry, 12)} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "time")      { title = "Time";     content = <Exam make={() => buildN(genTime, 10)} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "reactquiz") { title = "React Quiz"; content = <Exam make={() => makeReactQuiz(15)} subjectLabel="React" onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "dsaquiz")   { title = "DSA Quiz"; content = <Exam make={() => makeDsaQuiz(15)} subjectLabel="DSA" onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "aptquiz")   { title = "Aptitude Quiz"; content = <Exam make={() => makeAptitudeQuiz(15)} subjectLabel="Aptitude" onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "glossary")  { title = "Glossary"; content = <Glossary />; }
    else if (subview === "viz:sorting")    { title = "Sorting Lab"; content = <SortingViz />; }
    else if (subview === "viz:search")     { title = "Binary Search"; content = <SearchViz />; }
    else if (subview === "viz:bst")        { title = "BST Explorer"; content = <BSTViz />; }
    else if (subview === "viz:stackqueue") { title = "Stack & Queue"; content = <StackQueueViz />; }
    else if (subview === "viz:linkedlist") { title = "Linked List"; content = <LinkedListViz />; }
    else if (subview === "viz:complexity") { title = "Big-O Growth"; content = <ComplexityViz />; }
    else if (subview === "aiquiz")    { title = "AI Quiz Generator"; content = <AIQuizMaker subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview === "timed")     { title = "Timed Sprint"; content = <TimedQuiz subject={subject} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />; }
    else if (subview.startsWith("cards:")) {
      const dname = subview.slice(6);
      title = dname.replace(/^React · /, "");
      const inDeck = cards.filter((c) => c.deck === dname);
      const savedMod = data.session && data.session.subject === subject && data.session.deck === dname ? data.session : null;
      content = inDeck.length ? (
        <ModuleView
          deckName={dname}
          cardObjs={inDeck}
          savedMod={savedMod}
          subjectLabel={subjMeta.label}
          onStudy={() => studyModule(dname)}
          onResume={() => setSession({ resume: true, cram: savedMod.cram, deck: dname })}
          onEdit={(id, fields) => commit((d) => ({ ...d, cards: d.cards.map((c) => c.id === id ? { ...c, ...fields } : c) }))}
          onDelete={(id) => commit((d) => ({ ...d, cards: d.cards.filter((c) => c.id !== id) }))}
        />
      ) : <div className="text-sm text-stone-400">This module is empty.</div>;
    }
    else if (subview === "help") {
      title = "How to use the app";
      content = (
        <div className="space-y-4">
          <StudyHeroArt className="w-48 h-auto mx-auto" />
          <HowToGuide />
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Keyboard shortcuts (study)</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-stone-500">
              <div><kbd className="rounded border border-stone-300 bg-white px-1">Space</kbd> reveal answer</div>
              <div><kbd className="rounded border border-stone-300 bg-white px-1">1–4</kbd> rate Again/Hard/Good/Easy</div>
              <div><kbd className="rounded border border-stone-300 bg-white px-1">U</kbd> undo last rating</div>
              <div><kbd className="rounded border border-stone-300 bg-white px-1">Esc</kbd> / Back to exit</div>
            </div>
          </div>
          <Btn onClick={() => { try { window.localStorage.removeItem(STUDY_TOUR_KEY); } catch {} showFlash("Walkthrough will show on your next study session"); }}>
            <RotateCcw size={14} /> Replay study walkthrough
          </Btn>
          <p className="text-xs text-stone-400">Tip: AI features (explanations, quizzes, tutor, auto-categorize) need a free Groq key — add it in Manage → AI settings.</p>
        </div>
      );
    }
    else if (subview === "agentquiz") { title = "AI Quiz"; content = agentQuiz && agentQuiz.length
      ? <Exam make={() => agentQuiz} subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />
      : <div className="text-sm text-stone-400">No quiz to show.</div>; }
    else if (subview.startsWith("test:")) {
      const n = subview.split(":")[1];
      title = "Mock Test " + n;
      content = <Exam make={buildTest} sectioned subjectLabel={subjMeta.label} onAddMissed={addMissed} onGame={gameEvent} />;
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
        {celebrationOverlay}
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
        {celebrationOverlay}
        <button onClick={() => setSubview("help")} aria-label="How to use the app" title="How to use the app"
          style={{ position: "fixed", top: 14, right: 58, zIndex: 9999, width: 36, height: 36, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: dark ? "#292524" : "#ffffff", border: "1px solid " + (dark ? "#57534e" : "#e7e5e4"),
            color: dark ? "#e2e8f0" : "#57534e", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,.12)" }}>
          <HelpCircle size={18} />
        </button>

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
            <XpStrip game={game} onProfile={() => setTab("profile")} />
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

            {/* global search — everything, everywhere */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search everything — cards, modules, glossary…"
                className="w-full rounded-xl border border-stone-200 bg-white pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-teal-400" />
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500"><X size={15} /></button>}
            </div>

            {search.trim() ? (() => {
              const res = searchEverything(data.cards, search);
              const jump = (c) => { commit((d) => ({ ...d, subject: c.subject || "german" })); setSearch(""); setSubview("cards:" + c.deck); };
              return (
                <div className="space-y-3">
                  {res.glossary.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1.5">Glossary</div>
                      <div className="space-y-1.5">
                        {res.glossary.map(({ t, d }) => (
                          <div key={t} className="rounded-xl border border-stone-200 bg-white px-3 py-2">
                            <div className="text-sm font-semibold text-stone-800">{t}</div>
                            <div className="text-xs text-stone-500 leading-relaxed">{d}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1.5">{res.cards.length} card{res.cards.length !== 1 ? "s" : ""}</div>
                    <div className="space-y-1.5 max-h-[55vh] overflow-auto pr-1">
                      {res.cards.map(({ c }) => (
                        <button key={c.id} onClick={() => jump(c)} className="w-full text-left rounded-xl border border-stone-200 bg-white px-3 py-2 hover:border-teal-300 hover:shadow-sm transition-all">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-600">{(SUBJECTS[c.subject] || {}).label || c.subject}</span>
                            <span className="text-[10px] text-stone-300">{c.deck}</span>
                          </div>
                          <div className="text-sm font-medium text-stone-800 break-words">{c.front}</div>
                          <div className="text-xs text-stone-400 break-words line-clamp-2">{c.back}</div>
                        </button>
                      ))}
                      {res.cards.length === 0 && res.glossary.length === 0 && <div className="text-center text-sm text-stone-400 py-6">Nothing matches "{search}".</div>}
                    </div>
                  </div>
                </div>
              );
            })() : (
            <>
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
                <button onClick={() => setSession({ cram: savedSession.cram, deck: savedSession.deck, resume: true })}
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
            </>
            )}
          </div>
        )}

        {/* ─── PRACTICE TAB ─── */}
        {tab === "practice" && subject === "aptitude" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="font-serif italic text-teal-700">Practice</span> · Aptitude
            </h1>
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
              📌 Exam — Aptitude-I DILR: MCQ (12:00–12:30 PM) & Theory (1:00–3:00 PM), 24 Jun 2026.
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2.5"><span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Quizzes</span><div className="h-px flex-1 bg-stone-200" /></div>
              <div className="grid grid-cols-2 gap-2.5">
                <Tile label="Aptitude Quiz" sub={`${APTITUDE_QUIZ.length} MCQs · shuffled`} icon={ListChecks} onClick={() => setSubview("aptquiz")} />
                <Tile label="Timed Sprint" sub="best quiz in your time" icon={Clock} onClick={() => setSubview("timed")} />
                <Tile label="AI Quiz" sub="generate from a topic" icon={Wand2} onClick={() => setSubview("aiquiz")} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2.5"><span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Topic modules</span><div className="h-px flex-1 bg-stone-200" /></div>
              <div className="grid grid-cols-2 gap-2.5">
                {subjectDecks.map((d) => (
                  <Tile key={d} label={d.replace(/^Aptitude · /, "")} sub={moduleSub(d)} icon={Layers} onClick={() => setSubview("cards:" + d)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "practice" && subject === "dsa" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="font-serif italic text-teal-700">Practice</span> · DSA
            </h1>
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Visualize &amp; play</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Tile label="Sorting Lab" sub="animate 4 algorithms" icon={Binary} onClick={() => setSubview("viz:sorting")} />
                <Tile label="Binary Search" sub="watch the range shrink" icon={Target} onClick={() => setSubview("viz:search")} />
                <Tile label="BST Explorer" sub="insert & traverse" icon={GitBranch} onClick={() => setSubview("viz:bst")} />
                <Tile label="Stack & Queue" sub="LIFO vs FIFO" icon={Layers} onClick={() => setSubview("viz:stackqueue")} />
                <Tile label="Linked List" sub="insert & relink" icon={Network} onClick={() => setSubview("viz:linkedlist")} />
                <Tile label="Big-O Chart" sub="growth rates, live" icon={LineChart} onClick={() => setSubview("viz:complexity")} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Quizzes</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Tile label="DSA Quiz" sub={`${DSA_QUIZ.length} MCQs · shuffled`} icon={ListChecks} onClick={() => setSubview("dsaquiz")} />
                <Tile label="Timed Sprint" sub="best quiz in your time" icon={Clock} onClick={() => setSubview("timed")} />
                <Tile label="AI Quiz" sub="generate from a topic" icon={Wand2} onClick={() => setSubview("aiquiz")} />
                <Tile label="Glossary" sub={`${GLOSSARY.length} key terms`} icon={BookText} onClick={() => setSubview("glossary")} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Flashcard modules</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {subjectDecks.map((d) => (
                  <Tile key={d} label={d.replace(/^DSA · /, "")} sub={moduleSub(d)} icon={Layers} onClick={() => setSubview("cards:" + d)} />
                ))}
              </div>
            </div>
          </div>
        )}

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

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Flashcard modules</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {subjectDecks.map((d) => (
                  <Tile key={d} label={d.replace(/^React · /, "")} sub={moduleSub(d)} icon={Layers} onClick={() => setSubview("cards:" + d)} />
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-500 leading-relaxed">
              Open any module to flip through its cards or take a deck quiz. After answering a quiz question, tap <span className="font-semibold text-stone-700">Explain with AI</span> for a breakdown.
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
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Flashcard modules</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {subjectDecks.map((d) => (
                  <Tile key={d} label={d} sub={moduleSub(d)} icon={Layers} onClick={() => setSubview("cards:" + d)} />
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
              <AddCards onAdd={addCards} decks={subjectDecks} subjectLabel={subjMeta.label} />
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

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Backup &amp; restore</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 space-y-3">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700"><Database size={14} className="text-teal-600" /> Your progress</div>
                <p className="text-xs text-stone-400 leading-relaxed">Save a backup file with all your cards and progress, then restore it on any device or after a reset.</p>
                <div className="flex gap-2">
                  <Btn onClick={exportData}><Download size={15} /> Export backup</Btn>
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium px-4 py-2.5 bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 cursor-pointer">
                    <Upload size={15} /> Restore
                    <input type="file" accept="application/json,.json" className="hidden"
                      onChange={(e) => { importData(e.target.files && e.target.files[0]); e.target.value = ""; }} />
                  </label>
                </div>
                <p className="text-[11px] text-stone-400">Restoring replaces your current progress with the backup's.</p>
              </div>
            </div>

            {installPrompt && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Install</span>
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 space-y-3">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700"><Download size={14} className="text-teal-600" /> Install as an app</div>
                  <p className="text-xs text-stone-400 leading-relaxed">Add the trainer to your home screen / desktop for a full-screen, offline-capable app.</p>
                  <Btn kind="primary" onClick={installApp}><Download size={15} /> Install app</Btn>
                </div>
              </div>
            )}
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

        {tab === "profile" && (() => {
          const lvl = levelInfo(game.xp);
          const quests = [
            { label: "Review 20 cards", cur: game.daily.reviewed, target: 20 },
            { label: "Finish a quiz", cur: game.daily.quizzes, target: 1 },
            { label: "Practice a module", cur: game.daily.modules, target: 1 },
          ];
          const allDone = quests.every((q) => q.cur >= q.target);
          const days = Array.from({ length: 70 }, (_, k) => new Date(Date.now() - (69 - k) * 86400000).toISOString().slice(0, 10));
          const maxH = Math.max(1, ...days.map((d) => game.history[d] || 0));
          const heatCol = (n) => n === 0 ? "bg-stone-200" : n >= maxH * 0.66 ? "bg-teal-600" : n >= maxH * 0.33 ? "bg-teal-400" : "bg-teal-200";
          const unlocked = ACHIEVEMENTS.filter((a) => game.achievements[a.id]).length;
          return (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold tracking-tight"><span className="font-serif italic text-teal-700">Profile</span></h1>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-3xl">{game.cosmetics.equipped.avatar || DEFAULT_AVATAR}</div>
                <div>
                  <div className="text-lg font-bold text-stone-800">{data.profile && data.profile.name ? data.profile.name : "You"}</div>
                  {game.cosmetics.equipped.title && <div className="text-xs font-semibold text-teal-600">{game.cosmetics.equipped.title}</div>}
                </div>
              </div>
              <XpStrip game={game} onProfile={() => {}} />

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center"><div className="text-2xl font-bold text-orange-500">🔥 {streakCount}</div><div className="text-[11px] text-stone-400 mt-0.5">streak · best {game.longestStreak}</div></div>
                <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center"><div className="text-2xl font-bold text-teal-600">{game.stats.reviews}</div><div className="text-[11px] text-stone-400 mt-0.5">reviews</div></div>
                <div className="rounded-2xl border border-stone-200 bg-white p-3 text-center"><div className="text-2xl font-bold text-stone-700">{unlocked}/{ACHIEVEMENTS.length}</div><div className="text-[11px] text-stone-400 mt-0.5">trophies</div></div>
              </div>

              {/* daily quests */}
              <div>
                <div className="flex items-center gap-2 mb-2.5"><span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Daily quests</span><div className="h-px flex-1 bg-stone-200" /></div>
                <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3">
                  {quests.map((q) => (
                    <div key={q.label}>
                      <div className="flex justify-between text-xs mb-1"><span className={q.cur >= q.target ? "text-teal-700 font-medium" : "text-stone-600"}>{q.cur >= q.target ? "✓ " : ""}{q.label}</span><span className="text-stone-400">{Math.min(q.cur, q.target)}/{q.target}</span></div>
                      <div className="h-2 rounded-full bg-stone-200 overflow-hidden"><div className="h-full bg-teal-500 transition-all" style={{ width: `${Math.min(100, (q.cur / q.target) * 100)}%` }} /></div>
                    </div>
                  ))}
                  <button disabled={!allDone || game.daily.claimed}
                    onClick={() => { commit((d) => ({ ...d, game: { ...d.game, coins: d.game.coins + 50, xp: d.game.xp + 30, daily: { ...d.game.daily, claimed: true } } })); setCelebrate((c) => [...c, { kind: "achievement", a: { name: "Daily goals complete!", desc: "+50 coins, +30 XP", icon: "✅", tier: "gold", xp: 30, coins: 50 } }]); if (game.sound) playSfx("levelup"); }}
                    className="w-full rounded-xl bg-teal-600 text-white py-2.5 text-sm font-semibold hover:bg-teal-700 disabled:opacity-40 disabled:bg-stone-300">
                    {game.daily.claimed ? "Claimed today ✓" : allDone ? "Claim 50 🪙 + 30 XP" : "Complete all quests to claim"}
                  </button>
                </div>
              </div>

              {/* trophy case */}
              <div>
                <div className="flex items-center gap-2 mb-2.5"><span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Trophy case</span><div className="h-px flex-1 bg-stone-200" /></div>
                <div className="grid grid-cols-2 gap-2.5">
                  {ACHIEVEMENTS.map((a) => {
                    const got = game.achievements[a.id];
                    return (
                      <div key={a.id} className={`rounded-xl border p-3 flex items-center gap-2.5 ${got ? "bg-white border-stone-200" : "bg-stone-50 border-stone-200 opacity-60"}`}>
                        <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg ${got ? "" : "grayscale"}`}>{got ? a.icon : "🔒"}</div>
                        <div className="min-w-0"><div className="text-sm font-semibold text-stone-800 truncate">{a.name}</div><div className="text-[11px] text-stone-400 leading-tight">{a.desc}</div></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* activity heatmap */}
              <div>
                <div className="flex items-center gap-2 mb-2.5"><span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Activity · last 10 weeks</span><div className="h-px flex-1 bg-stone-200" /></div>
                <div className="rounded-2xl border border-stone-200 bg-white p-3">
                  <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                    {days.map((d) => <div key={d} title={`${d}: ${game.history[d] || 0} reviews`} className={`w-3.5 h-3.5 rounded-sm ${heatCol(game.history[d] || 0)}`} />)}
                  </div>
                </div>
              </div>

              {/* shop */}
              <div>
                <div className="flex items-center gap-2 mb-2.5"><span className="text-xs font-semibold uppercase tracking-wide text-stone-400">Shop · spend coins 🪙</span><div className="h-px flex-1 bg-stone-200" /></div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SHOP_ITEMS.map((it) => {
                    const owned = (game.cosmetics.owned || []).includes(it.id);
                    const equipped = game.cosmetics.equipped[it.type] === it.value;
                    return (
                      <div key={it.id} className="rounded-xl border border-stone-200 bg-white p-3 flex items-center gap-2.5">
                        <div className="shrink-0 w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center text-lg">{it.type === "avatar" ? it.value : "🏷️"}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-stone-800 truncate">{it.name}</div>
                          {owned
                            ? <button onClick={() => equipItem(it)} className={`text-xs font-medium ${equipped ? "text-teal-600" : "text-stone-400 hover:text-teal-600"}`}>{equipped ? "✓ Equipped" : "Equip"}</button>
                            : <button onClick={() => buyItem(it)} disabled={game.coins < it.cost} className="text-xs font-medium text-amber-600 hover:text-amber-700 disabled:text-stone-300">🪙 {it.cost}</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ─── BOTTOM NAV ─── */}
      <div className={`fixed bottom-0 left-0 right-0 border-t backdrop-blur-sm ${dark ? "border-stone-700 bg-stone-900/95" : "border-stone-200 bg-white/95"}`}>
        <div className="mx-auto max-w-xl flex">
          {[
            { id: "study",    icon: Brain,        label: "Study",    badge: dueTotal > 0 ? dueTotal : null },
            { id: "practice", icon: Target,       label: "Practice", badge: null },
            { id: "tutor",    icon: MessageCircle, label: "Tutor",    badge: null },
            { id: "profile",  icon: Trophy,       label: "Profile",  badge: null },
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
