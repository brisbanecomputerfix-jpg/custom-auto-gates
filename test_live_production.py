import urllib.request
import re

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirect)

tests = [
    ('1a. WWW Homepage', 'https://www.customautogates.com.au/'),
    ('1b. WWW Subpage', 'https://www.customautogates.com.au/driveway-gates'),
    ('2a. HTTP Non-WWW', 'http://customautogates.com.au/'),
    ('2b. HTTP WWW', 'http://www.customautogates.com.au/'),
    ('3a. /gates/', 'https://customautogates.com.au/gates/'),
    ('3b. /gates', 'https://customautogates.com.au/gates'),
    ('3c. /gates/sliding-gates/', 'https://customautogates.com.au/gates/sliding-gates/'),
    ('3d. /gate-automation/automation-accessories/', 'https://customautogates.com.au/gate-automation/automation-accessories/'),
    ('3e. /lp/balustrade/', 'https://customautogates.com.au/lp/balustrade/'),
    ('3f. /gallery-and-design/fencing/', 'https://customautogates.com.au/gallery-and-design/fencing/'),
    ('3g. Trailing slash on subpage', 'https://customautogates.com.au/driveway-gates/'),
    ('4. Unknown page 404', 'https://customautogates.com.au/random-non-existent-page-test-404'),
    ('5a. Homepage canonical', 'https://customautogates.com.au/'),
    ('5b. Subpage canonical', 'https://customautogates.com.au/driveway-gates'),
]

print("=== LIVE PRODUCTION VERIFICATION FOR CUSTOMAUTOGATES.COM.AU ===")

for label, url in tests:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)'})
        res = opener.open(req, timeout=10)
        body = res.read().decode('utf-8', errors='ignore')
        canon_match = re.search(r'<link rel="canonical" href="([^"]*)"', body)
        canonical = canon_match.group(1) if canon_match else ''
        print(f"{label}: Status={res.getcode()} Location={res.headers.get('Location')} Canonical={canonical}")
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='ignore')
        print(f"{label}: HTTPError Status={e.code} Location={e.headers.get('Location')}")
    except Exception as e:
        print(f"{label}: Exception={e}")
