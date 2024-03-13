import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { switchThemeDuration } from "./constant";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Translator",
  description: "Translate classical Armenian language to modern Armenian language",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-[#0d1117] ${switchThemeDuration}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          {children}
        </ThemeProvider></body>
    </html>
  );
}
