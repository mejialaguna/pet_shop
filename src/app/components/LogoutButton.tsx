'use client';

import { Logout } from '@/actions/user/logout';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  return <Button onClick={async () => Logout()}>Sign out</Button>;
}