'use client'

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
  DatePicker,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
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

export default function RecruitmentPage() {
  const router = useRouter()
  const params = useParams<{ organizationId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch job postings
  const { data: jobPostings, refetch } = Api.jobPosting.findMany.useQuery({
    where: { organizationId: params.organizationId },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const { mutateAsync: createJob } = Api.jobPosting.create.useMutation()
  const { mutateAsync: updateJob } = Api.jobPosting.update.useMutation()
  const { mutateAsync: deleteJob } = Api.jobPosting.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      await createJob({
        data: {
          title: values.title,
          description: values.description,
          department: values.department,
          status: 'OPEN',
          deadline: values.deadline,
          organizationId: params.organizationId,
        },
      })
      enqueueSnackbar('Job posting created successfully', {
        variant: 'success',
      })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error creating job posting', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteJob({ where: { id } })
      enqueueSnackbar('Job posting deleted successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting job posting', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline: string) => dayjs(deadline).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Row gutter={8}>
          <Col>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                // Implementation for edit
                enqueueSnackbar('Edit functionality coming soon', {
                  variant: 'info',
                })
              }}
            />
          </Col>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Col>
          <Col>
            <Button
              icon={<CalendarOutlined />}
              onClick={() => {
                // Implementation for scheduling interviews
                enqueueSnackbar('Interview scheduling coming soon', {
                  variant: 'info',
                })
              }}
            />
          </Col>
        </Row>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '24px' }}>
        <Col span={24}>
          <Card>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 24 }}
            >
              <Col>
                <Title level={2}>Recruitment Management</Title>
                <Text>Manage job postings, applications, and interviews</Text>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalVisible(true)}
                >
                  Post New Job
                </Button>
              </Col>
            </Row>

            <Table
              dataSource={jobPostings}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />

            <Modal
              title="Create New Job Posting"
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  name="title"
                  label="Job Title"
                  rules={[
                    { required: true, message: 'Please input job title!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="department"
                  label="Department"
                  rules={[
                    { required: true, message: 'Please select department!' },
                  ]}
                >
                  <Select>
                    <Select.Option value="Engineering">
                      Engineering
                    </Select.Option>
                    <Select.Option value="Marketing">Marketing</Select.Option>
                    <Select.Option value="Sales">Sales</Select.Option>
                    <Select.Option value="HR">HR</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    { required: true, message: 'Please input description!' },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="deadline"
                  label="Application Deadline"
                  rules={[
                    { required: true, message: 'Please select deadline!' },
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Create Job Posting
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
