'use client'

import {
  Button,
  Input,
  Table,
  Space,
  Select,
  Typography,
  Modal,
  Form,
  DatePicker,
} from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function EmployeesPage() {
  const router = useRouter()
  const params = useParams<{ organizationId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [searchText, setSearchText] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>()
  const [selectedStatus, setSelectedStatus] = useState<string>()
  const [selectedPosition, setSelectedPosition] = useState<string>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: employees, refetch } = Api.employee.findMany.useQuery({
    where: {
      organizationId: params.organizationId,
      AND: [
        searchText
          ? {
              OR: [
                { firstName: { contains: searchText, mode: 'insensitive' } },
                { lastName: { contains: searchText, mode: 'insensitive' } },
                { email: { contains: searchText, mode: 'insensitive' } },
              ],
            }
          : {},
        selectedDepartment ? { department: selectedDepartment } : {},
        selectedStatus ? { status: selectedStatus } : {},
        selectedPosition ? { position: selectedPosition } : {},
      ],
    },
  })

  const { mutateAsync: createEmployee } = Api.employee.create.useMutation()

  const handleAddEmployee = async (values: any) => {
    try {
      await createEmployee({
        data: {
          ...values,
          organizationId: params.organizationId,
          hireDate: values.hireDate.format('YYYY-MM-DD'),
        },
      })
      enqueueSnackbar('Employee added successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error adding employee', { variant: 'error' })
    }
  }

  const handleExport = () => {
    if (!employees) return

    const csvContent = [
      [
        'First Name',
        'Last Name',
        'Email',
        'Department',
        'Position',
        'Status',
        'Hire Date',
      ],
      ...employees.map(emp => [
        emp.firstName,
        emp.lastName,
        emp.email,
        emp.department || '',
        emp.position || '',
        emp.status,
        emp.hireDate,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'employees.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          type="link"
          onClick={() =>
            router.push(
              `/organizations/${params.organizationId}/employees/${record.id}`,
            )
          }
        >
          View Details
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>Employee Management</Title>

        <Space
          style={{ marginBottom: 16 }}
          direction="vertical"
          size="middle"
          className="w-full"
        >
          <Space wrap>
            <Input
              placeholder="Search employees..."
              prefix={<SearchOutlined />}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              style={{ width: 150 }}
              placeholder="Department"
              allowClear
              onChange={setSelectedDepartment}
            >
              <Select.Option value="HR">HR</Select.Option>
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
            </Select>
            <Select
              style={{ width: 150 }}
              placeholder="Status"
              allowClear
              onChange={setSelectedStatus}
            >
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
            <Select
              style={{ width: 150 }}
              placeholder="Position"
              allowClear
              onChange={setSelectedPosition}
            >
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Developer">Developer</Select.Option>
              <Select.Option value="Analyst">Analyst</Select.Option>
            </Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Add Employee
            </Button>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              Export CSV
            </Button>
          </Space>

          <Table
            columns={columns}
            dataSource={employees}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Space>

        <Modal
          title="Add New Employee"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Select>
                <Select.Option value="HR">HR</Select.Option>
                <Select.Option value="IT">IT</Select.Option>
                <Select.Option value="Finance">Finance</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="position" label="Position">
              <Select>
                <Select.Option value="Manager">Manager</Select.Option>
                <Select.Option value="Developer">Developer</Select.Option>
                <Select.Option value="Analyst">Analyst</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="hireDate"
              label="Hire Date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Add Employee
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
