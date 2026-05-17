import { Suspense } from 'react';
import { VerifyOtpContent } from './VerifyOtpContent';

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<BrandLoadingScreen title="Verifying code" subtitle="Preparing your OTP verification step." />}>
      <VerifyOtpContent />
    </Suspense>
  );
}
