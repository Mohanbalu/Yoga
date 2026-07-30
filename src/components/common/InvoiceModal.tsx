import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const InvoiceModal: React.FC = () => {
  const { activeInvoice, closeInvoiceModal, formatPrice, showToast } = useApp();

  if (!activeInvoice) return null;

  const handlePrint = () => {
    showToast('Preparing tax invoice for printing...', 'info');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#D5E2DC] relative my-6"
      >
        {/* Top Control Bar */}
        <div className="bg-[#18241F] text-white p-4 px-6 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#E2C085] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Official Tax Invoice #{activeInvoice.id}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={closeInvoiceModal}
              className="p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 space-y-6 text-[#2C3B34]">
          {/* Header Branding */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E6EBE8] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1B3B36] text-[#E2C085] flex items-center justify-center font-serif-luxury font-bold text-lg">
                  S
                </div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">Sattva Yoga Studio</h2>
              </div>
              <p className="text-[11px] text-[#6B857B] mt-1">
                42 Lotus Boulevard, Indiranagar, Bengaluru, KA 560038<br />
                GSTIN: 29AABCS8812K1Z9 • Email: billing@sattvayoga.com
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                {activeInvoice.status}
              </span>
              <p className="text-xs text-[#6B857B]">Invoice Date: {activeInvoice.date}</p>
              <p className="text-xs text-[#6B857B]">Booking Ref: {activeInvoice.bookingId}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E6EBE8] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#88B09F] block mb-1">Billed To</span>
              <p className="font-bold text-[#1B3B36]">{activeInvoice.customerName}</p>
              <p className="text-[#6B857B]">{activeInvoice.customerEmail}</p>
              <p className="text-[#6B857B]">{activeInvoice.customerPhone}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#88B09F] block mb-1">Payment Method</span>
              <p className="font-semibold text-[#1B3B36]">{activeInvoice.paymentMethod}</p>
              <p className="text-[#6B857B]">Status: Settled via 256-Bit Gateway</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-[#E6EBE8] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F8F6] border-b border-[#E6EBE8] text-[#1B3B36]">
                <tr>
                  <th className="p-3 font-bold">Item Description</th>
                  <th className="p-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EBE8]">
                {activeInvoice.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="p-3 text-[#2C3B34] font-medium">{item.description}</td>
                    <td className="p-3 text-right font-bold text-[#1B3B36]">{formatPrice(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-[#6B857B]">
                <span>Subtotal:</span>
                <span>{formatPrice(activeInvoice.totalAmount - activeInvoice.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-[#6B857B]">
                <span>GST (18% Included):</span>
                <span>{formatPrice(activeInvoice.taxAmount)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6EBE8] font-bold text-sm text-[#1B3B36]">
                <span>Total Paid:</span>
                <span className="text-[#1B3B36]">{formatPrice(activeInvoice.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-[#E6EBE8] text-[11px] text-[#88B09F]">
            This is a computer-generated tax invoice. Thank you for practicing with Sattva.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
