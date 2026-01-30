"use client";

import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { ShieldCheck, Upload, CheckCircle, Search } from 'lucide-react';

export default function BasmaProject() {
  const [fileHash, setFileHash] = useState('');
  const [fileName, setFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [viewCert, setViewCert] = useState(false);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const binary = event.target.result;
      const hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(binary)).toString();
      setTimeout(() => {
        setFileHash(hash);
        setIsScanning(false);
      }, 2000);
    };
    reader.readAsArrayBuffer(file);
  };

  if (viewCert) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-black border-2 border-[#D4AF37] p-8 rounded-xl shadow-[0_0_60px_rgba(212,175,55,0.15)]">
          <div className="text-center mb-8">
            <h1 className="text-[#D4AF37] text-3xl font-serif uppercase">Official Ownership Certificate</h1>
          </div>
          <div className="space-y-4 border-t border-b border-gray-800 py-6 my-6 font-mono text-sm">
            <p>FILE: {fileName}</p>
            <p className="break-all text-[#D4AF37]">HASH: {fileHash}</p>
          </div>
          <button onClick={() => window.print()} className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-lg">Print Certificate</button>
        </div>
        <button onClick={() => setViewCert(false)} className="mt-4 text-gray-500 underline">Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <ShieldCheck size={60} className="text-[#D4AF37] mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter">BASMA <span className="text-[#D4AF37]">ID</span></h1>
      </div>
      <div className="w-full max-w-md border-2 border-dashed border-gray-800 p-12 rounded-3xl bg-[#111] relative text-center">
        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
        {isScanning ? <p className="animate-pulse">Scanning...</p> : 
         fileHash ? (
           <div>
             <CheckCircle className="text-green-500 mx-auto mb-4" />
             <button onClick={() => setViewCert(true)} className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold">Issue Certificate</button>
           </div>
         ) : <p>Upload file to fingerprint</p>}
      </div>
    </div>
  );
}
