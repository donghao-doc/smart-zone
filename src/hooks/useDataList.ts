import { useCallback, useEffect, useState } from 'react'

type MyFormData = {
  [key: string]: any
}

interface DataFetcher<T>{
  (args: T&{page: number;pageSize: number}): Promise<any>
}

function useDataList<T extends MyFormData, U>(initialFormData: T, fetchData: DataFetcher<T>) {
  const [formData, setFormData] = useState(initialFormData)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [dataList, setDataList] = useState<U[]>([])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const { data: { list, total } } = await fetchData({ page, pageSize, ...formData })
      setDataList(list)
      setTotal(total)
    } catch (err) {
      console.log(err)
      setDataList([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, formData, fetchData])
  
  useEffect(() => {
    loadData()
  }, [loadData])
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setTotal(0)
    setPage(1)
    setPageSize(10)
    setLoading(false)
  }
  
  return {
    formData, page, pageSize, loading, total, dataList,
    handleFormChange, handlePageChange, handleReset, loadData,
  }
}

export default useDataList