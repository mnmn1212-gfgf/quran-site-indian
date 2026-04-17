import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#E7B14C";
const CTA_DARK = "#2A1038";

const UNIFIED_FRAME_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(24,8,38,0.98)_0%,rgba(60,22,71,0.96)_52%,rgba(121,34,61,0.94)_100%)]";
const UNIFIED_FRAME_SOFT =
  "bg-[linear-gradient(135deg,rgba(44,18,61,0.92)_0%,rgba(86,39,92,0.88)_55%,rgba(121,45,74,0.86)_100%)]";
const UNIFIED_FRAME_INNER =
  "bg-[linear-gradient(135deg,rgba(74,40,88,0.34)_0%,rgba(108,52,92,0.24)_100%)]";
const OUTER_GRADIENT = UNIFIED_FRAME_GRADIENT;
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(33,13,49,0.97)_0%,rgba(71,26,73,0.94)_56%,rgba(104,31,56,0.92)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  `border border-white/10 ${UNIFIED_FRAME_SOFT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_10px_26px_rgba(0,0,0,0.18)]`;
const softCard = `rounded-[2rem] border border-white/10 ${UNIFIED_FRAME_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_10px_26px_rgba(0,0,0,0.18)]`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_10px_26px_rgba(0,0,0,0.18)]`;
const unifiedInnerFrame = `border border-white/10 ${UNIFIED_FRAME_INNER}`;
const unifiedInnerPanel = `border border-white/10 ${UNIFIED_FRAME_SOFT}`;

const navItems = [
  { label: "हमारे बारे में", href: "#about" },
  { label: "विशेषताएँ", href: "#features" },
  { label: "हमारे कार्य", href: "#portfolio" },
  { label: "सफलता के भागीदार", href: "#partners" },
  { label: "संपर्क करें", href: "#contact" },
];

const stats = [
  { value: "+100", label: "लक्षित वैश्विक भाषाएँ" },
  { value: "24/7", label: "निरंतर वैश्विक पहुँच" },
  { value: "114", label: "पूर्ण सूरह" },
  { value: "HQ", label: "उच्च ऑडियो एवं वीडियो गुणवत्ता" },
];

const heroCards = [
  { value: "114", label: "पूर्ण सूरह" },
  { value: "30", label: "कुरआन के 30 पारों में" },
  { value: "उत्कृष्ट", label: "श्रव्य-दृश्य प्रस्तुति" },
];

const heroBadges = [
  { icon: Sparkles, title: "कुरआन का प्रकाश और सौंदर्य" },
  { icon: Globe, title: "दुनिया के लिए संदेश" },
];

const identityCards = [
  {
    icon: Users,
    title: "हमारे बारे में",
    text: "सना एक वक्फ़ परियोजना है जिसका उद्देश्य कुरआन के अर्थों को दुनिया तक पहुँचाना है। यह श्रव्य और दृश्य माध्यमों के द्वारा मधुर तिलावत और सटीक अनुवाद को एक साथ प्रस्तुत करती है, ताकि एक समग्र आध्यात्मिक अनुभव दिया जा सके जो अल्लाह के कलाम को दुनिया की विभिन्न भाषाओं में लोगों के दिलों तक पहुँचाए।",
  },
  {
    icon: Eye,
    title: "दृष्टि",
    text: "हमारी दृष्टि है कि हम एक अग्रणी वैश्विक मंच बनें जो हर व्यक्ति तक उसकी भाषा में कुरआन के अर्थ पहुँचाए, आधुनिक शैली में जो सौंदर्य, उत्कृष्टता और आधुनिक तकनीक को एक साथ लाए।",
  },
  {
    icon: Target,
    title: "मिशन",
    text: "अनूदित श्रव्य और दृश्य कुरआनी सामग्री प्रस्तुत करना, जिससे कुरआन के अर्थों को स्पष्ट और सरल रूप से समझा जा सके, और जो प्रभावशाली तथा आकर्षक शैली में हिदायत के संदेश को फैलाने में सहायक हो।",
  },
];

const features = [
  {
    icon: Languages,
    title: "बहुभाषी अनुवाद",
    desc: "कुरआन के अर्थों को विभिन्न समुदायों तक उनकी भाषाओं में स्पष्ट और सटीक शैली में पहुँचाना, जो संदेश और भाव को सुरक्षित रखे।",
  },
  {
    icon: Headphones,
    title: "समग्र श्रव्य-दृश्य अनुभव",
    desc: "ऐसे चैनल जो प्रभावशाली तिलावत और अनूदित पाठ को एक शांत एवं गरिमामय अनुभव में प्रस्तुत करते हैं, जो कुरआन की महानता के अनुरूप हो।",
  },
  {
    icon: Globe,
    title: "निरंतर वैश्विक प्रसार",
    desc: "डिजिटल और प्रसारण उपस्थिति जो विभिन्न महाद्वीपों और प्लेटफ़ॉर्मों तक चौबीसों घंटे पहुँच सुनिश्चित करती है।",
  },
  {
    icon: HeartHandshake,
    title: "अल्लाह के लिए वक्फ़",
    desc: "एक वैश्विक दावती संदेश, जिसके पुण्य में हर वह व्यक्ति सहभागी होता है जो इसके प्रसार, समर्थन या लाभ में भाग लेता है।",
  },
];

const channels = [
  {
    icon: Radio,
    title: "टीवी और रेडियो चैनल",
    desc: "कुरआन के अर्थों को श्रव्य और दृश्य चैनलों के माध्यम से विभिन्न समुदायों तक उनकी भाषाओं में पहुँचाना।",
  },
  {
    icon: MonitorPlay,
    title: "सोशल मीडिया और वेबसाइट प्लेटफ़ॉर्म",
    desc: "निरंतर अद्यतन डिजिटल उपस्थिति जो कुरआनी सामग्री तक पहुँच और उसके व्यापक प्रसार को आसान बनाती है।",
  },
  {
    icon: Layers3,
    title: "विविध डिजिटल ऐप और माध्यम",
    desc: "एक आधुनिक और विविध अनुभव, जो विभिन्न उपकरणों और प्लेटफ़ॉर्मों के अनुरूप कुरआनी सामग्री तक पहुँच प्रदान करता है।",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "शरई संस्थाएँ और इस्लामी संगठन",
    desc: "जिन्होंने कुरआन के अर्थों के प्रमाणित अनुवाद उपलब्ध कराने में योगदान दिया, ताकि सटीकता और शरई प्रामाणिकता सुनिश्चित हो सके।",
  },
  {
    icon: Mic2,
    title: "प्रभावशाली क़ारी और मधुर आवाज़ें",
    desc: "जिन्होंने विनम्र और प्रभावशाली तिलावत के माध्यम से इस परियोजना को समृद्ध किया, जो दिलों तक प्रेमपूर्ण और आकर्षक ढंग से पहुँचती है।",
  },
  {
    icon: Headphones,
    title: "ऑडियो और तकनीकी प्रोडक्शन कंपनियाँ",
    desc: "जिन्होंने उच्च गुणवत्ता वाली रिकॉर्डिंग और पेशेवर ऑडियो-विज़ुअल प्रोसेसिंग उपलब्ध कराई।",
  },
  {
    icon: Users,
    title: "निर्माता और स्वयंसेवक",
    desc: "जिन्होंने सामग्री के विकास और उसके प्रसार में योगदान दिया, ताकि यह दुनिया भर में अधिकतम लोगों तक पहुँच सके।",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "वैश्विक पहुँच",
    desc: "कुरआन का संदेश दुनिया के कई देशों के घरों तक पहुँचा है, अनेक भाषाओं में जो लोगों से उनकी मातृभाषा में संवाद करती हैं।",
  },
  {
    icon: Languages,
    title: "विश्वसनीय अनुवाद",
    desc: "कुरआन के अर्थों के सटीक अनुवाद विश्वसनीय विद्वत संस्थाओं की देखरेख में उपलब्ध कराए गए हैं, ताकि अर्थ की शुद्धता बनी रहे।",
  },
  {
    icon: Headphones,
    title: "समग्र अनुभव",
    desc: "ऐसी सामग्री जो विनम्र तिलावत और दृश्य अनुवाद को जोड़ती है, ताकि प्रभावशाली और आसानी से समझ में आने वाला आध्यात्मिक अनुभव मिल सके।",
  },
  {
    icon: Send,
    title: "लगातार फैलता संदेश",
    desc: "यह परियोजना हिदायत के प्रसार और अल्लाह के कलाम से दुनिया का परिचय कराने में आधुनिक शैली से योगदान देती है, जो विभिन्न वर्गों तक पहुँचती है।",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT +
          mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying, isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className={`mt-5 rounded-[1.35rem] ${unifiedInnerPanel} p-3 sm:p-4`}>
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-fuchsia-500 via-amber-300 to-rose-400 opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
          aria-label={isPlaying ? "रोकें" : "चलाएँ"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
          aria-label="पीछे जाएँ"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
          aria-label="फिर से चलाएँ"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
          aria-label="आगे बढ़ाएँ"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
          aria-label="ध्वनि"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-fuchsia-400 via-amber-300 to-rose-400"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className={`h-full rounded-[1.5rem] ${unifiedInnerFrame} p-4`}>
        <div className={`flex items-center gap-3 rounded-2xl ${unifiedInnerPanel} px-4 py-3`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-amber-300/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className={`mt-4 rounded-2xl ${unifiedInnerPanel} px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8`}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className={`h-full rounded-[1.5rem] ${unifiedInnerFrame} p-4`}>
        <div className={`flex items-center gap-3 rounded-2xl ${unifiedInnerPanel} px-4 py-3`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-amber-300/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl ${unifiedInnerFrame} px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl ${unifiedInnerPanel} px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className={`h-full rounded-[1.5rem] ${unifiedInnerFrame} p-4`}>
        <div className={`flex items-center gap-3 rounded-2xl ${unifiedInnerPanel} px-4 py-3`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-rose-200/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className={`mt-4 rounded-2xl ${unifiedInnerPanel} px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8`}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  videoId,
  registerVideo,
  unregisterVideo,
  requestExclusivePlay,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    registerVideo(videoId, element);

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      requestExclusivePlay(videoId);
      setIsPlaying(true);
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      unregisterVideo(videoId);
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [registerVideo, requestExclusivePlay, unregisterVideo, videoId]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className={`relative overflow-hidden rounded-[1.4rem] ${unifiedInnerPanel}`}>
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-[#12081D]/30 transition hover:bg-[#140A24]/40"
            aria-label="वीडियो चलाएँ"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_22px_rgba(167,71,255,0.18)] sm:h-18 sm:w-18">
              <Play className="mr-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-[#10061B]/78 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "चलाने से पहले पूर्वावलोकन दिखाई दे रहा है" : "पूर्वावलोकन तैयार किया जा रहा है"}
        </div>
      </div>

      <div className={`mt-4 rounded-[1.3rem] ${unifiedInnerPanel} p-3 sm:p-4`}>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
            aria-label="ध्वनि बंद या चालू करें"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
            aria-label="फिर से चलाएँ"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} text-white transition hover:bg-white/10`}
            aria-label={isPlaying ? "रोकें" : "चलाएँ"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-fuchsia-400 via-amber-300 to-rose-400"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const videoElementsRef = useRef({});

  const registerVideo = (videoId, element) => {
    videoElementsRef.current[videoId] = element;
  };

  const unregisterVideo = (videoId) => {
    delete videoElementsRef.current[videoId];
  };

  const requestExclusivePlay = (activeVideoId) => {
    Object.entries(videoElementsRef.current).forEach(([videoId, element]) => {
      if (videoId !== String(activeVideoId) && element && !element.paused) {
        element.pause();
      }
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(167,71,255,0.18),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(231,177,76,0.10),transparent_18%),radial-gradient(circle_at_50%_55%,rgba(125,42,78,0.18),transparent_34%),linear-gradient(135deg,#13061E_0%,#2F0E3E_38%,#4D1847_68%,#7A223D_100%)]" />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-3xl"
              animate={pulseGlow}
            />
            <motion.div
              className="absolute bottom-[-8rem] right-[-5rem] h-[22rem] w-[22rem] rounded-full bg-rose-500/10 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.035]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(7,3,12,0.10)_100%)]" />
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-200/20 bg-white/10 shadow-[0_0_16px_rgba(167,71,255,0.18)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="सना कुरआनी चैनलों का लोगो"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  सना कुरआनी चैनल
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`rounded-full ${unifiedInnerFrame} px-4 py-2 text-sm font-medium text-white/85 transition hover:border-amber-200/30 hover:bg-white/10 hover:text-amber-100`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${unifiedInnerFrame} md:hidden`}
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-2xl ${unifiedInnerFrame} px-4 py-3 text-sm text-white/85 sm:text-base`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>सना... सारी दुनिया के लिए संदेश</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="overflow-visible py-3 text-[clamp(2.5rem,8vw,5.6rem)] font-black leading-[1.18] sm:py-4 lg:py-5"
              >
                <span className="inline-block overflow-visible px-1 py-2 bg-gradient-to-l from-[#E7B14C] via-rose-100 to-fuchsia-100 bg-clip-text text-transparent">
                  सना कुरआनी चैनल
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                कुरआन के अर्थों के अनुवाद के लिए श्रव्य-दृश्य चैनल, विश्व की सभी प्रमुख भाषाओं के लिए — अल्लाह के लिए एक वक्फ़ परियोजना।
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(243,231,179,0.18)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  प्लेटफ़ॉर्म देखें
                </a>

                <a
                  href="https://www.youtube.com/@sana-x7x"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  हमारे चैनल पर जाएँ
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div className="text-xl font-black sm:text-2xl" style={{ color: ACCENT }}>
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className={`rounded-[1.6rem] ${unifiedInnerPanel} p-4 sm:p-6`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">वर्तमान भाषा</p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        हिंदी में कुरआन
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-amber-200/25 bg-fuchsia-500/15 px-4 py-2 text-xs text-amber-100 sm:text-sm">
                      लाइव प्रसारण
                    </div>
                  </div>

                  <div className={`mt-6 rounded-[1.4rem] ${unifiedInnerPanel} p-4 sm:mt-8 sm:p-6`}>
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-amber-200 sm:mt-0" />
                      <span>तिलावत सुनें और कुरआन के अर्थों की दृश्य प्रस्तुति देखें</span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ width: [`${w - 14}%`, `${w}%`, `${w - 8}%`] }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-fuchsia-400 via-amber-300 to-rose-400"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className={`rounded-2xl ${unifiedInnerFrame} p-3 sm:p-4`}
                        >
                          <div className="text-sm font-bold sm:text-lg" style={{ color: ACCENT }}>
                            {item.value}
                          </div>
                          <div className="mt-1 text-[11px] text-white/60 sm:text-xs">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${unifiedInnerFrame} sm:h-11 sm:w-11`}>
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge icon={BookOpen} text="वैश्विक कुरआनी पहचान" />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge icon={Building2} text="कार्यान्वयन और पर्यवेक्षण" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,71,255,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(231,177,76,0.14),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className={`rounded-[1.8rem] ${unifiedInnerPanel} p-4 sm:p-6`}>
                    <div className={`h-full rounded-2xl ${unifiedInnerFrame} p-4 sm:p-5`}>
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        विश्वसनीय कार्यान्वयन साझेदारी
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        यह परियोजना{" "}
                        <span className="font-bold text-white">सना कुरआनी चैनल</span>{" "}
                        द्वारा संचालित है{" "}
                        <span className="font-bold" style={{ color: ACCENT }}>
                          सऊदी-जॉर्डनियन सैटेलाइट ब्रॉडकास्टिंग कंपनी (JASCO)
                        </span>{" "}
                        – अम्मान, जॉर्डन से, मीडिया प्रोडक्शन और प्रसारण में अग्रणी अनुभव के साथ।
                      </p>
                    </div>
                  </div>

                  <div className={`rounded-[1.8rem] ${unifiedInnerPanel} p-4 sm:p-6`}>
                    <div className={`flex h-full flex-col justify-center rounded-2xl ${unifiedInnerFrame} p-4 sm:p-5`}>
                      <div className="text-sm text-white/60">आधिकारिक वेबसाइट</div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">Jasco Media City</div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-amber-200/20 bg-fuchsia-500/12 px-5 py-3 text-sm text-amber-100 transition hover:bg-fuchsia-500/22 sm:text-base"
                      >
                        Jasco वेबसाइट देखें
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "प्लेटफ़ॉर्म की विशेषताएँ")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                सना... सारी दुनिया के लिए संदेश
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                एक कुरआनी मंच जो नवीनतम साधनों का उपयोग करके कुरआन के अर्थों को
                दुनिया तक पहुँचाता है, ऐसी शैली में जो शरई प्रामाणिकता और आधुनिक तकनीक को साथ लाती है।
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "प्रसार और पहुँच के माध्यम")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">उपस्थिति के अनेक माध्यम</h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "हमारे कार्य")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">हमारे कार्यों के नमूने</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                सुगंधित कुरआनी तिलावतें और दुनिया की विभिन्न भाषाओं में कुरआन की आयतों के अर्थों का अनुवाद
                — सना... सारी दुनिया के लिए संदेश।
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  videoId={i}
                  registerVideo={registerVideo}
                  unregisterVideo={unregisterVideo}
                  requestExclusivePlay={requestExclusivePlay}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "परियोजना का प्रभाव")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                परियोजना का प्रभाव और उसका विश्वव्यापी प्रसार
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                एक वैश्विक कुरआनी संदेश जिसने विश्वसनीय अनुवाद उपलब्ध कराए, प्रभावशाली अनुभव प्रस्तुत किया,
                और कुरआन के अर्थों को दुनिया भर के घरों तक पहुँचाने में योगदान दिया।
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "सफलता के भागीदार")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">सहयोग से बनी सफलता</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                यह परियोजना विशिष्ट संस्थाओं के सहयोग से सफल हुई, जिनमें
                शरई, मीडिया, प्रोडक्शन और स्वयंसेवी पक्ष शामिल हैं।
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <span>संपर्क करें</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  सना एक वैश्विक दावती संदेश है, और हमें आपसे जुड़कर आपके
                  प्रश्न, सुझाव और साझेदारी प्रस्ताव किसी भी समय स्पष्ट और सीधे रूप में प्राप्त करके खुशी होगी।
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className={`rounded-[2rem] ${unifiedInnerPanel} p-4 sm:p-6`}>
                  <div className={`rounded-[1.5rem] ${unifiedInnerFrame} p-4 sm:p-5`}>
                    <div className="mb-4 text-xl font-bold sm:text-2xl">हमसे संपर्क करें</div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm sm:text-base">
                        हमारी टीम आपकी सहायता करके और जल्द से जल्द उत्तर देकर प्रसन्न होगी।
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-amber-200/20 bg-fuchsia-500/12 px-4 py-3 text-center text-sm font-semibold text-amber-100 transition hover:bg-fuchsia-500/22 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        भेजें
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`${softCard} p-4 text-center sm:p-6 flex h-full flex-col items-center justify-center`}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="सना लोगो"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      सना कुरआनी चैनल
                    </span>
                  </div>

                  <div className="mt-4 text-2xl font-black sm:text-3xl" style={{ color: ACCENT }}>
                    सना... सारी दुनिया के लिए संदेश
                  </div>

                  <p className={`mx-auto mt-4 max-w-[30rem] rounded-[1.4rem] ${unifiedInnerPanel} px-4 py-4 text-sm leading-7 text-white/78 sm:px-5 sm:text-base sm:leading-8`}>
                    कुरआन के अर्थों के अनुवाद के लिए श्रव्य-दृश्य चैनल,
                    एक वक्फ़ परियोजना के रूप में, जो प्रस्तुति की सुंदरता, अर्थ की सटीकता और
                    संदेश की आत्मा को एक साथ लाती है।
                  </p>
                </div>

                <div className={`${softCard} p-4 sm:p-5 flex flex-col items-center justify-center text-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${unifiedInnerFrame} shadow-[0_8px_18px_rgba(0,0,0,0.14)]`}>
                      <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>हमारी जानकारी</span>
                  </div>

                  <div className="w-full space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[#140A24]/70 px-4 py-3 text-sm transition hover:bg-white/10 sm:text-base"
                    >
                      <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      snachannel159@gmail.com
                    </a>

                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#140A24]/70 px-4 py-3 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      अम्मान - जॉर्डन
                    </div>
                  </div>

                  <div className={`mt-6 w-full rounded-[1.4rem] ${unifiedInnerPanel} p-4`}>
                    <a
                      href="https://www.facebook.com/profile.php?id=61571169564832"
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-center gap-2 rounded-xl ${unifiedInnerFrame} py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10`}
                    >
                      <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                      हमें फ़ेसबुक पर फ़ॉलो करें
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      अपनी कुरआनी यात्रा अभी शुरू करें
                    </p>
                  </div>
                </div>

                <div className={`${softCard} p-4 sm:p-5 flex flex-col items-center justify-center text-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${unifiedInnerFrame} shadow-[0_8px_18px_rgba(0,0,0,0.14)]`}>
                      <Link2 className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>हमारे ऐप के लिंक</span>
                  </div>

                  <div className={`w-full rounded-[1.4rem] ${unifiedInnerPanel} p-4`}>
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      ऐप डाउनलोड करें और आधिकारिक प्लेटफ़ॉर्मों के माध्यम से कुरआनी सामग्री को आसानी से
                      फ़ॉलो करना शुरू करें।
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className={`group rounded-[1.3rem] ${unifiedInnerFrame} p-4 transition hover:-translate-y-0.5 hover:bg-white/10`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-amber-300/10 text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className={`group rounded-[1.3rem] ${unifiedInnerFrame} p-4 transition hover:-translate-y-0.5 hover:bg-white/10`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-rose-200/10 text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className={`mt-5 rounded-[1.4rem] ${unifiedInnerPanel} p-4`}>
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span>⭐ 4.9 रेटिंग</span>
                        <span>🌍 100+ देश</span>
                      </div>

                      <a
                        href="https://www.youtube.com/@sana-x7x"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200/20 bg-fuchsia-500/12 py-3 text-sm font-bold text-amber-100 transition hover:scale-[1.01] hover:bg-fuchsia-500/22"
                      >
                        <Sparkles className="h-4 w-4" />
                        अभी शुरू करें
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                सभी अधिकार सुरक्षित © सना कुरआनी चैनल।
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
