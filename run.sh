rm -rf .next && rm -rf public/sw* && rm -rf public/workbox-*
pnpm install
NODE_ENV=production pnpm build
pnpm generate
pnpm start
