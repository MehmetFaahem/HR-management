'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'

const avatarItems = [
  { src: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { src: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { src: 'https://randomuser.me/api/portraits/women/3.jpg' }
]

const logos = [
  { url: 'https://example.com/logo1.png' },
  { url: 'https://example.com/logo2.png' },
  { url: 'https://example.com/logo3.png' }
]
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  EditOutlined,
  TeamOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  LineChartOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Streamlined Recruitment & Onboarding`,
      description: `Automate your hiring process from job posting to offer letters. Get new hires up to speed 3x faster with digital onboarding workflows.`,
      icon: <TeamOutlined />,
    },
    {
      heading: `Smart Time & Attendance`,
      description: `Track time, manage schedules and approve time-off requests in one place. Reduce payroll errors by 99% with automated calculations.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Automated Payroll Processing`,
      description: `Process payroll in minutes, not days. Automatic tax calculations, deductions and compliance checks save you hours every pay period.`,
      icon: <DollarOutlined />,
    },
    {
      heading: `Performance Management`,
      description: `Set goals, track progress and conduct reviews seamlessly. Increase employee engagement by 47% through continuous feedback.`,
      icon: <LineChartOutlined />,
    },
    {
      heading: `Compliance & Security`,
      description: `Stay compliant with built-in labor law updates. Bank-grade encryption keeps your sensitive HR data protected 24/7.`,
      icon: <SafetyCertificateOutlined />,
    },
    {
      heading: `Employee Self-Service`,
      description: `Empower employees to update info, request time off and access documents. Reduce HR inquiries by 70% with self-service tools.`,
      icon: <RocketOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `HR Director, TechStart Inc`,
      content: `"We cut our HR admin time by 75% and saved $50,000 annually. Now I can focus on strategic initiatives instead of paperwork."`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `CEO, GrowthForce`,
      content: `"The automated onboarding alone saved us 15 hours per new hire. Best HR investment we've made in 10 years."`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Jennifer Smith`,
      designation: `HR Manager, CloudScale`,
      content: `"Payroll processing went from 2 days to 30 minutes. The accuracy and compliance features give me total peace of mind."`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small businesses just getting started`,
      monthly: 99,
      yearly: 990,
      features: [
        `Up to 50 employees`,
        `Core HR & Payroll`,
        `Time & Attendance`,
        `Basic Reporting`,
      ],
    },
    {
      title: `Professional`,
      description: `Most popular for growing companies`,
      monthly: 199,
      yearly: 1990,
      features: [
        `Up to 200 employees`,
        `Everything in Starter`,
        `Performance Management`,
        `Advanced Analytics`,
        `Priority Support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 399,
      yearly: 3990,
      features: [
        `Unlimited employees`,
        `Everything in Professional`,
        `Custom Integrations`,
        `Dedicated Account Manager`,
        `API Access`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How long does implementation take?`,
      answer: `Most customers are up and running within 2-4 weeks. Our implementation team will guide you through the entire process.`,
    },
    {
      question: `Can I import data from my existing system?`,
      answer: `Yes! We provide tools to easily import employee data, payroll history, and other HR records from your current systems.`,
    },
    {
      question: `Is my data secure?`,
      answer: `We use bank-level encryption and security measures to protect your data. We're SOC 2 Type II certified and GDPR compliant.`,
    },
    {
      question: `What kind of support do you offer?`,
      answer: `All plans include email and chat support. Professional and Enterprise plans get priority phone support and a dedicated success manager.`,
    },
  ]

  const steps = [
    {
      heading: `Quick Setup`,
      description: `Import your employee data or start fresh. Our setup wizard guides you through configuration in minutes.`,
    },
    {
      heading: `Automate Workflows`,
      description: `Define your HR processes once and let the system handle repetitive tasks automatically.`,
    },
    {
      heading: `Empower Teams`,
      description: `Give employees and managers self-service access to streamline HR operations.`,
    },
    {
      heading: `Scale Effortlessly`,
      description: `Add new features and users as you grow, with all your HR data in one unified platform.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in paperwork and manual data entry`,
    },
    {
      emoji: `⏰`,
      title: `Wasting hours on routine HR tasks`,
    },
    {
      emoji: `😱`,
      title: `Worried about compliance mistakes and penalties`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your HR from Chaos to Clarity`}
        subtitle={`Join 1000+ companies saving 15+ hours per week with our all-in-one HR platform`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/Gy2GD9-fehub-nSxw`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from happy HR teams`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Trusted By Industry Leaders`} />
      <LandingPainPoints
        title={`HR teams waste 40% of their time on admin tasks, costing businesses $1,400 per employee annually`}
        painPoints={painPoints}
      />
      <LandingHowItWorks title={`Your Path to HR Excellence`} steps={steps} />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Transform Your HR`}
        subtitle={`Powerful features that save time, reduce costs and delight employees`}
        features={features}
      />
      <LandingTestimonials
        title={`Join 1000+ HR Leaders Who Transformed Their Operations`}
        subtitle={`See how companies like yours achieve more with modern HR software`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Plans That Scale With Your Business`}
        subtitle={`Start saving time and money today with our flexible pricing options`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions`}
        subtitle={`Everything you need to know about modernizing your HR`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your HR?`}
        subtitle={`Join 1000+ companies saving time and money with modern HR software`}
        buttonText={`Start Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
