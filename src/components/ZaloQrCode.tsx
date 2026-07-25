import React from 'react';

interface ZaloQrCodeProps {
  className?: string;
}

export const ZaloQrCode: React.FC<ZaloQrCodeProps> = ({ className = "w-48 h-48" }) => {
  return (
    <div className={`relative inline-block bg-white p-3 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-slate-800 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White Background */}
        <rect width="200" height="200" rx="12" fill="#FFFFFF" />

        {/* Top-Left Finder Pattern */}
        <rect x="10" y="10" width="45" height="45" rx="10" fill="#000000" />
        <rect x="17" y="17" width="31" height="31" rx="6" fill="#FFFFFF" />
        <rect x="23" y="23" width="19" height="19" rx="4" fill="#000000" />

        {/* Top-Right Finder Pattern */}
        <rect x="145" y="10" width="45" height="45" rx="10" fill="#000000" />
        <rect x="152" y="17" width="31" height="31" rx="6" fill="#FFFFFF" />
        <rect x="158" y="23" width="19" height="19" rx="4" fill="#000000" />

        {/* Bottom-Left Finder Pattern */}
        <rect x="10" y="145" width="45" height="45" rx="10" fill="#000000" />
        <rect x="17" y="152" width="31" height="31" rx="6" fill="#FFFFFF" />
        <rect x="23" y="158" width="19" height="19" rx="4" fill="#000000" />

        {/* Authentic QR Grid Dots / Modules */}
        <g fill="#000000">
          {/* Top row alignment & timing */}
          <rect x="62" y="12" width="8" height="8" rx="2" />
          <rect x="75" y="12" width="8" height="8" rx="2" />
          <rect x="88" y="12" width="8" height="8" rx="2" />
          <rect x="101" y="12" width="8" height="8" rx="2" />
          <rect x="114" y="12" width="8" height="8" rx="2" />
          <rect x="127" y="12" width="8" height="8" rx="2" />

          <rect x="62" y="25" width="8" height="8" rx="2" />
          <rect x="88" y="25" width="8" height="8" rx="2" />
          <rect x="101" y="25" width="8" height="8" rx="2" />
          <rect x="127" y="25" width="8" height="8" rx="2" />

          <rect x="62" y="38" width="8" height="8" rx="2" />
          <rect x="75" y="38" width="8" height="8" rx="2" />
          <rect x="88" y="38" width="8" height="8" rx="2" />
          <rect x="114" y="38" width="8" height="8" rx="2" />
          <rect x="127" y="38" width="8" height="8" rx="2" />

          {/* Left vertical module band */}
          <rect x="12" y="62" width="8" height="8" rx="2" />
          <rect x="25" y="62" width="8" height="8" rx="2" />
          <rect x="38" y="62" width="8" height="8" rx="2" />
          <rect x="12" y="75" width="8" height="8" rx="2" />
          <rect x="38" y="75" width="8" height="8" rx="2" />
          <rect x="12" y="88" width="8" height="8" rx="2" />
          <rect x="25" y="88" width="8" height="8" rx="2" />
          <rect x="38" y="88" width="8" height="8" rx="2" />
          <rect x="12" y="101" width="8" height="8" rx="2" />
          <rect x="25" y="101" width="8" height="8" rx="2" />
          <rect x="38" y="101" width="8" height="8" rx="2" />
          <rect x="12" y="114" width="8" height="8" rx="2" />
          <rect x="38" y="114" width="8" height="8" rx="2" />
          <rect x="12" y="127" width="8" height="8" rx="2" />
          <rect x="25" y="127" width="8" height="8" rx="2" />

          {/* Right vertical module band */}
          <rect x="150" y="62" width="8" height="8" rx="2" />
          <rect x="163" y="62" width="8" height="8" rx="2" />
          <rect x="176" y="62" width="8" height="8" rx="2" />
          <rect x="150" y="75" width="8" height="8" rx="2" />
          <rect x="176" y="75" width="8" height="8" rx="2" />
          <rect x="150" y="88" width="8" height="8" rx="2" />
          <rect x="163" y="88" width="8" height="8" rx="2" />
          <rect x="176" y="88" width="8" height="8" rx="2" />
          <rect x="150" y="101" width="8" height="8" rx="2" />
          <rect x="163" y="101" width="8" height="8" rx="2" />
          <rect x="176" y="101" width="8" height="8" rx="2" />
          <rect x="150" y="114" width="8" height="8" rx="2" />
          <rect x="176" y="114" width="8" height="8" rx="2" />
          <rect x="150" y="127" width="8" height="8" rx="2" />
          <rect x="163" y="127" width="8" height="8" rx="2" />
          <rect x="176" y="127" width="8" height="8" rx="2" />

          {/* Bottom horizontal module band */}
          <rect x="62" y="150" width="8" height="8" rx="2" />
          <rect x="75" y="150" width="8" height="8" rx="2" />
          <rect x="88" y="150" width="8" height="8" rx="2" />
          <rect x="101" y="150" width="8" height="8" rx="2" />
          <rect x="114" y="150" width="8" height="8" rx="2" />
          <rect x="127" y="150" width="8" height="8" rx="2" />
          <rect x="140" y="150" width="8" height="8" rx="2" />
          <rect x="153" y="150" width="8" height="8" rx="2" />
          <rect x="166" y="150" width="8" height="8" rx="2" />
          <rect x="179" y="150" width="8" height="8" rx="2" />

          <rect x="62" y="163" width="8" height="8" rx="2" />
          <rect x="88" y="163" width="8" height="8" rx="2" />
          <rect x="101" y="163" width="8" height="8" rx="2" />
          <rect x="127" y="163" width="8" height="8" rx="2" />
          <rect x="153" y="163" width="8" height="8" rx="2" />
          <rect x="179" y="163" width="8" height="8" rx="2" />

          <rect x="62" y="176" width="8" height="8" rx="2" />
          <rect x="75" y="176" width="8" height="8" rx="2" />
          <rect x="88" y="176" width="8" height="8" rx="2" />
          <rect x="114" y="176" width="8" height="8" rx="2" />
          <rect x="140" y="176" width="8" height="8" rx="2" />
          <rect x="166" y="176" width="8" height="8" rx="2" />

          {/* Central matrix surrounding the Zalo circle */}
          <rect x="54" y="58" width="7" height="7" rx="1.5" />
          <rect x="66" y="58" width="7" height="7" rx="1.5" />
          <rect x="78" y="58" width="7" height="7" rx="1.5" />
          <rect x="90" y="58" width="7" height="7" rx="1.5" />
          <rect x="102" y="58" width="7" height="7" rx="1.5" />
          <rect x="114" y="58" width="7" height="7" rx="1.5" />
          <rect x="126" y="58" width="7" height="7" rx="1.5" />
          <rect x="138" y="58" width="7" height="7" rx="1.5" />

          <rect x="54" y="70" width="7" height="7" rx="1.5" />
          <rect x="138" y="70" width="7" height="7" rx="1.5" />

          <rect x="54" y="82" width="7" height="7" rx="1.5" />
          <rect x="138" y="82" width="7" height="7" rx="1.5" />

          <rect x="54" y="94" width="7" height="7" rx="1.5" />
          <rect x="138" y="94" width="7" height="7" rx="1.5" />

          <rect x="54" y="106" width="7" height="7" rx="1.5" />
          <rect x="138" y="106" width="7" height="7" rx="1.5" />

          <rect x="54" y="118" width="7" height="7" rx="1.5" />
          <rect x="138" y="118" width="7" height="7" rx="1.5" />

          <rect x="54" y="130" width="7" height="7" rx="1.5" />
          <rect x="66" y="130" width="7" height="7" rx="1.5" />
          <rect x="78" y="130" width="7" height="7" rx="1.5" />
          <rect x="90" y="130" width="7" height="7" rx="1.5" />
          <rect x="102" y="130" width="7" height="7" rx="1.5" />
          <rect x="114" y="130" width="7" height="7" rx="1.5" />
          <rect x="126" y="130" width="7" height="7" rx="1.5" />
          <rect x="138" y="130" width="7" height="7" rx="1.5" />
        </g>

        {/* Authentic Center Zalo Black Circle Badge */}
        <circle cx="100" cy="100" r="28" fill="#000000" stroke="#FFFFFF" strokeWidth="4" />
        
        {/* White Zalo Typography */}
        <text
          x="100"
          y="106"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="15"
          textAnchor="middle"
          letterSpacing="-0.5"
        >
          Zalo
        </text>
      </svg>
    </div>
  );
};
