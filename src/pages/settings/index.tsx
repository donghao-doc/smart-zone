import { Pagination, Popconfirm, Table, type TreeDataNode, type TreeProps } from 'antd'
import { Button, Card, Col, Input, Row, Tree } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getAccountList } from '../../api/system.ts'
import useDataList from '../../hooks/useDataList.ts'
import type { RootState } from '../../store'
import withPermissions from '../../utils/withPermissions.tsx'

interface SearchType {
  accountName: string
}

interface DataType {
  id: number;
  accountName: string;
  auth: string;
  person: string;
  tel: string;
  department: string;
}

interface MenuType{
  label: string;
  icon: string;
  key: string;
  children?: MenuType[]
}

const treeData: TreeDataNode[] = [
  {
    title: '工作台',
    key: '/dashboard',
  },
  {
    title: '租户管理',
    key: '/users',
    children: [
      { title: '租户列表', key: '/users/list' },
      { title: '新增租户', key: '/users/add' },
    ],
  },
  {
    title: '物业管理',
    key: '/estate',
    children: [
      {
        title: '楼宇管理',
        key: '/estate/tenement'
      },
      {
        title: '房间管理',
        key: '/estate/room'
      },
      {
        title: '车辆信息',
        key: '/estate/car'
      }
    ]
  },
  {
    title: '报修管理',
    key: '/repair',
  },
  {
    title: '财务管理',
    key: '/finance',
    children: [
      {
        title: '合同管理',
        key: '/finance/contract'
      },
      {
        title: '合同详情',
        key: '/finance/surrender'
      },
      {
        title: '账单管理',
        key: '/finance/bill'
      }
    ]
  },
  {
    title: '招商管理',
    key: '/merchants',
  },
  {
    title: '运营管理',
    key: '/operation',
    children: [
      {
        title: '运营总览',
        key: '/operation/all'
      },
      {
        title: '文章发布',
        key: '/operation/article'
      },
      {
        title: '内容评论',
        key: '/operation/comments'
      }
    ]
  },
  {
    title: '设备管理',
    key: '/equipment',
  },
  {
    title: '能源消耗',
    key: '/energy',
  },
  {
    title: '系统设置',
    key: '/settings',
  },
  {
    title: '个人中心',
    key: '/personal',
  },
]

function extractTreeKeys(data: any) {
  let keys: string[] = []
  data.forEach((item: any)=>{
    if (item.children && item.children.length > 0) {
      const childKeys: string[] = extractTreeKeys(item.children)
      keys = keys.concat(childKeys)
    } else {
      keys.push(item.key)
    }
  })
  return keys
}

function Settings() {
  const {
    formData, handleFormChange,
    loading, dataList, total, page, pageSize, handlePageChange,
  } = useDataList<SearchType, DataType>({ accountName: '' }, getAccountList)
  const [accountName, setAccountName] = useState<string>('当前用户')
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const menuList = useSelector((state: RootState) => state.system.menuList)
  const btnAuth = useSelector((state: RootState) => state.user.btnAuth)

  const AuthButton: React.FC<any> = withPermissions(['delete'], btnAuth)(Button)

  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (_text: any, _record: any, index: any) => index + 1,
    },
    {
      title: '账号名称',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: '所属权限',
      dataIndex: 'auth',
      key: 'auth',
    },
    {
      title: '使用人',
      dataIndex: 'person',
      key: 'person',
    },
    {
      title: '使用人电话',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '操作',
      key: 'operate',
      render(_value: string, record: any) {
        return <>
          <Button size="small" type="primary" className="mr" onClick={()=>edit(record.menu, record.accountName)}>修改权限</Button>
          <Popconfirm
            title="操作提示"
            description="确认要删除当前账号吗？"
            okText="是"
            cancelText="否"
          >
             <AuthButton size="small" type="primary" danger>删除账号</AuthButton>
             {/* <Button size="small" type="primary" danger>删除账号</Button> */}
          </Popconfirm>
        </>
      }
    }
  ]

  const onCheck: TreeProps['onCheck'] = (checkedKeys)=>{
    setCheckedKeys(checkedKeys as React.Key[])
  }

  const handle = ()=>{
    console.log(checkedKeys, accountName)
  }

  const edit = (menu: MenuType[], accountName: string)=>{
    setAccountName(accountName)
    const newCheckedKeys = extractTreeKeys(menu)
    setCheckedKeys(newCheckedKeys)
  }

  useEffect(()=>{
    setCheckedKeys(extractTreeKeys(menuList))
  }, [])

  return (
    <>
       <Card>
        <Row gutter={16}>
          <Col span={8}>
            <Input name="accountName" value={formData.accountName} placeholder="请输入账户名" onChange={handleFormChange} />
          </Col>
          <Col span={8}>
            <Button type="primary">搜索</Button>
          </Col>
          <Col span={8} className="tr">
            <Button type="primary">新建账号</Button>
          </Col>
        </Row>
       </Card>
      
       <Row gutter={16} className="mt">
        <Col span={8}>
          <Card title={accountName + ':所拥权限'}>
            <Tree
              checkable
              treeData={treeData}
              checkedKeys={checkedKeys}
              onCheck={onCheck}
            />
          </Card>
          <Card className="mt">
            <Popconfirm
              title="操作提示"
              description={`您确认要修改${accountName}用户的权限吗？}`}
              okText="是"
              cancelText="否"
              onConfirm={handle}
            >
              <Button type="primary">提交修改</Button>
            </Popconfirm>
          </Card>
        </Col>
      
        <Col span={16}>
          <Card>
            <Table
              loading={loading}
              columns={columns}
              dataSource={dataList}
              rowKey={record => record.id}
              pagination={false}
            />
            <Pagination
              className="fr mr"
              showQuickJumper
              total={total}
              current={page}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </Card>
        </Col>
       </Row>
    </>
  )
}

export default Settings
