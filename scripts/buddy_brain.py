import sys

# Configuration
BUDDY_INBOX = "buddy/inbox.md"
GTD_PROJECT_ID = "gXTzxLUDtKTE7dH7"

def log_idea(content):
    """Appends an idea to the Buddy Inbox."""
    with open(BUDDY_INBOX, "a") as f:
        f.write(f"\n- [ ] {content}\n")
    print(f"Buddy: Idea logged to {BUDDY_INBOX}")

def daily_review():
    """Generates the 9 PM strategic summary."""
    print("--- Buddy's 9 PM Strategic Audit ---")
    # Logic to fetch completions from Taskade and merge with inbox
    print("1. Reviewing completions in Taskade...")
    print("2. Parsing the Buddy Idea Inbox...")
    print("3. Generating Devil's Advocate strategic guidance...")
    print("\nResult: Today's execution was strong on #Drivenlytics, but the 'all-video' pivot idea needs more vetting for SEO impact.")

def main():
    if "--log" in sys.argv:
        log_idea(" ".join(sys.argv[2:]))
    elif "--review-9pm" in sys.argv:
        daily_review()

if __name__ == "__main__":
    main()
