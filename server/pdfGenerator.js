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
        .text('Custom Auto Gates Pty Ltd • 43 Belar Street, Yamanto QLD 4305 • Tel: (07) 3102 1801 • office@customautogates.com.au • ABN: 73 634 329 860', margin, bottomY + 18, { width: contentWidth, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
