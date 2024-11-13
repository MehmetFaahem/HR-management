'use client'

import {
  Button,
  Calendar,
  Card,
  Col,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
  InputNumber,
  Input,
  Form,
} from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function LeaveManagementPage() {
  const router = useRouter()
  const params = useParams<{ organizationId: string }>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

  // Fetch leaves with employee details
  const { data: leaves, refetch } = Api.leave.findMany.useQuery({
    include: { employee: true },
    where: { employee: { organizationId: params.organizationId } },
  })

  // Fetch leave policies
  const { data: policies, refetch: refetchPolicies } =
    Api.leavePolicy.findMany.useQuery({
      where: { organizationId: params.organizationId },
    })

  // Mutations
  const { mutateAsync: updateLeave } = Api.leave.update.useMutation()
  const { mutateAsync: createPolicy } = Api.leavePolicy.create.useMutation()

  const handleLeaveAction = async (leaveId: string, status: string) => {
    try {
      await updateLeave({
        where: { id: leaveId },
        data: { status },
      })
      enqueueSnackbar(`Leave request ${status.toLowerCase()}`, {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update leave request', { variant: 'error' })
    }
  }

  const handleCreatePolicy = async (values: any) => {
    try {
      await createPolicy({
        data: {
          ...values,
          organizationId: params.organizationId,
          carryOver: values.carryOver === 'true',
        },
      })
      enqueueSnackbar('Leave policy created successfully', {
        variant: 'success',
      })
      setIsPolicyModalOpen(false)
      refetchPolicies()
    } catch (error) {
      enqueueSnackbar('Failed to create leave policy', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Employee',
      dataIndex: ['employee', 'firstName'],
      render: (text: string, record: any) =>
        `${record.employee.firstName} ${record.employee.lastName}`,
    },
    { title: 'Type', dataIndex: 'type' },
    {
      title: 'Duration',
      render: (record: any) =>
        `${dayjs(record.startDate).format('MMM D')} - ${dayjs(record.endDate).format('MMM D, YYYY')}`,
    },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Reason', dataIndex: 'reason' },
    {
      title: 'Actions',
      render: (record: any) =>
        record.status === 'PENDING' && (
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleLeaveAction(record.id, 'APPROVED')}
            >
              Approve
            </Button>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => handleLeaveAction(record.id, 'REJECTED')}
            >
              Reject
            </Button>
          </Space>
        ),
    },
  ]

  const dateCellRender = (value: Dayjs) => {
    const dateLeaves = leaves?.filter(
      leave =>
        dayjs(leave.startDate).isSame(value, 'day') ||
        dayjs(leave.endDate).isSame(value, 'day'),
    )

    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dateLeaves?.map(leave => (
          <li key={leave.id}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {leave.employee.firstName} - {leave.type}
            </Text>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Row gutter={[16, 16]} justify="center" style={{ padding: '24px' }}>
        <Col span={24}>
          <Title level={2}>Leave Management</Title>
          <Text>Manage employee leave requests and policies</Text>
        </Col>

        <Col span={24}>
          <Card
            title={
              <Space>
                <CalendarOutlined /> Leave Calendar
              </Space>
            }
            style={{ marginBottom: '24px' }}
          >
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              cellRender={dateCellRender}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title="Leave Requests"
            extra={
              <Button
                type="primary"
                icon={<SettingOutlined />}
                onClick={() => setIsPolicyModalOpen(true)}
              >
                Manage Policies
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={leaves}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Create Leave Policy"
        open={isPolicyModalOpen}
        onCancel={() => setIsPolicyModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleCreatePolicy}>
          <Form.Item
            name="type"
            label="Leave Type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="daysAllowed"
            label="Days Allowed"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="carryOver"
            label="Carry Over"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="true">Yes</Select.Option>
              <Select.Option value="false">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Policy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
