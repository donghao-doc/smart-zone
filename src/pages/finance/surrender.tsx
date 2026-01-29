import { Button, Card, Descriptions, type DescriptionsProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { type ContractDetailResponse, getContractDetail } from '../../api/finance'

const renderTerms = (terms?: string[]) => {
  if (!terms || terms.length === 0) {
    return '-'
  }
  return (
    <>
      {terms.map((term, index) => (
        <span key={`${term}-${index}`}>
          {index + 1}. {term}
          {index < terms.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  )
}

function Surrender() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const contractNo = searchParams.get('contractNo') ?? ''
  const [detail, setDetail] = useState<ContractDetailResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!contractNo) {
      setDetail(null)
      return
    }
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const { data } = await getContractDetail(contractNo)
        setDetail(data)
      } catch (error) {
        console.log('获取合同详情失败:', error)
      } finally {
        setLoading(false)
      }
    }
    void fetchDetail()
  }, [contractNo])

  const contractItems = useMemo<DescriptionsProps['items']>(() => {
    const statusValue = Number(detail?.status)
    const statusText =
      statusValue === 1 ? '未审批' : statusValue === 2 ? '审批通过' : statusValue === 3 ? '审批拒绝' : '-'
    const rejectReason = statusValue === 3 ? detail?.rejectReason ?? '-' : '-'

    return [
      {
        key: '1',
        label: '合同类别',
        children: detail?.type ?? '-',
      },
      {
        key: '2',
        label: '合同名称',
        children: detail?.name ?? '-',
      },
      {
        key: '3',
        label: '合同开始日期',
        children: detail?.startDate ?? '-',
      },
      {
        key: '4',
        label: '合同结束日期',
        children: detail?.endDate ?? '-',
      },
      {
        key: '5',
        label: '甲方',
        children: detail?.jia ?? '-',
      },
      {
        key: '6',
        label: '乙方',
        children: detail?.yi ?? '-',
        span: 3,
      },
      {
        key: '7',
        label: '审批状态',
        children: statusText,
      },
      {
        key: '8',
        label: '拒绝原因',
        children: rejectReason,
      },
      {
        key: '9',
        label: '联系方式',
        children: detail?.tel ?? '-',
      },
      {
        key: '10',
        label: '附加条款',
        children: renderTerms(detail?.extraTerms),
      },
    ]
  }, [detail])

  const roomItems = useMemo<DescriptionsProps['items']>(() => {
    const areaText = detail?.area ? `${detail.area}㎡` : '-'
    const pricingAreaText = detail?.pricingArea ? `${detail.pricingArea}㎡` : '-'
    const propertyFeeText = detail?.propertyFee ? `${detail.propertyFee}` : '-'

    return [
      {
        key: '1',
        label: '所有楼宇',
        children: detail?.building ?? '-',
      },
      {
        key: '2',
        label: '房间号',
        children: detail?.roomNo ?? '-',
      },
      {
        key: '3',
        label: '房屋面积',
        children: areaText,
      },
      {
        key: '4',
        label: '计价面积',
        children: pricingAreaText,
      },
      {
        key: '5',
        label: '物业费',
        children: propertyFeeText,
      },
      {
        key: '6',
        label: '房屋状态',
        children: detail?.houseStatus ?? '-',
      },
      {
        key: '7',
        label: '物业管家',
        children: detail?.steward ?? '-',
      },
      {
        key: '8',
        label: '管家电话',
        children: detail?.stewardTel ?? '-',
      },
    ]
  }, [detail])
  
  return (
    <>
      <Card>
        <Button type="primary" onClick={()=>navigate('/finance/contract?return=true')}>返回</Button>
      </Card>
      <Card className="mt" loading={loading}>
        <Descriptions title={`合同编号：${contractNo || '-'}`} bordered items={contractItems}/>
        <Descriptions title="租赁房间信息" bordered items={roomItems} className="mt"/>
      </Card>
    </>
  )
}

export default Surrender
