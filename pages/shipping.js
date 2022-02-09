import { useRouter } from 'next/router';
import React from 'react';

export default function shipping() {
  const router = useRouter();
  router.push('/login');

  return <div></div>;
}
