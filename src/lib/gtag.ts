// lib/gtag.ts

export const GA_TRACKING_ID = 'G-6KQ5WZPE0T' // Replace with your Measurement ID

// Track pageviews
export const pageview = (url: string): void => {
    window.gtag?.('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// Track custom events
type GAEvent = {
    action: string
    category: string
    label: string
    value?: number
}

export const event = ({ action, category, label, value }: GAEvent): void => {
    window.gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value,
    })
}

