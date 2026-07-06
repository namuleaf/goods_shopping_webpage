import { useState } from "react";
import { Header } from "../organism/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "../organism/Footer";
import { QuickEtcHover } from "@/organism/QuickEtcHover";
import { ChatbotWidget } from "@/organism/ChatbotWidget";

export const Default = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Header onToggleChat={() => setIsChatOpen((prev) => !prev)} />
      <QuickEtcHover
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
      />
      <ChatbotWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      <Outlet />
      <Footer />
    </div>
  );
};
