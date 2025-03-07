import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (dateFilter) {
      setFilteredInvoices(invoices.filter(inv => inv.date === dateFilter));
    } else {
      setFilteredInvoices(invoices);
    }
  }, [dateFilter, invoices]);

  // Updated calculateTotals function to safely handle undefined items
  const calculateTotals = (items = []) => {
    let totalWithoutTax = 0;
    let totalWithTax = 0;
    if (!Array.isArray(items)) return { totalWithoutTax, totalWithTax };

    items.forEach(item => {
      const itemTotal = item.dealPrice * item.quantity;
      totalWithoutTax += itemTotal;
      totalWithTax += itemTotal + (item.tax * item.quantity);
    });
    return { totalWithoutTax, totalWithTax };
  };

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    try {
      const canvas = await html2canvas(pdfRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoices.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) return <div>Loading invoices...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Invoice Portal</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Filter by Date:
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div ref={pdfRef}>
        {filteredInvoices.map(invoice => {
          const { totalWithoutTax, totalWithTax } = calculateTotals(invoice.items || []);
          return (
            <div
              key={invoice.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <h2>{invoice.storeName} - Order #{invoice.orderId}</h2>
              <p>Date: {invoice.date}</p>
              <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Regular Price</th>
                    <th>Deal Price</th>
                    <th>Tax (per item)</th>
                    <th>Item Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(invoice.items || []).map(item => (
                    <tr key={item.id}>
                      <td>{item.product}</td>
                      <td>{item.quantity}</td>
                      <td>${item.regularPrice}</td>
                      <td>${item.dealPrice}</td>
                      <td>${item.tax}</td>
                      <td>${(item.dealPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Grand Total (without tax): ${totalWithoutTax.toFixed(2)}</p>
              <p>Grand Total (with tax): ${totalWithTax.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
      <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Generate PDF
      </button>
    </div>
  );
}

export default InvoicePage;
