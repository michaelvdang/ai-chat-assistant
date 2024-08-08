This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on EC2

- ssh into EC2 instance
- clone repo 
  - private repo: generate access token in github
- cd into new directory
- Deploy to Ubuntu EC2 server: 
  - 2 options:
    - Using Docker (stopped at Creating an optimized production build on Ubuntu EC2 server)
      - create docker image
        - docker build -t ai-chat-assistant .
        - docker run -p 3000:3000 ai-chat-assistant 

    - Using node on Ubuntu EC2 server:
      - Ensure node 18.16+ is running, if not, install using nvm:
        - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        - restart terminal
        - nvm install 20
        - npm i
        - npm run dev
      - Add process manager to ensure app still runs in background after terminal closes
        - sudo npm install pm2 -g
        - pm2 start npm --name nextjs-app -- run start -- -p 3000
        - pm2 list nextjs-app
        - pm2 stop nextjs-app
        - pm2 start nextjs-app
        - pm2 restart nextjs-app
        - pm2 delete nextjs-app


        
        