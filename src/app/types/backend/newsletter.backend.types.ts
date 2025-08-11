type newsletter = {
    id: string;
    email: string;
    timestamp: string;
    source: string;
    userAgent: string;
    referrer: string;
}

type newsletterSupabaseResponse = {
    id?: string;
    email?: string;
    timestamp?: string;
    source?: string;
    user_agent?: string;
    referrer?: string;
}

export type { newsletter, newsletterSupabaseResponse };