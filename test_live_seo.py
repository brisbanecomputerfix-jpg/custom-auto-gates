import urllib.request
import re

urls = [
    ('Homepage', 'https://customautogates.com.au/'),
    ('Driveway Gates', 'https://customautogates.com.au/driveway-gates'),
    ('Sliding Gates', 'https://customautogates.com.au/automatic-sliding-gates'),
    ('Brisbane Suburbs', 'https://customautogates.com.au/gates-brisbane'),
    ('Ipswich Suburbs', 'https://customautogates.com.au/gates-ipswich'),
    ('Logan Suburbs', 'https://customautogates.com.au/gates-logan'),
]

headers = {'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}

print("=== LIVE PRODUCTION AUDIT FOR LOCAL & MERCHANT SEO ===")
for name, u in urls:
    req = urllib.request.Request(u, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as r:
        html = r.read().decode('utf-8')
        m_title = re.search(r'<title>(.*?)</title>', html)
        m_desc = re.search(r'<meta name="description" content="(.*?)"', html)
        title = m_title.group(1) if m_title else 'NONE'
        desc = m_desc.group(1) if m_desc else 'NONE'
        has_return = 'MerchantReturnPolicy' in html
        has_shipping = 'OfferShippingDetails' in html
        has_localbiz = 'HomeAndConstructionBusiness' in html
        has_stars = '"@type": "AggregateRating"' in html
        has_faq = '"@type": "FAQPage"' in html
        
        print(f"\n[{name}] {u}")
        print(f"  Title: {title}")
        print(f"  Meta Desc: {desc}")
        print(f"  Merchant Listing (Return Policy): {has_return} | (Shipping Details): {has_shipping}")
        print(f"  LocalBusiness Schema: {has_localbiz} | Review Stars (4.9): {has_stars} | FAQ Accordion: {has_faq}")

print("\nALL AUDITS COMPLETED SUCCESSFULLY!")
