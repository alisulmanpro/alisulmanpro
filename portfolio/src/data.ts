// All portfolio content lives here, so text can be changed without touching components.
// Facts come from Ali's GitHub repositories and profile README.

export const profile = {
  name: 'Ali Sulman',
  initials: 'AS',
  location: 'Punjab, PK',
  timeZone: 'Asia/Karachi',
  email: 'alisulmanpro1470@gmail.com',
  intro:
    "I'm Ali — a full-stack AI developer at Pakistan Artificial Intelligence Lab. I train ML models in Python, serve them with FastAPI, ship them in Next.js, and teach web development.",
  whatsapp:
    "https://wa.me/923474732981?text=Hi%20Ali!%20I%20saw%20your%20work%20on%20your%20portfolio%20and%20I'm%20interested%20in%20hiring%20you%20for%20a%20project.%20Are%20you%20currently%20available%3F",
  links: {
    github: 'https://github.com/alisulmanpro',
    linkedin: 'https://www.linkedin.com/in/alisulmanpro/',
    x: 'https://x.com/alisulmanpro',
    instagram: 'https://instagram.com/alisu_1470/',
  },
};

export const marqueeTop = ['Machine Learning', 'FastAPI', 'Next.js', 'Django', 'PostgreSQL', 'React Native', 'Teaching'];
export const marqueeBottom = ['Data pipelines', 'Model deployment', 'REST APIs', 'Web apps', 'Mobile apps', 'Classrooms'];

export type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; accent?: boolean };

export const stats: Stat[] = [
  { value: 23, label: 'repositories on GitHub' },
  { value: 98.9, decimals: 1, suffix: '%', label: 'sentence match for Rozzy’s Urdu billing model*' },
  { value: 99, suffix: '%', label: 'accuracy on my spam classifier' },
  { value: 2, label: 'roles at once: engineer and instructor', accent: true },
];

export const moreProjects = [
  {
    n: '04',
    title: 'AI Assistant',
    text: 'ML assistant with an async FastAPI inference service and a typed Next.js front-end',
    href: 'https://github.com/alisulmanpro/AI-Assistant',
  },
  {
    n: '05',
    title: 'Email Spam Detection',
    text: '99% accuracy, 0.97 spam recall — TF-IDF + logistic regression with a tuned threshold, served by FastAPI',
    href: 'https://github.com/alisulmanpro/Email-Spam-Detection-Classifier',
  },
  {
    n: '06',
    title: 'Diabetes Prediction',
    text: 'XGBoost tuned for recall (0.80, ROC-AUC 0.82) with SHAP explanations for every prediction',
    href: 'https://github.com/alisulmanpro/Diabetes-Prediction',
  },
  {
    n: '07',
    title: 'Student Performance',
    text: 'Predicts final grades (0–20) with one scikit-learn pipeline, deployed with FastAPI',
    href: 'https://github.com/alisulmanpro/Student-Performance-Prediction',
  },
];

export const timeline = [
  { when: 'Jul 2025 — Now', role: 'Junior Software Engineer', where: 'Pakistan Artificial Intelligence Lab, Narowal' },
  { when: 'Oct 2024 — Jun 2025', role: 'DPE', where: 'Systems Private Limited, Lahore' },
  { when: 'Education', role: 'BS Software Engineering', where: 'Virtual University of Pakistan' },
];

export const toolkit = [
  { n: '01', title: 'Machine learning', items: ['scikit-learn · XGBoost', 'SHAP · pandas · NumPy'] },
  { n: '02', title: 'Back-end', items: ['FastAPI · Django · PostgreSQL', 'Pydantic · Prisma · Redis'] },
  { n: '03', title: 'Front-end & mobile', items: ['Next.js · React · TypeScript', 'React Native · Expo'] },
];

export const teachingTopics = [
  'JavaScript',
  'TypeScript',
  'Python',
  'C/C++',
  'MERN Stack',
  'Next.js',
  'Django',
  'FastAPI',
  'Machine Learning',
  'Deep Learning',
  'RAG Integration',
  'AI Integration',
];
