import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveImagePath(imgUrl) {
  if (!imgUrl) return null;
  try {
    const filename = path.basename(imgUrl.split('?')[0]);
    const localPath = path.resolve(__dirname, '../public/images', filename);
    if (fs.existsSync(localPath)) return localPath;
    
    // Check root public folder as fallback
    const rootPublicPath = path.resolve(__dirname, '../public', filename);
    if (fs.existsSync(rootPublicPath)) return rootPublicPath;
  } catch {
    return null;
  }
  return null;
}

/**
 * Generate a professional itemized PDF Quote breakdown matching Screenshot 2
 * @param {Object} quote
 * @returns {Promise<Buffer>}
 */
export function generateQuotePdf(quote = {}) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 36, bottom: 36, left: 42, right: 42 },
        info: {
          Title: `Instant Gate Quote - ${quote.name || 'Customer'}`,
          Author: 'Custom Auto Gates & Fencing Pty Ltd',
          Subject: 'Instant Gate Pricing & Material Breakdown',
          Keywords: 'gate, automated gate, instant quote, fencing'
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', err => reject(err));

      const pageWidth = 595.28; // A4 standard pt width
      const margin = 42;
      const contentWidth = pageWidth - (margin * 2); // ~511 pt

      // -------------------------------------------------------------
      // 1. Header: Logo (Centered Top)
      // -------------------------------------------------------------
      const logoPath = path.resolve(__dirname, '../public/images/custom-auto-gates-logo-horizontal-light.png');
      if (fs.existsSync(logoPath)) {
        const logoWidth = 180;
        const logoX = (pageWidth - logoWidth) / 2;
        doc.image(logoPath, logoX, 36, { width: logoWidth });
        doc.y = 100;
      } else {
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#c98a2c').text('CUSTOM AUTO GATES & FENCING', { align: 'center' });
        doc.fontSize(9).font('Helvetica').fillColor('#4a5568').text('Yamanto Factory Direct Fabrication & Automation', { align: 'center' });
        doc.moveDown(1.5);
      }

      // -------------------------------------------------------------
      // 2. Metadata Block: Date & Customer Details (Top-Right Aligned)
      // -------------------------------------------------------------
      const dateStr = quote.date || new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' });
      
      const metaY = doc.y + 6;
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#1a202c').text(dateStr, margin, metaY, { align: 'right', width: contentWidth });
      
      doc.moveDown(0.3);
      const rightX = pageWidth - margin - 260;
      const detailsY = doc.y;

      const printDetailRow = (label, val, y) => {
        if (!val) return y;
        doc.fontSize(9).font('Helvetica-Bold').fillColor('#1a202c').text(label, rightX, y, { width: 85, align: 'right' });
        doc.fontSize(9).font('Helvetica').fillColor('#2d3748').text(val, rightX + 90, y, { width: 170, align: 'left' });
        return y + 14;
      };

      let curDetailY = detailsY;
      curDetailY = printDetailRow('Your Name:', quote.name || 'Valued Customer', curDetailY);
      curDetailY = printDetailRow('Your Email:', quote.email || 'Not provided', curDetailY);
      curDetailY = printDetailRow('Your Phone:', quote.phone || 'Not provided', curDetailY);
      curDetailY = printDetailRow('Your Address:', quote.address || quote.suburb || 'Brisbane / Ipswich / SE QLD', curDetailY);

      doc.y = Math.max(curDetailY + 12, doc.y + 12);

      // -------------------------------------------------------------
      // 3. Main Heading: Instant Gate Quotes - Now
      // -------------------------------------------------------------
      doc.moveDown(0.5);
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#111827').text('Instant Gate Quotes - Now', { align: 'center' });
      doc.moveDown(0.6);

      // -------------------------------------------------------------
      // 4. Table Header: Description & Quantity
      // -------------------------------------------------------------
      const tableStartY = doc.y;
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#1a202c').text('Description', margin, tableStartY);
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#1a202c').text('Quantity', margin, tableStartY, { align: 'right', width: contentWidth });

      doc.moveDown(0.4);
      const dividerY1 = doc.y;
      doc.strokeColor('#cbd5e1').lineWidth(1.5).moveTo(margin, dividerY1).lineTo(margin + contentWidth, dividerY1).stroke();
      doc.moveDown(0.6);

      // -------------------------------------------------------------
      // 5. Selected Items
      // -------------------------------------------------------------
      const renderItem = (category, title, options = {}) => {
        const itemY = doc.y;
        
        // Category Label (e.g. DESIGNS, Gate Type, Gate Size)
        doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#4b5563').text(category.toUpperCase(), margin, itemY);
        doc.moveDown(0.25);

        const contentY = doc.y;

        // Optional thumbnail image for DESIGNS
        let textIndent = margin;
        if (options.imagePath && fs.existsSync(options.imagePath)) {
          try {
            const imgW = 46;
            const imgH = 34;
            doc.image(options.imagePath, margin, contentY, { fit: [imgW, imgH], align: 'center', valign: 'center' });
            textIndent = margin + imgW + 10;
          } catch (imgErr) {
            console.warn('Could not render image in PDF:', imgErr.message);
          }
        }

        // Title/Description
        doc.fontSize(9.5).font('Helvetica').fillColor('#1f2937')
          .text(title, textIndent, contentY + (options.imagePath ? 8 : 0), { width: contentWidth - 60 - (textIndent - margin) });

        // Quantity (1)
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1f2937')
          .text('1', margin, contentY + (options.imagePath ? 8 : 0), { align: 'right', width: contentWidth });

        if (options.imagePath) {
          doc.y = Math.max(doc.y, contentY + 38);
        } else {
          doc.moveDown(0.45);
        }
      };

      // 5.1 Design Item
      const designImgPath = resolveImagePath(quote.designImage) || resolveImagePath('/images/gates-and-fencingIMG_6740.jpg');
      renderItem('DESIGNS', quote.design || 'Bare Frame Clad with Fence Palings', { imagePath: designImgPath });

      // 5.2 Gate Type
      renderItem('Gate Type', quote.gateType || 'Sliding Gate');

      // 5.3 Gate Size
      const sizeText = (quote.widthMm && quote.heightMm)
        ? `${quote.widthMm}mm (W) × ${quote.heightMm}mm (H) (${quote.areaM2 || ((quote.widthMm * quote.heightMm) / 1000000).toFixed(2)} m²)`
        : (quote.dimensions || '4000mm (W) × 1800mm (H) (7.20 m²)');
      renderItem('Gate Size', sizeText);

      // 5.4 Power Supply
      renderItem('Power Supply', quote.powerSupply || '240V Existing Power Point');

      // 5.5 Automation Type / Motor
      renderItem('Automation Type', quote.motor || 'Residential Slide Motor');

      // 5.6 Project Stage / Timeline
      renderItem('What stage are you at for this project?', quote.timeline || 'Ready to get a site visit within 2 weeks');

      // 5.7 Accessories (if any)
      if (quote.accessories) {
        const accList = Array.isArray(quote.accessories) 
          ? quote.accessories 
          : String(quote.accessories).split(',').map(s => s.trim()).filter(Boolean);
        
        accList.forEach(acc => {
          renderItem('Accessory / Add-on', acc);
        });
      }

      // 5.8 Additional Notes
      if (quote.notes) {
        doc.moveDown(0.2);
        const notesY = doc.y;
        doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#4b5563').text('DRIVEWAY SLOPE, FENCING, OR ACCESS NOTES', margin, notesY);
        doc.moveDown(0.2);
        doc.fontSize(9).font('Helvetica').fillColor('#374151').text(quote.notes, margin, doc.y, { width: contentWidth - 40 });
        doc.moveDown(0.5);
      }

      // -------------------------------------------------------------
      // 6. Totals Section (Subtotal, TAX 10%, Total Price)
      // -------------------------------------------------------------
      doc.moveDown(0.4);
      const dividerY2 = doc.y;
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(margin, dividerY2).lineTo(margin + contentWidth, dividerY2).stroke();
      doc.moveDown(0.6);

      const totalsBoxWidth = 240;
      const totalsBoxX = pageWidth - margin - totalsBoxWidth;

      const printTotalRow = (label, val, isBold = false, isLarge = false, color = '#1a202c') => {
        const y = doc.y;
        doc.fontSize(isLarge ? 11 : 9.5).font(isBold ? 'Helvetica-Bold' : 'Helvetica').fillColor(color)
          .text(label, totalsBoxX, y, { width: 110, align: 'right' });
        doc.fontSize(isLarge ? 12 : 9.5).font(isBold ? 'Helvetica-Bold' : 'Helvetica').fillColor(color)
          .text(val, totalsBoxX + 115, y, { width: 125, align: 'right' });
        doc.moveDown(isLarge ? 0.6 : 0.4);
      };

      if (quote.subtotal) {
        printTotalRow('Subtotal:', quote.subtotal, false, false, '#4a5568');
      }
      if (quote.tax) {
        printTotalRow('TAX 10%:', quote.tax, false, false, '#4a5568');
      }

      const totalDividerY = doc.y;
      doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(totalsBoxX, totalDividerY).lineTo(margin + contentWidth, totalDividerY).stroke();
      doc.moveDown(0.4);

      const finalPrice = quote.totalPriceRange || quote.estimatedTotal || quote.estimatedPrice || 'Contact For Quote';
      printTotalRow('Total Price:', finalPrice, true, true, '#c98a2c');

      // -------------------------------------------------------------
      // 7. Footer: Disclaimer & Company Legal Credentials
      // -------------------------------------------------------------
      const bottomY = 770;
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(margin, bottomY).lineTo(margin + contentWidth, bottomY).stroke();

      doc.fontSize(7.5).font('Helvetica').fillColor('#64748b')
        .text('• Preliminary online estimation. Final contract is subject to on-site laser measure, driveway slope check, and structural post assessment.', margin, bottomY + 6, { width: contentWidth, align: 'center' });
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#334155')
        .text('Custom Auto Gates Pty Ltd • Shed 2, 43-45 Belar Street, Yamanto QLD 4305 • Tel: (07) 3102 1801 • office@customautogates.com.au • ABN: 73 634 329 860', margin, bottomY + 18, { width: contentWidth, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generate a professional Service Booking Confirmation & Tax Invoice PDF
 * @param {Object} booking
 * @returns {Promise<Buffer>}
 */
export function generateBookingReceiptPdf(booking = {}) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 36, bottom: 36, left: 42, right: 42 },
        info: {
          Title: `Service Booking Receipt - ${booking.name || 'Customer'}`,
          Author: 'Custom Auto Gates & Fencing Pty Ltd',
          Subject: 'Tax Invoice & Service Booking Confirmation',
          Keywords: 'service receipt, tax invoice, gate repair, custom auto gates'
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', err => reject(err));

      const pageWidth = 595.28;
      const margin = 42;
      const contentWidth = pageWidth - (margin * 2);

      // 1. Header: Logo or Company Title
      const logoPath = path.resolve(__dirname, '../public/images/custom-auto-gates-logo-horizontal-light.png');
      if (fs.existsSync(logoPath)) {
        const logoWidth = 180;
        const logoX = (pageWidth - logoWidth) / 2;
        doc.image(logoPath, logoX, 36, { width: logoWidth });
        doc.y = 100;
      } else {
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#c98a2c').text('CUSTOM AUTO GATES & FENCING', { align: 'center' });
        doc.fontSize(9).font('Helvetica').fillColor('#4a5568').text('Yamanto Factory Direct Fabrication & Automation', { align: 'center' });
        doc.moveDown(1.5);
      }

      // 2. Metadata Block: Tax Invoice / Receipt # and Date
      const dateStr = booking.date || new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const receiptNum = booking.receiptNumber || booking.paymentDetails?.stripeRef || `CAG-${Date.now().toString().slice(-6)}`;

      const metaY = doc.y + 6;
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#10b981').text('TAX INVOICE / RECEIPT - PAID', margin, metaY, { align: 'right', width: contentWidth });
      doc.fontSize(9).font('Helvetica').fillColor('#64748b').text(`Receipt Ref: ${receiptNum}`, margin, metaY + 14, { align: 'right', width: contentWidth });
      doc.fontSize(9).font('Helvetica').fillColor('#64748b').text(`Date: ${dateStr}`, margin, metaY + 26, { align: 'right', width: contentWidth });

      // Left side: Customer Information
      const leftY = metaY;
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#1a202c').text('CUSTOMER & SITE DETAILS:', margin, leftY);
      doc.fontSize(9).font('Helvetica').fillColor('#2d3748').text(`Name: ${booking.name || 'Valued Customer'}`, margin, leftY + 14);
      doc.fontSize(9).font('Helvetica').fillColor('#2d3748').text(`Phone: ${booking.phone || 'N/A'}`, margin, leftY + 26);
      doc.fontSize(9).font('Helvetica').fillColor('#2d3748').text(`Email: ${booking.email || 'N/A'}`, margin, leftY + 38);
      doc.fontSize(9).font('Helvetica').fillColor('#2d3748').text(`Site Address: ${booking.address || booking.suburb || 'Brisbane / Ipswich'}`, margin, leftY + 50);

      doc.y = leftY + 70;

      // 3. Section Title: Service Booking Overview
      doc.moveDown(0.5);
      doc.fontSize(14).font('Helvetica-Bold').fillColor('#111827').text('Service & Repair Call-Out Confirmation', { align: 'center' });
      doc.moveDown(0.8);

      // 4. Line Items Table Header
      const tableY = doc.y;
      doc.rect(margin, tableY, contentWidth, 22).fill('#f1f5f9');
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#1e293b')
        .text('Description', margin + 10, tableY + 6, { width: 320 })
        .text('Qty', margin + 340, tableY + 6, { width: 40, align: 'center' })
        .text('Amount (AUD)', margin + 390, tableY + 6, { width: 110, align: 'right' });

      doc.y = tableY + 28;

      // Line item: Booking Call Out
      const itemDesc = booking.serviceType || 'Residential Gate Repair & Diagnostics Call-Out';
      const itemAmount = booking.paymentDetails?.amount || '$250.00 AUD';
      const itemY = doc.y;

      doc.fontSize(9).font('Helvetica-Bold').fillColor('#1a202c')
        .text(itemDesc, margin + 10, itemY, { width: 320 });
      doc.fontSize(8).font('Helvetica').fillColor('#64748b')
        .text('Includes technician travel dispatch + up to 30 mins on-site diagnostic & safety testing', margin + 10, itemY + 13, { width: 320 });
      doc.fontSize(9).font('Helvetica').fillColor('#1a202c')
        .text('1', margin + 340, itemY + 6, { width: 40, align: 'center' })
        .text(itemAmount, margin + 390, itemY + 6, { width: 110, align: 'right' });

      doc.y = itemY + 36;
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(margin, doc.y).lineTo(margin + contentWidth, doc.y).stroke();
      doc.moveDown(0.5);

      // Gate / Technical Fault Specifications
      if (booking.notes || booking.gateType || booking.motorBrand) {
        const specBoxY = doc.y;
        doc.rect(margin, specBoxY, contentWidth, 68).fill('#f8fafc');
        doc.strokeColor('#cbd5e1').lineWidth(0.8).rect(margin, specBoxY, contentWidth, 68).stroke();

        doc.fontSize(9).font('Helvetica-Bold').fillColor('#334155').text('SERVICE SPECIFICATIONS & DIAGNOSTIC NOTES:', margin + 12, specBoxY + 8);
        doc.fontSize(8.5).font('Helvetica').fillColor('#475569')
          .text(`• Gate Type: ${booking.gateType || 'Sliding / Swing'} | Motor Brand: ${booking.motorBrand || 'Smart Gate Automation'}`, margin + 12, specBoxY + 22)
          .text(`• Reported Fault / Scope: ${(booking.notes || 'Routine preventative maintenance').substring(0, 180)}`, margin + 12, specBoxY + 34, { width: contentWidth - 24 });
        
        doc.y = specBoxY + 76;
      }

      // Payment Confirmation Box
      const pmY = doc.y + 6;
      doc.rect(margin, pmY, contentWidth, 52).fill('#ecfdf5');
      doc.strokeColor('#10b981').lineWidth(1).rect(margin, pmY, contentWidth, 52).stroke();

      const pm = booking.paymentDetails || {};
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#065f46').text('PAYMENT PROCESSED VIA STRIPE (ONLINE GATEWAY)', margin + 12, pmY + 8);
      doc.fontSize(8.5).font('Helvetica').fillColor('#047857')
        .text(`Status: Paid | Amount: ${pm.amount || itemAmount} | Method: ${pm.method || 'Card'} ${pm.last4 ? `(ending in ${pm.last4})` : ''}`, margin + 12, pmY + 22)
        .text(`Stripe Reference: ${pm.stripeRef || pm.sessionId || 'Verified Online'}`, margin + 12, pmY + 34);

      doc.y = pmY + 66;

      // Totals
      const totalsBoxWidth = 220;
      const totalsBoxX = pageWidth - margin - totalsBoxWidth;
      const totalAmountNum = parseFloat(String(itemAmount).replace(/[^0-9.]/g, '')) || 250.00;
      const gstVal = (totalAmountNum / 11).toFixed(2);
      const exGstVal = (totalAmountNum - parseFloat(gstVal)).toFixed(2);

      const printRow = (label, val, bold = false, color = '#1a202c') => {
        const y = doc.y;
        doc.fontSize(9).font(bold ? 'Helvetica-Bold' : 'Helvetica').fillColor(color)
          .text(label, totalsBoxX, y, { width: 100, align: 'right' });
        doc.fontSize(9).font(bold ? 'Helvetica-Bold' : 'Helvetica').fillColor(color)
          .text(val, totalsBoxX + 105, y, { width: 115, align: 'right' });
        doc.moveDown(0.35);
      };

      printRow('Subtotal (ex GST):', `$${exGstVal} AUD`, false, '#4a5568');
      printRow('GST (10%):', `$${gstVal} AUD`, false, '#4a5568');
      doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(totalsBoxX, doc.y).lineTo(margin + contentWidth, doc.y).stroke();
      doc.moveDown(0.3);
      printRow('Total Paid:', `$${totalAmountNum.toFixed(2)} AUD`, true, '#10b981');

      // 7. Footer: Disclaimer & Company Legal Credentials
      const bottomY = 770;
      doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(margin, bottomY).lineTo(margin + contentWidth, bottomY).stroke();

      doc.fontSize(7.5).font('Helvetica').fillColor('#64748b')
        .text('• Official payment receipt issued upon authorized dispatch. Standard call-out includes travel and initial 30 minutes diagnostic assessment.', margin, bottomY + 6, { width: contentWidth, align: 'center' });
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#334155')
        .text('Custom Auto Gates Pty Ltd • Shed 2, 43-45 Belar Street, Yamanto QLD 4305 • Tel: (07) 3102 1801 • office@customautogates.com.au • ABN: 73 634 329 860', margin, bottomY + 18, { width: contentWidth, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
