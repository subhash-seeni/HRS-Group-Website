import { Metadata } from 'next';
import { MotionLabClient } from './MotionLabClient';

export const metadata: Metadata = {
  title: 'Motion Laboratory — HRS Group (Internal)',
  description: 'Isolated testing bench for all HRS Group motion primitives and Lenis integration.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MotionLabPage() {
  return <MotionLabClient />;
}
