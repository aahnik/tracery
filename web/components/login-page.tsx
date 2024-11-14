"use client";

import { Github, BookOpen } from "lucide-react";
import { client } from "../app/client";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { Button } from "./ui/button";

export function LoginPageComponent() {
  const { connect, isConnecting, error } = useConnect();
  const status = useActiveWalletConnectionStatus();
  console.log("status", status);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-8xl font-bold text-blue-600">Tracery</h1>
            <p className="mt-8 text-gray-600 text-2xl">
              Decentralized Treasury Management
            </p>
          </div>

          <Button
            disabled={status === "connected" || status === "connecting"}
            onClick={() =>
              connect(async () => {
                // create a wallet instance
                const metamask = createWallet("io.metamask"); // autocomplete the wallet id
                // trigger the connection
                await metamask.connect({ client });
                // return the wallet
                return metamask;
              })
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-2xl"
            size="lg"
          >
            Connect Wallet
          </Button>


          <div className="text-center text-xl text-gray-500">
            Sign in with any wallet
          </div>

          <div className="flex justify-center space-x-4">
            <WalletIcon name="MetaMask" />
            <WalletIcon name="WalletConnect" />
            <WalletIcon name="Coinbase" />
            <WalletIcon name="Trust Wallet" />
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-2xl text-gray-500">
            © 2023 Tracery. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/tracery-project/tracery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={30} />
            </a>
            <a
              href="https://docs.tracery.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Documentation"
            >
              <BookOpen size={30} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function WalletIcon({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
        {getWalletIcon(name)}
      </div>
      <span className="mt-2 text-xs text-gray-600">{name}</span>
    </div>
  );
}

function getWalletIcon(name: string) {
  switch (name) {
    case "MetaMask":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 212 189"
        >
          <g fill="none" fillRule="evenodd">
            <polygon
              fill="#CDBDB2"
              points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"
            />
            <polygon
              fill="#CDBDB2"
              points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875"
              transform="matrix(-1 0 0 1 256.5 0)"
            />
            <polygon
              fill="#393939"
              points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"
            />
            <polygon
              fill="#F89C35"
              points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"
            />
            <polygon
              fill="#F89D35"
              points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
            />
            <polygon
              fill="#D87C30"
              points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
            />
            <polygon
              fill="#EA8D3A"
              points="46.125 101.813 65.25 119.813 65.25 137.813"
            />
            <polygon
              fill="#F89D35"
              points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
            />
            <polygon
              fill="#EB8F35"
              points="65.25 138.375 60.75 173.25 90.563 152.438"
            />
            <polygon
              fill="#EA8E3A"
              points="92.25 102.375 95.063 150.188 86.625 125.719"
            />
            <polygon
              fill="#D87C30"
              points="39.375 138.938 65.25 138.375 60.75 173.25"
            />
            <polygon
              fill="#EB8F35"
              points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
            />
            <polygon
              fill="#E8821E"
              points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
            />
            <polygon
              fill="#DFCEC3"
              points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"
            />
            <polygon
              fill="#DFCEC3"
              points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625"
              transform="matrix(-1 0 0 1 272.25 0)"
            />
            <polygon
              fill="#393939"
              points="70.313 112.5 64.125 125.438 86.063 119.813"
              transform="matrix(-1 0 0 1 150.188 0)"
            />
            <polygon
              fill="#E88F35"
              points="12.375 .563 88.875 58.5 75.938 27"
            />
            <path
              fill="#8E5A30"
              d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
            />
            <g transform="matrix(-1 0 0 1 211.5 0)">
              <polygon
                fill="#F89D35"
                points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
              />
              <polygon
                fill="#D87C30"
                points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
              />
              <polygon
                fill="#EA8D3A"
                points="46.125 101.813 65.25 119.813 65.25 137.813"
              />
              <polygon
                fill="#F89D35"
                points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
              />
              <polygon
                fill="#EB8F35"
                points="65.25 138.375 60.75 173.25 90 153"
              />
              <polygon
                fill="#EA8E3A"
                points="92.25 102.375 95.063 150.188 86.625 125.719"
              />
              <polygon
                fill="#D87C30"
                points="39.375 138.938 65.25 138.375 60.75 173.25"
              />
              <polygon
                fill="#EB8F35"
                points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
              />
              <polygon
                fill="#E8821E"
                points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
              />
              <polygon
                fill="#393939"
                points="70.313 112.5 64.125 125.438 86.063 119.813"
                transform="matrix(-1 0 0 1 150.188 0)"
              />
              <polygon
                fill="#E88F35"
                points="12.375 .563 88.875 58.5 75.938 27"
              />
              <path
                fill="#8E5A30"
                d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
              />
            </g>
          </g>
        </svg>
      );
    case "WalletConnect":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path
            d="M364.5 240.9c47.9-46.7 95.3-93 142.8-139.1 5.9-5.8 12.6-10.8 19.6-15 10.5-6.4 22.8-4.7 31.3 3.5 8.8 8.5 11.2 21 5.4 32-2.4 4.7-5.9 9.1-9.7 12.8-71.1 69.3-142.3 138.4-213.4 207.7-10.6 10.3-21.2 20.6-31.7 31-10.4 10.3-22.8 15.5-37.6 15.4-14.6-.1-26.9-5.2-37.3-15.4-27.5-26.8-55-53.6-82.5-80.4-48.1-46.9-96.3-93.7-144.3-140.6-3.3-3.2-6.4-6.7-9-10.4-7.9-11.1-7.1-24.4 2.1-34.2 9.3-9.8 22.7-11.1 34.2-3.2 4.1 2.8 7.8 6.2 11.3 9.7 71.5 69.7 143 139.3 214.5 209 2.9 2.8 5.9 5.5 9.6 8.9z"
            fill="#3b99fc"
          />
        </svg>
      );
    case "Coinbase":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 1024 1024"
        >
          <circle cx="512" cy="512" r="512" fill="#0052ff" />
          <path
            d="M516.3 361.8c60.7 0 102.7 10.9 137.2 34.5 34.3 23.6 54.3 55.3 62.2 96.3 3.9 21.3 3.9 46.3 3.7 74.3H548.3v-59.2h106.4l-.2-3.6c-1.2-15.3-5.1-28.8-11.5-39.7-13.3-21.8-36.8-32.7-71.2-32.7-38.2 0-65.9 14.1-84.1 41.4-18.3 27.3-26.1 66.3-26.1 118.1 0 49.9 8.3 88.1 25.9 115.5 17.5 27.3 45.3 40.8 84.3 40.8 35.9 0 61.4-10.6 75.7-31.3 7.2-10.9 12.1-24.3 14.5-40.5l.2-3.7H548.3v-59.2h171.1v231.4h-62.9l-8.5-49.4c-21.3 21.5-43.4 36.4-65.8 45.1-22.6 8.6-50.3 13.1-82.3 13.1-70.7 0-126.9-22.1-167.1-66.4-40.1-44.1-60.5-103.7-60.5-177.9 0-74.5 20.4-134.6 60.5-179.1 40.2-44.5 96.4-67.1 167.1-67.1h16.4z"
            fill="#fff"
          />
        </svg>
      );
    case "Trust Wallet":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 1024 1024"
        >
          <circle cx="512" cy="512" r="512" fill="#3375bb" />
          <path
            d="M516.9 188.1c-180.7 0-327 146.3-327 327 0 180.7 146.3 327 327 327 180.7 0 327-146.3 327-327 0-180.7-146.3-327-327-327zm135.8 445.9c-6.8 10.9-14.1 21.3-22 31.1-35.3 43.9-88.7 72.1-147.8 72.1-59.1 0-112.5-28.2-147.8-72.1-7.9-9.8-15.2-20.2-22-31.1-23.6-37.7-37.3-82.2-37.3-129.9 0-47.7 13.7-92.2 37.3-129.9 6.8-10.9 14.1-21.3 22-31.1 35.3-43.9 88.7-72.1 147.8-72.1 59.1 0 112.5 28.2 147.8 72.1 7.9 9.8 15.2 20.2 22 31.1 23.6 37.7 37.3 82.2 37.3 129.9 0 47.7-13.7 92.2-37.3 129.9z"
            fill="#fff"
          />
          <path
            d="M600.2 500.7l-83.3-83.3-83.3 83.3-41.7-41.7 125-125 125 125-41.7 41.7z"
            fill="#fff"
          />
        </svg>
      );
    default:
      return null;
  }
}
