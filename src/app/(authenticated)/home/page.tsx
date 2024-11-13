'use client'

import { Typography, Card, Row, Col, Space } from 'antd'
import {
  TeamOutlined,
  CalendarOutlined,
  TrophyOutlined,
  UserAddOutlined,
  HomeOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const features = [
    {
      title: 'Employee Management',
      description:
        "Manage your organization's employees, their profiles, and documents all in one place.",
      icon: <TeamOutlined style={{ fontSize: '24px' }} />,
      path: `/organizations/${params.organizationId}/employees`,
    },
    {
      title: 'Leave Management',
      description:
        'Handle employee leave requests, track balances, and manage leave policies efficiently.',
      icon: <CalendarOutlined style={{ fontSize: '24px' }} />,
      path: `/organizations/${params.organizationId}/leave`,
    },
    {
      title: 'Performance Reviews',
      description:
        'Conduct performance reviews, provide feedback, and track employee growth.',
      icon: <TrophyOutlined style={{ fontSize: '24px' }} />,
      path: `/organizations/${params.organizationId}/reviews`,
    },
    {
      title: 'Recruitment',
      description:
        'Post job openings, manage applications, and streamline your hiring process.',
      icon: <UserAddOutlined style={{ fontSize: '24px' }} />,
      path: `/organizations/${params.organizationId}/recruitment`,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={1}>
              <HomeOutlined /> Welcome to{' '}
              {organization?.name || 'HR Management System'}
            </Title>
            <Paragraph style={{ fontSize: '18px' }}>
              Your complete solution for managing human resources efficiently
              and effectively. Explore our features below to get started.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  onClick={() => router.push(feature.path)}
                >
                  <div style={{ textAlign: 'center' }}>
                    {feature.icon}
                    <Title level={4} style={{ marginTop: '16px' }}>
                      {feature.title}
                    </Title>
                    <Paragraph>{feature.description}</Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Card>
            <Title level={3}>Getting Started</Title>
            <Paragraph>
              1. Start by exploring the Employee Management section to view and
              manage your team members.
            </Paragraph>
            <Paragraph>
              2. Set up your Leave Management policies and start handling
              time-off requests.
            </Paragraph>
            <Paragraph>
              3. Schedule and conduct Performance Reviews to track employee
              progress.
            </Paragraph>
            <Paragraph>
              4. Use the Recruitment module when you need to expand your team.
            </Paragraph>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
