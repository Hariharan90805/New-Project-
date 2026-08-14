import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building2, 
  Store, 
  Sparkles, 
  MessageSquare, 
  PlusCircle, 
  X, 
  Send,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { TESTIMONIALS, BRAND_INFO } from '../data';
import { Testimonial } from '../types';
import { addReviewToDb, fetchReviewsFromDb } from '../lib/firebase';
import { useTheme } from '../lib/ThemeContext';

export const TestimonialsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { theme } = useTheme();

  // Form State for User Review Submission
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    location: 'Krishnagiri',
    category: 'Restaurant',
    rating: 5,
    result: '',
    comment: '',
  });

  // Fetch dynamic Firestore reviews on mount
  useEffect(() => {
    const loadDbReviews = async () => {
      try {
        const dbReviews = await fetchReviewsFromDb();
        if (dbReviews && dbReviews.length > 0) {
          // Merge with initial testimonials avoiding duplicate IDs
          setReviewsList((prev) => {
            const combined = [...dbReviews, ...prev];
            const unique = Array.from(new Map(combined.map((item) => [item.id || item.name, item])).values());
            return unique;
          });
        }
      } catch (err) {
        console.error('Error loading Firestore reviews:', err);
      }
    };

    loadDbReviews();
  }, []);

  const categories = ['All', 'Restaurant', 'Hospital', 'Real Estate', 'Showroom', 'School', 'Manufacturing'];

  const filteredReviews = selectedCategory === 'All' 
    ? reviewsList 
    : reviewsList.filter((r) => r.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.comment) return;

    setIsSubmitting(true);
    try {
      const newReview: Testimonial = {
        id: `user-rev-${Date.now()}`,
        name: formData.name,
        role: formData.role || 'Business Owner',
        company: formData.company,
        location: formData.location,
        category: formData.category,
        rating: formData.rating,
        comment: formData.comment,
        result: formData.result || 'Verified Growth Result',
        date: 'Recent Verification',
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
        verified: true,
      };

      // 1. Save to Cloud Firestore
      await addReviewToDb(newReview);

      // 2. Add to local state immediately
      setReviewsList((prev) => [newReview, ...prev]);
      setSubmitSuccess(true);

      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          role: '',
          company: '',
          location: 'Krishnagiri',
          category: 'Restaurant',
          rating: 5,
          result: '',
          comment: '',
        });
      }, 1500);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Duplicate for smooth continuous infinite marquee
  const marqueeItems = [...filteredReviews, ...filteredReviews, ...filteredReviews];

  return (
    <section 
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-slate-50 text-slate-900 border-b border-slate-200' 
          : 'bg-neutral-950 text-neutral-100 border-b border-neutral-800'
      }`}
      id="reviews"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (10th in layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-widest text-amber-400 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>10 • VERIFIED REGIONAL CLIENT RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            Trusted by Market Leaders in <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">
              Krishnagiri, Hosur & Dharmapuri
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Real businesses. Real revenue multiplication. Discover how Tamil Nadu enterprises scaled their footfall and WhatsApp enquiries.
          </p>

          {/* Action to submit a review */}
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Share Your Business Result / Add Review</span>
            </button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-neutral-950 shadow-md scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* CONTINUOUS RUNNING MARQUEE CAROUSEL TRANSITION */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Subtle Edge Blur Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none hidden sm:block" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none hidden sm:block" />

        {/* Running Marquee Track 1 (Leftward) */}
        <motion.div
          animate={{ x: [0, -1800] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 38,
              ease: 'linear',
            },
          }}
          whileHover={{ animationPlayState: 'paused' }}
          className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
        >
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[360px] sm:w-[420px] p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 shadow-xl flex flex-col justify-between space-y-4 shrink-0 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div>
                {/* Header with Avatar, Name, Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-amber-400/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{testimonial.name}</span>
                        {testimonial.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </h4>
                      <p className="text-[11px] text-neutral-400 leading-tight">
                        {testimonial.role} • <strong className="text-neutral-300">{testimonial.company}</strong>
                      </p>
                      <span className="text-[10px] text-amber-400/90 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{testimonial.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Measurable Result Highlight */}
                {testimonial.result && (
                  <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{testimonial.result}</span>
                  </div>
                )}

                {/* Comment */}
                <p className="text-xs text-neutral-300 leading-relaxed italic line-clamp-4">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                <span>{testimonial.category} Sector</span>
                <span>{testimonial.date}</span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* SUBMIT REVIEW MODAL (Firestore connected) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl z-10 text-white"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <h3 className="text-lg font-bold">Submit Your Client Review</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Review Added Successfully!</h4>
                  <p className="text-xs text-neutral-400">
                    Your testimonial is now live in the DCOLLABERZ verified client showcase.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Ramesh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">Company / Brand *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Grand Palace Hotel"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">Your Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Managing Director / Founder"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1">Location</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Krishnagiri">Krishnagiri</option>
                        <option value="Hosur">Hosur</option>
                        <option value="Dharmapuri">Dharmapuri</option>
                        <option value="Kaveripattinam">Kaveripattinam</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Measurable Growth Result</label>
                    <input
                      type="text"
                      placeholder="e.g. +400% Table Bookings & 150+ WhatsApp Enquiries"
                      value={formData.result}
                      onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">Your Experience & Feedback *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="How did DCOLLABERZ help scale your customer acquisition?"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Saving to Cloud Database...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Publish Verified Review</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
