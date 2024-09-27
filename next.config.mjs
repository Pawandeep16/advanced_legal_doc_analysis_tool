/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // Find the existing rule that handles SVG files
    const fileLoaderRule = config.module.rules.find((rule) => {
      // Ensure rule.test exists and is a RegExp before calling .test()
      return rule.test instanceof RegExp && rule.test.test(".svg");
    });

    if (fileLoaderRule) {
      // Exclude SVGs from the default file loader to prevent conflicts
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add a new rule to handle SVGs with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
