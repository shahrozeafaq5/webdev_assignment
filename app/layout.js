import Navbar from "../components/Navbar";

export const metadata = {
  title: "PaperHaven",
  description: "Warm curated bookstore",
  icons: {
    icon: "/fav.png",       // or "/favicon.ico"
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        {/* Font */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />


        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind = { config: {
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui']
                    },
                    colors: {
                      cream: '#F7F2EA',
                      paper: '#FFFFFF',
                      ink: '#1E1B16',
                      cocoa: '#6B5E53',
                      latte: '#E7D9C9',
                      peach: '#F3D2C6'
                    },
                    boxShadow: {
                      soft: '0 10px 30px rgba(0,0,0,0.08)',
                      lift: '0 18px 40px rgba(0,0,0,0.12)',
                    }
                  }
                }
              }};`,
          }}
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body className="font-sans bg-cream text-ink antialiased">
        <Navbar />
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">{children}</div>
      </body>
    </html>
  );
}
