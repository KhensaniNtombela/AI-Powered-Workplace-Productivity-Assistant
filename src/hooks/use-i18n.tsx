import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "fr" | "es" | "pt" | "ar" | "zh" | "de";

const DICT: Record<Lang, Record<string, string>> = {
  en: {
    home: "Home", features: "Features", pricing: "Pricing", support: "Support", about: "About",
    login: "Login", signup: "Sign Up", dashboard: "Dashboard", search: "Search anything…",
    backHome: "Back home", getStarted: "Get Started Free", tryAI: "Try AI Assistant",
    heroSub: "FlowState AI is the workplace productivity assistant that plans your day, blocks distractions, and turns scattered work into pure flow — with AI that respects your energy.",
  },
  fr: {
    home: "Accueil", features: "Fonctionnalités", pricing: "Tarifs", support: "Assistance", about: "À propos",
    login: "Connexion", signup: "S'inscrire", dashboard: "Tableau de bord", search: "Rechercher…",
    backHome: "Retour", getStarted: "Commencer gratuitement", tryAI: "Essayer l'IA",
    heroSub: "FlowState AI est l'assistant de productivité au travail qui planifie votre journée, bloque les distractions et transforme le travail dispersé en flux pur — avec une IA qui respecte votre énergie.",
  },
  es: {
    home: "Inicio", features: "Funciones", pricing: "Precios", support: "Soporte", about: "Acerca",
    login: "Entrar", signup: "Registrarse", dashboard: "Panel", search: "Buscar…",
    backHome: "Volver", getStarted: "Comenzar gratis", tryAI: "Probar IA",
    heroSub: "FlowState AI es el asistente de productividad que planifica tu día, bloquea distracciones y convierte el trabajo disperso en puro flujo, con una IA que respeta tu energía.",
  },
  pt: {
    home: "Início", features: "Recursos", pricing: "Preços", support: "Suporte", about: "Sobre",
    login: "Entrar", signup: "Cadastrar", dashboard: "Painel", search: "Buscar…",
    backHome: "Voltar", getStarted: "Começar grátis", tryAI: "Testar IA",
    heroSub: "FlowState AI é o assistente de produtividade que planeja seu dia, bloqueia distrações e transforma trabalho disperso em puro fluxo.",
  },
  ar: {
    home: "الرئيسية", features: "الميزات", pricing: "الأسعار", support: "الدعم", about: "من نحن",
    login: "تسجيل الدخول", signup: "إنشاء حساب", dashboard: "لوحة التحكم", search: "ابحث…",
    backHome: "رجوع", getStarted: "ابدأ مجانًا", tryAI: "جرّب الذكاء",
    heroSub: "FlowState AI هو مساعد الإنتاجية الذي يخطط ليومك ويمنع التشتيت ويحول العمل المشتت إلى تدفق نقي.",
  },
  zh: {
    home: "首页", features: "功能", pricing: "价格", support: "支持", about: "关于",
    login: "登录", signup: "注册", dashboard: "仪表板", search: "搜索…",
    backHome: "返回", getStarted: "免费开始", tryAI: "体验AI",
    heroSub: "FlowState AI 是一款帮助你规划日程、屏蔽干扰、进入心流的工作生产力助手。",
  },
  de: {
    home: "Start", features: "Funktionen", pricing: "Preise", support: "Hilfe", about: "Über",
    login: "Anmelden", signup: "Registrieren", dashboard: "Dashboard", search: "Suchen…",
    backHome: "Zurück", getStarted: "Kostenlos starten", tryAI: "KI testen",
    heroSub: "FlowState AI ist der Arbeits-Assistent, der deinen Tag plant, Ablenkungen blockiert und zerstreute Arbeit in reinen Flow verwandelt.",
  },
};

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "de", label: "Deutsch" },
];

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "en";
    setLangState(stored);
    if (typeof document !== "undefined") document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };
  const t = (k: string) => DICT[lang]?.[k] ?? DICT.en[k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
