import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/l2c-analytics-prototype" : "",
  assetPrefix: isGhPages ? "/l2c-analytics-prototype/" : "",
};

export default nextConfig;
