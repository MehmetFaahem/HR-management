'use client'

import { Card, Col, Row, Statistic, Typography, List, Button } from 'antd'
import {
  TeamOutlined,
  SwapOutlined,
  FileSearchOutlined,
  CalendarOutlined,
  UserOutlined,
  FileOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<{ organizationId: string }>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  // Fetch employees
  const { data: employees } = Api.employee.findMany.useQuery({
    where: { organizationId: params.organizationId },
  })

  // Fetch reviews
  const { data: reviews } = Api.review.findMany.useQuery({
    where: { employee: { organizationId: params.organizationId } },
    include: { employee: true },
  })

  // Fetch leaves
  const { data: leaves } = Api.leave.findMany.useQuery({
    where: { employee: { organizationId: params.organizationId } },
    include: { employee: true },
  })

  // Calculate metrics
  const headcount = employees?.length || 0
  const activeReviews =
    reviews?.filter(r => r.status === 'PENDING')?.length || 0

  // Calculate turnover rate (simplified for example)
  const leftEmployees =
    employees?.filter(e => e.status === 'INACTIVE')?.length || 0
  const turnoverRate =
    headcount > 0 ? ((leftEmployees / headcount) * 100).toFixed(1) : '0'

  // Recent activities
  const recentActivities = [
    ...(reviews?.map(r => ({
      title: `Performance Review`,
      description: `Review for ${r.employee?.firstName} ${r.employee?.lastName}`,
      date: dayjs(r.createdAt).format('MMM D, YYYY'),
      type: 'review',
    })) || []),
    ...(leaves?.map(l => ({
      title: `Leave Request`,
      description: `${l.employee?.firstName} ${l.employee?.lastName} - ${l.type}`,
      date: dayjs(l.createdAt).format('MMM D, YYYY'),
      type: 'leave',
    })) || []),
  ]
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
    .slice(0, 5)

  // Quick links
  const quickLinks = [
    {
      title: 'Employees Directory',
      icon: <TeamOutlined />,
      path: `/organizations/${params.organizationId}/employees`,
    },
    {
      title: 'Leave Management',
      icon: <CalendarOutlined />,
      path: `/organizations/${params.organizationId}/leave`,
    },
    {
      title: 'Performance Reviews',
      icon: <FileSearchOutlined />,
      path: `/organizations/${params.organizationId}/reviews`,
    },
    {
      title: 'Recruitment',
      icon: <UserOutlined />,
      path: `/organizations/${params.organizationId}/recruitment`,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>HR Dashboard</Title>
        <Text type="secondary">Welcome to your HR management dashboard</Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Headcount"
                value={headcount}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Turnover Rate"
                value={turnoverRate}
                suffix="%"
                prefix={<SwapOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Pending Reviews"
                value={activeReviews}
                prefix={<FileOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} md={12}>
            <Card title="Recent Activities">
              <List
                dataSource={recentActivities}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <Text type="secondary">{item.date}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Quick Links">
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={quickLinks}
                renderItem={item => (
                  <List.Item>
                    <Button
                      type="default"
                      icon={item.icon}
                      onClick={() => router.push(item.path)}
                      style={{ width: '100%', height: 'auto', padding: '12px' }}
                    >
                      {item.title}
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
