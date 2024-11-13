'use client'

import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Typography,
  Space,
  Card,
  Row,
  Col,
} from 'antd'
import {
  PlusOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PerformanceReviewsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [selectedCycle, setSelectedCycle] = useState<any>(null)
  const [form] = Form.useForm()
  const [assignForm] = Form.useForm()

  const { data: reviewCycles, refetch: refetchCycles } =
    Api.reviewCycle.findMany.useQuery({
      where: { organizationId: params.organizationId },
      include: {
        reviewsAsCycle: { include: { employee: true, reviewer: true } },
      },
    })

  const { data: employees } = Api.employee.findMany.useQuery({
    where: { organizationId: params.organizationId },
  })

  const { mutateAsync: createCycle } = Api.reviewCycle.create.useMutation()
  const { mutateAsync: createReview } = Api.review.create.useMutation()

  const handleCreateCycle = async (values: any) => {
    try {
      await createCycle({
        data: {
          name: values.name,
          startDate: values.period[0].format('YYYY-MM-DD'),
          endDate: values.period[1].format('YYYY-MM-DD'),
          status: 'ACTIVE',
          organizationId: params.organizationId,
        },
      })
      enqueueSnackbar('Review cycle created successfully', {
        variant: 'success',
      })
      setIsCreateModalOpen(false)
      form.resetFields()
      refetchCycles()
    } catch (error) {
      enqueueSnackbar('Error creating review cycle', { variant: 'error' })
    }
  }

  const handleAssignReviewer = async (values: any) => {
    try {
      await createReview({
        data: {
          employeeId: values.employeeId,
          reviewerId: values.reviewerId,
          cycleId: selectedCycle.id,
          status: 'PENDING',
          organizationId: params.organizationId,
        },
      })
      enqueueSnackbar('Reviewer assigned successfully', { variant: 'success' })
      setIsAssignModalOpen(false)
      assignForm.resetFields()
      refetchCycles()
    } catch (error) {
      enqueueSnackbar('Error assigning reviewer', { variant: 'error' })
    }
  }

  const columns = [
    { title: 'Cycle Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Period',
      key: 'period',
      render: (record: any) =>
        `${dayjs(record.startDate).format('MMM D, YYYY')} - ${dayjs(record.endDate).format('MMM D, YYYY')}`,
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => (
        <Text>
          {record.status === 'ACTIVE' ? (
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
          ) : (
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
          )}{' '}
          {record.status}
        </Text>
      ),
    },
    {
      title: 'Completion',
      key: 'completion',
      render: (record: any) => {
        const completed =
          record.reviewsAsCycle?.filter((r: any) => r.status === 'COMPLETED')
            .length || 0
        const total = record.reviewsAsCycle?.length || 0
        return `${completed}/${total} (${total ? Math.round((completed / total) * 100) : 0}%)`
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedCycle(record)
              setIsAssignModalOpen(true)
            }}
          >
            Assign Reviewer
          </Button>
          <Button icon={<ExportOutlined />}>Export Results</Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '24px' }}>
        <Col xs={24} xl={20}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Space direction="vertical">
                <Title level={2}>Performance Reviews</Title>
                <Text>
                  Manage performance review cycles and track employee
                  evaluations
                </Text>
              </Space>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create Review Cycle
              </Button>

              <Table
                columns={columns}
                dataSource={reviewCycles}
                rowKey="id"
                pagination={false}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Create Review Cycle"
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateCycle} layout="vertical">
          <Form.Item
            name="name"
            label="Cycle Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="period"
            label="Review Period"
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Cycle
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Assign Reviewer"
        open={isAssignModalOpen}
        onCancel={() => setIsAssignModalOpen(false)}
        footer={null}
      >
        <Form
          form={assignForm}
          onFinish={handleAssignReviewer}
          layout="vertical"
        >
          <Form.Item
            name="employeeId"
            label="Employee"
            rules={[{ required: true }]}
          >
            <Select>
              {employees?.map(emp => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="reviewerId"
            label="Reviewer"
            rules={[{ required: true }]}
          >
            <Select>
              {employees?.map(emp => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Assign Reviewer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
