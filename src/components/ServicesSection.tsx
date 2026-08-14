import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  MapPin, 
  Search, 
  Sliders, 
  Laptop, 
  Video, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Database,
  LineChart,
  Eye,
  Layers,
  Sparkles,
  Play
} from 'lucide-react';
import { SERVICES, BRAND_INFO } from '../data';

const iconMap: Record<string, any> = {
  Instagram,
  MapPin,
  Search,
  Sliders,
  Laptop,
  Video,
  MessageSquare,
};

interface ServicesSectionProps {
  onOpenStrategyModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenStrategyModal }) => {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].id);
  const [activeTab, setActiveTab] = useState<'services' | 'journey'>('services');

  const journeySteps = [
    {
      stage: 'GET DISCOVERED',
      tools: 'Google • Local SEO • Meta Ads • Social Media',
      benefit: 'Be the very first choice when regional buyers search online.',
      color: 'from-amber-500/20 to-neutral-900',
      tag: 'Awareness',
    },
    {
      stage: 'BUILD TRUST',
      tools: 'Reels • 4K Content • Google Reviews • Testimonials • Website',
      benefit: 'Establish undeniable credibility that wipes out local competition.',
      color: 'from-emerald-500/20 to-neutral-900',
      tag: 'Authority',
    },
    {
      stage: 'GENERATE ENQUIRIES',
      tools: 'WhatsApp 1-Click • Call Tracking • High-Converting Landing Pages',
      benefit: 'Turn passive lurkers into warm WhatsApp conversations instantly.',
      color: 'from-cyan-500/20 to-neutral-900',
      tag: 'Leads',
    },
    {
      stage: 'CONVERT & GROW',
      tools: 'Smart Follow-up • Meta Retargeting • Limited-Time Offers',
      benefit: 'Maximize lead-to-customer conversion rate and repeat business.',
      color: 'from-purple-500/20 to-neutral-900',
      tag: 'Sales',
    },
    {
      stage: 'MEASURE & OPTIMIZE',
      tools: 'Power BI • Excel • SQL Analytics • Cost Per Lead • ROI Tracking',
      benefit: '100% clarity on ad spend efficiency and continuous scaling.',
      color: 'from-yellow-500/20 to-neutral-900',
      tag: 'Scale',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-neutral-950 text-white relative overflow-hidden" id="services">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span>Slide 02, 04 & 10 • Full Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Our Digital Marketing Services & <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
              Customer Journey Partnership
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300">
            "More Visibility → More Enquiries → More Customers → More Revenue."
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-neutral-900 border border-neutral-800 mt-4">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'services'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Core Services (7 Modules)
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'journey'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Customer Journey Matrix (Slide 10)
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Core Services Grid */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, idx) => {
              const Icon = iconMap[srv.icon] || Sparkles;
              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {srv.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">
                        {srv.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Included Deliverables:
                      </span>
                      {srv.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenStrategyModal}
                    className="w-full py-2.5 rounded-xl bg-neutral-800/80 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire for {srv.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Full Customer Journey (Slide 10) */}
        {activeTab === 'journey' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-r ${step.color} border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-neutral-900 text-amber-400 border border-neutral-700">
                      STAGE 0{idx + 1}
                    </span>
                    <h4 className="text-lg font-black text-white">{step.stage}</h4>
                  </div>
                  <p className="text-xs font-medium text-amber-300 font-mono">
                    {step.tools}
                  </p>
                  <p className="text-xs text-neutral-300">
                    {step.benefit}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="px-3 py-1 rounded-full bg-neutral-900/90 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    {step.tag}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Bottom summary result pill */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-400/40 text-center space-y-2 mt-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                THE FINAL BUSINESS OUTCOME:
              </span>
              <p className="text-xl sm:text-2xl font-black text-white">
                More Visibility <span className="text-amber-400">→</span> More Enquiries <span className="text-emerald-400">→</span> More Customers <span className="text-cyan-400">→</span> More Revenue
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
