'use client'

import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography,
  Upload,
} from 'antd'
import { useState } from 'react'
import {
  EditOutlined,
  UploadOutlined,
  FileOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import type { Prisma } from '@prisma/client'
const { Title } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function EmployeeDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch employee data with related information
  const { data: employee, refetch } = Api.employee.findFirst.useQuery({
    where: { id: params.employeeId },
    include: {
      documents: true,
      leaves: true,
      manager: true,
    },
  })

  const { mutateAsync: updateEmployee } = Api.employee.update.useMutation()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()

  const handleEdit = async (values: any) => {
    try {
      await updateEmployee({
        where: { id: params.employeeId },
        data: values,
      })
      enqueueSnackbar('Employee updated successfully', { variant: 'success' })
      setIsEditModalOpen(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Error updating employee', { variant: 'error' })
    }
  }

  const handleUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      await createDocument({
        data: {
          name: file.name,
          type: file.type,
          fileUrl: url,
          employeeId: params.employeeId,
        },
      })
      enqueueSnackbar('Document uploaded successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error uploading document', { variant: 'error' })
    }
  }

  const documentColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Button type="link" href={record.fileUrl} target="_blank">
          Download
        </Button>
      ),
    },
  ]

  const leaveColumns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
  ]

  return (
    <PageLayout layout="full-width">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Title level={2}>Employee Details</Title>
        </Col>

        <Col span={24}>
          <Card
            title="Personal Information"
            extra={
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </Button>
            }
          >
            <Descriptions column={2}>
              <Descriptions.Item label="First Name">
                {employee?.firstName}
              </Descriptions.Item>
              <Descriptions.Item label="Last Name">
                {employee?.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {employee?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {employee?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                {employee?.department}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {employee?.position}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {employee?.status}
              </Descriptions.Item>
              <Descriptions.Item label="Hire Date">
                {employee?.hireDate}
              </Descriptions.Item>
              <Descriptions.Item label="Manager">
                {employee?.manager?.firstName} {employee?.manager?.lastName}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title="Documents"
            extra={
              <Upload
                customRequest={({ file }: any) => handleUpload(file)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Document</Button>
              </Upload>
            }
          >
            <Table
              columns={documentColumns}
              dataSource={employee?.documents}
              rowKey="id"
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Leave History">
            <Table
              columns={leaveColumns}
              dataSource={employee?.leaves}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Edit Employee"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form initialValues={employee} onFinish={handleEdit} layout="vertical">
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Position">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
