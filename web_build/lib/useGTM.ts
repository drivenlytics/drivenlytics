import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * GTM tracking hook for Next.js SPA navigation
 * Fires pageview events when route changes (anchor navigation)
 */
export function useGTM() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct the full path with search params
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');

    // Fire GTM pageview event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: url,
        page_title: document.title,
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname, searchParams]);
}

/**
 * Track custom events for GTM
 * Usage: trackEvent('button_click', { button_name: 'get_started' })
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track section visibility for scroll depth
 * Fires when user scrolls to a section
 */
export function useSectionTracking(sectionId: string) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_viewed', {
              section_id: sectionId,
              section_name: sectionId,
            });
            // Stop observing after first view
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 } // Trigger when 25% of section is visible
    );

    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId]);
}

declare global {
  interface Window {
    dataLayer?: any[];
  }
}
