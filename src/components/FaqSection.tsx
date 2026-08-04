import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, PhoneCall, QrCode } from 'lucide-react';
import { CUSTOM_FAQS } from '../data/projectsData';
import { ZaloQrCode } from './ZaloQrCode';

interface FaqSectionProps {
  onOpenRegisterModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenRegisterModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trợ Giúp & Hỗ Trợ Phụ Huynh</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Câu Hỏi Thường Gặp <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">(FAQ)</span>
          </h2>
          <p className="text-slate-300 text-sm">
            Giải đáp mọi thắc mắc về khóa học, chứng chỉ quốc tế và lộ trình đào tạo tại TA Tech Academy.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {CUSTOM_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-100 hover:text-cyan-400 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <ZaloQrCode className="w-20 h-20 shrink-0 hidden sm:block" />
            <div className="space-y-1">
              <div className="font-bold text-sm text-white flex items-center justify-center sm:justify-start gap-1.5">
                <QrCode className="w-4 h-4 text-cyan-400" />
                Quét Mã QR Zalo 0901.315.275
              </div>
              <div className="text-xs text-slate-300">Liên hệ trực tiếp với Thầy Tuấn Anh qua Zalo để nhận lộ trình học tập tối ưu.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.open('https://zalo.me/0901315275', '_blank')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="text-white">Chat Zalo Thầy Tuấn Anh</span>
            </button>
            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Yêu Cầu Gọi Lại</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
