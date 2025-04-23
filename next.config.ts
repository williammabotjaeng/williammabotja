import { NextConfig } from 'next';

const config: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });
    
    return config;
  },
  experimental: {
    turbo: {
      loaders: {
        '.mp3': ['file-loader']
      }
    }
  }
};

export default config;