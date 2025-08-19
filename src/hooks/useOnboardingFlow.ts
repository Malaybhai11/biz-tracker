// hooks/useOnboardingFlow.ts
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export interface BusinessData { /* …your fields… */ }
export interface OnboardingData {
  selectedSuite: string | null
  businessData: BusinessData
}

export function useOnboardingFlow() {
  // Authentication session
  const { data: session, status } = useSession()
  const router = useRouter()

  // Local onboarding state
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    selectedSuite: null,
    businessData: {}
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect logic always invoked in the same order
  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.replace('/new/login')
      return
    }

    const isComplete = (session.user as any).isOnboardingComplete
    if (isComplete) {
      router.replace('/dashboard')
    }
  }, [session, status, router])

  // Handlers (also always defined)
  const updateData = (key: keyof BusinessData, value: any) =>
    setOnboardingData(prev => ({
      ...prev,
      businessData: { ...prev.businessData, [key]: value }
    }))

  const selectSuite = (suite: string) => {
    setOnboardingData({ selectedSuite: suite, businessData: {} })
    setCurrentStep(2)
  }

  const nextStep = () => setCurrentStep(s => s + 1)
  const prevStep = () => setCurrentStep(s => s - 1)

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    try {
      // TODO: replace with real API call
      await new Promise(res => setTimeout(res, 1500))
      // After save, redirect to dashboard
      router.replace('/dashboard')
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    session,
    status,
    onboardingData,
    currentStep,
    isSubmitting,
    updateData,
    selectSuite,
    nextStep,
    prevStep,
    handleFinalSubmit
  }
}