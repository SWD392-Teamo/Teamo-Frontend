import { hostname } from "os";

module.exports = {
    
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com'
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '25mb' // Increase the limit to 4MB
        },
        turbo: {
            resolveAlias: {
                canvas: './empty-module.ts',
            },
        },
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}