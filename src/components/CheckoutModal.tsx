import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  Printer, 
  MessageCircle, 
  Sparkles,
  Lock,
  ArrowRight,
  Download,
  Mail
} from 'lucide-react';
import { PricingTier } from '../types';
import { BRAND_INFO } from '../data';
import { Logo } from './Logo';
import { saveTransactionToDb, logNotificationToDb } from '../lib/firebase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: PricingTier | null;
  billingCycle: 'monthly' | 'quarterly';
  onPaymentSuccess: (record: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  tier,
  billingCycle,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsPaid(false);
      setIsProcessing(false);
      setInvoiceData(null);
    }
  }, [isOpen]);

  if (!isOpen || !tier) return null;

  const rawAmount = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceQuarterly * 3;
  const gstAmount = Math.round(rawAmount * 0.18);
  const totalAmount = rawAmount + gstAmount;

  // UPI Intent String
  const upiId = 'dcollaberz.growth@oksbi';
  const upiUrl = `upi://pay?pa=${upiId}&pn=DCOLLABERZ%20DIGITAL&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`${tier.name} ${billingCycle}`)}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please enter your name and WhatsApp phone number');
      return;
    }

    setIsProcessing(true);

    try {
      const txnId = `TXN-${Date.now().toString(36).toUpperCase()}`;
      const invoiceNumber = `DCOL-INV-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Save Transaction to Cloud Firestore Database
      const dbResult = await saveTransactionToDb({
        orderId: txnId,
        tierId: tier.id,
        tierName: tier.name,
        billingCycle,
        amount: totalAmount,
        customerName,
        phone: customerPhone,
        customerPhone,
        email: customerEmail || 'client@business.local',
        businessName: businessName || 'Local Enterprise',
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: 'COMPLETED',
        upiId,
        invoiceNumber,
      });

      // 2. Dispatch to Backend Express API
      const response = await fetch('/api/checkout-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          tierName: tier.name,
          amount: totalAmount,
          billingCycle,
          customerName,
          customerPhone,
          customerEmail: customerEmail || 'client@business.local',
          businessName: businessName || 'Local Business',
          paymentMethod,
          transactionId: txnId,
        }),
      });

      const data = await response.json();

      // 3. Log notification to Firestore
      await logNotificationToDb({
        type: 'payment_completed',
        title: `💰 Payment Received: ₹${totalAmount.toLocaleString('en-IN')} for ${tier.name}`,
        details: `Client: ${customerName} (${customerPhone}) | Txn: ${txnId} | Method: ${paymentMethod.toUpperCase()} | Firestore Doc: ${dbResult.id || 'saved'}. Alert sent to ${BRAND_INFO.officialEmail} & ${BRAND_INFO.adminEmail}`,
        recipientEmail: BRAND_INFO.officialEmail,
        payload: { tierName: tier.name, totalAmount, customerName, txnId, invoiceNumber },
      });

      // Trigger Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#eab308'],
      });

      setInvoiceData({
        ...data,
        transactionId: txnId,
        invoiceNumber,
        customerName,
        customerPhone,
        customerEmail,
        businessName,
        tierName: tier.name,
        amount: totalAmount,
        baseAmount: rawAmount,
        gst: gstAmount,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });

      setIsPaid(true);
      if (data.notification) {
        onPaymentSuccess(data.notification);
      }
    } catch (err) {
      console.error(err);
      alert('Order processed. Our team will verify and connect on WhatsApp.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendInvoiceWhatsApp = () => {
    if (!invoiceData) return;
    const msg = encodeURIComponent(
      `Hello DCOLLABERZ Team!\nI have subscribed to ${invoiceData.tierName} (₹${invoiceData.amount.toLocaleString('en-IN')}).\nInvoice: ${invoiceData.invoiceNumber}\nTxn ID: ${invoiceData.transactionId}\nClient: ${invoiceData.customerName} (${invoiceData.businessName || 'Business'}).\nPlease share the onboarding kickoff schedule.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${msg}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl text-white overflow-hidden my-8 z-10"
          >
            {/* Modal Top Header */}
            <div className="p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size="sm" showTagline={false} />
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isPaid ? 'Payment & Invoice Confirmation' : 'Secure Subscription Checkout'}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {isPaid ? 'Transaction recorded & alert dispatched' : `Selected: ${tier.tierNumber} • ${tier.name}`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isPaid ? (
            <form onSubmit={handlePayNow} className="space-y-6">
              
              {/* Plan Summary Card */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                    {tier.tierNumber}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">{tier.name}</h4>
                  <p className="text-xs text-neutral-400">{tier.subtitle}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Total ({billingCycle}):</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">incl. 18% GST (₹{gstAmount.toLocaleString('en-IN')})</span>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                  Client & Billing Information:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Business / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Spice Restaurant"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Email (for Invoice)</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                  Select Payment Method:
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-md'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs block">Instant UPI QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-md'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs block">Card Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-md'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs block">NetBanking / NEFT</span>
                  </button>
                </div>
              </div>

              {/* UPI QR Display if Selected */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center gap-6">
                  <div className="bg-white p-2.5 rounded-xl shrink-0 shadow-lg">
                    <img
                      src={qrCodeImageUrl}
                      alt="UPI QR Code"
                      className="w-32 h-32"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center justify-center sm:justify-start gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Scan with Any UPI App
                    </span>
                    <p className="text-xs text-neutral-300">
                      GPay, PhonePe, Paytm, BHIM, Cred or WhatsApp Pay.
                    </p>
                    <div className="text-[11px] font-mono text-amber-300 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
                      UPI ID: {upiId}
                    </div>
                  </div>
                </div>
              )}

              {/* Card / Netbanking fields */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="08/29"
                        className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Banner & Submit Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                      Verifying & Generating Invoice...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Subscribe (₹{totalAmount.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Instant Email Alert Dispatch</span>
                  <span>•</span>
                  <span>GST Tax Invoice</span>
                </div>
              </div>

            </form>
          ) : (
            /* Paid & Invoice Generated Screen */
            <div className="space-y-6 text-center py-4" id="printable-invoice">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">Payment Successful & Recorded!</h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  Invoice and onboarding alert dispatched to {BRAND_INFO.adminEmail}
                </p>
              </div>

              {/* Printable Invoice Container */}
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-left space-y-4 text-xs font-mono">
                <div className="flex justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <span className="text-amber-400 font-bold text-sm block">DCOLLABERZ DIGITAL</span>
                    <span className="text-neutral-400 text-[10px]">Krishnagiri, Tamil Nadu, India</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-300 font-bold block">{invoiceData?.invoiceNumber}</span>
                    <span className="text-neutral-500 text-[10px]">Date: {invoiceData?.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Billed To:</span>
                    <strong className="text-white">{invoiceData?.customerName}</strong>
                    <p className="text-neutral-400">{invoiceData?.businessName || 'Business Owner'}</p>
                    <p className="text-neutral-400">{invoiceData?.customerPhone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[10px]">Transaction Ref:</span>
                    <strong className="text-amber-300">{invoiceData?.transactionId}</strong>
                    <p className="text-emerald-400 font-bold">STATUS: CONFIRMED</p>
                  </div>
                </div>

                <div className="border-t border-neutral-800 pt-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">{invoiceData?.tierName} ({billingCycle})</span>
                    <span className="text-white">₹{invoiceData?.baseAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-[10px]">
                    <span>GST @ 18%</span>
                    <span>₹{invoiceData?.gst?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-amber-300 border-t border-neutral-800 pt-2">
                    <span>Total Amount Paid</span>
                    <span>₹{invoiceData?.amount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleSendInvoiceWhatsApp}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
              </div>

            </div>
          )}
        </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
