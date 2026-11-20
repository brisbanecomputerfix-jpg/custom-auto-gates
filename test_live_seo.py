import urllib.request
import re

urls_to_check = [
    ('Homepage', 'https://customautogates.com.au/'),
    ('Driveway Gates', 'https://customautogates.com.au/driveway-gates'),
    ('Sliding Gates', 'https://customautogates.com.au/automatic-sliding-gates'),
    ('Solar Gates', 'https://customautogates.com.au/solar-gates'),
    ('Repairs / Service', 'https://customautogates.com.au/service'),
    ('Brisbane Suburbs', 'https://customautogates.com.au/gates-brisbane'),
    ('Ipswich Suburbs', 'https://customautogates.com.au/gates-ipswich'),
    ('Pricing Guide', 'https://customautogates.com.au/pricing-guide'),
]

print("=== LIVE PRODUCTION SEO & RICH SCHEMA AUDIT ===")
req_headers = {'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}

all_passed = True

for name, url in urls_to_check:
    req = urllib.request.Request(url, headers=req_headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        title_m = re.search(r'<title>(.*?)</title>', html)
        title = title_m.group(1) if title_m else 'NO TITLE'
        
        has_schema = 'id="dynamic-route-schema"' in html or '"@graph"' in html
        has_faq = '"@type": "FAQPage"' in html
        has_product = '"@type": "Product"' in html
        has_aggregate = '"@type": "AggregateRating"' in html
        
        print(f"\n[{name}] {url}")
        print(f"  Title: {title}")
        print(f"  Schema: {has_schema} | Product: {has_product} | Rating: {has_aggregate} | FAQ: {has_faq}")
        
        if not title or title == 'NO TITLE':
            all_passed = False

print("\nAUDIT COMPLETED. Success:", all_passed)
