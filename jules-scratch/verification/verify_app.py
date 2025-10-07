from playwright.sync_api import sync_playwright, Page, expect

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console messages
        page.on("console", lambda msg: print(f"Browser console: {msg.text()}"))

        page.goto("http://localhost:9002")

        # Wait for the "Commands" tab to be visible to ensure the page has loaded
        expect(page.get_by_role("tab", name="Commands")).to_be_visible(timeout=10000)

        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

if __name__ == "__main__":
    main()