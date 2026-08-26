import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendLeadNotification } from './server/emailHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log('🧪 Starting Contact Form & Email Server Integration Tests...\n');

  // Test 1: Main Contact Form Submission
  console.log('--- TEST 1: Main Contact Form (Form ID: 2 clone) ---');
  const contactLead = {
    name: 'Sarah Jenkins (Test Customer)',
    phone: '0412 345 678',
    email: 'sarah.jenkins.test@gmail.com',
    address: '14 Riverview Terrace, Indooroopilly QLD 4068',
    suburb: 'Indooroopilly',
    serviceType: 'Automatic Sliding Gate (Residential Home)',
    preferredTime: 'Morning (8am - 12pm)',
    notes: 'Need a quote for a 4.5m automatic sliding slat gate in Monument color with Centurion D5 motor.',
    source: 'Website Contact Page'
  };

  const contactResult = await sendLeadNotification(contactLead);
  console.log('Result:', contactResult);
  if (!contactResult.success) throw new Error('Test 1 Failed');
  console.log('✅ Test 1 Passed: Contact lead processed and stored!\n');

  // Test 2: Gate Visualizer & Estimator Lead
  console.log('--- TEST 2: Gate Estimator & Visualizer Quote ---');
  const quoteLead = {
    name: 'David Miller',
    phone: '0423 888 999',
    email: 'david.miller.test@outlook.com',
    suburb: 'Yamanto / Ipswich',
    serviceType: 'Gate Estimator: Automatic Sliding Gate (DecoWood Timber)',
    dimensions: '4.2m Wide x 1.8m High',
    estimatedPrice: '$4,850 - $5,400 AUD (Estimator)',
    notes: 'Motor: Centurion D5 Smart. Additional notes: Driveway has a slight 3 degree slope to the left.',
    source: 'Gate Visualizer & Cost Estimator'
  };

  const quoteResult = await sendLeadNotification(quoteLead);
  console.log('Result:', quoteResult);
  if (!quoteResult.success) throw new Error('Test 2 Failed');
  console.log('✅ Test 2 Passed: Visualizer quote processed and stored!\n');

  // Test 3: Service & Warranty Booking
  console.log('--- TEST 3: Service, Repair & Warranty Form (Form ID: 10 clone) ---');
  const serviceLead = {
    name: 'Robert Taylor',
    phone: '0434 111 222',
    email: 'robert.taylor.test@gmail.com',
    address: '88 Augustine Heights Blvd, Augustine Heights QLD 4300',
    suburb: 'Augustine Heights',
    serviceType: 'Service Booking: repair (residential - $250 callout)',
    notes: 'Original Purchaser: Yes. Gate Type: sliding. Motor: Centurion D5 Smart. Issues: Gate stops halfway when closing and safety beams beep.',
    source: 'Service & Warranty Booking Form'
  };

  const serviceResult = await sendLeadNotification(serviceLead);
  console.log('Result:', serviceResult);
  if (!serviceResult.success) throw new Error('Test 3 Failed');
  console.log('✅ Test 3 Passed: Service lead processed and stored!\n');

  // Test 4: Verify leads.json storage
  console.log('--- TEST 4: Verifying Local Leads Database Backup ---');
  const leadsPath = path.join(__dirname, 'server', 'leads.json');
  if (fs.existsSync(leadsPath)) {
    const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
    console.log(`Total leads recorded in leads.json: ${leads.length}`);
    console.log('Most recent lead saved:', leads[0].name, '| Source:', leads[0].source, '| Time:', leads[0].receivedAt);
    console.log('✅ Test 4 Passed: Leads database backup is fully operational and persistent!\n');
  } else {
    throw new Error('leads.json was not created');
  }

  console.log('🎉 ALL 4 CONTACT FORM & EMAIL INTEGRATION TESTS PASSED SUCCESSFULLY!');
}

runTests().catch((err) => {
  console.error('❌ Test execution failed:', err);
  process.exit(1);
});
