import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STEPS = [
  { label: "Order Confirmed",  done: true,  active: false },
  { label: "Processing",       done: false, active: true  },
  { label: "Shipped",          done: false, active: false },
  { label: "Out for Delivery", done: false, active: false },
  { label: "Delivered",        done: false, active: false },
];

const fmt = (n) => `₹${Math.max(0, n).toLocaleString("en-IN")}`;

const ORDER_ID   = "MST-" + Math.floor(100000 + Math.random() * 900000);
const ORDER_DATE = new Date().toLocaleDateString("en-IN", {
  day: "numeric", month: "long", year: "numeric",
});

export default function ThankYou() {
  const [visible, setVisible] = useState(false);
  const [order, setOrder]     = useState(null);

  useEffect(() => {
    // Read the order snapshot saved by PaymentGateway
    try {
      const raw = sessionStorage.getItem("lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch (_) {}

    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Fallback if somehow no order in session (e.g. direct URL hit)
  const items    = order?.items    || [];
  const subtotal = order?.subtotal || 0;
  const discount = order?.discount || 0;
  const shipping = order?.shipping ?? 0;
  const total    = order?.total    || 0;
  const coupon   = order?.coupon   || null;

  return (
    <div
      className="min-h-screen w-full bg-[#f3f4ff] flex items-center justify-center px-4 py-12"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div
        className="w-full max-w-2xl"
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-black tracking-widest uppercase text-gray-900"
            style={{ letterSpacing: "0.18em" }}>MyStore</span>
        </div>

        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">

          {/* Top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400" />

          <div className="p-8 md:p-12 text-center">

            {/* Checkmark */}
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2"
              style={{ letterSpacing: "-0.01em" }}>Order Confirmed!</h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Thank you for shopping with MyStore. Your order has been placed successfully.
              <br />A confirmation email has been sent to your registered address.
            </p>

            {/* Order meta */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Order ID",      value: ORDER_ID    },
                { label: "Date",          value: ORDER_DATE  },
                { label: "Est. Delivery", value: "3–5 Days"  },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl px-4 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1"
                    style={{ letterSpacing: "0.15em" }}>{label}</p>
                  <p className="text-sm font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Order tracker */}
            <div className="mb-8">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5"
                style={{ letterSpacing: "0.15em" }}>Order Status</h2>
              <div className="relative flex items-start justify-between">
                <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
                <div className="absolute top-3.5 left-0 h-0.5 bg-gray-900 z-0" style={{ width: "10%" }} />
                {STEPS.map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2" style={{ flex: 1 }}>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-all ${
                      step.done   ? "bg-gray-900 border-gray-900 text-white"
                      : step.active ? "bg-white border-gray-900 text-gray-900"
                                  : "bg-white border-gray-200 text-gray-300"
                    }`}>
                      {step.done ? "✓" : i + 1}
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider text-center leading-tight ${
                      step.done || step.active ? "text-gray-900" : "text-gray-300"
                    }`}>{step.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Real items from cart ── */}
            {items.length > 0 && (
              <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 mb-8 text-left">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    {item.image && (
                      <img src={item.image} alt={item.name || item.title}
                        className="w-12 h-14 object-cover rounded-lg flex-shrink-0 bg-gray-100" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{item.name || item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-black text-gray-900 whitespace-nowrap">
                      {fmt(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                {/* Price breakdown */}
                <div className="px-5 py-3 space-y-1.5 bg-gray-50/50">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span><span>{fmt(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-green-600 font-bold">
                      <span>Coupon {coupon ? `(${coupon})` : ""}</span>
                      <span>− {fmt(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>
                      {shipping === 0 ? "FREE" : fmt(shipping)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-5 py-4 bg-gray-50 rounded-b-xl">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Total Paid</span>
                  <span className="text-lg font-black text-gray-900">{fmt(total)}</span>
                </div>
              </div>
            )}

            {/* Fallback if no order snapshot */}
            {items.length === 0 && (
              <div className="border border-gray-100 rounded-xl p-6 mb-8 text-center text-gray-400 text-sm">
                Order details unavailable.
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/home"
                className="flex-1 bg-gray-900 text-white py-4 text-sm font-black uppercase tracking-widest text-center hover:bg-black transition-all"
                style={{ letterSpacing: "0.15em" }}>
                Continue Shopping →
              </Link>
              <button
                className="flex-1 border-2 border-gray-900 text-gray-900 py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all"
                style={{ letterSpacing: "0.12em" }}>
                Track Order
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Need help?{" "}
          <span className="underline cursor-pointer text-gray-600">Contact Support</span>
          {" "}·{" "}
          <span className="underline cursor-pointer text-gray-600">returns@mystore.com</span>
        </p>
      </div>
    </div>
  );
}