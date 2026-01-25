import { Col, Form, Input, Modal, Radio, Row } from 'antd'
import { useEffect, useState } from 'react'

export type UserFormValues = {
  name: string
  tel: string
  status: number
  business: string
  email: string
  creditCode: string
  industryNum: string
  organizationCode: string
  legalPerson: string
}

type UserFormProps = {
  visible: boolean
  title: string
  initialValues?: Partial<UserFormValues> | null
  onCancel: ()=> void
  onSubmit: (values: UserFormValues)=> Promise<void> | void
}

function UserForm({ visible, title, initialValues, onCancel, onSubmit }: UserFormProps) {
  const [form] = Form.useForm<UserFormValues>()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!visible) {
      form.resetFields()
      return
    }
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        status: initialValues.status,
      })
    } else {
      form.resetFields()
    }
  }, [form, initialValues, visible])

  const handleOk = async () => {
    let shouldReset = false
    try {
      const values = await form.validateFields()
      setSubmitting(true)
      await onSubmit(values)
      shouldReset = true
    } catch (error) {
      if (error && typeof error === 'object' && 'errorFields' in error) {
        return
      }
      console.log('提交企业信息失败:', error)
    } finally {
      setSubmitting(false)
      if (shouldReset) {
        form.resetFields()
      }
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      width={800}
      title={title}
      open={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      okButtonProps={{ loading: submitting }}
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="客户名称"
              name="name"
              rules={[{ required: true, message: '客户名称不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="联系电话"
              name="tel"
              rules={[{ required: true, message: '联系电话不能为空' }, { pattern: /^1[3-9]\\d{9}$/, message: '请输入有效的手机号' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="经营状态"
              name="status"
              rules={[{ required: true, message: '经营状态不能为空' }]}
            >
              <Radio.Group>
                <Radio value={1}>营业中</Radio>
                <Radio value={2}>暂停营业</Radio>
                <Radio value={3}>已关闭</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="所属行业"
              name="business"
              rules={[{ required: true, message: '所属行业不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: '邮箱不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="统一信用代码"
              name="creditCode"
              rules={[{ required: true, message: '统一信用代码不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="工商注册号"
              name="industryNum"
              rules={[{ required: true, message: '工商注册号不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="组织机构代码"
              name="organizationCode"
              rules={[{ required: true, message: '组织机构代码不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="法人名"
              name="legalPerson"
              rules={[{ required: true, message: '法人名不能为空' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default UserForm
