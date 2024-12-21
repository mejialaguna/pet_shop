import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

interface SocialButtonProps {
  provider: 'google' | 'github';
  onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SocialButton({ provider, onClick }: SocialButtonProps) {
  const icons = {
    google: FcGoogle,
    github: GitHubLogoIcon,
  };

  const Icon = icons[provider];

  return (
    <Button
      // onClick={onClick}
      className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm
      text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-purple-500 transition-colors'
    >
      <Icon className='w-5 h-5' />
      <span>
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </span>
    </Button>
  );
}
