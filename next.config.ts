import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        qualities: [60, 75, 80, 90, 100],
        formats: ['image/avif', 'image/webp'],
    }
};

export default nextConfig;
