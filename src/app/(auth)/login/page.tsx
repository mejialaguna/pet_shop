import { LoginForm } from './ui/LoginForm';

interface SearchParams {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function page({ searchParams }: SearchParams) {
  return <LoginForm searchParams={searchParams} />;
}