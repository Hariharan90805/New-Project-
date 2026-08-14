import React from 'react';
import { Logo } from './Logo';
import { BRAND_INFO } from '../data';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin,
  Clock,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenStrategyModal: () => void;
  onOpenNotificationCenter: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStrategyModal,
  onOpenNotificationCenter,
}) => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ! I want to start a conversation about scaling my business with digital marketing.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 relative overflow-hidden">
      
      {/* Pre-Footer Call to Action (Slide 12: "Bring us the goal. We'll build the system.") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-800/80">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">
              05 • PACKAGES & CLOSE
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-sans leading-tight">
              Bring us the goal. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                We'll build the system.
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Ready to turn attention into measurable growth for your business in Krishnagiri & Tamil Nadu? Let's engineer your customer acquisition pipeline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <button
              onClick={onOpenStrategyModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Book Strategy Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-emerald-500/40 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              DCOLLABERZ is Tamil Nadu's performance digital marketing agency. We turn online presence into real footfall, phone calls, and revenue through Google 3-Pack SEO, high-impact Meta reels, 1-click WhatsApp funnels, and real-time Power BI intelligence.
            </p>

            <div className="pt-2 flex items-center gap-3 text-neutral-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900 hover:text-amber-400 border border-neutral-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900 hover:text-amber-400 border border-neutral-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900 hover:text-amber-400 border border-neutral-800 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-neutral-900 hover:text-amber-400 border border-neutral-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Strategic Pillars */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Core Services
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Google Business Profile / Local SEO</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">High-Converting Meta Ads & Retargeting</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">1-Click WhatsApp Lead Funnel</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">Viral 4K Reels & Creative Video Shoots</a></li>
              <li><a href="#services" className="hover:text-amber-300 transition-colors">High-Speed Mobile Landing Pages</a></li>
              <li><a href="#funnel" className="hover:text-amber-300 transition-colors">Power BI & SQL Lead Dashboards</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Office Hub */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Direct Agency Hotline
            </h4>

            <div className="space-y-2.5 text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Krishnagiri & Hosur, Tamil Nadu, India (Servicing Krishnagiri, Dharmapuri, Salem & Bangalore Corridor)</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Official Agency Mail</span>
                  <a href={`mailto:${BRAND_INFO.officialEmail}`} className="hover:text-amber-300 font-mono font-bold text-white">
                    {BRAND_INFO.officialEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Strategy & Escalations Desk</span>
                  <a href={`mailto:${BRAND_INFO.adminEmail}`} className="hover:text-emerald-300 font-mono text-neutral-300">
                    {BRAND_INFO.adminEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BRAND_INFO.contactPhoneRaw}`} className="hover:text-amber-300 font-bold text-white">
                  Direct Call: {BRAND_INFO.contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <button onClick={handleWhatsAppClick} className="hover:text-emerald-300 font-bold text-emerald-400">
                  WhatsApp: {BRAND_INFO.whatsappDisplay}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="text-neutral-400">Mon - Sat: 9:00 AM - 8:00 PM IST</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenNotificationCenter}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-[11px] text-amber-300 border border-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <span>🔔 Notification Dispatcher Status: Active</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} DCOLLABERZ DIGITAL MARKETING AGENCY. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#why-marketing" className="hover:text-neutral-300">Why Digital Marketing</a>
            <span>•</span>
            <a href="#pricing" className="hover:text-neutral-300">Packages</a>
            <span>•</span>
            <a href="#reviews" className="hover:text-neutral-300">Client Reviews</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
