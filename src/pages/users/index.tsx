import { Button, Card, Col, Input, Pagination, Popconfirm, Row, Table, type TableProps, Tag } from 'antd'
import { type ChangeEvent, type Key, memo, useCallback, useEffect, useState } from 'react'

import { batchDeleteUser, deleteUser, getUserList, saveUser, type UserListItem } from '../../api/tenant'
import UserForm, { type UserFormValues } from './UserForm.tsx'

type SearchFormData = {
  companyName: string
  contact: string
  phone: string
}

type DataType = Omit<UserListItem, 'status'> & {
  status: number
}

const initialFormData: SearchFormData = {
  companyName: '',
  contact: '',
  phone: '',
}

const MemoUserForm = memo(UserForm)

function UserList() {
  const [formData, setFormData] = useState<SearchFormData>(initialFormData)
  const [queryParams, setQueryParams] = useState<SearchFormData>(initialFormData)
  const [dataList, setDataList] = useState<DataType[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('新增企业')
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (!Object.prototype.hasOwnProperty.call(initialFormData, name)) {
      return
    }
    const field = name as keyof SearchFormData
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const loadData = () => {
    setPage(1)
    setQueryParams({ ...formData })
  }

  const reset = () => {
    setFormData(initialFormData)
    setQueryParams({ ...initialFormData })
    setPage(1)
  }

  const refreshList = useCallback(() => {
    setQueryParams((prev) => ({ ...prev }))
  }, [])

  const onChange = (nextPage: number, nextPageSize: number) => {
    setPage(nextPage)
    setPageSize(nextPageSize)
  }

  const add = () => {
    setModalTitle('新增企业')
    setEditingRecord(null)
    setIsModalOpen(true)
  }

  const edit = (record: DataType) => {
    setModalTitle('编辑企业')
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const hideModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingRecord(null)
  }, [])

  const handleSubmit = useCallback(async (values: UserFormValues) => {
    try {
      const payload = {
        ...values,
        status: Number(values.status),
        ...(editingRecord?.id ? { id: editingRecord.id } : {}),
      }
      await saveUser(payload)
      hideModal()
      refreshList()
    } catch (error) {
      console.log('保存企业失败:', error)
    }
  }, [editingRecord, hideModal, refreshList])

  const confirm = async (id: string) => {
    try {
      await deleteUser(id)
      setSelectedRowKeys((prev) => prev.filter((key) => String(key) !== id))
      refreshList()
    } catch (error) {
      console.log('删除企业失败:', error)
    }
  }

  const batchDelete = async () => {
    const ids = selectedRowKeys.map((key) => String(key))
    if (ids.length === 0) {
      return
    }
    try {
      await batchDeleteUser(ids)
      setSelectedRowKeys([])
      refreshList()
    } catch (error) {
      console.log('批量删除企业失败:', error)
    }
  }

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys)
    },
  }

  const disabled = selectedRowKeys.length === 0

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await getUserList({
          page,
          pageSize,
          ...queryParams,
        })
        const list = data.list.map((item) => ({
          ...item,
          status: Number(item.status),
        }))
        setDataList(list)
        setTotal(data.total)
      } catch (error) {
        console.log('获取租户列表失败:', error)
      } finally {
        setLoading(false)
      }
    }
    void fetchData()
  }, [page, pageSize, queryParams])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(value, record, index) {
        void value
        void record
        return index + 1
      },
    },
    {
      title: '客户名称',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: '经营状态',
      key: 'status',
      dataIndex: 'status',
      render(value) {
        const statusValue = Number(value)
        if (statusValue === 1) {
          return <Tag color="green">营业中</Tag>
        } else if (statusValue === 2) {
          return <Tag color="#f50">暂停营业</Tag>
        } else if (statusValue === 3) {
          return <Tag color="red">已关闭</Tag>
        }
        return null
      }
    },
    {
      title: '联系电话',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '所属行业',
      key: 'business',
      dataIndex: 'business'
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: '统一信用代码',
      key: 'creditCode',
      dataIndex: 'creditCode'
    },
    {
      title: '工商注册号',
      key: 'industryNum',
      dataIndex: 'industryNum'
    },
    {
      title: '组织结构代码',
      key: 'organizationCode',
      dataIndex: 'organizationCode'
    },
    {
      title: '法人名',
      key: 'legalPerson',
      dataIndex: 'legalPerson'
    },
    {
      title: '操作',
      key: 'operate',
      dataIndex: 'id',
      render(value, record) {
        return <>
          <Button type="primary" size="small" onClick={() => edit(record)}>编辑</Button>
          <Popconfirm
            title="删除确认"
            description="确定要删除吗？"
            okText="是"
            cancelText="否"
            onConfirm={() => confirm(value)}
          >
            <Button type="primary" danger className="ml" size="small">删除</Button>
          </Popconfirm>
        </>
      },
    },
  ]

  return (
    <div className="users">
      <MemoUserForm
        visible={isModalOpen}
        title={modalTitle}
        initialValues={editingRecord}
        onCancel={hideModal}
        onSubmit={handleSubmit}
      />
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>企业名称：</p>
            <Input name="companyName" value={formData.companyName} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系人：</p>
            <Input name="contact" value={formData.contact} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系电话:</p>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={loadData}>查询</Button>
            <Button className="ml" onClick={reset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt tr">
        <Button type="primary" onClick={add}>新增企业</Button>
        <Button danger type="primary" className="ml" disabled={disabled} onClick={batchDelete}>批量删除</Button>
      </Card>
      <Card className="mt">
        <Table
          columns={columns}
          dataSource={dataList}
          rowKey={(record) => record.id}
          loading={loading}
          rowSelection={rowSelection}
          pagination={false}
        />
        <Pagination
          className="fr mt"
          total={total}
          current={page}
          pageSize={pageSize}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={onChange}
        />
      </Card>
    </div>
  )
}

export default UserList
