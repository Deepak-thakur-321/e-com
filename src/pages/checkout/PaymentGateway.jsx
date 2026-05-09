import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../app/features/cart/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Fake coupon pool — cycles on each Apply click ──
const COUPONS = [
   { code: "MYSTORE50", discount: 500, label: "₹500 off" },
   { code: "FIRST10", discount: 300, label: "₹300 off" },
   { code: "FASHION20", discount: 800, label: "₹800 off" },
   { code: "WELCOME15", discount: 200, label: "₹200 off" },
   { code: "SEASON25", discount: 600, label: "₹600 off" },
];

const fmt = (n) => `₹${Math.max(0, n).toLocaleString("en-IN")}`;

const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const fmtExpiry = (v) => {
   const d = v.replace(/\D/g, "").slice(0, 4);
   return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
};

export default function PaymentGateway() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // ── Real cart data from Redux ──
   const cartItems = useSelector((state) => state.cart.items);
   const totalPrice = useSelector((state) => state.cart.totalPrice);

   // Payment state
   const [method, setMethod] = useState("card");
   const [processing, setProc] = useState(false);
   const [done, setDone] = useState(false);
   const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
   const [cardErr, setCardErr] = useState({});
   const [upi, setUpi] = useState("");
   const [upiErr, setUpiErr] = useState("");

   // Coupon state
   const [couponInput, setCouponInput] = useState("");
   const [appliedCoupon, setApplied] = useState(null);   // { code, discount, label }
   const [couponIndex, setCouponIndex] = useState(0);      // cycles through pool

   // ── Derived totals ──
   const subtotal = totalPrice || 0;
   const discount = appliedCoupon ? appliedCoupon.discount : 0;
   const shipping = subtotal > 999 ? 0 : 99;
   const total = Math.max(0, subtotal - discount + shipping);

   // ── Coupon apply ──
   const handleCoupon = () => {
      const next = COUPONS[couponIndex % COUPONS.length];
      setApplied(next);
      setCouponInput(next.code);
      setCouponIndex((i) => i + 1);
      toast.success(`🎉 Coupon "${next.code}" applied — ${next.label}!`, {
         position: "top-right",
         autoClose: 3000,
         theme: "light",
      });
   };

   const handleRemoveCoupon = () => {
      setApplied(null);
      setCouponInput("");
      toast.info("Coupon removed.", { position: "top-right", autoClose: 2000, theme: "light" });
   };

   // ── Validation ──
   const validateCard = () => {
      const e = {};
      if (card.number.replace(/\s/g, "").length < 16) e.number = "Enter a valid 16-digit card number";
      if (!card.name.trim()) e.name = "Cardholder name is required";
      if (card.expiry.length < 5) e.expiry = "Enter valid expiry (MM/YY)";
      if (card.cvv.length < 3) e.cvv = "Enter valid CVV";
      return e;
   };

   const validateUpi = () => {
      if (!/^[\w.\-]+@[\w]+$/.test(upi)) return "Enter a valid UPI ID (e.g. name@upi)";
      return "";
   };

   // ── Submit ──
   const handlePay = () => {
      if (cartItems.length === 0) {
         toast.error("Your cart is empty!", { position: "top-right", autoClose: 3000 });
         return;
      }
      if (method === "card") {
         const e = validateCard();
         if (Object.keys(e).length) { setCardErr(e); return; }
      }
      if (method === "upi") {
         const e = validateUpi();
         if (e) { setUpiErr(e); return; }
      }

      setProc(true);
      toast.loading("Processing payment...", { toastId: "pay-loading" });

      setTimeout(() => {
         toast.dismiss("pay-loading");
         toast.success("Payment successful! 🎉", { position: "top-right", autoClose: 2000 });
         setProc(false);
         setDone(true);

         // Pass order snapshot to thank-you via sessionStorage
         const orderSnap = {
            items: cartItems,
            subtotal,
            discount,
            shipping,
            total,
            coupon: appliedCoupon?.code || null,
         };
         sessionStorage.setItem("lastOrder", JSON.stringify(orderSnap));

         setTimeout(() => {
            dispatch(clearCart());
            navigate("/thank-you");
         }, 800);
      }, 2500);
   };

   const inputCls = (err) =>
      `w-full px-4 py-3 text-sm border-2 bg-white focus:outline-none transition-all rounded-none ${err ? "border-red-400" : "border-gray-200 focus:border-gray-900"
      }`;

   return (
      <div className="min-h-screen w-full bg-[#f3f4ff] flex items-start justify-center px-4 py-10"
         style={{ fontFamily: "Arial, sans-serif" }}>

         <ToastContainer />

         <div className="w-full max-w-6xl">

            {/* ── Header ── */}
            <div className="mb-8">
               <span className="text-2xl font-black tracking-widest uppercase text-gray-900"
                  style={{ letterSpacing: "0.18em" }}>MyStore</span>
               <div className="mt-1 h-0.5 w-10 bg-gray-900" />
            </div>

            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-8">
               <span>Cart</span><span>›</span><span>Shipping</span><span>›</span>
               <span className="text-gray-900 font-bold">Payment</span>
            </div>

            {/* Empty cart guard */}
            {cartItems.length === 0 && (
               <div className="text-center py-20">
                  <p className="text-gray-400 text-lg mb-4">Your cart is empty.</p>
                  <button onClick={() => navigate("/")}
                     className="px-8 py-3 bg-gray-900 text-white text-sm font-black uppercase tracking-widest hover:bg-black transition-all">
                     Continue Shopping
                  </button>
               </div>
            )}

            {cartItems.length > 0 && (
               <div className="flex flex-col lg:flex-row gap-8">

                  {/* ══ LEFT: Payment Form ══ */}
                  <div className="flex-1 space-y-6">

                     {/* Method selector */}
                     <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4"
                           style={{ letterSpacing: "0.15em" }}>Payment Method</h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                           {[
                              { id: "card", label: "💳  Credit / Debit Card" },
                              { id: "upi", label: "⚡  UPI" },
                              { id: "cod", label: "📦  Cash on Delivery" },
                           ].map(({ id, label }) => (
                              <button key={id}
                                 onClick={() => { setMethod(id); setCardErr({}); setUpiErr(""); }}
                                 className={`flex-1 py-3 px-4 text-sm font-bold uppercase tracking-widest border-2 transition-all rounded-none ${method === id
                                       ? "border-gray-900 bg-gray-900 text-white"
                                       : "border-gray-200 text-gray-500 hover:border-gray-400"
                                    }`}
                                 style={{ letterSpacing: "0.1em" }}>
                                 {label}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Card form */}
                     {method === "card" && (
                        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-5">
                           <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2"
                              style={{ letterSpacing: "0.15em" }}>Card Details</h2>

                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Card Number</label>
                              <input type="text" inputMode="numeric" value={card.number} maxLength={19}
                                 onChange={(e) => { setCard((c) => ({ ...c, number: fmtCard(e.target.value) })); setCardErr((p) => ({ ...p, number: "" })); }}
                                 placeholder="1234 5678 9012 3456" className={inputCls(cardErr.number)} />
                              {cardErr.number && <p className="text-red-500 text-xs mt-1.5">✕ {cardErr.number}</p>}
                           </div>

                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Cardholder Name</label>
                              <input type="text" value={card.name}
                                 onChange={(e) => { setCard((c) => ({ ...c, name: e.target.value })); setCardErr((p) => ({ ...p, name: "" })); }}
                                 placeholder="As printed on card" className={inputCls(cardErr.name)} />
                              {cardErr.name && <p className="text-red-500 text-xs mt-1.5">✕ {cardErr.name}</p>}
                           </div>

                           <div className="flex gap-4">
                              <div className="flex-1">
                                 <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Expiry</label>
                                 <input type="text" inputMode="numeric" value={card.expiry} maxLength={5}
                                    onChange={(e) => { setCard((c) => ({ ...c, expiry: fmtExpiry(e.target.value) })); setCardErr((p) => ({ ...p, expiry: "" })); }}
                                    placeholder="MM/YY" className={inputCls(cardErr.expiry)} />
                                 {cardErr.expiry && <p className="text-red-500 text-xs mt-1.5">✕ {cardErr.expiry}</p>}
                              </div>
                              <div className="flex-1">
                                 <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">CVV</label>
                                 <input type="password" inputMode="numeric" value={card.cvv} maxLength={4}
                                    onChange={(e) => { setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })); setCardErr((p) => ({ ...p, cvv: "" })); }}
                                    placeholder="•••" className={inputCls(cardErr.cvv)} />
                                 {cardErr.cvv && <p className="text-red-500 text-xs mt-1.5">✕ {cardErr.cvv}</p>}
                              </div>
                           </div>

                           <div className="flex items-center gap-3 pt-1">
                              {["VISA", "MC", "AMEX", "RUPAY"].map((c) => (
                                 <span key={c} className="text-[10px] font-black tracking-widest border border-gray-200 px-2 py-1 text-gray-400 rounded">{c}</span>
                              ))}
                              <span className="text-[10px] text-gray-400 ml-auto">🔒 256-bit SSL</span>
                           </div>
                        </div>
                     )}

                     {/* UPI form */}
                     {method === "upi" && (
                        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-5">
                           <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2"
                              style={{ letterSpacing: "0.15em" }}>UPI Details</h2>
                           <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">UPI ID</label>
                              <input type="text" value={upi}
                                 onChange={(e) => { setUpi(e.target.value); setUpiErr(""); }}
                                 placeholder="yourname@upi" className={inputCls(upiErr)} />
                              {upiErr && <p className="text-red-500 text-xs mt-1.5">✕ {upiErr}</p>}
                           </div>
                           <p className="text-xs text-gray-400">Supported: GPay, PhonePe, Paytm, BHIM & all UPI apps</p>
                        </div>
                     )}

                     {/* COD */}
                     {method === "cod" && (
                        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6">
                           <div className="flex items-start gap-4">
                              <span className="text-3xl">📦</span>
                              <div>
                                 <p className="font-black uppercase tracking-widest text-gray-900 text-sm mb-1">Cash on Delivery</p>
                                 <p className="text-gray-400 text-sm leading-relaxed">
                                    Pay in cash when your order arrives. No online transaction required. COD charges may apply on select pin codes.
                                 </p>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Pay button */}
                     <button onClick={handlePay} disabled={processing || done}
                        className={`w-full py-4 text-sm font-black uppercase tracking-widest transition-all rounded-none ${done ? "bg-green-600 text-white"
                              : processing ? "bg-gray-400 text-white cursor-not-allowed"
                                 : "bg-gray-900 text-white hover:bg-black"
                           }`}
                        style={{ letterSpacing: "0.15em" }}>
                        {done ? "✓ Payment Successful" : processing ? "Processing..." : `Pay ${fmt(total)} →`}
                     </button>

                     {processing && (
                        <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
                           <div className="h-full bg-gray-900 animate-pulse" style={{ width: "70%", transition: "width 2.5s ease" }} />
                        </div>
                     )}

                     <p className="text-center text-xs text-gray-400">
                        🔒 Your payment info is encrypted and never stored on our servers.
                     </p>
                  </div>

                  {/* ══ RIGHT: Order Summary ══ */}
                  <div className="lg:w-[380px] space-y-4">

                     {/* Items from real cart */}
                     <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5"
                           style={{ letterSpacing: "0.15em" }}>Order Summary</h2>

                        <div className="space-y-4 mb-6">
                           {cartItems.map((item) => (
                              <div key={item.id} className="flex items-start justify-between gap-3">
                                 <div className="flex gap-3 flex-1">
                                    {item.image && (
                                       <img src={item.image} alt={item.name || item.title}
                                          className="w-12 h-14 object-cover rounded-lg flex-shrink-0 bg-gray-100" />
                                    )}
                                    <div>
                                       <p className="text-sm font-bold text-gray-900 leading-tight">{item.name || item.title}</p>
                                       <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                                    </div>
                                 </div>
                                 <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                    {fmt(item.price * item.quantity)}
                                 </p>
                              </div>
                           ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                           <div className="flex justify-between text-sm text-gray-500">
                              <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                              <span>{fmt(subtotal)}</span>
                           </div>
                           {appliedCoupon && (
                              <div className="flex justify-between text-sm text-green-600 font-bold">
                                 <span>Coupon ({appliedCoupon.code})</span>
                                 <span>− {fmt(discount)}</span>
                              </div>
                           )}
                           <div className="flex justify-between text-sm text-gray-500">
                              <span>Shipping</span>
                              <span className={shipping === 0 ? "text-green-600 font-bold" : "text-gray-900 font-medium"}>
                                 {shipping === 0 ? "FREE" : fmt(shipping)}
                              </span>
                           </div>
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                           <span className="text-sm font-black uppercase tracking-widest text-gray-900">Total</span>
                           <span className="text-xl font-black text-gray-900">{fmt(total)}</span>
                        </div>
                     </div>

                     {/* Coupon — working, cycles through pool */}
                     <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-5">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
                           style={{ letterSpacing: "0.12em" }}>Promo Code</label>
                        <div className="flex gap-2">
                           <input
                              type="text"
                              placeholder="Enter code"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              className="flex-1 px-4 py-2.5 text-sm border-2 border-gray-200 focus:border-gray-900 focus:outline-none rounded-none bg-white"
                           />
                           <button
                              onClick={handleCoupon}
                              className="px-4 py-2.5 bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
                              Apply
                           </button>
                        </div>
                        {appliedCoupon && (
                           <div className="flex items-center justify-between mt-2">
                              <p className="text-green-600 text-xs font-bold">✓ {appliedCoupon.label} applied!</p>
                              <button onClick={handleRemoveCoupon}
                                 className="text-xs text-gray-400 hover:text-red-500 underline transition-colors">
                                 Remove
                              </button>
                           </div>
                        )}
                     </div>

                     {/* Trust badges */}
                     <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-5 space-y-3">
                        {[
                           { icon: "🔒", text: "Secure 256-bit SSL encryption" },
                           { icon: "↩️", text: "Free returns within 15 days" },
                           { icon: "🚚", text: "Delivered in 3–5 business days" },
                        ].map(({ icon, text }) => (
                           <div key={text} className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{icon}</span><span>{text}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}