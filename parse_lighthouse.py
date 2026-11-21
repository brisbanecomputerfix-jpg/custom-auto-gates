import json
import os

def parse_report(filename, label):
    if not os.path.exists(filename):
        print(f"File {filename} not found.")
        return
    with open(filename, 'r', encoding='utf-8') as f:
        report = json.load(f)

    cats = report.get('categories', {})
    audits = report.get('audits', {})

    perf = int((cats.get('performance', {}).get('score') or 0) * 100)
    a11y = int((cats.get('accessibility', {}).get('score') or 0) * 100)
    bp = int((cats.get('best-practices', {}).get('score') or 0) * 100)
    seo = int((cats.get('seo', {}).get('score') or 0) * 100)

    print(f"==================================================")
    print(f"       LIGHTHOUSE {label.upper()} AUDIT REPORT")
    print(f"==================================================")
    print(f"Performance:    {perf}/100")
    print(f"Accessibility:  {a11y}/100")
    print(f"Best Practices: {bp}/100")
    print(f"SEO:            {seo}/100")
    print("")

    print("--- Core Web Vitals Metrics ---")
    for m in [
        ('first-contentful-paint', 'First Contentful Paint (FCP)'),
        ('largest-contentful-paint', 'Largest Contentful Paint (LCP)'),
        ('total-blocking-time', 'Total Blocking Time (TBT)'),
        ('cumulative-layout-shift', 'Cumulative Layout Shift (CLS)'),
        ('speed-index', 'Speed Index (SI)'),
        ('interactive', 'Time to Interactive (TTI)')
    ]:
        a = audits.get(m[0], {})
        val = a.get('displayValue', 'N/A')
        score = a.get('score')
        rating = "Good" if (score and score >= 0.9) else "Needs Improvement" if (score and score >= 0.5) else "Poor"
        print(f"  * {m[1]}: {val} [{rating}] (Score: {score})")

    print("\n--- Top Opportunities & Recommendations ---")
    for k, v in audits.items():
        details = v.get('details') or {}
        score = v.get('score')
        title = v.get('title')
        display_val = v.get('displayValue', '')
        
        if details.get('type') == 'opportunity' and (score is not None and score < 0.9):
            savings = details.get('overallSavingsMs', 0)
            print(f"  - [Opportunity] {title}: {display_val} (Est. savings: {savings}ms)")
        elif score is not None and score < 0.8:
            if any(x in k for x in ['render-blocking', 'unused-javascript', 'unminified', 'image', 'font', 'dom-size', 'network', 'lcp', 'cls', 'tbt', 'unsized-images']):
                print(f"  - [Diagnostic] {title}: {display_val}")
    print("\n")

if os.path.exists('lighthouse-mobile.json'):
    parse_report('lighthouse-mobile.json', 'Mobile')

if os.path.exists('lighthouse-desktop.json'):
    parse_report('lighthouse-desktop.json', 'Desktop')
