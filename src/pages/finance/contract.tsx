import { Button, Card, Col, Input, Pagination, Row, Table, type TableProps, Tag } from 'antd'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { type ContractListItem, getContractList } from '../../api/finance'
import type { AppDispatch, RootState } from '../../store'
import { setContractListCache } from '../../store/financeSlice'

type SearchFormData = {
  contractNo: string
  person: string
  tel: string
}

const initialFormData: SearchFormData = {
  contractNo: '',
  person: '',
  tel: '',
}

function Contract() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const contractListCache = useSelector(
    (state: RootState) => state.finance.contractListCache,
  )
  const [formData, setFormData] = useState<SearchFormData>(initialFormData)
  const [queryParams, setQueryParams] = useState<SearchFormData>(initialFormData)
  const [dataList, setDataList] = useState<ContractListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const skipNextFetchRef = useRef(false)

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
    skipNextFetchRef.current = false
    setPage(1)
    setQueryParams({ ...formData })
  }

  const reset = () => {
    skipNextFetchRef.current = false
    setFormData(initialFormData)
    setQueryParams({ ...initialFormData })
    setPage(1)
  }

  const onChange = (nextPage: number, nextPageSize: number) => {
    skipNextFetchRef.current = false
    setPage(nextPage)
    setPageSize(nextPageSize)
  }

  const columns: TableProps<ContractListItem>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(_value, _record, index) {
        return index + 1
      }
    },
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      key: 'contractNo'
    },
    {
      title: '合同类别',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '合同名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '合同开始日期',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: '合同结束如期',
      dataIndex: 'endDate',
      key: 'endDate'
    },
    {
      title: '甲方',
      dataIndex: 'jia',
      key: 'jia'
    },
    {
      title: '乙方',
      dataIndex: 'yi',
      key: 'yi'
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      key: 'status',
      render(value) {
        const statusValue = Number(value)
        if (statusValue === 1) {
          return <Tag>未审批</Tag>
        } else if (statusValue === 2) {
          return <Tag color="green">审批通过</Tag>
        } else {
          return <Tag color="red">审批拒绝</Tag>
        }
      }
    },
    {
      title: '操作',
      key: 'operate',
      render(_value, record) {
        return <Button type="primary" size="small" onClick={()=>detail(record.contractNo)}>合同详情</Button>
      }
    },
  ]

  const detail = (contractNo: string)=>{
    dispatch(
      setContractListCache({
        formData,
        queryParams,
        dataList,
        total,
        page,
        pageSize,
      }),
    )
    navigate('/finance/surrender?contractNo=' + contractNo)
  }

  useEffect(() => {
    if (searchParams.get('return') !== 'true') {
      return
    }
    if (contractListCache) {
      skipNextFetchRef.current = true
      setFormData(contractListCache.formData ?? initialFormData)
      setQueryParams(contractListCache.queryParams ?? initialFormData)
      setDataList(contractListCache.dataList ?? [])
      setTotal(contractListCache.total ?? 0)
      setPage(contractListCache.page ?? 1)
      setPageSize(contractListCache.pageSize ?? 10)
    }
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('return')
    setSearchParams(nextParams, { replace: true })
  }, [contractListCache, searchParams, setSearchParams])

  useEffect(() => {
    if (skipNextFetchRef.current) {
      return
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data: response } = await getContractList({
          page,
          pageSize,
          ...queryParams,
        })
        const list = response.list.map((item) => ({
          ...item,
          status: Number(item.status),
        }))
        setDataList(list)
        setTotal(response.total)
        dispatch(
          setContractListCache({
            formData: queryParams,
            queryParams,
            dataList: list,
            total: response.total,
            page,
            pageSize,
          }),
        )
      } catch (error) {
        console.log('获取合同列表失败:', error)
      } finally {
        setLoading(false)
      }
    }
    void fetchData()
  }, [dispatch, page, pageSize, queryParams])
  
  return (
    <>
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>合同编号：</p>
            <Input name="contractNo" value={formData.contractNo} onChange={handleChange}/>
          </Col>
          <Col span={7}>
            <p>联系人：</p>
            <Input name="person" value={formData.person} onChange={handleChange}/>
          </Col>
          <Col span={7}>
            <p>联系电话：</p>
            <Input name="tel" value={formData.tel} onChange={handleChange}/>
          </Col>
          <Col span={3}>
            <Button type="primary" className="mr" onClick={loadData}>查询</Button>
            <Button onClick={reset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Table
          columns={columns}
          pagination={false}
          loading={loading}
          dataSource={dataList}
          rowKey={(record)=>record.contractNo}
        />
        <Pagination
          className="mt fr"
          showQuickJumper
          total={total}
          onChange={onChange}
          current={page}
          pageSize={pageSize}
        />
      </Card>
    </>
  )
}

export default Contract
