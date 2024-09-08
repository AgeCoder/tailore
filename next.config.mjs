/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
                port: '',
            },
        ],
    },
    output: 'standalone',
};

export default nextConfig;
