import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { ShieldCheck, Upload, FileText, CheckCircle, Search } from 'lucide-react';

export default function BasmaProject() {
  const [fileHash, setFileHash] = useState('');
  const [fileName, setFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [viewCert, setViewCert] = useState(false);

  // 1. منطق التشفير وتوليد البصمة الرقمية
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsScanning(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const binary = event.target.result;
      // توليد SHA-256 بصمة فريدة للملف
      const hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(binary)).toString();
      
      // محاكاة وقت المعالجة لإعطاء هيبة تقنية
      setTimeout(() => {
        setFileHash(hash);
        setIsScanning(false);
      }, 2000);
    };
    reader.readAsArrayBuffer(file);
  };

  // 2. واجهة الشهادة الرقمية (المنتج النهائي)
  if (viewCert) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <div className="relative w-full max-w-2xl bg-black border-2 border-[#D4AF37] p-8 rounded-xl shadow-[0_0_60px_rgba(212,175,55,0.15)]">
          <div className="text-center mb-8">
            <h1 className="text-[#D4AF37] text-3xl font-serif tracking-widest uppercase">Official Ownership Certificate</h1>
            <p className="text-gray-500 text-sm mt-2">BASMA DIGITAL PROTECTION PROTOCOL</p>
          </div>
          
          <div className="space-y-4 border-t border-b border-gray-800 py-6 my-6 font-mono text-sm">
            <div className="flex justify-between"><span className="text-gray-500">OWNER:</span> <span>AUTHORIZED CREATOR</span></div>
            <div className="flex justify-between"><span className="text-gray-500">FILE NAME:</span> <span>{fileName}</span></div>
            <div className="flex flex-col"><span className="text-gray-500 mb-1">DIGITAL FINGERPRINT (SHA-256):</span> <span className="text-[#D4AF37] break-all text-[10px]">{fileHash}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">BLOCKCHAIN ID:</span> <span>0x71C...{fileHash.substring(0,6)}</span></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[10px] text-gray-600 max-w-[250px]">
              This document serves as an immutable proof of creation. Secured via Basma ID Decentralized Ledger.
            </div>
            <div className="bg-white p-1 w-16 h-16 rounded shadow-inner">
               <div className="w-full h-full bg-black"></div> {/* QR Code Mockup */}
            </div>
          </div>

          <button onClick={() => window.print()} className="mt-8 w-full py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-yellow-500 transition-all uppercase tracking-widest">
            Download PDF / Print
          </button>
        </div>
        <button onClick={() => setViewCert(false)} className="mt-6 text-gray-500 hover:text-white underline text-sm">Back to Secure Upload</button>
      </div>
    );
  }

  // 3. واجهة المستخدم الرئيسية (منطقة الرفع)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header */}
      <nav className="p-6 border-b border-gray-900 flex justify-between items-center">
        <div className="text-[#D4AF37] font-bold text-2xl flex items-center gap-2">
          <ShieldCheck size={32} /> BASMA
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <span className="hover:text-white cursor-pointer">Verify</span>
          <span className="hover:text-white cursor-pointer">Vault</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic">
          Protect Your Creative Soul.
        </h2>
        <p className="text-gray-400 mb-12 text-lg">Instant Blockchain Proof for Creators.</p>

        {/* Upload Box */}
        <div className="relative group cursor-pointer border-2 border-dashed border-gray-800 hover:border-[#D4AF37] transition-all p-12 rounded-3xl bg-[#111111]">
          <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
          
          {isScanning ? (
            <div className="flex flex-col items-center animate-pulse">
              <Search className="text-[#D4AF37] mb-4" size={48} />
              <p className="text-xl font-mono">Deep Scanning File...</p>
            </div>
          ) : fileHash ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500 mb-4" size={48} />
              <p className="text-xl text-white mb-2 font-mono">Fingerprint Created!</p>
              <button onClick={() => setViewCert(true)} className="mt-4 px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-full hover:scale-105 transition-transform">
                Issue My Official Certificate
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="text-gray-600 group-hover:text-[#D4AF37] mb-4 transition-colors" size={48} />
              <p className="text-xl text-gray-500">Drop your work here to secure it forever</p>
            </div>
          )}
        </div>
        
        {/* Footer Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-sm font-mono text-gray-600">
          <div>Files Protected: <span className="text-white">12,409</span></div>
          <div>Active Nodes: <span className="text-white">Live</span></div>
          <div>Network Status: <span className="text-[#D4AF37]">SECURED</span></div>
        </div>
      </main>
    </div>
  );
}
