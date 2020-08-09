interface BeforeInstallPromptEvent extends Event {
  platforms: Array<string>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;

  prompt(): Promise<void>;
}

declare global {
  interface Window {
    installPrompt: BeforeInstallPromptEvent;
  }
}

declare var API_BASE: string;
declare var BLAA: string;
