
import "./globals.css";

export const metadata = {
  title: "Shiv Khera Books",
  description: "Experience the technology of reading the books.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
